import {
  DefaultElementSerializer,
  ElementSerializer,
  StringAsArraySerializer,
  WeakValueMap,
} from "../../util";
import { Resettable } from "../helper_crdts";
import { LwwPlainMap } from "../map";
import { AbstractCSetCompositeCrdt } from "./abstract_set";

export class ReferenceCSet<T extends object, AddArgs extends any[]>
  extends AbstractCSetCompositeCrdt<T, AddArgs>
  implements Resettable 
{
  // This is also used to determine membership.
  // Using LWW for the values is overkill since we know
  // they will always be the same for a given key, but
  // this is easier than implementing a custom map,
  // and it is only a minor performance/memory penalty
  // (none in the common case where there are no concurrent
  // restores of the same value).
  private readonly argsById: LwwPlainMap<string, AddArgs>;
  // This is a view of argsById, with the actual value
  // (as originally constructed, to preserve references)
  // as the value.
  private readonly valuesById: Map<string, T> = new Map();
  // This includes only deleted values.
  private readonly backupValuesById: WeakValueMap<string, T> =
    new WeakValueMap();
  // Each instance of this class views metaByValue as a
  // WeakMap<T, [id: string, args: AddArgs, instance: this].
  //
  // It maps each value to its metadata.  Note that it is
  // okay to share the map between instances (static) because
  // each instance will create distinct values.
  // metaByValue entries are not deleted when their value
  // is deleted, only when their value is GC'd.
  //
  // Entries are needed even
  // for deleted values so that if a deleted value remains in
  // memory and is later passed to restore, we remember
  // its id and args.
  //
  // We include "this" so that this cannot be GC'd as long
  // as some value is still alive.  Thus it is safe for
  // canGc() to return true when argsById is empty: if some
  // of our values are still referenced elsewhere, we will
  // not actually be GC-able, so ImplicitCrdtMap will keep
  // us around.  That prevents a confusing scenario where
  // we are GC'd & recreated by ImplicitCrdtMap but one
  // of our values survives, only to be no longer be recognized
  // by our recreated instance in restore(), or to be
  // duplicated upon receiving a message from another
  // replica (since we would forgotten backupValuesById).
  //
  // Circular references (from "this" in the value back to
  // its key, via this.valuesById) will not prevent GC
  // if this is completely detached and no values are
  // otherwise referenced (e.g., we are deleted from a
  // DeletingCSet).
  // Indeed, per the WeakMap specification:
  // "If an object that is being used as the key of a WeakMap
  // key/value pair is only reachable by following a chain of
  // references that start within that WeakMap, then that key
  // /value pair is inaccessible and is automatically removed
  // from the WeakMap."
  // (https://262.ecma-international.org/6.0/#sec-weakmap-objects)
  private static readonly metaByValue: WeakMap<
    object,
    [id: string, args: any[], instance: ReferenceCSet<any, any[]>]
  > = new WeakMap();

  constructor(
    private readonly valueConstructor: (...args: AddArgs) => T,
    argsSerializer: ElementSerializer<AddArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.argsById = this.addChild(
      "",
      new LwwPlainMap(StringAsArraySerializer.instance, argsSerializer)
    );
    this.argsById.on("Set", (event) => {
      if (!this.valuesById.has(event.key)) {
        // See if we have the value already, else create it
        let value = this.backupValuesById.get(event.key);
        if (value === undefined) {
          value = this.createValue(event.key);
        } else {
          this.backupValuesById.delete(event.key);
        }
        this.valuesById.set(event.key, value);
        this.emit("Add", { value, timestamp: event.timestamp });
      }
    });
    this.argsById.on("Delete", (event) => {
      const value = this.valuesById.get(event.key);
      if (value === undefined) return;
      this.valuesById.delete(event.key);
      this.backupValuesById.set(event.key, value);
      this.emit("Delete", { value, timestamp: event.timestamp });
    });
  }

  /**
   * id must be present in this.argsById.
   * @return    the created value
   */
  private createValue(id: string): T {
    const args = this.argsById.get(id)!;
    const value = this.valueConstructor(...args);
    ReferenceCSet.metaByValue.set(value, [id, args, this]);
    // TODO: this will happen before the value is actually
    // added.  So you shouldn't use it to interact with the
    // set right away (and besides, that could lead to
    // nested ops).  Need to warn about this in the CSet
    // docs, since it's a general property of ValueInit events.
    this.emit("ValueInit", { value });
    return value;
  }

  add(...args: AddArgs): T {
    const id = this.runtime.getUniqueString();
    this.argsById.set(id, args);
    return this.valuesById.get(id)!;
  }

  delete(value: T): void {
    const id = ReferenceCSet.metaByValue.get(value)![0];
    this.argsById.delete(id);
  }

  has(value: T): boolean {
    const id = ReferenceCSet.metaByValue.get(value)![0];
    return this.valuesById.has(id);
  }

  values(): IterableIterator<T> {
    return this.valuesById.values();
  }

  get size(): number {
    return this.valuesById.size;
  }

  reset() {
    // Our (canGc-related) state is just a view of
    // this.argsById's state, as usual for CompositeCrdt,
    // so this is an observed-reset operation.
    this.argsById.reset();
  }

  postLoad() {
    // Need to set up valuesById and metaByValue with the
    // present values.
    for (const id of this.argsById.keys()) {
      this.createValue(id);
    }
  }
}
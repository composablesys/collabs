import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { AggregateCRegisterMeta, MutCRegister } from "../register";
import { DeletingMutCSet, DeletingMutCSetValueSerializer } from "../set";
import { AbstractCMapCompositeCrdt } from "./abstract_map";
import { LwwCMap } from "./lww_map";
import { RegisterCMap } from "./register_map";

// TODO: note that ValueInit events are emitted for all
// values, even ones that never show up locally due to
// a winning concurrent write to their key.
// TOOD: FWW option for internal map?  (Using constructor
// arg, like in MutCRegister.)
export class DeletingMutCMap<K, C extends Crdt, SetArgs extends any[]>
  extends RegisterCMap<K, C, SetArgs, MutCRegister<C, SetArgs>>
  implements Resettable
{
  private valueFactory: DeletingMutCSet<C, SetArgs>;
  private map: LwwCMap<K, C>;

  constructor(
    valueConstructor: (key: K, ...args: SetArgs) => C,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.valueFactory = this.addChild(
      "",
      new DeletingMutCSet(valueConstructor, undefined, argsSerializer)
    );
    this.map = this.addChild(
      "0",
      new LwwCMap(
        keySerializer,
        new DeletingMutCSetValueSerializer(this.valueFactory)
      )
    );

    // Events
    this.map.on("Receive", (event) => {
      // We know Receive events correspond exactly to
      // new value initializations, since DeletingMutCSet
      // only creates values during add, we always do
      // this.map.set right after this.valueFactory.add.
      // So this is safe.
      // We're not able to listen to this.valueFactory's
      // ValueInit events because they don't give us the key.
      this.emit("ValueInit", { key: event.key, value: event.value });
    });
    this.map.on("Set", (event) => {
      this.emit("Set", event);
    });
    this.map.on("Delete", (event) => {
      this.emit("Delete", event);
    });
  }

  set(key: K, ...args: SetArgs): C {
    return this.map.set(key, this.valueFactory.add(...args));
  }

  delete(key: K): void {
    const conflicts = this.map.getConflicts(key);
    if (conflicts !== undefined) {
      for (const value of conflicts) {
        this.valueFactory.delete(value);
      }
      this.map.delete(key);
    }
  }

  get(key: K): C | undefined {
    return this.map.get(key);
  }

  /**
   * Return the current conflicting values at key, i.e., the
   * non-overwritten values.  This may have
   * more than one element due to concurrent writes.
   * If key is not present, returns undefined.
   *
   * The array is guaranteed to contain
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.
   */
  getConflicts(key: K): C[] | undefined {
    return this.map.getConflicts(key);
  }

  /**
   * Return the current conflicting values with metadata.
   * If key is not present, returns undefined.
   *
   * The array is guaranteed to contain
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.
   */
  getConflictsMeta(key: K): AggregateCRegisterMeta<C>[] | undefined {
    return this.map.getConflictsMeta(key);
  }

  owns(value: C): boolean {
    return this.valueFactory.owns(value);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  get size(): number {
    return this.map.size;
  }

  entries(): IterableIterator<[K, C]> {
    return this.map.entries();
  }

  clear() {
    // This may someday be more efficient than deleting
    // every key.
    this.valueFactory.clear();
    this.map.clear();
  }

  reset() {
    // This should be equivalent to clear, but just in case...
    this.valueFactory.reset();
    this.map.reset();
  }
}

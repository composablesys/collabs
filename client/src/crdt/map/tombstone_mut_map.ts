import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { Crdt } from "../core";
import { AggregateCRegisterMeta } from "../register";
import { DeletingMutCSet, DeletingMutCSetValueSerializer } from "../set";
import { AbstractCMapCompositeCrdt } from "./abstract_map";
import { LwwCMap } from "./lww_map";

// TODO: postLoad cached values (x2)
// TODO: revive on concurrent ops

// TODO: note that ValueInit events are emitted for all
// values, even ones that never show up locally due to
// a winning concurrent write to their key.
// TOOD: FWW option for internal map?  (Using constructor
// arg, like in MutCRegister.)

/**
 * TODO: tombstones, so uses ever-growing memory.  Use
 * with caution (e.g. only if it is itself in a
 * DeletingMut collection and will be deleted later).
 * Discuss alternatives.
 */
export class TombstoneMutCMap<
  K,
  C extends Crdt,
  SetArgs extends any[]
> extends AbstractCMapCompositeCrdt<K, C, SetArgs> {
  private valueFactory: DeletingMutCSet<C, SetArgs>;
  private map: LwwCMap<K, C>;
  private valuesIncludeTombstones: Map<K, C[]> = new Map();
  private keysByValue: Map<C, K> = new Map();

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
      let tombstones = this.valuesIncludeTombstones.get(event.key);
      if (tombstones === undefined) {
        tombstones = [];
        this.valuesIncludeTombstones.set(event.key, tombstones);
      }
      tombstones.push(event.value);
      this.keysByValue.set(event.value, event.key);
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

  restore(value: C): void {
    if (!this.owns(value)) {
      throw new Error("this.owns(value) is false");
    }
    this.map.set(this.keyOf(value)!, value);
  }

  delete(key: K): void {
    this.map.delete(key);
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

  getIncludeTombstones(key: K): C[] {
    return this.valuesIncludeTombstones.get(key) ?? [];
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
    this.map.clear();
  }

  keyOf(searchElement: C): K | undefined {
    return this.keysByValue.get(searchElement);
  }
}

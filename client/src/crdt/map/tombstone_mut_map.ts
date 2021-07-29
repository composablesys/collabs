import {
  CrdtSerializer,
  DefaultElementSerializer,
  ElementSerializer,
  PairSerializer,
} from "../../util";
import { Crdt } from "../core";
import { CRegisterEntryMeta } from "../register";
import { AddWinsCSet, DeletingMutCSet } from "../set";
import { AbstractCMapCompositeCrdt } from "./abstract_map";
import { LwwCMap } from "./lww_map";

// TODO: concurrentOpRestores?  (key or value?)

/**
 * TODO: warning: tombstones.  Benefit is that you can
 * restoreKey, and you can always restoreValue (always
 * usable).
 */
export class TombstoneMutCMap<
  K,
  C extends Crdt,
  SetArgs extends any[]
> extends AbstractCMapCompositeCrdt<K, C, SetArgs> {
  private readonly valueSet: DeletingMutCSet<C, [K, SetArgs]>;
  private readonly map: LwwCMap<K, C>;
  private readonly keySet: AddWinsCSet<K>;
  // Used to perform keyOf lookups in O(1) time, which are
  // necessary for restoreValue calls.
  private readonly keyByValue: WeakMap<C, K> = new WeakMap();

  // TODO: FWW option?  (Like in MutCRegister.)
  // Perhaps have LwwMap be a generic "WW" map with a
  // first/last option, to make this easy.
  constructor(
    valueConstructor: (key: K, ...args: SetArgs) => C,
    concurrentOpRestores = false,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();

    this.valueSet = this.addChild(
      "",
      new DeletingMutCSet(
        (key, args) => {
          const value = valueConstructor(key, ...args);
          // Cache
          this.keyByValue.set(value, key);
          if (concurrentOpRestores) {
            // Any operation on value does a restoreKey
            value.on("Change", (event) => {
              this.runtime.runLocally(event.timestamp, () => {
                this.keySet.add(key);
              });
            });
          }
          return value;
        },
        undefined,
        new PairSerializer(keySerializer, argsSerializer)
      )
    );
    this.map = this.addChild(
      "0",
      new LwwCMap(keySerializer, new CrdtSerializer(this.valueSet))
    );
    this.keySet = this.addChild("1", new AddWinsCSet(keySerializer));

    // Events
    this.map.on("Set", (event) => this.emit("Set", event));
    this.map.on("Delete", (event) => this.emit("Delete", event));
  }

  set(key: K, ...args: SetArgs): C {
    const value = this.valueSet.add(key, args);
    this.keySet.add(key);
    this.map.set(key, value);
    return value;
  }

  delete(key: K): void {
    this.keySet.delete(key);
  }

  get(key: K): C | undefined {
    if (this.has(key)) return this.map.get(key);
    else return undefined;
  }

  getConflicts(key: K): C[] {
    return this.map.getConflicts(key);
  }

  getConflictsMeta(key: K): CRegisterEntryMeta<C>[] {
    return this.map.getConflictsMeta(key);
  }

  has(key: K): boolean {
    return this.keySet.has(key);
  }

  owns(value: C): boolean {
    return this.valueSet.owns(value);
  }

  get size(): number {
    return this.keySet.size;
  }

  *entries(): IterableIterator<[K, C]> {
    for (const key of this.keySet) {
      // Since we never delete from this.map, and
      // this.keySet only adds if there is a value
      // already/nearly present, we can be sure that if
      // key is present, then this.map.get(key) exists.
      yield [key, this.map.get(key)!];
    }
  }

  clear() {
    // This may someday be more efficient than deleting
    // every key.
    this.keySet.clear();
  }

  keyOf(searchElement: C): K | undefined {
    return this.keyByValue.get(searchElement);
  }

  /**
   * Set the value at key to a previous value for key.
   *
   * A typical use case is if multiple users set the
   * value concurrently and each do some work on their
   * value, causing a conflict, they can inspect the conflicts
   * (using getConflicts(key)) and choose one to appear as
   * the main value.  In case multiple users do so
   * concurrently, one of their choices will be chosen
   * using the usual conflict resolution rule (LWW or FWW)
   * for this map.
   *
   * @param key    [description]
   * @param  value [description]
   * @return       [description]
   * @throws if value is not owned by this map, or it was
   * not a previous value at key
   */
  restoreValue(value: C) {
    if (!this.owns(value)) {
      throw new Error("this.owns(value) is false");
    }
    const key = this.keyOf(value)!;
    this.keySet.add(key);
    this.map.set(key, value);
  }

  /**
   * key must have previously had a value (else throws)
   * @param  key [description]
   * @return     [description]
   */
  restoreKey(key: K) {
    if (!this.map.has(key)) {
      throw new Error(
        "key did not previously have a value, nothing to restore"
      );
    }
    this.keySet.add(key);
  }
}

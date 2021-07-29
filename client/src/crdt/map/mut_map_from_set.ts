import {
  CrdtSerializer,
  DefaultElementSerializer,
  ElementSerializer,
  PairSerializer,
} from "../../util";
import { Crdt } from "../core";
import { CRegisterEntryMeta } from "../register";
import { CSet } from "../set";
import { AbstractCMapCompositeCrdt } from "./abstract_map";
import { LwwCMap } from "./lww_map";

/**
 * The set is used as a source of Crdts for values.
 */
export class MutCMapFromSet<
  K,
  C extends Crdt,
  SetArgs extends any[],
  SetT extends CSet<C, [K, SetArgs]>
> extends AbstractCMapCompositeCrdt<K, C, SetArgs> {
  protected readonly valueSet: SetT;
  protected readonly map: LwwCMap<K, C>;

  // TODO: FWW option?  (Like in MutCRegister.)
  // Generic map?  (Then move conflicts etc. to the subclass)
  constructor(
    setCallback: (
      setValueConstructor: (key: K, args: SetArgs) => C,
      setArgsSerializer: ElementSerializer<[K, SetArgs]>
    ) => SetT,
    valueConstructor: (key: K, ...args: SetArgs) => C,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();

    this.valueSet = this.addChild(
      "",
      setCallback((key, args) => {
        return valueConstructor(key, ...args);
      }, new PairSerializer(keySerializer, argsSerializer))
    );
    this.map = this.addChild(
      "0",
      new LwwCMap(keySerializer, new CrdtSerializer(this.valueSet))
    );

    // Events
    // Note that for the state to be reasonable during
    // these event handlers, it is necessary that
    // operations always do the this.map operation last.
    this.map.on("Set", (event) => this.emit("Set", event));
    this.map.on("Delete", (event) => this.emit("Delete", event));
  }

  set(key: K, ...args: SetArgs): C {
    // Delete all existing values, so they don't become tombstones.
    for (const value of this.map.getConflicts(key)) {
      this.valueSet.delete(value);
    }
    // Set the new value
    const value = this.valueSet.add(key, args);
    this.map.set(key, value);
    return value;
  }

  delete(key: K): void {
    // Delete all existing values, so they don't become tombstones.
    for (const value of this.map.getConflicts(key)) {
      this.valueSet.delete(value);
    }
    // Delete in map
    this.map.delete(key);
  }

  get(key: K): C | undefined {
    return this.map.get(key);
  }

  getConflicts(key: K): C[] {
    return this.map.getConflicts(key);
  }

  getConflictsMeta(key: K): CRegisterEntryMeta<C>[] {
    return this.map.getConflictsMeta(key);
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
    this.valueSet.clear();
  }

  // Use inherited (O(n)) keyOf implementation.  If you
  // want this to run in O(1), you should use store WeakMap
  // from values to keys, set during valueConstructor.
}

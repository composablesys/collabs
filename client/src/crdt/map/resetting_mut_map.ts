import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { AddWinsCSet } from "../set";
import { AbstractCMapCompositeCrdt } from "./abstract_map";
import { ResettingImplicitMutCMap } from "./implicit_mut_map";

// TODO: version with arbitrary keySet, but still resetting
// (so it can be memory safe if the keySet is)?
// Like ExplicitCrdtMap from before, but always Resetting.
export class ResettingMutCMap<K, C extends Crdt & Resettable>
  extends AbstractCMapCompositeCrdt<K, C, []>
  implements Resettable
{
  private readonly internalMap: ResettingImplicitMutCMap<K, C>;
  private readonly keySet: AddWinsCSet<K>;

  constructor(
    valueConstructor: (key: K) => C,
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super();

    this.internalMap = this.addChild(
      "",
      new ResettingImplicitMutCMap(valueConstructor, keySerializer)
    );
    this.keySet = this.addChild("0", new AddWinsCSet(keySerializer));

    // TODO: events, see original?
  }

  set(key: K): C {
    this.keySet.add(key);
    return this.internalMap.set(key);
  }

  delete(key: K): void {
    this.keySet.delete(key);
    this.internalMap.delete(key);
  }

  get(key: K): C | undefined {
    if (this.has(key)) return this.internalMap.get(key);
    else return undefined;
  }

  has(key: K): boolean {
    return this.keySet.has(key) || this.internalMap.has(key);
  }

  get size(): number {
    // TODO: optimize
    let count = 0;
    for (const _ of this.values()) count++;
    return count;
  }

  *entries(): IterableIterator<[K, C]> {
    // TODO: could get weird if there is concurrent modification
    for (const entry of this.internalMap.entries()) yield entry;
    for (const key of this.keySet) {
      // Skip already yielded ones
      if (!this.internalMap.has(key)) {
        yield [key, this.internalMap.get(key)];
      }
    }
  }

  clear() {
    // Someday this may be more efficient than deleting
    // every element
    this.keySet.clear();
    this.internalMap.clear();
  }

  reset() {
    this.keySet.reset();
    this.internalMap.reset();
  }
}

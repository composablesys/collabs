import {
  DefaultElementSerializer,
  ElementSerializer,
} from "../../util/serialization";
import { LazyCrdtMap, Resettable } from "../helper_crdts";
import { Crdt } from "../core/crdt";
import { PlainSet } from "../set/interfaces";
import { AddWinsPlainSet, GPlainSet } from "../set/plain_sets";
import { AbstractCrdtMap } from "./abstract_maps";

export class GeneralCrdtMap<K, C extends Crdt> extends AbstractCrdtMap<K, C> {
  protected readonly lazyCrdtMap: LazyCrdtMap<K, C>;
  protected readonly keySet: PlainSet<K>;
  protected readonly hasNontrivial: boolean;

  constructor(
    valueCrdtConstructor: (key: K) => C,
    keySet: PlainSet<K>,
    settings: { hasNontrivial: boolean },
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.lazyCrdtMap = this.addChild(
      "lazyCrdtMap",
      new LazyCrdtMap(valueCrdtConstructor, keySerializer)
    );
    this.keySet = this.addChild("keySet", keySet);
    this.hasNontrivial = settings.hasNontrivial;
  }

  delete(key: K): boolean {
    const had = this.has(key);
    this.keySet.delete(key);
    return had;
  }

  clear(): void {
    this.keySet.clear();
  }

  get(key: K): C | undefined {
    if (this.has(key)) return this.lazyCrdtMap.get(key);
    else return undefined;
  }

  owns(valueCrdt: C): boolean {
    return this.lazyCrdtMap.owns(valueCrdt);
  }

  has(key: K): boolean {
    return (
      this.keySet.has(key) ||
      (this.hasNontrivial && this.lazyCrdtMap.nontrivialHas(key))
    );
  }

  addKey(key: K): this {
    this.keySet.add(key);
    return this;
  }

  keyOf(valueCrdt: C): K {
    return this.lazyCrdtMap.keyOf(valueCrdt);
  }

  get size(): number {
    // TODO: make run in constant time
    let count = 0;
    for (let _value of this) count++;
    return count;
  }

  *entries(): IterableIterator<[K, C]> {
    // TODO: can we make the order EC?
    for (let key of this.keySet) yield [key, this.lazyCrdtMap.get(key)];
    if (this.hasNontrivial) {
      // TODO: this might get weird if there are
      // concurrent mutations.
      for (let [key, valueCrdt] of this.lazyCrdtMap.nontrivialEntries()) {
        // Only yield it if it has not been yielded already.
        if (!this.keySet.has(key)) yield [key, valueCrdt];
      }
    }
  }

  /**
   * TODO: doesn't reset values, so canGc might be false afterwards
   */
  reset(): void {
    this.keySet.reset();
  }
}

export class ResettingCrdtMap<
  K,
  C extends Crdt & Resettable
> extends GeneralCrdtMap<K, C> {
  constructor(
    valueCrdtConstructor: (key: K) => C,
    keySet: PlainSet<K>,
    settings: { hasNontrivial: boolean },
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance()
  ) {
    super(valueCrdtConstructor, keySet, settings, keySerializer);
  }

  delete(key: K): boolean {
    const had = this.has(key);
    const valueCrdt = this.lazyCrdtMap.nontrivialGet(key);
    if (valueCrdt !== undefined) valueCrdt.reset();
    if (this.lazyCrdtMap.nontrivialHas(key)) {
      this.lazyCrdtMap.get(key).reset();
    }
    this.keySet.delete(key);
    return had;
  }

  clear(): void {
    for (let valueCrdt of this.lazyCrdtMap.nontrivialValues())
      valueCrdt.reset();
    super.clear();
  }

  reset(): void {
    for (let valueCrdt of this.lazyCrdtMap.nontrivialValues())
      valueCrdt.reset();
    super.reset();
  }
}

// TODO: better name?
// TODO: indicate that this is the default for CrdtMaps
export class RiakCrdtMap<
  K,
  C extends Crdt & Resettable
> extends ResettingCrdtMap<K, C> {
  constructor(valueCrdtConstructor: (key: K) => C) {
    super(valueCrdtConstructor, new AddWinsPlainSet(), {
      hasNontrivial: true,
    });
  }
}

// TODO: better name?
export class GRiakCrdtSet<K, C extends Crdt> extends GeneralCrdtMap<K, C> {
  constructor(valueCrdtConstructor: (key: K) => C) {
    super(valueCrdtConstructor, new GPlainSet(), {
      hasNontrivial: false,
    });
  }
}

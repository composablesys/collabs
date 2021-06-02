import { Runtime } from "../crdt/core/runtime";
import {
  arrayAsString,
  ElementSerializer,
  stringAsArray,
} from "./serialization";
import { WeakValueMap } from "./weak_value_map";

// TODO: common superclass with string conver

/**
 * Like ES6 Map, except keys are compared using serialization equality.
 *
 * TODO: optimizations?  E.g. if it's a primitive value, skip the serial/
 * deserial.  (But then the caller could have used a plain Map.)
 */
export class SerializingMap<K, V> {
  private internalMap = new Map<string, V>();
  constructor(
    private readonly runtime: Runtime,
    private readonly keySerializer: ElementSerializer<K>
  ) {}

  keyAsString(key: K): string {
    return arrayAsString(this.keySerializer.serialize(key));
  }

  stringAsKey(str: string): K {
    return this.keySerializer.deserialize(stringAsArray(str), this.runtime);
  }

  clear() {
    this.internalMap.clear();
  }

  delete(key: K): boolean {
    return this.internalMap.delete(this.keyAsString(key));
  }

  get(key: K): V | undefined {
    return this.internalMap.get(this.keyAsString(key));
  }

  has(key: K): boolean {
    return this.internalMap.has(this.keyAsString(key));
  }

  set(key: K, value: V): this {
    this.internalMap.set(this.keyAsString(key), value);
    return this;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  *keys(): IterableIterator<K> {
    for (let str of this.internalMap.keys()) {
      yield this.stringAsKey(str);
    }
  }

  values(): IterableIterator<V> {
    return this.internalMap.values();
  }

  *entries(): IterableIterator<[K, V]> {
    for (let entry of this.internalMap) {
      yield [this.stringAsKey(entry[0]), entry[1]];
    }
  }

  get size(): number {
    return this.internalMap.size;
  }
}

/**
 * Like ES6 Set, except values are compared using serialization equality.
 */
export class SerializingSet<T> {
  private internalSet = new Set<string>();
  constructor(
    private readonly runtime: Runtime,
    private readonly valueSerializer: ElementSerializer<T>
  ) {}

  valueAsString(value: T): string {
    return arrayAsString(this.valueSerializer.serialize(value));
  }

  stringAsValue(str: string): T {
    return this.valueSerializer.deserialize(stringAsArray(str), this.runtime);
  }

  clear() {
    this.internalSet.clear();
  }

  delete(value: T): boolean {
    return this.internalSet.delete(this.valueAsString(value));
  }

  has(value: T): boolean {
    return this.internalSet.has(this.valueAsString(value));
  }

  add(value: T): this {
    this.internalSet.add(this.valueAsString(value));
    return this;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  keys(): IterableIterator<T> {
    return this.values();
  }

  *values(): IterableIterator<T> {
    for (let str of this.internalSet.values()) {
      yield this.stringAsValue(str);
    }
  }

  *entries(): IterableIterator<[T, T]> {
    for (let entry of this.internalSet) {
      const value = this.stringAsValue(entry);
      yield [value, value];
    }
  }

  get size(): number {
    return this.internalSet.size;
  }
}

/**
 * Like WeakValueMap, except keys are compared using serialization equality.
 */
export class SerializingWeakValueMap<K, V extends Object> {
  private internalMap = new WeakValueMap<string, V>();
  constructor(
    private readonly runtime: Runtime,
    private readonly keySerializer: ElementSerializer<K>
  ) {}

  keyAsString(key: K): string {
    return arrayAsString(this.keySerializer.serialize(key));
  }

  stringAsKey(str: string): K {
    return this.keySerializer.deserialize(stringAsArray(str), this.runtime);
  }

  clear() {
    this.internalMap.clear();
  }

  delete(key: K) {
    this.internalMap.delete(this.keyAsString(key));
  }

  get(key: K): V | undefined {
    return this.internalMap.get(this.keyAsString(key));
  }

  set(key: K, value: V): this {
    this.internalMap.set(this.keyAsString(key), value);
    return this;
  }

  *[Symbol.iterator](): IterableIterator<[K, V]> {
    for (let entry of this.internalMap) {
      yield [this.stringAsKey(entry[0]), entry[1]];
    }
  }
}

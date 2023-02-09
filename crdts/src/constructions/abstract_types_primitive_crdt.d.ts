import {
  CListEventsRecord,
  CMapEventsRecord,
  CSetEventsRecord,
  IList,
  IMap,
  ISet,
} from "@collabs/core";
import { PrimitiveCRDT } from "./primitive_crdt";

/**
 * Abstract [[ISet]] with some default method implementations,
 * as a subclass of [[PrimitiveCRDT]].
 */
export declare abstract class AbstractSet_PrimitiveCRDT<
    T,
    AddArgs extends unknown[] = [T],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
  >
  extends PrimitiveCRDT<Events>
  implements ISet<T, AddArgs, Events>
{
  clear(): void;
  forEach(
    callbackfn: (value: T, value2: T, set: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  [Symbol.iterator](): IterableIterator<T>;
  toString(): string;

  abstract add(...args: AddArgs): T | undefined;
  abstract delete(value: T): void;
  abstract has(value: T): boolean;
  abstract values(): IterableIterator<T>;
  abstract readonly size: number;
}

/**
 * Abstract [[IMap]] with some default method implementations,
 * as a subclass of [[Collab]].
 */
export declare abstract class AbstractMap_PrimitiveCRDT<
    K,
    V,
    SetArgs extends unknown[] = [V],
    Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>
  >
  extends PrimitiveCRDT<Events>
  implements IMap<K, V, SetArgs, Events>
{
  clear(): void;
  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  [Symbol.iterator](): IterableIterator<[K, V]>;
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
  toString(): string;
  keyOf(searchElement: V): K | undefined;

  abstract set(key: K, ...args: SetArgs): V | undefined;
  abstract delete(key: K): void;
  abstract get(key: K): V | undefined;
  abstract has(key: K): boolean;
  abstract entries(): IterableIterator<[K, V]>;
  abstract readonly size: number;
}

/**
 * Abstract [[IList]] with some default method implementations,
 * as a subclass of [[PrimitiveCRDT]].
 */
export declare abstract class AbstractList_PrimitiveCRDT<
    T,
    InsertArgs extends unknown[] = [T],
    Events extends CListEventsRecord<T> = CListEventsRecord<T>
  >
  extends PrimitiveCRDT<Events>
  implements IList<T, InsertArgs, Events>
{
  hasPosition(position: string): boolean;
  getByPosition(position: string): T | undefined;
  positionOf(searchElement: T): string | undefined;
  clear(): void;
  [Symbol.iterator](): IterableIterator<T>;
  values(): IterableIterator<T>;
  positions(): IterableIterator<string>;
  toString(): string;

  pop(): T;
  push(...args: InsertArgs): T | undefined;
  shift(): T;
  unshift(...args: InsertArgs): T | undefined;

  concat(...items: ConcatArray<T>[]): T[];
  concat(...items: (T | ConcatArray<T>)[]): T[];
  find<S extends T>(
    predicate: (this: void, value: T, index: number, obj: this) => value is S,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): S | undefined;
  find(
    predicate: (value: T, index: number, obj: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): T | undefined;
  findIndex(
    predicate: (value: T, index: number, obj: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): number;
  flatMap<U, This = undefined>(
    callback: (
      this: This,
      value: T,
      index: number,
      array: this
    ) => U | ReadonlyArray<U>,
    thisArg?: This
  ): U[];
  flat<D extends number = 1>(depth?: D): FlatArray<T[], D>[];
  includes(searchElement: T, fromIndex?: number): boolean;
  indexOf(searchElement: T, fromIndex?: number): number;
  lastIndexOf(searchElement: T, fromIndex?: number): number;
  every(
    predicate: (value: T, index: number, list: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): boolean;
  some(
    predicate: (value: T, index: number, list: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): boolean;
  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  map<U>(
    callbackfn: (value: T, index: number, list: this) => U,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): U[];
  filter<S extends T>(
    predicate: (value: T, index: number, list: this) => value is S,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): S[];
  filter(
    predicate: (value: T, index: number, list: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): T[];
  join(separator?: string): string;
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      list: this
    ) => T
  ): T;
  reduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      list: this
    ) => U,
    initialValue: U
  ): U;
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      list: this
    ) => T
  ): T;
  reduceRight<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      list: this
    ) => U,
    initialValue: U
  ): U;
  slice(start?: number, end?: number): T[];

  abstract insert(index: number, ...args: InsertArgs): T | undefined;
  abstract delete(startIndex: number, count?: number): void;
  abstract get(index: number): T;
  abstract getPosition(index: number): string;
  abstract indexOfPosition(
    position: string,
    searchDir?: "none" | "left" | "right"
  ): number;
  abstract entries(): IterableIterator<
    [index: number, position: string, value: T]
  >;
  abstract readonly length: number;
}

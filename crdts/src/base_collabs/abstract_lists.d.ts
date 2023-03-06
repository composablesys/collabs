import { IList, ListEventsRecord } from "@collabs/core";
import { PrimitiveCRDT } from "./primitive_crdt";

/**
 * Skeletal implementation of the [[IList]] interface, as a subclass of
 * [[PrimitiveCRDT]].
 *
 * This class is a convenience for Collab implementers. It provides
 * some default method implementations and leaves the others abstract.
 */
export declare abstract class AbstractList_PrimitiveCRDT<
    T,
    InsertArgs extends unknown[] = [T],
    Events extends ListEventsRecord<T> = ListEventsRecord<T>
  >
  extends PrimitiveCRDT<Events>
  implements IList<T, InsertArgs, Events>
{
  hasPosition(position: Position): boolean;
  getByPosition(position: Position): T | undefined;
  positionOf(searchElement: T): Position | undefined;
  clear(): void;
  [Symbol.iterator](): IterableIterator<T>;
  values(): IterableIterator<T>;
  positions(): IterableIterator<Position>;
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
  abstract getPosition(index: number): Position;
  abstract indexOfPosition(
    position: Position,
    searchDir?: "none" | "left" | "right"
  ): number;
  abstract entries(): IterableIterator<
    [index: number, position: Position, value: T]
  >;
  abstract readonly length: number;
}

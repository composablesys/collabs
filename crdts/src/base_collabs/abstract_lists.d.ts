import { IList, ListEventsRecord, Position } from "@collabs/core";
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

  push(...args: InsertArgs): T | undefined;
  unshift(...args: InsertArgs): T | undefined;

  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  map<U>(
    callbackfn: (value: T, index: number, list: this) => U,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): U[];
  slice(start?: number, end?: number): T[];
  indexOf(searchElement: T, fromIndex?: number): number;

  abstract insert(index: number, ...args: InsertArgs): T | undefined;
  abstract delete(index: number, count?: number): void;
  abstract get(index: number): T;
  abstract getPosition(index: number): Position;
  abstract indexOfPosition(
    position: Position,
    searchDir?: "none" | "left" | "right"
  ): number;
  abstract entries(): IterableIterator<
    [index: number, value: T, position: Position]
  >;
  abstract readonly length: number;
}

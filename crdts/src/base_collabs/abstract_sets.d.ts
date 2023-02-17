import { ISet, SetEventsRecord } from "@collabs/core";
import { PrimitiveCRDT } from "./primitive_crdt";

/**
 * Abstract [[ISet]] with some default method implementations,
 * as a subclass of [[PrimitiveCRDT]].
 */
export declare abstract class AbstractSet_PrimitiveCRDT<
    T,
    AddArgs extends unknown[] = [T],
    Events extends SetEventsRecord<T> = SetEventsRecord<T>
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

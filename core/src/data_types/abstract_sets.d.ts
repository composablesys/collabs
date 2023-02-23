import { CObject, CPrimitive } from "../base_collabs";
import { Collab } from "../core";
import { ISet, SetEventsRecord } from "./i_set";

// See MakeAbstractSet for the rationale behind this file.

/**
 * Skeletal implementation of the [[ISet]] interface, as a subclass of
 * [[Collab]].
 *
 * This class is a convenience for Collab implementers. It provides
 * some default method implementations and leaves the others abstract.
 */
export declare abstract class AbstractSet_Collab<
    T,
    AddArgs extends unknown[] = [T],
    Events extends SetEventsRecord<T> = SetEventsRecord<T>
  >
  extends Collab<Events>
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
 * Skeletal implementation of the [[ISet]] interface, as a subclass of
 * [[CObject]].
 *
 * This class is a convenience for Collab implementers. It provides
 * some default method implementations and leaves the others abstract.
 */
export declare abstract class AbstractSet_CObject<
    T,
    AddArgs extends unknown[] = [T],
    Events extends SetEventsRecord<T> = SetEventsRecord<T>
  >
  extends CObject<Events>
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
 * Skeletal implementation of the [[ISet]] interface, as a subclass of
 * [[CPrimitive]].
 *
 * This class is a convenience for Collab implementers. It provides
 * some default method implementations and leaves the others abstract.
 */
export declare abstract class AbstractSet_CPrimitive<
    T,
    AddArgs extends unknown[] = [T],
    Events extends SetEventsRecord<T> = SetEventsRecord<T>
  >
  extends CPrimitive<Events>
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

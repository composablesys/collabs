import { CObject, CPrimitive } from "../constructions";
import { Collab } from "../core";
import { CSetEventsRecord, ISet } from "./i_set";

// See MakeAbstractSet for the rationale behind this file.

/**
 * Abstract [[ISet]] with some default method implementations,
 * as a subclass of [[Collab]].
 */
export declare abstract class AbstractSet_Collab<
    T,
    AddArgs extends unknown[] = [T],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
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
 * Abstract [[ISet]] with some default method implementations,
 * as a subclass of [[CObject]].
 */
export declare abstract class AbstractSet_CObject<
    T,
    AddArgs extends unknown[] = [T],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
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
 * Abstract [[ISet]] with some default method implementations,
 * as a subclass of [[CPrimitive]].
 */
export declare abstract class AbstractSet_CPrimitive<
    T,
    AddArgs extends unknown[] = [T],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
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

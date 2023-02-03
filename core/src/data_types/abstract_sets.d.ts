import { CObject, CPrimitive } from "../constructions";
import { Collab } from "../core";
import { CSetEventsRecord, ISet } from "./iset";

// The below classes are constructed as mixins using MakeAbstractSet.
// However, TypeScript gets confused by the generic types; specifically,
// it won't let us pass generic types from the class to MakeAbstractSet.
//
// Trying to work around this within TypeScript is difficult and confuses
// other tools (e.g., if we ts-ignore the issue, then
// ESLint sees the generic types as "any").
//
// Instead, we declare each class to have the correct signature
// without mentioning the mixin, then define the class using the mixin in JS.
//
// This requires us to copy-paste the body of AbstractSet for each class
// (prepending "abstract" to each method/property). This is inconvenient,
// but least it only bloats the type declarations, not the compiled JS code.

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

export declare abstract class AbstractSet_CObject<
    T,
    AddArgs extends unknown[] = [T],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
  >
  extends CObject<Events>
  implements ISet<T, AddArgs, Events>
{
  abstract add(...args: AddArgs): T | undefined;
  abstract delete(value: T): void;
  abstract has(value: T): boolean;
  abstract values(): IterableIterator<T>;
  abstract readonly size: number;
}

export declare abstract class AbstractSet_CPrimitive<
    T,
    AddArgs extends unknown[] = [T],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
  >
  extends CPrimitive<Events>
  implements ISet<T, AddArgs, Events>
{
  abstract add(...args: AddArgs): T | undefined;
  abstract delete(value: T): void;
  abstract has(value: T): boolean;
  abstract values(): IterableIterator<T>;
  abstract readonly size: number;
}

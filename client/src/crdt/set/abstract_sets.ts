import { CompositeCrdt } from "../core/composite_crdt";
import { Crdt, CrdtEventsRecord } from "../core/crdt";
import { CrdtSet, PlainSet } from "./interfaces";

/**
 * Convenience abstract class that provides default
 * implementations of CrdtSet methods where possible.
 *
 * Ideally, this would be a mixin instead of extending
 * CompositeCrdt, so that implementations could choose
 * their superclass.  However, TypeScript mixins don't
 * support returning abstract classes, and they are
 * hard to use even in basic situations, so we instead
 * opt to extend the most common superclass, CompositeCrdt.
 */
export abstract class AbstractCrdtSet<
    C extends Crdt,
    Events extends CrdtEventsRecord = CrdtEventsRecord,
    D extends Crdt = Crdt
  >
  extends CompositeCrdt<Events, D>
  implements CrdtSet<C>
{
  abstract create(): C;
  abstract restore(valueCrdt: C): this;
  abstract delete(valueCrdt: C): boolean;
  abstract owns(valueCrdt: C): boolean;
  abstract has(valueCrdt: C): boolean;
  abstract readonly size: number;
  abstract values(): IterableIterator<C>;
  abstract reset(): void;

  /**
   * Throws an error if !this.owns(valueCrdt).
   */
  protected checkOwns(valueCrdt: C) {
    if (!this.owns(valueCrdt)) {
      throw new Error("valueCrdt is not owned by this CrdtSet");
    }
  }

  clear(): void {
    for (let value of this) this.delete(value);
  }
  [Symbol.iterator](): IterableIterator<C> {
    return this.values();
  }
  *entries(): IterableIterator<[C, C]> {
    for (let value of this.values()) {
      yield [value, value];
    }
  }
  keys(): IterableIterator<C> {
    return this.values();
  }
}

export abstract class AbstractPlainSet<
    T,
    Events extends CrdtEventsRecord = CrdtEventsRecord,
    D extends Crdt = Crdt
  >
  extends CompositeCrdt<Events, D>
  implements PlainSet<T>
{
  abstract add(value: T): this;
  abstract delete(value: T): boolean;
  abstract has(value: T): boolean;
  abstract readonly size: number;
  abstract values(): IterableIterator<T>;
  abstract reset(): void;

  clear(): void {
    for (let value of this) this.delete(value);
  }
  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }
  *entries(): IterableIterator<[T, T]> {
    for (let value of this.values()) {
      yield [value, value];
    }
  }
  keys(): IterableIterator<T> {
    return this.values();
  }
}

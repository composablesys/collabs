import { CompositeCrdt } from "../core/composite_crdt";
import { Crdt, CrdtEventsRecord } from "../core/crdt";
import { CrdtSet } from "./interfaces";

// TODO: AbstractPlainSet

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

  protected checkOwns(valueCrdt: C) {
    if (!this.owns(valueCrdt)) {
      throw new Error("valueCrdt is not owned by this CrdtSet");
    }
  }

  clear(): void {
    this.reset();
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

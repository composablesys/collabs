import { Resettable } from "../helper_crdts";
import { Crdt } from "../core";
import { AbstractCrdtSet } from "./abstract_sets";
import { DecoratedCrdtSet } from "./decorated_sets";
import { CrdtSet, PlainSet } from "./interfaces";
import { AddWinsPlainSet, GPlainSet } from "./plain_sets";
import { ImplicitCrdtMap } from "../map";

// TODO: rename (Riak too niche)

/**
 * Options for Riak-style CrdtSets:
 * - Membership:
 *     - Implicit: contains only nontrivial Crdts (canGc is false))
 *     - Explicit: determined by a given PlainSet
 *     - Both: union of implicit and explicit members
 * - Whether deletes perform a reset (T/F)
 *
 * TODO: violations of sequential semantics.
 *
 * The three membership options correspond to
 * ImplicitCrdtSet, ExplicitCrdtSet w/ includeImplicit =
 * false, and ExplicitCrdtSet w/ includeImplicit = true.
 * For those, deletes don't perform a reset; to change that,
 * input them to ResettingCrdtSet.
 *
 * RiakCrdtSet has "both" membership, and deletes do perform
 * a reset.  TODO: discuss GC-able options.
 */

// TODO (here and YjsCrdtSet): remove creatorReplicaId arg
// for crdtConstructor?  No clear use case yet, and in
// principle the creator can do whatever by performing
// ops an a newly-created Crdt (although these will be
// lost on reset).

/**
 * A basic CrdtSet that implicitly manages membership.
 * Its main purpose is to create Crdts.
 *
 * For the
 * purpose of values and has, a valueCrdt is considered
 * to be present in the set if it is nontrivial,
 * specifically, if valueCrdt.canGc() returns false.
 * Note that this implies that a just-created element may
 * not be present in the set.  This unusual semantics
 * is necessary because the set does not necessarily
 * maintain all elements internally, only the nontrivial
 * ones, and so values() is unable to consistently return
 * all trivial elements.
 *
 * delete, clear, reset, and restore have no effect.
 */
export class ImplicitCrdtSet<C extends Crdt> extends AbstractCrdtSet<C> {
  /**
   * Keyed by: [creator replica id, creator unique number]
   */
  private readonly implicitMap: ImplicitCrdtMap<[string, number], C>;
  constructor(valueCrdtConstructor: (creatorReplicaId: string) => C) {
    super();
    // TODO: optimized key serializer?
    this.implicitMap = this.addChild(
      "implicitMap",
      // TODO: also give senderCounter value?
      new ImplicitCrdtMap((key) => valueCrdtConstructor(key[0]))
    );

    // Events
    // TODO: optimize to reduce closures?
    this.implicitMap.on("ValueInit", (event) => {
      event.value.on("Change", (event2) => {
        if (this.has(event.value)) {
          this.emit("Add", { value: event.value, timestamp: event2.timestamp });
        } else {
          this.emit("Delete", {
            value: event.value,
            timestamp: event2.timestamp,
          });
        }
      });
      this.emit("ValueInit", event);
    });
  }

  owns(valueCrdt: C): boolean {
    return this.implicitMap.owns(valueCrdt);
  }

  create(): C {
    const key: [string, number] = [
      this.runtime.replicaId,
      this.runtime.getReplicaUniqueNumber(),
    ];
    return this.implicitMap.get(key);
  }

  restore(_valueCrdt: C): this {
    // No-op
    return this;
  }

  delete(valueCrdt: C): boolean {
    // No-op
    return this.has(valueCrdt);
  }

  clear(): void {
    // No-op
  }

  has(valueCrdt: C): boolean {
    return this.implicitMap.hasValue(valueCrdt);
  }

  get size(): number {
    return this.implicitMap.size;
  }

  values(): IterableIterator<C> {
    return this.implicitMap.values();
  }

  reset(): void {
    // No-op
  }
}

// TODO: optimized serializer for memberSet (just use name)
export class ExplicitCrdtSet<C extends Crdt> extends AbstractCrdtSet<C> {
  protected readonly implicitSet: ImplicitCrdtSet<C>;
  protected readonly memberSet: PlainSet<C>;
  protected readonly includeImplicit: boolean;
  // TODO: memberSet must be a new set, we add it as
  // a child.  Once we fix Crdt init, it will be
  // an initializer instead of an actual Crdt.
  // TODO: note that delete, clear, reset have the
  // wrong sequential semantics when includeImplicit is
  // true (elements may stay present).  Also
  // reset doesn't make the state GC-able unless
  // every element is also GC-able.
  constructor(
    valueCrdtConstructor: (creatorReplicaId: string) => C,
    memberSet: PlainSet<C>,
    settings: { includeImplicit: boolean }
  ) {
    super();
    this.implicitSet = this.addChild(
      "implicitSet",
      new ImplicitCrdtSet(valueCrdtConstructor)
    );
    this.memberSet = this.addChild("memberSet", memberSet);
    this.includeImplicit = settings.includeImplicit;

    // Events
    // TODO: optimize to reduce closures?
    this.implicitSet.on("ValueInit", (event) => {
      if (this.includeImplicit) {
        event.value.on("Change", (event2) => {
          if (this.has(event.value)) {
            this.emit("Add", {
              value: event.value,
              timestamp: event2.timestamp,
            });
          } else {
            this.emit("Delete", {
              value: event.value,
              timestamp: event2.timestamp,
            });
          }
        });
      }
      this.emit("ValueInit", event);
    });
    this.memberSet.on("Add", (event) =>
      this.emit("Add", { value: event.value, timestamp: event.timestamp })
    );
    this.memberSet.on("Delete", (event) => {
      // We should check it's really deleted, if includeImplicit
      // is true.
      if (!this.includeImplicit || !this.has(event.value)) {
        this.emit("Delete", { value: event.value, timestamp: event.timestamp });
      }
    });
  }

  create(): C {
    const created = this.implicitSet.create();
    this.memberSet.add(created);
    return created;
  }

  restore(valueCrdt: C): this {
    this.checkOwns(valueCrdt);
    this.memberSet.add(valueCrdt);
    return this;
  }

  clear(): void {
    this.memberSet.clear();
  }

  delete(valueCrdt: C): boolean {
    const had = this.has(valueCrdt);
    this.memberSet.delete(valueCrdt);
    return had;
  }

  owns(valueCrdt: C): boolean {
    return this.implicitSet.owns(valueCrdt);
  }

  has(valueCrdt: C): boolean {
    this.checkOwns(valueCrdt);
    return (
      this.memberSet.has(valueCrdt) ||
      (this.includeImplicit && this.implicitSet.has(valueCrdt))
    );
  }

  get size(): number {
    // TODO: make run in constant time
    let count = 0;
    for (let _value of this) count++;
    return count;
  }

  *values(): IterableIterator<C> {
    // TODO: can we make the order EC?
    for (let value of this.memberSet) yield value;
    if (this.includeImplicit) {
      // TODO: this might get weird if there are
      // concurrent mutations.
      for (let value of this.implicitSet) {
        // Only yield it if it has not been yielded already.
        if (!this.memberSet.has(value)) yield value;
      }
    }
  }

  /**
   * TODO: doesn't reset values, so canGc might be false afterwards
   */
  reset(): void {
    this.memberSet.reset();
  }
}

export class ResettingCrdtSet<
  C extends Crdt & Resettable
> extends DecoratedCrdtSet<C> {
  constructor(set: CrdtSet<C>) {
    super(set);
  }

  delete(valueCrdt: C): boolean {
    const had = this.has(valueCrdt);
    valueCrdt.reset();
    super.delete(valueCrdt);
    return had;
  }

  clear(): void {
    // TODO: inefficient for implicit set because this
    // might create valueCrdts that are explicitly
    // present but not implicitly present, just
    // to reset them.  Probably not worth breaking
    // the decorator abstract to optimize, though,
    // especially since such reset calls are no-ops,
    // it is just the cost of creating trivial valueCrdts.
    // Likewise for reset() below.
    for (let valueCrdt of this) valueCrdt.reset();
    super.clear();
  }

  reset(): void {
    for (let valueCrdt of this) valueCrdt.reset();
    super.reset();
  }
}

// TODO: better name?
// TODO: indicate that this is the default for CrdtSets
export class RiakCrdtSet<
  C extends Crdt & Resettable
> extends ResettingCrdtSet<C> {
  constructor(valueCrdtConstructor: (creatorReplicaId: string) => C) {
    super(
      new ExplicitCrdtSet(valueCrdtConstructor, new AddWinsPlainSet(), {
        includeImplicit: true,
      })
    );
  }
}

// TODO: note which methods will throw errors
// (due to errors from GPlainSet).
export class GCrdtSet<C extends Crdt> extends ExplicitCrdtSet<C> {
  constructor(valueCrdtConstructor: (creatorReplicaId: string) => C) {
    super(valueCrdtConstructor, new GPlainSet(), {
      includeImplicit: false,
    });
  }
}

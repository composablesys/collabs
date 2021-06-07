// TODO: rename (Riak too niche)

import { LazyCrdtMap } from "../helper_crdts/lazy_crdt_map";
import { Resettable } from "../helper_crdts/resettable";
import { Crdt } from "../core/crdt";
import { AbstractCrdtSet } from "./abstract_sets";
import { DecoratedCrdtSet } from "./decorated_sets";
import { CrdtSet, PlainSet } from "./interfaces";
import { AddWinsPlainSet, GPlainSet } from "./plain_sets";

// TODO: events (from original interface).
// Note create events won't happen until after an
// op, due to how LazyMap works; this agrees with the
// set semantics but may be odd for other sets
// (need to listen on the managing set for created
// events, instead of the unmanaged set).
// Also add events to AbstractCrdtSet as base for Events.

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
  private readonly lazyMap: LazyCrdtMap<[string, number], C>;
  constructor(valueCrdtConstructor: (creatorReplicaId: string) => C) {
    super();
    // TODO: optimized key serializer?
    this.lazyMap = this.addChild(
      "lazyMap",
      // TODO: also give senderCounter value?
      new LazyCrdtMap((key) => valueCrdtConstructor(key[0]))
    );
  }

  owns(valueCrdt: C): boolean {
    return this.lazyMap.owns(valueCrdt);
  }

  create(): C {
    const key: [string, number] = [
      this.runtime.replicaId,
      this.runtime.getReplicaUniqueNumber(),
    ];
    return this.lazyMap.get(key);
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
    return this.lazyMap.nontrivialHasValue(valueCrdt);
  }

  get size(): number {
    return this.lazyMap.nontrivialSize;
  }

  values(): IterableIterator<C> {
    return this.lazyMap.nontrivialValues();
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
  }

  owns(valueCrdt: C): boolean {
    return this.implicitSet.owns(valueCrdt);
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

  delete(valueCrdt: C): boolean {
    const had = this.has(valueCrdt);
    this.memberSet.delete(valueCrdt);
    return had;
  }

  clear(): void {
    this.memberSet.clear();
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
    // TODO: efficient for explicit set because this
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

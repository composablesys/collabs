// TODO: rename (Riak too niche)

import { LazyCrdtMap } from "../composers/lazy_crdt_map";
import { Resettable } from "../composers/resettable";
import { Crdt } from "../core/crdt";
import { AbstractCrdtSet } from "./abstract_sets";
import { PlainSet } from "./interfaces";
import { AddWinsPlainSet, GPlainSet } from "./plain_sets";

// TODO: events (from original interface).
// Note create events won't happen until after an
// op, due to how LazyMap works; this agrees with the
// set semantics but may be odd for other sets
// (need to listen on the managing set for created
// events, instead of the unmanaged set).
// Also add events to AbstractCrdtSet as base for Events.
/**
 * A basic CrdtSet that does not explicitly manage
 * membership.  Its main purpose is to create
 * Crdts.
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
 * delete, clear, reset, and restore are not
 * supported and will throw an error.
 *
 * TODO: unify names of UnmanagedCrdtSet & LazyMap?  They are the set/map
 * versions of similar concepts.
 * TODO: don't implement the CrdtSet interface, like LazyMap?
 */
export class UnmanagedCrdtSet<C extends Crdt> extends AbstractCrdtSet<C> {
  /**
   * Keyed by: [creator replica id, creator unique number]
   */
  private readonly lazyMap: LazyCrdtMap<[string, number], C>;
  constructor(valueCrdtConstructor: (creatorReplicaId: string) => C) {
    super();
    // TODO: optimized key serializer?
    this.lazyMap = this.addChild(
      "lazyMap",
      // TODO: also give counter value?
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
    throw new Error("Unsupported operation: GCrdtSet.restore");
  }

  delete(_valueCrdt: C): boolean {
    throw new Error("Unsupported operation: GCrdtSet.delete");
  }

  clear(): void {
    throw new Error("Unsupported operation: GCrdtSet.clear");
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
    throw new Error("Unsupported operation: GCrdtSet.reset");
  }
}

// TODO: optimized serializer for memberSet (just use name)
export class ManagedCrdtSet<C extends Crdt> extends AbstractCrdtSet<C> {
  protected readonly unmanagedSet: UnmanagedCrdtSet<C>;
  protected readonly memberSet: PlainSet<C>;
  protected readonly hasNontrivial: boolean;
  // TODO: memberSet must be a new set, we add it as
  // a child.  Once we fix Crdt init, it will be
  // an initializer instead of an actual Crdt.
  // TODO: note that delete, clear, reset have the
  // wrong sequential semantics when hasNontrivial is
  // true (elements may stay present).  Also
  // reset doesn't make the state GC-able unless
  // every element is also GC-able.
  constructor(
    valueCrdtConstructor: (creatorReplicaId: string) => C,
    memberSet: PlainSet<C>,
    settings: { hasNontrivial: boolean }
  ) {
    super();
    this.unmanagedSet = this.addChild(
      "unmanagedSet",
      new UnmanagedCrdtSet(valueCrdtConstructor)
    );
    this.memberSet = this.addChild("memberSet", memberSet);
    this.hasNontrivial = settings.hasNontrivial;
  }

  owns(valueCrdt: C): boolean {
    return this.unmanagedSet.owns(valueCrdt);
  }

  create(): C {
    const created = this.unmanagedSet.create();
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
      (this.hasNontrivial && !valueCrdt.canGc())
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
    if (this.hasNontrivial) {
      // TODO: this might get weird if there are
      // concurrent mutations.
      for (let value of this.unmanagedSet) {
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
> extends ManagedCrdtSet<C> {
  constructor(
    valueCrdtConstructor: (creatorReplicaId: string) => C,
    memberSet: PlainSet<C>,
    options: { hasNontrivial: boolean }
  ) {
    super(valueCrdtConstructor, memberSet, options);
  }

  delete(valueCrdt: C): boolean {
    const had = this.has(valueCrdt);
    valueCrdt.reset();
    this.memberSet.delete(valueCrdt);
    return had;
  }

  clear(): void {
    for (let valueCrdt of this.unmanagedSet) valueCrdt.reset();
    super.clear();
  }

  reset(): void {
    for (let valueCrdt of this.unmanagedSet) valueCrdt.reset();
    super.reset();
  }
}

// TODO: better name?
// TODO: indicate that this is the default for CrdtSets
export class RiakCrdtSet<
  C extends Crdt & Resettable
> extends ResettingCrdtSet<C> {
  constructor(valueCrdtConstructor: (creatorReplicaId: string) => C) {
    super(valueCrdtConstructor, new AddWinsPlainSet(), {
      hasNontrivial: true,
    });
  }
}

// TODO: better name?
export class GRiakCrdtSet<C extends Crdt> extends ManagedCrdtSet<C> {
  constructor(valueCrdtConstructor: (creatorReplicaId: string) => C) {
    super(valueCrdtConstructor, new GPlainSet(), {
      hasNontrivial: false,
    });
  }
}

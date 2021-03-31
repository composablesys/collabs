import { CompositeCrdt, Crdt, CrdtRuntime, PrimitiveCrdt } from "./crdt_core";
import { Resettable } from "./mixins";
import { ElementSerializer } from "./utils";
import createTree from "functional-red-black-tree";
import { Tree } from "functional-red-black-tree";
import { MapCrdt } from "./standard";
import { StatelessTreeMessage } from "../../generated/proto_compiled";
import { CausalTimestamp } from "../network";

// TODO: should this have any events?

/**
 * A source of opaque immutable identifiers of type I
 * from a dense total order.
 *
 * This class is a Crdt in case creating identifiers
 * requires coordinating with other replicas
 * (e.g., broadcasting new identifiers to other
 * replicas if doing so is necessary for ordering,
 * as in TreeDoc).
 */
export interface ISequenceSource<I> extends Crdt, ElementSerializer<I> {
  /**
   * Same semantics as compareFunction supplied to
   * Array.sort: return < 0 if a < b, > 0 if a > b,
   * 0 if equivalent.
   * @param  a [description]
   * @param  b [description]
   * @return   [description]
   */
  compare(a: I, b: I): number;

  /**
   * Return count fresh (not used before) identifiers greater
   * than before but less than after, in increasing order.
   * before and after
   * can be assumed to be adjacent on the generating
   * replica, but they might not be adjacent on all replicas,
   * since other replicas might concurrently make an
   * identical method call.
   *
   * Typically freshness is ensured by attaching a unique id
   * from CrdtRuntime.getUniqueId(), which can be used as
   * an arbitrary tie-breaker between elements that
   * would otherwise be equivalently ordered.
   *
   * @param  before [description]
   * @param  after  [description]
   * @param count   [description]
   * @return        [description]
   */
  createBetween(before: I, after: I, count: number): I[];

  /**
   * A formal identifier less than all identifers
   * actually used.  Use this as
   * before when inserting at the beginning of a sequence.
   */
  readonly start: I;
  /**
   * A formal identifier greater than all identifers
   * actually used.  Use this as
   * after when inserting at the end of a sequence.
   */
  readonly end: I;
}

export class List<I, C extends Crdt & Resettable>
  extends CompositeCrdt
  implements Resettable {
  private readonly sequenceSource: ISequenceSource<I>;
  private readonly valueMap: MapCrdt<I, C>;
  // Note this is a persistent (immutable) data structure.
  private sortedKeys: Tree<I, true>;
  constructor(
    sequenceSource: ISequenceSource<I>,
    valueConstructor: (seqId: I) => C,
    gcValues = false
  ) {
    super();
    this.sequenceSource = this.addChild("sequenceSource", sequenceSource);
    this.valueMap = this.addChild(
      "valueMap",
      new MapCrdt<I, C>(valueConstructor, this.sequenceSource, gcValues)
    );
    this.sortedKeys = createTree(
      this.sequenceSource.compare.bind(sequenceSource)
    );
    // Catch map key events and adjusting sortedKeys
    // accordingly, so that its key set always coincides
    // with valueMap's.
    this.valueMap.on("KeyAdd", (event) => {
      // Add the key if it is not present (Tree permits
      // multiple instances of the same key, so adding it
      // again if it already exists is not a no-op).
      if (!this.sortedKeys.get(event.key)) {
        this.sortedKeys = this.sortedKeys.insert(event.key, true);
      }
    });
    this.valueMap.on("KeyDelete", (event) => {
      this.sortedKeys = this.sortedKeys.remove(event.key);
    });
    // TODO: In tests, add assertions checking
    // size equality constantly.
    // TODO: dispatching events
  }

  idAt(index: number): I {
    this.checkIndex(index);
    return this.sortedKeys.at(index).key!;
  }

  private checkIndex(index: number) {
    if (!this.hasAt(index)) {
      throw new Error(
        "Index out of bounds: " + index + " (length: " + this.length + ")"
      );
    }
  }

  getId(seqId: I): C | undefined {
    return this.valueMap.get(seqId);
  }

  getForceId(seqId: I): C {
    return this.valueMap.getForce(seqId);
  }

  getAt(index: number): C {
    return this.getId(this.idAt(index))!;
  }

  hasId(seqId: I): boolean {
    return this.valueMap.has(seqId);
  }

  hasAt(index: number): boolean {
    return !(index < 0 || index >= this.length);
  }

  deleteId(seqId: I) {
    this.valueMap.delete(seqId);
  }

  deleteAt(index: number) {
    this.deleteId(this.idAt(index));
  }

  insertAt(index: number): [seqId: I, value: C] {
    return this.insertAtRange(index, 1)[0];
  }

  insertAtRange(index: number, count: number): [seqId: I, value: C][] {
    if (index < 0 || index > this.length) {
      throw new Error(
        "insertAt index out of range: " +
          index +
          " (length: " +
          this.length +
          ")"
      );
    }
    let before = index === 0 ? this.sequenceSource.start : this.idAt(index - 1);
    let after =
      index === this.length ? this.sequenceSource.end : this.idAt(index);
    return this.insertBetween(before, after, count);
  }

  insertAfter(seqId: I): [seqId: I, value: C] {
    return this.insertAfterRange(seqId, 1)[0];
  }

  insertAfterRange(seqId: I, count: number): [seqId: I, value: C][] {
    let after = this.sortedKeys.gt(seqId).key ?? this.sequenceSource.end;
    return this.insertBetween(seqId, after, count);
  }

  insertBefore(seqId: I): [seqId: I, value: C] {
    return this.insertBeforeRange(seqId, 1)[0];
  }

  insertBeforeRange(seqId: I, count: number): [seqId: I, value: C][] {
    let before = this.sortedKeys.lt(seqId).key ?? this.sequenceSource.start;
    return this.insertBetween(before, seqId, count);
  }

  private insertBetween(
    before: I,
    after: I,
    count: number
  ): [seqId: I, value: C][] {
    let seqIds = this.sequenceSource.createBetween(before, after, count);
    let ret: [seqId: I, value: C][] = [];
    for (let seqId of seqIds) {
      this.valueMap.addKey(seqId);
      ret.push([seqId, this.valueMap.get(seqId)!]);
    }
    return ret;
  }

  reset() {
    this.valueMap.reset();
    // sortedKeys will be reset automatically in response
    // to map events; no need to reset sequenceSource since
    // it doesn't have any exposed state.
  }

  idsAsArray(): I[] {
    return this.sortedKeys.keys;
  }

  asArray(): C[] {
    let arr: C[] = [];
    for (let seqId of this.sortedKeys.keys) {
      arr.push(this.getId(seqId)!);
    }
    return arr;
  }

  // TODO: iterator versions of asArray methods

  get length(): number {
    return this.sortedKeys.length;
  }
}

// /**
//  * Mixin to automatically create subclasses of
//  * ListCrdt that use a given IDenseSource
//  * implementation.  The subclasses take the same
//  * constructor arguments as the given IDenseSource.
//  *
//  * E.g.: class LSeqList<C extends Crdt & Resettable> extends WrapSequenceSource(LSeqSequenceSource)<C> {}
//  *
//  * TODO: checks this works with the generic C type properly,
//  * and that it erased I types.  May have to reorder the
//  * generics?  (not working currently)
//  */
// export function WrapSequenceSource<
//   I,
//   S extends ISequenceSource<I>,
//   Args extends any[]
// >(
//   Source: ConstructorArgs<Args, S>
// ): ConstructorArgs<
//   [
//     valueConstructor: (seqId: I) => C,
//     gcValues: boolean | undefined,
//     ...sourceArgs: Args
//   ],
//   List<I, C>
// > {
//   return class Wrapped<C extends Crdt & Resettable> extends List<I, C> {
//     constructor(
//       valueConstructor: (seqId: I) => C,
//       gcValues: boolean | undefined,
//       ...args: Args
//     ) {
//       super(new Source(...args), valueConstructor, gcValues);
//     }
//   };
// }

// Implementations

export interface StatelessTreeId {
  // Trailing zeroes are not allowed, nor are
  // paths besides StatelessTreeSource.end with
  // high byte 255.
  // TODO: use larger numeric size, if we can figure
  // out how to serialize it properly with consistent
  // endianness.
  readonly path: Uint8Array;
  readonly sender: string;
  readonly senderCounter: number;
}

export abstract class StatelessTreeSource
  extends PrimitiveCrdt<{}>
  implements ISequenceSource<StatelessTreeId> {
  constructor() {
    super({});
  }

  compare(a: StatelessTreeId, b: StatelessTreeId): number {
    // Compare lexicographically by path, then
    // sender, then senderCounter.
    // The paths are treated as little-endian numbers
    // with matching magnitudes.
    if (a.path.length === 0) {
      if (b.path.length === 0) return 0;
      else return -1;
    }
    for (let i = 0; i < a.path.length; i++) {
      if (i === b.path.length) {
        // a and b are equal so far, but b is shorter, so it
        // is lesser.
        return 1;
      }
      if (a.path[i] !== b.path[i]) return a.path[i] - b.path[i];
    }
    // If we get here, the paths are equal; sort by sender.
    if (a.sender < b.sender) return -1;
    if (a.sender > b.sender) return 1;
    // If we get here, path and sender are equal; sort by
    // senderCounter.
    return a.senderCounter - b.senderCounter;
  }

  createBetween(
    before: StatelessTreeId,
    after: StatelessTreeId,
    count: number
  ): StatelessTreeId[] {
    let paths = this.createPathsBetween(before.path, after.path, count);
    let seqIds: StatelessTreeId[] = [];
    for (let path of paths) {
      seqIds.push({
        path,
        sender: this.runtime.getReplicaId(),
        senderCounter: this.runtime.getReplicaUniqueNumber(),
      });
    }
    return seqIds;
  }

  protected abstract createPathsBetween(
    before: Uint8Array,
    after: Uint8Array,
    count: number
  ): Uint8Array[];

  readonly start: StatelessTreeId = {
    path: new Uint8Array([]),
    sender: "",
    senderCounter: 0,
  };
  readonly end: StatelessTreeId = {
    path: new Uint8Array([255]),
    sender: "",
    senderCounter: 0,
  };

  serialize(value: StatelessTreeId): Uint8Array {
    let message = StatelessTreeMessage.create(value);
    return StatelessTreeMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array, _runtime: CrdtRuntime): StatelessTreeId {
    return StatelessTreeMessage.decode(message);
  }

  protected receive(_timestamp: CausalTimestamp, _message: Uint8Array): void {
    throw new Error("Unexpected message for StatelessTreeSource");
  }
}

export class NaiveStatelessTreeSource extends StatelessTreeSource {
  /**
   * Create count (approximately) evenly-spaced paths between
   * before and after.  Note that this will
   * have worst-case (linear) performance on
   * data inserted in a fixed order - the common
   * case.
   */
  protected createPathsBetween(
    before: Uint8Array,
    after: Uint8Array,
    count: number
  ): Uint8Array[] {
    return this.createPathsBetweenInternal(before, after, count).map(
      (value) => new Uint8Array(value)
    );
  }

  private createPathsBetweenInternal(
    before: Uint8Array | number[],
    after: Uint8Array | number[],
    count: number
  ): number[][] {
    // Base case
    if (count === 0) return [];

    // Find a path midway between before and after
    let mid: number[] = [];
    // Find the first index where before and after differ
    let i;
    for (i = 0; i < after.length; i++) {
      let beforeI = before[i] ?? 0;
      if (beforeI !== after[i]) break;
      // Else
      mid[i] = beforeI;
    }
    if (after[i] === undefined) throw new Error("after <= before");
    let beforeI = before[i] ?? 0;
    let afterI = after[i];
    if (afterI === beforeI + 1) {
      if (after.length > i + 1) {
        // We are guaranteed that after has no trailing
        // zeroes, so there must be a nonzero value
        // in after somewhere beyond after[i].
        // Thus it is safe to set
        // mid[i] = after[i] and leave the rest unset,
        // implicitly zero.
        mid[i] = after[i];
      } else {
        // We have to worry about the situation when
        // before now consists of a bunch of 255's while
        // after is finished (implicitly all 0's),
        // analogous to finding a value between
        // 0.9999.... and 1.  We solve this by setting
        // mid[j] = 255 for all remaining j for which
        // before[j] = 255, then setting the final value
        // to be in between before[j] and 255 (and definitely
        // greather than before[j]).
        mid[i] = beforeI;
        let j = i + 1;
        while (before[j] === 255) {
          mid[j] = 255;
          j++;
        }
        mid[j] = Math.ceil(((before[j] ?? 0) + 255) / 2);
      }
    } else {
      // console.log("setting mid:");
      // console.log(mid);
      mid[i] = Math.floor((beforeI + afterI) / 2);
      // console.log(i);
      // console.log(Math.floor((beforeI + afterI) / 2));
      // console.log(mid);
    }

    // Divide and conquer
    return [
      ...this.createPathsBetweenInternal(before, mid, Math.floor(count / 2)),
      mid,
      ...this.createPathsBetweenInternal(
        mid,
        after,
        Math.floor((count - 1) / 2)
      ),
    ];
  }
}

export class NaiveList<C extends Crdt & Resettable> extends List<
  StatelessTreeId,
  C
> {
  constructor(
    valueConstructor: (seqId: StatelessTreeId) => C,
    gcValues = false
  ) {
    super(new NaiveStatelessTreeSource(), valueConstructor, gcValues);
  }
}

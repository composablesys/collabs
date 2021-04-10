import { CompositeCrdt, Crdt, CrdtRuntime } from "./crdt_core";
import { Resettable } from "./mixins";
import { DefaultElementSerializer, ElementSerializer } from "./utils";
import createTree from "functional-red-black-tree";
import { Tree } from "functional-red-black-tree";
import { MapCrdt } from "./standard";
import {
  IRangeMessage,
  PrimitiveListMessage,
  TreedocIdMessage,
} from "../../generated/proto_compiled";
import { BitSet } from "../utils/bitset";
import { HasSender, UniqueMap } from "./basic_crdts";
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
   * TODO: currently must be deterministic.  Allow
   * randomness if you're not doing fancy things,
   * or supply random seed if requested.
   *
   * @param  before null for start
   * @param  after  null for end
   * @param count   [description]
   * @return        [description]
   */
  createBetween(
    before: I | null,
    after: I | null,
    count: number,
    sender: string
  ): I[];
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
    this.sequenceSource = this.addChild("1", sequenceSource);
    this.valueMap = this.addChild(
      "2",
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
    let before = index === 0 ? null : this.idAt(index - 1);
    let after = index === this.length ? null : this.idAt(index);
    return this.insertBetween(before, after, count);
  }

  insertAfter(seqId: I): [seqId: I, value: C] {
    return this.insertAfterRange(seqId, 1)[0];
  }

  insertAfterRange(seqId: I, count: number): [seqId: I, value: C][] {
    let after = this.sortedKeys.gt(seqId).key ?? null;
    return this.insertBetween(seqId, after, count);
  }

  insertBefore(seqId: I): [seqId: I, value: C] {
    return this.insertBeforeRange(seqId, 1)[0];
  }

  insertBeforeRange(seqId: I, count: number): [seqId: I, value: C][] {
    let before = this.sortedKeys.lt(seqId).key ?? null;
    return this.insertBetween(before, seqId, count);
  }

  private insertBetween(
    before: I | null,
    after: I | null,
    count: number
  ): [seqId: I, value: C][] {
    let seqIds = this.sequenceSource.createBetween(
      before,
      after,
      count,
      this.runtime.getReplicaId()
    );
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
    let keys = this.sortedKeys.keys;
    let arr = new Array<C>(keys.length);
    for (let i = 0; i < keys.length; i++) {
      arr[i] = this.getId(keys[i])!;
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

export class PrimitiveList<I extends HasSender, T>
  extends CompositeCrdt
  implements Resettable {
  private readonly sequenceSource: ISequenceSource<I>;
  private readonly valueMap: UniqueMap<I, T>;
  // Note this is a persistent (immutable) data structure.
  private sortedKeys: Tree<I, true>;
  constructor(
    sequenceSource: ISequenceSource<I>,
    private readonly valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.sequenceSource = this.addChild("1", sequenceSource);
    this.valueMap = this.addChild(
      "2",
      new UniqueMap<I, T>(this.sequenceSource, this.valueSerializer)
    );
    this.sortedKeys = createTree(
      this.sequenceSource.compare.bind(sequenceSource)
    );
    // Catch map key events and adjusting sortedKeys
    // accordingly, so that its key set always coincides
    // with valueMap's.
    this.valueMap.on("Set", (event) => {
      // Add the key if it is not present (Tree permits
      // multiple instances of the same key, so adding it
      // again if it already exists is not a no-op).
      if (!this.sortedKeys.get(event.key)) {
        this.sortedKeys = this.sortedKeys.insert(event.key, true);
      }
    });
    this.valueMap.on("Delete", (event) => {
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

  getId(seqId: I): T | undefined {
    return this.valueMap.get(seqId);
  }

  getAt(index: number): T {
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

  deleteAt(index: number, count = 1) {
    if (count === 1) this.deleteId(this.idAt(index));
    else {
      // Do a bulk delete
      let before = index === 0 ? null : this.idAt(index);
      let after =
        index + count === this.length ? null : this.idAt(index + count - 1);
      let message = new PrimitiveListMessage({
        delete: {
          range: this.rangeMessage(before, after),
        },
      });
      super.sendRpc(PrimitiveListMessage.encode(message).finish());
    }
  }

  private rangeMessage(before: I | null, after: I | null): IRangeMessage {
    return {
      hasBefore: before !== null,
      before:
        before === null ? undefined : this.sequenceSource.serialize(before),
      hasAfter: after !== null,
      after: after === null ? undefined : this.sequenceSource.serialize(after),
    };
  }

  private fromRangeMessage(
    decoded: IRangeMessage
  ): [before: I | null, after: I | null] {
    let before = decoded.hasBefore
      ? this.sequenceSource.deserialize(decoded.before!, this.runtime)
      : null;
    let after = decoded.hasAfter
      ? this.sequenceSource.deserialize(decoded.after!, this.runtime)
      : null;
    return [before, after];
  }

  insertAt(index: number, value: T): I {
    return this.insertAtRange(index, [value])[0];
  }

  insertAtRange(index: number, values: T[]): I[] {
    if (index < 0 || index > this.length) {
      throw new Error(
        "insertAt index out of range: " +
          index +
          " (length: " +
          this.length +
          ")"
      );
    }
    let before = index === 0 ? null : this.idAt(index - 1);
    let after = index === this.length ? null : this.idAt(index);
    return this.insertBetween(before, after, values);
  }

  // TODO
  // insertAfter(seqId: I): [seqId: I, value: C] {
  //   return this.insertAfterRange(seqId, 1)[0];
  // }
  //
  // insertAfterRange(seqId: I, count: number): [seqId: I, value: C][] {
  //   let after = this.sortedKeys.gt(seqId).key ?? null;
  //   return this.insertBetween(seqId, after, count);
  // }
  //
  // insertBefore(seqId: I): [seqId: I, value: C] {
  //   return this.insertBeforeRange(seqId, 1)[0];
  // }
  //
  // insertBeforeRange(seqId: I, count: number): [seqId: I, value: C][] {
  //   let before = this.sortedKeys.lt(seqId).key ?? null;
  //   return this.insertBetween(before, seqId, count);
  // }

  private insertBetween(before: I | null, after: I | null, values: T[]): I[] {
    // TODO: avoid doing this redundantly (2x)
    let seqIds = this.sequenceSource.createBetween(
      before,
      after,
      values.length,
      this.runtime.getReplicaId()
    );
    if (values.length > 2) {
      // Do a bulk insert RPC
      let message = new PrimitiveListMessage({
        insert: {
          range: this.rangeMessage(before, after),
          values: values.map((value) => this.valueSerializer.serialize(value)),
        },
      });
      super.sendRpc(PrimitiveListMessage.encode(message).finish());
    } else {
      // Do normal ops
      for (let i = 0; i < values.length; i++) {
        this.valueMap.set(seqIds[i], values[i]);
      }
    }
    return seqIds;
  }

  protected receiveRpc(timestamp: CausalTimestamp, message: Uint8Array) {
    // TODO: bulk delete as well?  Then need to track
    // causality info.
    let decoded = PrimitiveListMessage.decode(message);
    switch (decoded.data) {
      case "insert": {
        let insert = decoded.insert!;
        let values = insert.values!.map((value) =>
          this.valueSerializer.deserialize(value, this.runtime)
        );
        let [before, after] = this.fromRangeMessage(insert.range!);

        let seqIds = this.sequenceSource.createBetween(
          before,
          after,
          values.length,
          timestamp.getSender()
        );
        this.runtime.runLocally(timestamp, () => {
          for (let i = 0; i < values.length; i++) {
            this.valueMap.set(seqIds[i], values[i]);
          }
        });
        break;
      }
      case "delete": {
        let deleteMessage = decoded.delete!;
        let [before, after] = this.fromRangeMessage(deleteMessage.range!);
        let start = before === null ? 0 : this.sortedKeys.ge(before).index;
        start = Math.max(start, 0);
        // Inclusive
        let end =
          after === null ? this.length - 1 : this.sortedKeys.le(after).index;
        end = Math.min(end, this.length - 1);

        // TODO: use an iterator instead of indices
        let vc = timestamp.asVectorClock();
        let toDelete: I[] = [];
        for (let i = start; i <= end; i++) {
          // TODO: instead of checking manually here,
          // make UniqueMap.delete check timestamps?
          let key = this.idAt(i);
          let [sender, senderCounter] = this.valueMap.getMetadata(key)!;
          let vcEntry = vc.get(sender);
          if (vcEntry !== undefined && vcEntry >= senderCounter) {
            // Delete it
            toDelete.push(key);
          }
        }
        this.runtime.runLocally(timestamp, () => {
          for (let key of toDelete) this.deleteId(key);
        });
        break;
      }
      default:
        throw new Error("Unrecognized decoded.data: " + decoded.data);
    }
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

  asArray(): T[] {
    let keys = this.sortedKeys.keys;
    let arr = new Array<T>(keys.length);
    for (let i = 0; i < keys.length; i++) {
      arr[i] = this.getId(keys[i])!;
    }
    return arr;
  }

  // TODO: iterator versions of asArray methods

  get length(): number {
    return this.sortedKeys.length;
  }
}

// Implementations

export class TreedocId implements HasSender {
  /**
   * @param path top bit is always 0
   * @param disambiguators Sparse map from indices to values, represented
   * as an array of index-value pairs, ordered by index
   * increasing.
   */
  constructor(
    readonly path: BitSet,
    readonly disambiguators: [index: number, value: string][]
  ) {}

  get sender(): string {
    return this.disambiguators[this.disambiguators.length - 1][1];
  }
}

/**
 * ISequenceSource based on the Treedoc sequence CRDT
 * algorithm [1].
 *
 * [1] Nuno Preguiça, Joan Manuel Marquès, Marc Shapiro,
 * Mihai Leția. A commutative replicated data type for
 * cooperative editing. 29th IEEE International Conference on
 * Distributed Computing Systems (ICDCS 2009), Jun 2009,
 * Montreal, Québec, Canada. pp.395-403,
 * 10.1109/ICDCS.2009.20.  inria-00445975
 */
export class TreedocSource
  extends CompositeCrdt
  implements ISequenceSource<TreedocId> {
  compare(a: TreedocId, b: TreedocId): number {
    // Find the first index where they differ in either
    // path or disambiguators.  "Not present" vs present
    // counts as a difference for paths but not for
    // disambiguators.
    // 1. path
    let [pathCompare, pathIndex] = BitSet.compare(a.path, b.path);
    // 2. disambiguators
    let [disIndex, aDis, bDis] = this.diffDisambiguators(
      a.disambiguators,
      b.disambiguators
    );

    let diffIndex = Math.min(pathIndex, disIndex);

    // Now compare diffIndex based
    // on the combined order:
    // 0 < (0: a) < (0: z) < not present < (1: a) < (1: z) < 1.

    // path dominates:
    if (pathIndex <= disIndex) return pathCompare;

    // Now we need to compare disambiguators using the
    // order:
    // - if path bit is 0: not present < a < z
    // - if path bit is 1: a < z < not present
    // It is guaranteed that both path bits are present and equal.
    if (aDis === bDis) return 0;
    if (a.path.get(diffIndex)) {
      if (aDis === undefined) return 1;
      if (bDis === undefined) return -1;
    } else {
      if (aDis === undefined) return -1;
      if (bDis === undefined) return 1;
    }
    // In this case, the disambiguators are both present
    // and unequal.
    return aDis < bDis ? -1 : 1;
  }

  /**
   * [compareDisambiguators description]
   * @param  a [description]
   * @param  b [description]
   * @return  [first index where differs
   * (Number.MAX_VALUE if identical), a value at index,
   * b value at index]
   */
  private diffDisambiguators(
    a: [index: number, value: string][],
    b: [index: number, value: string][]
  ): [number, string | undefined, string | undefined] {
    /* There is one special case mentioned in prose in
      the Treedoc paper, but not in the formal definition of
      the total order (last two paragraphs in left column of
      page 397): if one id would be a prefix of another,
      except that the "suffix" has no disambiguator to match
      the "prefix"'s leaf disambiguator, then we treat them
      as a prefix/suffix regardless.  E.g.,
      00(1: bob) should be treated as a prefix of 0010(0: charlie),
      and since the next bit after the
      prefix is 0, 00(1: bob) > 0010(0: charlie), even
      though (1: bob) < 1.  This ensures that left children
      of a major node come before all mini-nodes within
      the major node, as the paper states in prose.
        Without this rule, the last line of Algorithm 1 does
      not always give a PosId in between the two inputs.
        TODO: need to check that this really defines a
      total order.
     */
    let i: number;
    for (i = 0; i < Math.min(a.length, b.length) - 1; i++) {
      if (a[i][0] < b[i][0]) return [a[i][0], a[i][1], undefined];
      if (b[i][0] < a[i][0]) return [b[i][0], undefined, b[i][1]];
      // Now a[i][0] === b[i][0]
      if (a[i][1] !== b[i][1]) return [a[i][0], a[i][1], b[i][1]];
    }
    // For the shorter one's leaf disambiguator, we only
    // consider it distinct from the other's if both
    // are present, per the above discussion.
    // i = Math.min(a.length, b.length) - 1;
    if (a[i][0] === b[i][0]) {
      if (a[i][1] !== b[i][1]) return [a[i][0], a[i][1], b[i][1]];
    }
    // Now they agree on their prefixes, taking into account
    // the above rule.
    if (a.length === b.length) return [Number.MAX_VALUE, undefined, undefined];
    // Now one is longer than the other.
    // Its next index is the first difference.
    if (a.length > b.length) return [a[b.length][0], a[b.length][1], undefined];
    else return [b[a.length][0], undefined, b[a.length][1]];
  }

  createBetween(
    before: TreedocId | null,
    after: TreedocId | null,
    count: number,
    sender: string
  ): TreedocId[] {
    let path: BitSet;
    let disambiguators: [index: number, value: string][];

    // TODO: depth heuristic from Treedoc paper

    // If they are both null, create the root.
    if (before === null && after === null) {
      // We make the first bit present so that the root
      // can have an associated disambiguator.
      path = new BitSet(1);
      disambiguators = [];
    } else {
      // If one is the other's descendant, create an inside
      // child of the descendant.
      let source: TreedocId;
      let descendant = this.descendantOrNull(before, after);
      if (descendant !== null) source = descendant;
      // If one is null, create an inside child of the
      // non-null node.
      else if (before === null) source = after!;
      else if (after === null) source = before;
      // Otherwise, they are distinct leaves.
      // Create an inside child of the node with
      // fewer disambiguators, breaking ties by
      // path length.
      // TODO: instead weight disambiguators heavily?
      else {
        if (before.disambiguators.length < after.disambiguators.length) {
          source = before;
        } else {
          source = before.path.length <= after.path.length ? before : after;
        }
      }

      path = BitSet.copy(source.path, source.path.length + 1);
      path.set(path.length - 1, source === before);
      // Keep source's leaf disambiguator if before and after
      // are mini-siblings, otherwise keep it off
      // (due to slice ending one index early).
      if (this.miniSiblings(before, after)) {
        disambiguators = source!.disambiguators.slice();
      } else {
        disambiguators = source!.disambiguators.slice(
          0,
          source!.disambiguators.length - 1
        );
      }
    }

    // Set new leaf disambiguator
    disambiguators.push([path.length - 1, sender]);

    // Make count new ids as leaf descendants of path.
    let depth = Math.ceil(Math.log2(count));
    let ans = new Array<TreedocId>(count);
    for (let i = 0; i < count; i++) {
      let iPath = BitSet.copy(path, path.length + depth);
      // Set depth next bits as the low depth bits of i
      for (let d = 0; d < depth; d++) {
        iPath.set(path.length + d, (i & (1 << (depth - d - 1))) !== 0);
      }
      ans[i] = new TreedocId(iPath, disambiguators);
    }
    return ans;
  }

  /**
   * If one id is a (potential)
   * strict descendant of the other, return it;
   * else return null.
   * @param  before [description]
   * @param  after  [description]
   * @return        [description]
   */
  private descendantOrNull(
    before: TreedocId | null,
    after: TreedocId | null
  ): TreedocId | null {
    if (before === null || after === null) return null;
    if (before.path.length === after.path.length) return null;
    let [shorter, longer] =
      before.path.length > after.path.length
        ? [after, before]
        : [before, after];
    // Check that they agree on their shared path
    // TODO: optimize loop
    for (let i = 0; i < shorter.path.length; i++) {
      if (shorter.path.get(i) !== longer.path.get(i)) return null;
    }
    // Check that they agree on their shared disambiguators.
    for (let d = 0; d < shorter.disambiguators.length - 1; d++) {
      if (!this.disEqual(shorter.disambiguators[d], longer.disambiguators[d]))
        return null;
    }
    // Special check for the shorter one's leaf disambiguator:
    // it is okay if the other is not present.
    // See the discussion in diffDisambiguators.
    let longerNextDis =
      longer.disambiguators[shorter.disambiguators.length - 1];
    if (
      longerNextDis !== undefined &&
      longerNextDis[0] <=
        shorter.disambiguators[shorter.disambiguators.length - 1][0] &&
      !this.disEqual(
        longerNextDis,
        shorter.disambiguators[shorter.disambiguators.length - 1]
      )
    ) {
      return null;
    }

    // One is a descendant of the other
    return longer;
  }

  /**
   * @param  source [description]
   * @param  other  [description]
   * @return whether they are mini-siblings, i.e., they are
   * identical except for their leaf disambiguators
   */
  private miniSiblings(
    before: TreedocId | null,
    after: TreedocId | null
  ): boolean {
    if (before === null || after === null) return false;
    if (!before.path.equals(after.path)) return false;
    if (before.disambiguators.length !== after.disambiguators.length)
      return false;
    // Compare all disambiguators except the last (leaf)
    for (
      let disIndex = 0;
      disIndex < before.disambiguators.length - 1;
      disIndex++
    ) {
      if (
        !this.disEqual(
          before.disambiguators[disIndex],
          after.disambiguators[disIndex]
        )
      )
        return false;
    }
    return true;
  }

  serialize(value: TreedocId): Uint8Array {
    let message = TreedocIdMessage.create({
      path: value.path.array,
      pathLength: value.path.length,
      disIndices: value.disambiguators.map((elem) => elem[0]),
      disValues: value.disambiguators.map((elem) => elem[1]),
    });
    return TreedocIdMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array, _runtime: CrdtRuntime): TreedocId {
    let decoded = TreedocIdMessage.decode(message);
    let path = new BitSet(decoded.pathLength, decoded.path);
    let disambiguators: [index: number, value: string][] = [];
    for (let i = 0; i < decoded.disIndices.length; i++) {
      disambiguators.push([decoded.disIndices[i], decoded.disValues[i]]);
    }
    return new TreedocId(path, disambiguators);
  }

  private disEqual(
    a: [index: number, value: string],
    b: [index: number, value: string]
  ): boolean {
    return a[0] === b[0] && a[1] === b[1];
  }
}

export class TreedocList<C extends Crdt & Resettable> extends List<
  TreedocId,
  C
> {
  constructor(valueConstructor: (seqId: TreedocId) => C, gcValues = false) {
    super(new TreedocSource(), valueConstructor, gcValues);
  }
}

export class TreedocPrimitiveList<T> extends PrimitiveList<TreedocId, T> {
  constructor(
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(new TreedocSource(), valueSerializer);
  }
}

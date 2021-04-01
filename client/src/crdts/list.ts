import { CompositeCrdt, Crdt, CrdtRuntime } from "./crdt_core";
import { Resettable } from "./mixins";
import { ElementSerializer } from "./utils";
import createTree from "functional-red-black-tree";
import { Tree } from "functional-red-black-tree";
import { MapCrdt } from "./standard";
import { TreedocIdMessage } from "../../generated/proto_compiled";
import { BitSet } from "../utils/bitset";

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
   * @param  before null for start
   * @param  after  null for end
   * @param count   [description]
   * @return        [description]
   */
  createBetween(before: I | null, after: I | null, count: number): I[];
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

export interface TreedocId {
  path: BitSet; // top bit is always 0
  disambiguators: { [index: number]: string };
}

export class TreedocSource
  extends CompositeCrdt
  implements ISequenceSource<TreedocId> {
  compare(a: TreedocId, b: TreedocId): number {
    // TODO: optimize to compare paths in chunks
    // Find the first index where they differ
    let i;
    for (i = 0; i < Math.min(a.path.length, b.path.length); i++) {
      if (
        a.path.get(i) !== b.path.get(i) ||
        a.disambiguators[i] !== b.disambiguators[i]
      )
        break;
    }
    if (i === a.path.length && i === b.path.length) {
      // They're equal
      return 0;
    }
    // The last index of the shorter path doesn't count
    // as different if the bits are the same and only
    // the shorter path has a (leaf) disambiguator.
    // This isn't stated clearly in the paper but appears
    // to be explicit in their definition of mini-nodes.
    if (
      i === Math.min(a.path.length, b.path.length) - 1 &&
      a.path.get(i) === b.path.get(i) &&
      (a.disambiguators[i] === undefined || b.disambiguators[i] === undefined)
    ) {
      // Move to the prefix case
      i++;
    }

    if (i === a.path.length) {
      // a is a prefix of b.  Determine order by the next
      // bit of b.
      return b.path.get(i) ? -1 : 1;
    }
    if (i === b.path.length) {
      // b is a prefix of a
      return a.path.get(i) ? 1 : -1;
    }
    // Otherwise, compare by the i-th bits of each, breaking
    // ties with the disambiguators.
    if (
      this.indexLess(
        a.path.getNum(i),
        a.disambiguators[i],
        b.path.getNum(i),
        b.disambiguators[i]
      )
    ) {
      return -1;
    }
    if (
      this.indexLess(
        b.path.getNum(i),
        b.disambiguators[i],
        a.path.getNum(i),
        a.disambiguators[i]
      )
    ) {
      return 1;
    }
    return 0;
  }

  private indexLess(
    aBit: 0 | 1,
    aDis: string | undefined,
    bBit: 0 | 1,
    bDis: string | undefined
  ): boolean {
    if (aBit < bBit) return true;
    if (aDis !== undefined && bDis !== undefined && aDis < bDis) return true;
    if (aBit === 0 && aDis === undefined && bDis !== undefined) return true;
    if (aDis !== undefined && bBit === 1 && bDis === undefined) return true;
    return false;
  }

  createBetween(
    before: TreedocId | null,
    after: TreedocId | null,
    count: number
  ): TreedocId[] {
    // TODO: optimize to use count?
    let ans: TreedocId[] = [];
    let prev = before;
    for (let i = 0; i < count; i++) {
      prev = this.createBetweenOne(prev, after);
      ans.push(prev);
    }
    return ans;
  }

  private createBetweenOne(
    before: TreedocId | null,
    after: TreedocId | null
  ): TreedocId {
    let path: BitSet;
    let disambiguators: { [index: number]: string };

    // TODO: depth heuristic from Treedoc paper

    // If they are both null, create the root.
    if (before === null && after === null) {
      // We make the first bit present so that the root
      // can have an associated disambiguator.
      path = new BitSet(1);
      disambiguators = {};
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
      // a shorter path.
      else {
        source = before.path.length <= after.path.length ? before : after;
      }

      path = BitSet.copy(source.path, source.path.length + 1);
      path.set(path.length - 1, source === before);
      disambiguators = { ...source!.disambiguators };
      // Keep source's leaf disambiguator if before and after
      // are mini-siblings, otherwise delete it.
      if (!this.miniSiblings(before, after)) {
        delete disambiguators[source.path.length - 1];
      }
    }

    // Set new leaf disambiguator
    disambiguators[path.length - 1] = this.runtime.getReplicaId();
    return { path, disambiguators };
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
    // TODO: optimize loop
    let i;
    for (i = 0; i < Math.min(before.path.length, after.path.length) - 1; i++) {
      if (
        before.path.get(i) !== after.path.get(i) ||
        before.disambiguators[i] !== after.disambiguators[i]
      )
        return null;
    }
    // Special check for the final disambiguators: it is
    // okay if one is missing and the other is present
    if (before.path.get(i) !== after.path.get(i)) return null;
    if (
      before.disambiguators[i] !== undefined &&
      after.disambiguators[i] !== undefined &&
      before.disambiguators[i] !== after.disambiguators[i]
    )
      return null;

    // One is a descendant of the other
    return before.path.length > after.path.length ? before : after;
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
    // Compare all disambiguators except the last
    // TODO: optimize
    for (let i = 0; i < before.path.length - 1; i++) {
      if (before.disambiguators[i] !== after.disambiguators[i]) return false;
    }
    return true;
  }

  serialize(value: TreedocId): Uint8Array {
    let message = TreedocIdMessage.create({
      path: value.path.array,
      pathLength: value.path.length,
      disambiguators: value.disambiguators,
    });
    return TreedocIdMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array, _runtime: CrdtRuntime): TreedocId {
    let decoded = TreedocIdMessage.decode(message);
    let path = new BitSet(decoded.pathLength, decoded.path);
    return { path, disambiguators: decoded.disambiguators };
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

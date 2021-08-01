import {
  TreedocDenseLocalListSave,
  TreedocLocMessage,
  TreedocLocWrapperMessage,
} from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import { arrayAsString, createRBTree, RBTree, WeakValueMap } from "../../util";
import { BitSet } from "../../util/bitset";
import { Runtime } from "../core";
import { DenseLocalList } from "./dense_local_list";

interface Disambiguator {
  readonly index: number;
  readonly sender: string;
  readonly uniqueNumber: number;
}

// Export just for tests, not exported at top level.
export class TreedocLoc {
  /**
   * @param path top bit is always 0
   * @param disambiguators Sparse map from indices to values, represented
   * as an array of index-value pairs, ordered by index
   * increasing.
   */
  constructor(
    readonly path: BitSet,
    readonly disambiguators: readonly Disambiguator[],
    public senderCounter?: number
  ) {}

  get sender(): string {
    return this.disambiguators[this.disambiguators.length - 1].sender;
  }
}

export class TreedocLocWrapper {
  /**
   * Internal use by TreedocDenseLocalList only.
   *
   * anchor must already be in the anchorCache.
   * In general it will not be a proper TreedocLoc
   * (doesn't have a disambiguator in the last layer).
   * anchors always have undefined senderCounter.
   */
  constructor(
    readonly anchor: TreedocLoc,
    readonly sender: string,
    readonly senderCounter: number,
    readonly uniqueNumber: number
  ) {}

  /**
   * Internal use by TreedocDenseLocalList only.
   *
   * id's senderCounter is ignored in favor of the
   * given senderCounter.
   */
  static from(
    id: TreedocLoc,
    parent: TreedocDenseLocalList<any>,
    senderCounter: number
  ) {
    // anchor is same as id but without last disambiguator
    const anchorTemp = new TreedocLoc(id.path, id.disambiguators.slice(0, -1));
    // Get anchor from parent's cache
    // If anchor had a uid (e.g. tree style text crdt),
    // we could use that instead of serializing.
    const anchorKey = arrayAsString(parent.serializeInternal(anchorTemp, -1));
    let anchor = parent.anchorCache.get(anchorKey);
    if (anchor === undefined) {
      anchor = anchorTemp;
      parent.anchorCache.set(anchorKey, anchor);
    }

    const lastDis = id.disambiguators[id.disambiguators.length - 1];

    return new TreedocLocWrapper(
      anchor,
      lastDis.sender,
      senderCounter,
      lastDis.uniqueNumber
    );
  }

  id(_parent: TreedocDenseLocalList<any>) {
    const ans = new TreedocLoc(
      this.anchor.path,
      [
        ...this.anchor.disambiguators,
        {
          sender: this.sender,
          uniqueNumber: this.uniqueNumber,
          index: this.anchor.path.length - 1,
        },
      ],
      this.senderCounter
    );
    return ans;
  }

  serialize(parent: TreedocDenseLocalList<any>): Uint8Array {
    // TODO: serializeInternal: return message instead of
    // bytes?  To avoid copying the byte array here.
    const message = TreedocLocWrapperMessage.create({
      anchor: parent.serializeInternal(this.anchor, -1),
      sender: this.sender,
      senderCounter: this.senderCounter === -1 ? undefined : this.senderCounter,
      uniqueNumber: this.uniqueNumber,
    });
    return TreedocLocWrapperMessage.encode(message).finish();
  }

  static deserialize(
    serialized: Uint8Array,
    parent: TreedocDenseLocalList<any>
  ): TreedocLocWrapper {
    const decoded = TreedocLocWrapperMessage.decode(serialized);
    const anchorKey = arrayAsString(decoded.anchor);
    let anchor = parent.anchorCache.get(anchorKey);
    if (anchor === undefined) {
      anchor = parent.deserializeInternal(decoded.anchor, parent.runtime)[0];
      parent.anchorCache.set(anchorKey, anchor);
    }
    return new TreedocLocWrapper(
      anchor,
      decoded.sender,
      decoded.senderCounter,
      decoded.uniqueNumber
    );
  }
}

export class TreedocDenseLocalList<T>
  implements DenseLocalList<TreedocLocWrapper, T>
{
  runtime!: Runtime;
  private tree: RBTree<TreedocLocWrapper, T>;
  // Indexed by serialized string
  readonly anchorCache: WeakValueMap<string, TreedocLoc>;

  constructor() {
    this.tree = createRBTree(this.compareWrappers.bind(this));
    this.anchorCache = new WeakValueMap();
  }

  setRuntime(runtime: Runtime): void {
    this.runtime = runtime;
  }

  private checkIndex(index: number) {
    if (index < 0 || index >= this.length) {
      throw new Error(
        "Index out of bounds: " + index + " (length: " + this.length + ")"
      );
    }
  }

  private getWrapper(index: number): TreedocLocWrapper {
    this.checkIndex(index);
    return this.tree.at(index).key!;
  }

  prepareNewLocs(index: number, count: number): Uint8Array {
    const before = index === 0 ? null : this.getWrapper(index - 1);
    const after = index === this.length ? null : this.getWrapper(index);
    const loc = this.createBetweenSpecial(
      before === null ? null : before.id(this),
      after === null ? null : after.id(this),
      count
    );
    return this.serializeInternal(loc, -1);
  }

  receiveNewLocs(
    message: Uint8Array,
    timestamp: CausalTimestamp,
    values: ArrayLike<T>
  ): [number, TreedocLocWrapper[]] {
    const [loc] = this.deserializeInternal(message, this.runtime);
    let index: number;
    const locWrappers = this.expand(
      loc,
      values.length,
      timestamp.getSenderCounter()
    );
    for (let i = 0; i < values.length; i++) {
      let indexI: number;
      [this.tree, indexI] = this.tree.insert(locWrappers[i], values[i]);
      if (i === 0) index = indexI;
      // TODO: at least compress locs when they come
      // from a range?  Easy memory improvement for
      // todo-list.
    }
    return [index!, locWrappers];
  }

  /**
   * TODO: locs created in this way cannot be used
   * with deleteRange because they don't have
   * senderCounters (hence causality info) (actually,
   * it's just set to -1).
   * Perhaps that should be factored out of here and
   * instead done in PrimitiveCrdt, together with
   * delete id caching?  In principle deleteRange could
   * be used with ListFromMap if you also allow
   * runLocally (send the range of locs to delete,
   * then runLocally to delete each value that is
   * indeed causally deleted); not with Movable
   * ones though.
   *
   * @param  index [description]
   * @param  count [description]
   * @return       [description]
   */
  createNewLocs(index: number, count: number): TreedocLocWrapper[] {
    const before = index === 0 ? null : this.getWrapper(index - 1);
    const after = index === this.length ? null : this.getWrapper(index);
    const firstLoc = this.createBetweenSpecial(
      before === null ? null : before.id(this),
      after === null ? null : after.id(this),
      count
    );
    return this.expand(firstLoc, count, -1);
  }

  set(loc: TreedocLocWrapper, value: T): number {
    let index: number;
    [this.tree, index] = this.tree.insert(loc, value, true);
    return index;
  }

  delete(loc: TreedocLocWrapper): [index: number, deletedValue: T] | undefined {
    let ret: [number, T] | undefined;
    [this.tree, ret] = this.tree.remove(loc);
    return ret;
  }

  deleteRange(
    startLoc: TreedocLocWrapper | undefined,
    endLoc: TreedocLocWrapper | undefined,
    timestamp: CausalTimestamp,
    ondelete: (
      startIndex: number,
      deletedLocs: TreedocLocWrapper[],
      deletedValues: T[]
    ) => void
  ): void {
    const iter =
      startLoc === undefined ? this.tree.begin : this.tree.ge(startLoc);
    const vc = timestamp.asVectorClock();
    const toDelete: TreedocLocWrapper[] = [];
    while (
      iter.key !== undefined &&
      (endLoc === undefined || this.compareWrappers(iter.key, endLoc) <= 0)
    ) {
      // Check causality
      const vcEntry = vc.get(iter.key.sender);
      if (vcEntry !== undefined && vcEntry >= iter.key.senderCounter!) {
        // Store for later instead of deleting immediately,
        // since I doubt iterators can handle concurrent
        // deletions.
        toDelete.push(iter.key);
      }
      iter.next();
    }
    // Delete in reverse order, so that indices
    // are valid both before and at the time of
    // deletion.
    for (let i = toDelete.length - 1; i >= 0; i--) {
      let ret: [number, T] | undefined;
      [this.tree, ret] = this.tree.remove(toDelete[i]);
      // TODO: bulk calls to ondelete, for efficiency.
      // Also can we make that work with string?
      // (Use array | string for deletedValues?)
      ondelete(ret![0], [toDelete[i]], [ret![1]]);
    }
  }

  get(index: number): T {
    this.checkIndex(index);
    return this.tree.at(index).value!;
  }

  getLoc(index: number): TreedocLocWrapper {
    this.checkIndex(index);
    return this.tree.at(index).key!;
  }

  get length(): number {
    return this.tree.length;
  }

  indexOf(loc: TreedocLocWrapper): number | undefined {
    const iter = this.tree.find(loc);
    if (iter.valid) return iter.index;
    else return undefined;
  }

  *values(): IterableIterator<T> {
    if (this.length > 0) {
      const iter = this.tree.begin;
      yield iter.value!;
      while (iter.hasNext) {
        iter.next();
        yield iter.value!;
      }
    }
  }

  *locs(): IterableIterator<TreedocLocWrapper> {
    if (this.length > 0) {
      const iter = this.tree.begin;
      yield iter.key!;
      while (iter.hasNext) {
        iter.next();
        yield iter.key!;
      }
    }
  }

  valuesArray(): T[] {
    return this.tree.values;
  }

  idOf(loc: TreedocLocWrapper): [sender: string, uniqueNumber: number] {
    return [loc.sender, loc.uniqueNumber];
  }

  canGc(): boolean {
    return this.length === 0;
  }

  saveLocs(): Uint8Array {
    const anchors: Uint8Array[] = [];
    const indexByAnchor = new Map<TreedocLoc, number>();
    const senders: string[] = [];
    const indexBySender = new Map<string, number>();

    const anchorIndices = new Array<number>(this.length);
    const senderIndices = new Array<number>(this.length);
    const senderCounters = new Array<number>(this.length);
    const uniqueNumbers = new Array<number>(this.length);

    let i = 0;
    this.tree.forEach((loc) => {
      let anchorIndex = indexByAnchor.get(loc.anchor);
      if (anchorIndex === undefined) {
        anchorIndex = anchors.length;
        indexByAnchor.set(loc.anchor, anchorIndex);
        anchors.push(this.serializeInternal(loc.anchor, -1));
      }
      anchorIndices[i] = anchorIndex;

      let senderIndex = indexBySender.get(loc.sender);
      if (senderIndex === undefined) {
        senderIndex = senders.length;
        indexBySender.set(loc.sender, senderIndex);
        senders.push(loc.sender);
      }
      senderIndices[i] = senderIndex;

      senderCounters[i] = loc.senderCounter;
      uniqueNumbers[i] = loc.uniqueNumber;

      i++;
    });

    const locs: Uint8Array[] = [];
    this.tree.forEach((loc) => {
      locs.push(this.serialize(loc));
    });
    const message = TreedocDenseLocalListSave.create({
      anchors,
      senders,
      anchorIndices,
      senderIndices,
      senderCounters,
      uniqueNumbers,
    });
    return TreedocDenseLocalListSave.encode(message).finish();
  }

  loadLocs(saveData: Uint8Array, values: (index: number) => T): void {
    const decoded = TreedocDenseLocalListSave.decode(saveData);
    // Since the saved entries are in sorted order, we
    // don't need to do any comparisons to build the tree.
    // For building the tree, we set the tree's _compare
    // equal to one that always says the inserted value
    // is greater than a current value, without actually
    // checking.
    (this.tree as any)._compare = () => 1;
    // Decode anchors and place in anchorCache.
    const anchors = new Array<TreedocLoc>(decoded.anchors.length);
    for (let j = 0; j < anchors.length; j++) {
      anchors[j] = this.deserializeInternal(
        decoded.anchors[j],
        this.runtime
      )[0];
      this.anchorCache.set(arrayAsString(decoded.anchors[j]), anchors[j]);
    }
    for (let i = 0; i < decoded.anchorIndices.length; i++) {
      // Deserialize the i-th loc.
      const loc = new TreedocLocWrapper(
        anchors[decoded.anchorIndices[i]],
        decoded.senders[decoded.senderIndices[i]],
        decoded.senderCounters[i],
        decoded.uniqueNumbers[i]
      );
      // Insert into tree.
      this.tree = this.tree.insert(loc, values(i))[0];
    }
    (this.tree as any)._compare = this.compareWrappers.bind(this);
  }

  leftIndex(loc: TreedocLocWrapper): number {
    return this.tree.gt(loc).index;
  }

  rightIndex(loc: TreedocLocWrapper): number {
    return this.tree.ge(loc).index;
  }

  // Sequence stuff

  // TODO: remove this once the tests no longer need it.
  compare(a: TreedocLoc, b: TreedocLoc): number {
    // Formally, the comparison order is given by a
    // standard tree walk.  The tree's layers alternate
    // between "path layers", with edge label given by
    // path.get(i), and "disambiguator layers", with
    // edge label given by disambiguators.get(first == i).
    // In the case that an id does not have a
    // disambiguator at layer i, it instead implicitly
    // uses a special "bit disambiguator", defined to
    // equal the next path bit (path.get(i+1)), with
    // comparison rules: 0 < sorted disambiguators < 1.
    // The latter point follows from the paper's prose
    // description of the tree walk, but I believe it
    // is mis-stated in the formal definition of the
    // total order.
    // From this description, the order is obviously total.
    // One can also check that the ids generated by
    // createBetween are always indeed between before
    // and after.

    // We start by finding the first difference between
    // either path or disambiguators.
    // 1. path
    let [pathCompare, pathIndex] = BitSet.compare(a.path, b.path);
    // 2. disambiguators
    let [disIndex, aDis, bDis] = this.diffDisambiguators(
      a.disambiguators,
      b.disambiguators
    );

    // The path level at depth i is above the disambiguator
    // level at depth i.  So if pathIndex <= disIndex,
    // compare by path.
    if (pathIndex <= disIndex) return pathCompare;

    // Now disIndex < pathIndex has the first difference.
    // If a node has no disambiguator at disIndex, use
    // its next path bit as its disambiguator,
    // following the rule
    // 0 < sorted disambiguators < 1.
    if (aDis !== undefined && bDis !== undefined) {
      // Compare by aDis and bDis.  We know they're not equal.
      if (aDis.sender < bDis.sender) return -1;
      else if (aDis.sender > bDis.sender) return 1;
      else return aDis.uniqueNumber - bDis.uniqueNumber;
    } else {
      if (aDis === undefined) {
        // 0 < bDis < 1
        return a.path.get(disIndex + 1) ? 1 : -1;
      } else {
        // 0 < aDis < 1
        return b.path.get(disIndex + 1) ? -1 : 1;
      }
    }
  }

  /**
   *
   * @param  a [description]
   * @param  b [description]
   * @return  [first index where differs
   * (Number.MAX_VALUE if identical), a value at index,
   * b value at index].  Present vs not present counts
   * as a difference.
   */
  private diffDisambiguators(
    a: readonly Disambiguator[],
    b: readonly Disambiguator[]
  ): [number, Disambiguator | undefined, Disambiguator | undefined] {
    let i: number;
    for (i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i].index < b[i].index) return [a[i].index, a[i], undefined];
      if (b[i].index < a[i].index) return [b[i].index, undefined, b[i]];
      // Now a[i][0] === b[i][0]
      if (
        !(
          a[i].sender === b[i].sender && a[i].uniqueNumber === b[i].uniqueNumber
        )
      )
        return [a[i].index, a[i], b[i]];
    }
    // At this point, they agree on their prefix,
    // and i = Math.min(a.length, b.length).
    if (a.length === b.length) {
      // Identical
      return [Number.MAX_VALUE, undefined, undefined];
    }
    // One has an entry at i while the other doesn't.
    // That is the first disagreement.
    if (i < a.length) return [a[i].index, a[i], undefined];
    else return [b[i].index, undefined, b[i]];
  }

  private compareWrappers(a: TreedocLocWrapper, b: TreedocLocWrapper): number {
    // We start by finding the first difference between
    // either path or disambiguators.
    // 1. path
    let [pathCompare, pathIndex] = BitSet.compare(a.anchor.path, b.anchor.path);
    // 2. disambiguators
    let [disIndex, aDis, bDis] = this.diffDisambiguatorsWrappers(
      a.anchor.disambiguators,
      {
        sender: a.sender,
        uniqueNumber: a.uniqueNumber,
        index: a.anchor.path.length - 1,
      },
      b.anchor.disambiguators,
      {
        sender: b.sender,
        uniqueNumber: b.uniqueNumber,
        index: b.anchor.path.length - 1,
      }
    );

    // The path level at depth i is above the disambiguator
    // level at depth i.  So if pathIndex <= disIndex,
    // compare by path.
    if (pathIndex <= disIndex) return pathCompare;

    // Now disIndex < pathIndex has the first difference.
    // If a node has no disambiguator at disIndex, use
    // its next path bit as its disambiguator,
    // following the rule
    // 0 < sorted disambiguators < 1.
    if (aDis !== undefined && bDis !== undefined) {
      // Compare by aDis and bDis.  We know they're not equal.
      if (aDis.sender < bDis.sender) return -1;
      else if (aDis.sender > bDis.sender) return 1;
      else return aDis.uniqueNumber - bDis.uniqueNumber;
    } else {
      if (aDis === undefined) {
        // 0 < bDis < 1
        return a.anchor.path.get(disIndex + 1) ? 1 : -1;
      } else {
        // 0 < aDis < 1
        return b.anchor.path.get(disIndex + 1) ? -1 : 1;
      }
    }
  }

  private diffDisambiguatorsWrappers(
    a: readonly Disambiguator[],
    lastA: Disambiguator,
    b: readonly Disambiguator[],
    lastB: Disambiguator
  ): [number, Disambiguator | undefined, Disambiguator | undefined] {
    let i: number;
    for (i = 0; i < Math.min(a.length + 1, b.length + 1); i++) {
      let ai = i === a.length ? lastA : a[i];
      let bi = i === b.length ? lastB : b[i];
      if (ai.index < bi.index) return [ai.index, ai, undefined];
      if (bi.index < ai.index) return [bi.index, undefined, bi];
      // Now ai[0] === bi[0]
      if (!(ai.sender === bi.sender && ai.uniqueNumber === bi.uniqueNumber))
        return [ai.index, ai, bi];
    }
    // At this point, they agree on their prefix,
    // and i = Math.min(a.length + 1, b.length + 1).
    let ai = i === a.length ? lastA : a[i];
    let bi = i === b.length ? lastB : b[i];
    if (a.length === b.length) {
      // Identical
      return [Number.MAX_VALUE, undefined, undefined];
    }
    // One has an entry at i while the other doesn't.
    // That is the first disagreement.
    if (i < a.length + 1) return [ai.index, ai, undefined];
    else return [bi.index, undefined, bi];
  }

  // TODO: remove this once it is no longer needed for tests
  createBetween(
    before: TreedocLoc | null,
    after: TreedocLoc | null,
    count: number
  ): TreedocLoc[] {
    return this.expandOriginal(
      this.createBetweenSpecial(before, after, count),
      count
    );
  }

  // TODO: remove this once it is no longer needed for tests
  private expandOriginal(startingId: TreedocLoc, count: number): TreedocLoc[] {
    let ans = new Array<TreedocLoc>(count);
    let uniqueNumber =
      startingId.disambiguators[startingId.disambiguators.length - 1]
        .uniqueNumber;
    let sign = uniqueNumber >= 0 ? 1 : -1;
    for (let i = 0; i < count; i++) {
      let iPath = BitSet.copy(startingId.path, startingId.path.length);
      // Set new leaf disambiguator.
      // We rely on the fact that getReplicaUniqueNumber
      // is increasing.
      let iDisambiguators = startingId.disambiguators.slice();
      let lastDis =
        startingId.disambiguators[startingId.disambiguators.length - 1];
      iDisambiguators[iDisambiguators.length - 1] = {
        ...lastDis,
        uniqueNumber: sign * (Math.abs(uniqueNumber) + i),
      };
      ans[i] = new TreedocLoc(iPath, iDisambiguators, startingId.senderCounter);
    }
    if (sign === -1) ans.reverse();
    return ans;
  }

  private expand(
    startingId: TreedocLoc,
    count: number,
    senderCounter: number
  ): TreedocLocWrapper[] {
    let ans = new Array<TreedocLocWrapper>(count);
    let uniqueNumber =
      startingId.disambiguators[startingId.disambiguators.length - 1]
        .uniqueNumber;
    ans[0] = TreedocLocWrapper.from(startingId, this, senderCounter);
    let sign = uniqueNumber >= 0 ? 1 : -1;
    for (let i = 1; i < count; i++) {
      ans[i] = new TreedocLocWrapper(
        ans[0].anchor,
        ans[0].sender,
        senderCounter,
        sign * (Math.abs(uniqueNumber) + i)
      );
    }
    if (sign === -1) ans.reverse();
    return ans;
  }

  private createBetweenSpecial(
    before: TreedocLoc | null,
    after: TreedocLoc | null,
    count: number
  ): TreedocLoc {
    // Consider the tree model described in compare.
    // To create between after and before, we first need
    // to find their lowest common ancestor in the tree.
    // We then need to extend the path to the common
    // ancestor with a path that is between before and
    // after.
    //
    // If before is non-null and is not equal to the LCA,
    // then we can do this by following before for one
    // more nontrivial edge (nontrivial means that empty
    // disambiguators don't count),
    // then using exclusively rightmost edges
    // (1 bits, and 1 bit disambiguators implied by a
    // following 1 bit) until
    // we end up with something greater than before.
    // (Actually, if after is null, we can skip the first
    // nontrivial edge and just use rightmost edges.)
    //
    // Likewise with before and after switched
    // (also 1 -> 0).
    // We use whichever result is shorter.
    //
    // Finally, we end with a fresh disambiguator, so
    // that all insertions are unique.

    let path: BitSet;
    let disambiguators: Disambiguator[] = [];
    let uniqueNumberSign: 1 | -1 = 1;

    if (before === null && after === null) {
      // They are both null, so we can create any identifier.
      // Since we need to include a disambiguator layer
      // but a bit layer is always first,
      // we arbitrarily put 0 in the first bit layer.
      path = new BitSet(1);
    } else if (after === null) {
      const lastDis = before!.disambiguators[before!.disambiguators.length - 1];
      if (lastDis.sender === this.runtime.replicaId) {
        // before is ours; use it again but with
        // the next (larger) uniqueNumber.
        path = BitSet.copy(before!.path, before!.path.length);
        disambiguators = before!.disambiguators.slice(0, -1);
        // Last disambiguator is added at the end
      } else {
        // Use enough 1 bits to make something greater
        // than before.
        const end = before!.path.nextNot(true, 0);
        path = new BitSet(end + 1);
        path.setToEnd(0, true);
      }
    } else if (before === null) {
      const lastDis = after!.disambiguators[after!.disambiguators.length - 1];
      if (lastDis.sender === this.runtime.replicaId) {
        // after is ours; use it again but with
        // the next (larger) uniqueNumber, negated so
        // it is before.
        path = BitSet.copy(after!.path, after!.path.length);
        disambiguators = after!.disambiguators.slice(0, -1);
        uniqueNumberSign = -1;
        // Last disambiguator is added at the end
      } else {
        // Use enough 0 bits to make something les
        // than after.
        const end = after.path.nextNot(false, 0);
        path = new BitSet(end + 1);
        path.setToEnd(0, false);
      }
    } else {
      // Find the first layer where they differ
      let isBitLayer: boolean;
      let firstDiff: number;
      const [_, bitFirstDiff] = BitSet.compare(before.path, after.path);
      const [disFirstDiff, beforeDis, afterDis] = this.diffDisambiguators(
        before.disambiguators,
        after.disambiguators
      );
      if (bitFirstDiff <= disFirstDiff) {
        isBitLayer = true;
        firstDiff = bitFirstDiff;
      } else {
        isBitLayer = false;
        firstDiff = disFirstDiff;
      }

      // If one of them by us, and the other is not
      // (the same up to the first one's last disambiguator
      // which has the same author), then reuse the one
      // just with a different number.
      const beforeLastDis =
        before.disambiguators[before.disambiguators.length - 1];
      const afterLastDis =
        after.disambiguators[after.disambiguators.length - 1];
      if (
        beforeLastDis.sender === this.runtime.replicaId &&
        (firstDiff < before.path.length - 1 ||
          (firstDiff === before.path.length - 1 && isBitLayer) ||
          (firstDiff === before.path.length - 1 &&
            !isBitLayer &&
            (afterDis === undefined ||
              afterDis.sender !== this.runtime.replicaId)))
      ) {
        // use before again but with
        // the next (larger) uniqueNumber.
        path = BitSet.copy(before!.path, before!.path.length);
        disambiguators = before!.disambiguators.slice(0, -1);
        // Last disambiguator is added at the end
      } else if (
        afterLastDis.sender === this.runtime.replicaId &&
        (firstDiff < after.path.length - 1 ||
          (firstDiff === after.path.length - 1 && isBitLayer) ||
          (firstDiff === after.path.length - 1 &&
            !isBitLayer &&
            (beforeDis === undefined ||
              beforeDis.sender !== this.runtime.replicaId)))
      ) {
        // use after again but with
        // the next (larger) uniqueNumber, negated.
        path = BitSet.copy(after!.path, after!.path.length);
        disambiguators = after!.disambiguators.slice(0, -1);
        uniqueNumberSign = -1;
        // Last disambiguator is added at the end
      } else {
        // To build the answer, we start by setting
        // (path, disambiguators) to the LCA, i.e.,
        // we copy the layers up to but excluding
        // the first difference.
        path = BitSet.copy(before.path, firstDiff + (isBitLayer ? 0 : 1));
        for (let i = 0; i < before.disambiguators.length; i++) {
          if (before.disambiguators[i].index >= firstDiff) break;
          disambiguators.push(before.disambiguators[i]);
        }

        // Since both must end with disambiguator layers, one
        // is a prefix of the other iff the first difference
        // is the bit layer after the shorter length.
        let prefix: TreedocLoc | null;
        if (isBitLayer && firstDiff === before.path.length) {
          prefix = before;
        } else if (isBitLayer && firstDiff === after.path.length) {
          prefix = after;
        } else prefix = null;

        // Next, if prefix !== before, one option is to
        // follow before for one more nontrivial edge, then keep
        // adding 1 bits until we get something > before.
        // If prefix !== after, a second option is to follow
        // after for one more nontrivial edge, then keep adding 0 bits
        // until we get something < after.
        // We choose whichever is shorter.
        // TODO: penalize starting disambiguators?
        let beforeInfo: [number, boolean, number, number] | null = null;
        if (prefix !== before) {
          beforeInfo = this.bitRange(
            isBitLayer,
            firstDiff,
            beforeDis,
            before,
            true
          );
        }
        let afterInfo: [number, boolean, number, number] | null = null;
        if (prefix !== after) {
          afterInfo = this.bitRange(
            isBitLayer,
            firstDiff,
            afterDis,
            after,
            false
          );
        }

        if (
          beforeInfo !== null &&
          (afterInfo === null || beforeInfo[3] <= afterInfo[3])
        ) {
          // Attach to before.
          // Copy before's next nontrivial layer
          // (ref'd by beforeInfo[0], beforeInfo[1]),
          // then add 1s through beforeInfo[2].
          path = BitSet.copy(before!.path, beforeInfo[2] + 1);
          if (beforeInfo[1]) {
            // The next nontrivial layer is a bit layer
            path.set(beforeInfo[0], before!.path.get(beforeInfo[0]));
          } else {
            // The next nontrivial layer is the disagreeing
            // disambiguator layer.
            disambiguators.push(beforeDis!);
          }
          path.setToEnd(beforeInfo[0] + 1, true);
        } else {
          // Attach to after.
          path = BitSet.copy(after!.path, afterInfo![2] + 1);
          if (afterInfo![1]) {
            // The next nontrivial layer is a bit layer
            path.set(afterInfo![0], after!.path.get(afterInfo![0]));
          } else {
            // The next nontrivial layer is the disagreeing
            // disambiguator layer.
            disambiguators.push(afterDis!);
          }
          path.setToEnd(afterInfo![0] + 1, false);
        }
      }
    }

    // Make one new id using path, disambiguators (plus
    // final disambiguator)
    let ans = new TreedocLoc(path, [
      ...disambiguators,
      {
        index: path.length - 1,
        sender: this.runtime.replicaId,
        uniqueNumber:
          uniqueNumberSign * this.runtime.getReplicaUniqueNumber(count),
      },
    ]);

    // TODO: debug mode only
    // Check between-ness
    /*let newId = ans;
  if (
    (before !== null && this.compare(before, newId) >= 0) ||
    (after !== null && this.compare(newId, after) >= 0)
  ) {
    console.log("Error: newId out of order");
    console.log(JSON.stringify(this.runtime.replicaId));
    console.log(
      util.inspect(before, {
        depth: null,
        maxArrayLength: null,
        maxStringLength: null,
        colors: true,
      })
    );
    console.log(
      util.inspect(newId, {
        depth: null,
        maxArrayLength: null,
        maxStringLength: null,
        colors: true,
      })
    );
    console.log(
      util.inspect(after, {
        depth: null,
        maxArrayLength: null,
        maxStringLength: null,
        colors: true,
      })
    );
    if (before !== null) console.log(this.compare(before, newId));
    if (after !== null) console.log(this.compare(newId, after));
    if (before !== null && after !== null)
      console.log(this.compare(before, after));
    throw new Error("newId out of order");
  }*/

    return ans;
  }

  /**
   * Determines how may direction bits you need to make
   * an id in the desired direction of the given id,
   * using (isBitLayer, firstDiff) as the LCA layer.
   * Returns: [next nontrivial edge index, next nontrivial
   * edge is bit, end index, score]
   */
  private bitRange(
    isBitLayer: boolean,
    firstDiff: number,
    dis: Disambiguator | undefined,
    id: TreedocLoc,
    direction: boolean
  ): [number, boolean, number, number] {
    // Find before's next
    // nontrivial edge.
    let nontrivialIsBit: boolean;
    let nontrivial: number;
    if (isBitLayer) {
      nontrivialIsBit = true;
      nontrivial = firstDiff;
    } else if (dis !== undefined) {
      nontrivialIsBit = false;
      nontrivial = firstDiff;
    } else {
      nontrivialIsBit = true;
      nontrivial = firstDiff + 1;
    }

    // We can stop either at id's next non-1 bit
    // or after its next nontrivial disambiguator
    // (starting at layer nontrivial, exclusive).
    let end = id.path.nextNot(direction, nontrivial + 1);
    for (let { index } of id.disambiguators) {
      if (index + 1 >= end) break;
      if (nontrivialIsBit && index >= nontrivial) {
        end = index + 1;
        break;
      } else if (!nontrivialIsBit && index > nontrivial) {
        end = index + 1;
        break;
      }
    }
    // Score: if the nontrivial layer would be a
    // disambiguator layer, count it as a number of bits
    // equal to the disambiguator's bit length.
    return [
      nontrivial,
      nontrivialIsBit,
      end,
      end + (nontrivialIsBit ? 0 : dis!.sender.length * 8),
    ];
  }

  /**
   * Note: works with non-proper TreedocLocs (last layer
   * is not a disambiguator layer).
   */
  serializeInternal(value: TreedocLoc, senderCounter: number): Uint8Array {
    // Compress repeated senders in disambiguators
    const disSendersIndex: string[] = [];
    // TODO: borrow this map from runtime/cbcast?
    const disSenderIndexMap = new Map<string, number>();
    const disSenders: number[] = [];
    for (const dis of value.disambiguators) {
      let index = disSenderIndexMap.get(dis.sender);
      if (index === undefined) {
        index = disSendersIndex.length;
        disSendersIndex.push(dis.sender);
        disSenderIndexMap.set(dis.sender, index);
      }
      disSenders.push(index);
    }
    let message = TreedocLocMessage.create({
      path: value.path.serialize(),
      disIndices: value.disambiguators.map((elem) => elem.index),
      disSendersIndex,
      disSenders,
      disUniqueNumbers: value.disambiguators.map((elem) => elem.uniqueNumber),
      senderCounter: senderCounter === -1 ? undefined : senderCounter,
    });
    return TreedocLocMessage.encode(message).finish();
  }

  /**
   * Note: works with non-proper TreedocLocs (last layer
   * is not a disambiguator layer).
   */
  deserializeInternal(
    message: Uint8Array,
    _runtime: Runtime
  ): [loc: TreedocLoc, senderCounter: number] {
    let decoded = TreedocLocMessage.decode(message);
    let path = BitSet.deserialize(decoded.path);
    let disambiguators: Disambiguator[] = [];
    for (let i = 0; i < decoded.disIndices.length; i++) {
      disambiguators.push({
        index: decoded.disIndices[i],
        sender: decoded.disSendersIndex[decoded.disSenders[i]],
        uniqueNumber: decoded.disUniqueNumbers[i],
      });
    }
    return [new TreedocLoc(path, disambiguators), decoded.senderCounter];
  }

  serialize(value: TreedocLocWrapper): Uint8Array {
    return value.serialize(this);
  }

  deserialize(message: Uint8Array, _runtime: Runtime): TreedocLocWrapper {
    return TreedocLocWrapper.deserialize(message, this);
  }
}

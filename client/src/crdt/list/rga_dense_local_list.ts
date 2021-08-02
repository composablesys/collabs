import {
  IRgaDenseLocalListSave,
  IRgaLocMessage,
  RgaDenseLocalListPrepareMessage,
  RgaDenseLocalListSave,
  RgaLocMessage,
} from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import { createRBTree, RBTree, WeakValueMap } from "../../util";
import { Runtime } from "../core";
import { DenseLocalList } from "./dense_local_list";

// TODO: helper that uses an RBTree and implements everything
// except the loc specific methods (stuff below comment
// in this class), as an abstract DenseLocalList?

// TODO: hide inner vars except from RgaDenseLocalList?
// (package access)
/**
 * Note: within a replica, all RgaLoc's have a unique
 * object.  So object equality is value equality.  TODO (enforce during deserialization)
 */
export class RgaLoc {
  /**
   * The number of nontrivial ancestors.  In particular,
   * 0 iff parent is undefined.
   */
  readonly depth: number;
  /**
   * @param param uniqueNumber An integer, but possibly negative.
   */
  constructor(
    readonly parent: RgaLoc | undefined,
    readonly sender: string,
    readonly uniqueNumber: number,
    denseLocalList: RgaDenseLocalList<any>
  ) {
    this.depth = parent == undefined ? 0 : parent.depth + 1;
    denseLocalList.storeNewLoc(this);
  }

  toString(): string {
    let ans = "[";
    for (
      let current: RgaLoc | undefined = this;
      current !== undefined;
      current = current.parent
    ) {
      ans += `[${this.sender}, ${this.uniqueNumber}]`;
    }
    ans += "]";
    return ans;
  }
}

// TODO: tombstone version?  (canGc false after any ops;
// send last two ids instead of whole path).
export class RgaDenseLocalList<T> implements DenseLocalList<RgaLoc, T> {
  runtime!: Runtime;
  private tree: RBTree<RgaLoc, T>;

  constructor() {
    this.tree = createRBTree(this.compare.bind(this));
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

  set(loc: RgaLoc, value: T): number {
    let index: number;
    [this.tree, index] = this.tree.insert(loc, value, true);
    return index;
  }

  delete(loc: RgaLoc): [index: number, deletedValue: T] | undefined {
    let ret: [number, T] | undefined;
    [this.tree, ret] = this.tree.remove(loc);
    return ret;
  }

  get(index: number): T {
    this.checkIndex(index);
    return this.tree.at(index).value!;
  }

  getLoc(index: number): RgaLoc {
    this.checkIndex(index);
    return this.tree.at(index).key!;
  }

  get length(): number {
    return this.tree.length;
  }

  indexOf(loc: RgaLoc): number | undefined {
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

  *locs(): IterableIterator<RgaLoc> {
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

  idOf(loc: RgaLoc): [sender: string, uniqueNumber: number] {
    return [loc.sender, loc.uniqueNumber];
  }

  leftIndex(loc: RgaLoc): number {
    return this.tree.gt(loc).index;
  }

  rightIndex(loc: RgaLoc): number {
    return this.tree.ge(loc).index;
  }

  canGc(): boolean {
    // TODO: will this work if there are dangling references
    // to RgaLocs?  Likewise with Treedoc.
    return this.length === 0;
  }

  // RGA specific methods

  // TODO: in PrimitiveCList, use this in place of
  // PrimitiveCList's copy.
  /**
   * Maps from sender & uniqueCounter to RgaLoc.
   *
   * Inner WeakValueMaps + onempty are used to ensure
   * that no-longer-referenced locs are cleared
   * from locsById, as are empty inner WeakValueMaps.
   */
  private readonly locsById = new Map<string, WeakValueMap<number, RgaLoc>>();
  /**
   * Internal use by RgaLoc's constructor only.
   *
   * TODO: can we make this not public but still accessible
   * by RgaLoc?
   */
  storeNewLoc(loc: RgaLoc): void {
    let senderMap = this.locsById.get(loc.sender);
    if (senderMap === undefined) {
      senderMap = new WeakValueMap();
      senderMap.onempty = this.senderMapOndelete;
      senderMap.onemptyHeldValue = loc.sender;
      this.locsById.set(loc.sender, senderMap);
    }
    senderMap.set(loc.uniqueNumber, loc);
  }

  /**
   * Use a lambda so that `this` is bound to this object.
   */
  private senderMapOndelete = (
    _caller: WeakValueMap<number, RgaLoc>,
    sender: string
  ) => {
    this.locsById.delete(sender);
  };

  private getLocById(sender: string, uniqueNumber: number): RgaLoc | undefined {
    return this.locsById.get(sender)?.get(uniqueNumber);
  }

  prepareNewLocs(index: number, count: number): Uint8Array {
    const [parent, uniqueNumberStart] = this.getNewLocsArgs(index, count);
    const message = RgaDenseLocalListPrepareMessage.create({
      parent:
        parent === undefined ? undefined : this.serializeAsMessage(parent),
      uniqueNumberStart,
    });
    return RgaDenseLocalListPrepareMessage.encode(message).finish();
  }

  receiveNewLocs(
    message: Uint8Array,
    timestamp: CausalTimestamp,
    values: ArrayLike<T>
  ): [index: number, locs: RgaLoc[]] {
    const decoded = RgaDenseLocalListPrepareMessage.decode(message);
    const parent = decoded.hasOwnProperty("parent")
      ? this.deserializeAsMessage(
          RgaLocMessage.create(decoded.parent!),
          this.runtime
        )
      : undefined;
    const locs = this.expandNewLocArgs(
      parent,
      timestamp.getSender(),
      decoded.uniqueNumberStart,
      values.length
    );

    // Insert locs & values.
    let index: number;
    for (let i = 0; i < values.length; i++) {
      let indexI: number;
      [this.tree, indexI] = this.tree.insert(locs[i], values[i]);
      if (i === 0) index = indexI;
    }
    return [index!, locs];
  }

  createNewLocs(index: number, count: number): RgaLoc[] {
    const [parent, uniqueNumberStart] = this.getNewLocsArgs(index, count);
    return this.expandNewLocArgs(
      parent,
      this.runtime.replicaId,
      uniqueNumberStart,
      count
    );
  }

  /**
   * Returns arguments (namely, parent and uniqueNumberStart)
   * that, when passed to expandNewLocsArgs with the
   * same value of count and with sender = this.runtime.replicaId,
   * yield count new locs at the given index.
   *
   * @param  index [description]
   * @param  count [description]
   * @return       [description]
   */
  private getNewLocsArgs(
    index: number,
    count: number
  ): [parent: RgaLoc | undefined, uniqueNumberStart: number] {
    // TODO: get both left and right with a single tree lookup
    // in the common case.
    const left = index === 0 ? undefined : this.getLoc(index - 1);
    const right = index === this.length ? undefined : this.getLoc(index);

    // Determine the origin.  The rule is:
    // - if right is a descendant of left, then origin =
    // right; else origin = left (possibly undefined).
    // In particular, if left is undefined (indicating the
    // root of the tree) and right is not, then right is
    // a descendant of left, hence origin = right.
    let isLeft = true;
    if (right !== undefined) {
      if (left === undefined) isLeft = false;
      else if (right.depth > left.depth) {
        // Find right's ancestor at the same level as left.
        let rightAncestor = right;
        for (let i = right.depth; i > left.depth; i--) {
          rightAncestor = rightAncestor.parent!;
        }
        if (rightAncestor === left) isLeft = false;
      }
    }
    const origin = isLeft ? left : right;
    const sign = isLeft ? 1 : -1;
    // Create the new locs as inside children of origin.
    // Except, if origin has the same sender and sign as
    // the new locs are going to have, we can optimize by
    // making them a sibling, unless this would cause them
    // to not be between left and right.
    let parent = origin;
    if (
      origin !== undefined &&
      origin.sender === this.runtime.replicaId &&
      Math.sign(origin.uniqueNumber) === sign
    ) {
      // Same sender and sign.
      // Check whether making the new locs a sibling of
      // of origin would still be on the correct side of
      // the non-origin.  This can fail if the
      // non-origin is descended from a loc which is
      // also a sibling of origin with the same sender and
      // sign.
      const nonOrigin = isLeft ? right : left;
      if (nonOrigin === undefined || nonOrigin.depth < origin.depth) {
        parent = origin.parent;
      } else {
        // Find the ancestor of nonOrigin at the same depth
        // as origin.
        // TODO: this repeats work when origin = left
        // (the common case).
        let nonOriginAnc = nonOrigin;
        for (let i = nonOrigin.depth; i > origin.depth; i--) {
          nonOriginAnc = nonOriginAnc.parent!;
        }
        // Check if it is a sibling of origin with the same
        // sender and sign.  If not, we can be siblings
        // of origin.
        if (
          !(
            nonOriginAnc.parent === origin.parent &&
            nonOriginAnc.sender === origin.sender &&
            Math.sign(nonOriginAnc.uniqueNumber) ===
              Math.sign(origin.uniqueNumber)
          )
        ) {
          parent = origin.parent;
        }
      }
    }
    // Add 1 to this so it's always positive.  TODO: in
    // Runtime, guarantee nonnegative (or positive, and
    // then remove the +1 here).
    const uniqueNumberStart =
      sign * (this.runtime.getReplicaUniqueNumber(count) + 1);
    return [parent, uniqueNumberStart];
  }

  /**
   * See getNewLocArgs.  Results are in order from
   * left to right.
   * @param  parent            [description]
   * @param  sender            [description]
   * @param  uniqueNumberStart [description]
   * @param  count             [description]
   * @return                   [description]
   */
  private expandNewLocArgs(
    parent: RgaLoc | undefined,
    sender: string,
    uniqueNumberStart: number,
    count: number
  ): RgaLoc[] {
    const sign = Math.sign(uniqueNumberStart);
    const ans = new Array<RgaLoc>(count);
    for (let i = 0; i < count; i++) {
      // uniqueNumber's start at uniqueNumberStart and
      // increase in magnitude.  So when it is positive,
      // we create locs left to right, else right to left.
      const index = sign === 1 ? i : count - i - 1;
      ans[index] = new RgaLoc(
        parent,
        sender,
        uniqueNumberStart + sign * i,
        this
      );
    }
    return ans;
  }

  saveLocs(): Uint8Array {
    // Make a map from locs to their indices.
    const indexByLoc = new Map<RgaLoc, number>();
    let j = 0;
    this.tree.forEach((loc) => {
      indexByLoc.set(loc, j);
      j++;
    });
    // Serialize all locs in order, with extra locs
    // (ancestors that are not part of the current key set)
    // appended to the end as needed.
    const indexBySender = new Map<string, number>();
    const imessage: IRgaDenseLocalListSave = {
      senders: [],
      parents: new Array<number>(this.tree.length),
      senderIndices: new Array<number>(this.tree.length),
      uniqueNumbers: new Array<number>(this.tree.length),
      length: this.tree.length,
    };
    let i = 0;
    this.tree.forEach((loc) => {
      this.saveOneLoc(i, loc, imessage, indexByLoc, indexBySender);
      i++;
    });
    // Serialize imessage.
    const message = RgaDenseLocalListSave.create(imessage);
    return RgaDenseLocalListSave.encode(message).finish();
  }

  private saveOneLoc(
    index: number,
    loc: RgaLoc,
    imessage: IRgaDenseLocalListSave,
    indexByLoc: Map<RgaLoc, number>,
    indexBySender: Map<string, number>
  ) {
    // Save loc except for its parent index.
    let senderIndex = indexBySender.get(loc.sender);
    if (senderIndex === undefined) {
      senderIndex = imessage.senders!.length;
      indexBySender.set(loc.sender, senderIndex);
      imessage.senders!.push(loc.sender);
    }
    imessage.senderIndices![index] = senderIndex;
    imessage.uniqueNumbers![index] = loc.uniqueNumber;
    // Save loc's parent, first saving parent (and its parent,
    // etc. recursively) if needed.
    if (loc.parent === undefined) {
      imessage.parents![index] = 0;
    } else {
      let parentIndex = indexByLoc.get(loc.parent);
      if (parentIndex === undefined) {
        // Save parent to the end of the lists.
        // Note that when parent's saveOneLoc call sets
        // indices at the end of the arrays, this
        // automatically increases the arrays' lengths
        // by 1, as if we had called push().
        parentIndex = imessage.senderIndices!.length;
        indexByLoc.set(loc.parent, parentIndex);
        imessage.parents![index] = parentIndex + 1;
        this.saveOneLoc(
          parentIndex,
          loc.parent,
          imessage,
          indexByLoc,
          indexBySender
        );
      } else {
        imessage.parents![index] = parentIndex + 1;
      }
    }
  }

  loadLocs(saveData: Uint8Array, values: (index: number) => T): void {
    const decoded = RgaDenseLocalListSave.decode(saveData);
    // Since the saved entries are in sorted order, we
    // don't need to do any comparisons to build the tree.
    // For building the tree, we set the tree's _compare
    // equal to one that always says the inserted value
    // is greater than a current value, without actually
    // checking.
    (this.tree as any)._compare = () => 1;
    // Decode locs, putting the first decoded.length of
    // them into the tree in order.
    for (let i = 0; i < decoded.length; i++) {
      const loc = this.loadOneLoc(i, decoded);
      this.tree = this.tree.insert(loc, values(i))[0];
    }
    (this.tree as any)._compare = this.compare.bind(this);
  }

  private loadOneLoc(index: number, decoded: RgaDenseLocalListSave): RgaLoc {
    // See if loc is already constructed.
    const existingLoc = this.getLocById(
      decoded.senders[decoded.senderIndices[index]],
      decoded.uniqueNumbers[index]
    );
    if (existingLoc !== undefined) return existingLoc;
    // Construct the loc stored at index in decoded,
    // first constructing its parent (etc. recursively)
    // if needed.
    let parent: RgaLoc | undefined;
    if (decoded.parents[index] === 0) {
      parent = undefined;
    } else {
      const parentIndex = decoded.parents[index] - 1;
      parent = this.getLocById(
        decoded.senders[decoded.senderIndices[parentIndex]],
        decoded.uniqueNumbers[parentIndex]
      );
      if (parent === undefined) {
        // Need to load it first.  Note constructing it is
        // enough to place it in the stored loc cache, for
        // future getLocById lookups.
        parent = this.loadOneLoc(parentIndex, decoded);
      }
    }
    return new RgaLoc(
      parent,
      decoded.senders[decoded.senderIndices[index]],
      decoded.uniqueNumbers[index],
      this
    );
  }

  serialize(value: RgaLoc): Uint8Array {
    const message = RgaLocMessage.create(this.serializeAsMessage(value));
    return RgaLocMessage.encode(message).finish();
  }

  private serializeAsMessage(value: RgaLoc): IRgaLocMessage {
    const indexBySender = new Map<string, number>();
    const senders: string[] = [];

    const senderIndices: number[] = [];
    const uniqueNumbers: number[] = [];
    for (
      let currentLoc: RgaLoc | undefined = value;
      currentLoc !== undefined;
      currentLoc = currentLoc.parent
    ) {
      let senderIndex = indexBySender.get(currentLoc.sender);
      if (senderIndex === undefined) {
        senderIndex = senders.length;
        indexBySender.set(currentLoc.sender, senderIndex);
        senders.push(currentLoc.sender);
      }
      senderIndices.push(senderIndex);
      uniqueNumbers.push(currentLoc.uniqueNumber);
    }

    return {
      senders,
      senderIndices,
      uniqueNumbers,
    };
  }

  deserialize(message: Uint8Array, runtime: Runtime): RgaLoc {
    const decoded = RgaLocMessage.decode(message);
    return this.deserializeAsMessage(decoded, runtime);
  }

  private deserializeAsMessage(
    decoded: RgaLocMessage,
    _runtime: Runtime
  ): RgaLoc {
    let i: number;
    let existing: RgaLoc | undefined = undefined;
    // Find the lowest ancestor that we already have.
    for (i = 0; i < decoded.senderIndices.length; i++) {
      existing = this.getLocById(
        decoded.senders[decoded.senderIndices[i]],
        decoded.uniqueNumbers[i]
      );
      if (existing !== undefined) break;
    }
    // Now create descendants of existing going backwards
    // through the list.
    let currentLoc = existing;
    for (let j = i - 1; j >= 0; j--) {
      currentLoc = new RgaLoc(
        currentLoc,
        decoded.senders[decoded.senderIndices[j]],
        decoded.uniqueNumbers[j],
        this
      );
    }
    return currentLoc!;
  }

  private compare(a: RgaLoc, b: RgaLoc): number {
    // 1. Follow the lower (greater depth) one upwards
    // until we get ancestors with the same depth.
    let aAnc = a;
    let bAnc = b;
    // aPrev is maintained as the "a" child of
    // aAnc (undefined if aAnc === a).
    let aPrev = undefined;
    let bPrev = undefined;
    if (a.depth > b.depth) {
      for (let i = a.depth; i > b.depth; i--) {
        aPrev = aAnc;
        aAnc = aAnc.parent!;
      }
    } else if (b.depth > a.depth) {
      for (let i = b.depth; i > a.depth; i--) {
        bPrev = bAnc;
        bAnc = bAnc.parent!;
      }
    }
    // 2. Find the lowest (greatest depth) common
    // ancestor.
    let i: number;
    for (i = aAnc.depth; i >= 0; i--) {
      if (aAnc === bAnc) break;
      aPrev = aAnc;
      bPrev = bAnc;
      // TODO: this ! is improper, but it's okay
      // because it's not consulted.
      aAnc = aAnc.parent!;
      bAnc = bAnc.parent!;
    }
    // 3. Compare aPrev to bPrev as siblings.
    // Rules:
    // - If equal, equal
    // - undefined < positive uniqueNumber
    // - negative uniqueNumber < undefined
    // - compare by uniqueNumber
    // - break ties by sender
    if (aPrev === bPrev) return 0;
    else if (aPrev === undefined) {
      return -bPrev!.uniqueNumber;
    } else if (bPrev === undefined) {
      return aPrev.uniqueNumber;
    } else if (aPrev.uniqueNumber !== bPrev.uniqueNumber) {
      return aPrev.uniqueNumber - bPrev.uniqueNumber;
    } else if (aPrev.sender < bPrev.sender) {
      return -1;
    } else {
      return 1;
    }
  }
}

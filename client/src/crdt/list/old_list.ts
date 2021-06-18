import {
  CompositeCrdt,
  Crdt,
  CrdtEvent,
  CrdtEventsRecord,
  CrdtParent,
  PrimitiveCrdt,
  Runtime,
} from "../core";
import { Resettable } from "../helper_crdts";
import {
  DefaultElementSerializer,
  ElementSerializer,
  createRBTree,
  RBTree,
  TextSerializer,
  TextArraySerializer,
  WeakValueMap,
  arrayAsString,
} from "../../util";
import { RiakCrdtMap } from "../map";
import {
  PrimitiveListMessage,
  TreedocIdMessage,
} from "../../../generated/proto_compiled";
import { BitSet } from "../../util/bitset";
import { CausalTimestamp } from "../../net";
// TODO: debug mode only (node only)
// import util from "util";

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
export interface ISequenceSource<I> extends ElementSerializer<I> {
  setRuntime(runtime: Runtime): void;
  readonly runtime: Runtime;

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
   * from Runtime.getUniqueId(), which can be used as
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
  implements Resettable
{
  private readonly valueMap: RiakCrdtMap<I, C>;
  // Note this is a persistent (immutable) data structure.
  private sortedKeys: RBTree<I, true>;
  constructor(
    private readonly sequenceSource: ISequenceSource<I>,
    valueConstructor: (seqId: I) => C
  ) {
    super();
    this.valueMap = this.addChild(
      "",
      new RiakCrdtMap<I, C>(valueConstructor, this.sequenceSource)
    );
    this.sortedKeys = createRBTree(
      this.sequenceSource.compare.bind(sequenceSource)
    );
    // Catch map key events and adjusting sortedKeys
    // accordingly, so that its key set always coincides
    // with valueMap's.
    this.valueMap.on("KeyAdd", (event) => {
      // Add the key if it is not present
      let index: number;
      [this.sortedKeys, index] = this.sortedKeys.insert(event.key, true, true);
      // // TODO: debug mode only
      // const indexDebug = this.sortedKeys.find(event.key)!.index;
      // if (index !== indexDebug) {
      //   throw new Error(`index was wrong: ${index}, ${indexDebug}`);
      // }
      // TODO: event, but only if actually inserted.
      // Need to add an extra return value to insert.
    });
    this.valueMap.on("KeyDelete", (event) => {
      [this.sortedKeys] = this.sortedKeys.remove(event.key);
      // TODO: event
    });
    // TODO: In tests, add assertions checking
    // size equality constantly.
  }

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);
    this.sequenceSource.setRuntime(this.runtime);
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

  getAt(index: number): C {
    return this.getId(this.idAt(index))!;
  }

  hasId(seqId: I): boolean {
    return this.valueMap.has(seqId);
  }

  hasAt(index: number): boolean {
    return !(index < 0 || index >= this.length);
  }

  // TODO: hide access if not persistent?
  // Also given that this is our forked version, not
  // the importable one.
  idsAsTree(): RBTree<I, true> {
    return this.sortedKeys;
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

interface PrimitiveListInsertEvent<I> extends CrdtEvent {
  readonly index: number;
  readonly seqId: I;
}

interface PrimitiveListDeleteEvent<I> extends CrdtEvent {
  readonly index: number;
  readonly seqId: I;
}

interface PrimitiveListEventsRecord<I> extends CrdtEventsRecord {
  Insert: PrimitiveListInsertEvent<I>;
  Delete: PrimitiveListDeleteEvent<I>;
}

class TreedocIdWrapper {
  readonly anchor: TreedocId;
  readonly sender: string;
  readonly uniqueNumber: number;
  readonly senderCounter: number | undefined;

  constructor(id: TreedocId, parent: TreedocPrimitiveList<any>) {
    // anchor is same as id but without last disambiguator
    const anchorTemp = new TreedocId(id.path, id.disambiguators.slice(0, -1));
    // Get anchor from parent's cache
    // If anchor had a uid (e.g. tree style text crdt),
    // we could use that instead of serializing.
    const anchorKey = arrayAsString(
      parent.sequenceSource.serialize(anchorTemp)
    );
    let anchor = parent.anchorCache.get(anchorKey);
    if (anchor === undefined) {
      anchor = anchorTemp;
      parent.anchorCache.set(anchorKey, anchor);
    }
    this.anchor = anchor;

    const lastDis = id.disambiguators[id.disambiguators.length - 1];
    this.sender = lastDis.sender;
    this.uniqueNumber = lastDis.uniqueNumber;
    this.senderCounter = id.senderCounter;
  }

  id(_parent: TreedocPrimitiveList<any>) {
    const ans = new TreedocId(
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

  serialize(parent: TreedocPrimitiveList<any>): Uint8Array {
    return parent.sequenceSource.serialize(this.id(parent));
  }

  static deserialize(
    serialized: Uint8Array,
    parent: TreedocPrimitiveList<any>
  ): TreedocIdWrapper {
    return new TreedocIdWrapper(
      parent.sequenceSource.deserialize(serialized, parent.runtime),
      parent
    );
  }
}

interface PrimitiveListState<T> {
  // Note this is a persistent (immutable) data structure.
  tree: RBTree<TreedocIdWrapper, T>;
}

export class TreedocPrimitiveList<T>
  extends PrimitiveCrdt<
    PrimitiveListState<T>,
    PrimitiveListEventsRecord<TreedocId>
  >
  implements Resettable
{
  readonly sequenceSource: TreedocSource;
  // Indexed by serialized string
  readonly anchorCache: WeakValueMap<string, TreedocId>;
  private readonly valueSerializer: ElementSerializer<T>;
  private readonly valueArraySerializer: ElementSerializer<T[]>;
  constructor(
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance(),
    valueArraySerializer: ElementSerializer<
      T[]
    > = DefaultElementSerializer.getInstance()
  ) {
    const sequenceSource = new TreedocSource();
    super({
      tree: null as unknown as RBTree<TreedocIdWrapper, T>,
    });
    this.state.tree = createRBTree(
      sequenceSource.compareWrappers.bind(sequenceSource)
    );
    this.sequenceSource = sequenceSource;
    this.anchorCache = new WeakValueMap();
    this.valueSerializer = valueSerializer;
    this.valueArraySerializer = valueArraySerializer;
  }

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);
    this.sequenceSource.setRuntime(this.runtime);
  }

  idAt(index: number): TreedocIdWrapper {
    this.checkIndex(index);
    return this.state.tree.at(index).key!;
  }

  private checkIndex(index: number) {
    if (!this.hasAt(index)) {
      throw new Error(
        "Index out of bounds: " + index + " (length: " + this.length + ")"
      );
    }
  }

  getId(seqId: TreedocIdWrapper): T | undefined {
    return this.state.tree.get(seqId);
  }

  getAt(index: number): T {
    return this.getId(this.idAt(index))!;
  }

  hasId(seqId: TreedocIdWrapper): boolean {
    return this.state.tree.get(seqId) !== undefined;
  }

  hasAt(index: number): boolean {
    return !(index < 0 || index >= this.length);
  }

  // TODO: hide access if not persistent?
  // Also given that this is our forked version, not
  // the importable one.
  idsAsTree(): RBTree<TreedocIdWrapper, T> {
    return this.state.tree;
  }

  deleteId(seqId: TreedocIdWrapper) {
    const message = PrimitiveListMessage.create({
      delete: {
        seqIdStart: seqId.serialize(this),
      },
    });
    super.send(PrimitiveListMessage.encode(message).finish());
  }

  deleteAt(index: number) {
    this.deleteId(this.idAt(index));
  }

  /**
   * delete [start, end)
   */
  deleteAtRange(start: number, end: number) {
    if (end === start) return;
    if (end === start + 1) this.deleteAt(start);
    else {
      const startId = this.idAt(start);
      const endId = this.idAt(end - 1);
      const message = PrimitiveListMessage.create({
        delete: {
          seqIdStart: startId.serialize(this),
          seqIdEnd: endId.serialize(this),
        },
      });
      super.send(PrimitiveListMessage.encode(message).finish());
    }
  }

  insertAt(index: number, value: T) {
    this.insertAtRange(index, [value]);
  }

  insertAtRange(index: number, values: T[]) {
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
    this.insertBetween(before, after, values);
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

  private insertBetween(
    before: TreedocIdWrapper | null,
    after: TreedocIdWrapper | null,
    values: T[]
  ) {
    let seqId = this.sequenceSource.createBetweenSpecial(
      before === null ? null : before.id(this),
      after === null ? null : after.id(this),
      values.length
    );
    let message: PrimitiveListMessage;
    if (values.length === 1) {
      // TODO: use TreedocIdMessage directly instead of
      // serializing recursively?
      message = PrimitiveListMessage.create({
        insert: {
          seqId: this.sequenceSource.serialize(seqId),
          value: this.valueSerializer.serialize(values[0]),
        },
      });
    } else {
      message = PrimitiveListMessage.create({
        range: {
          seqIdStart: this.sequenceSource.serialize(seqId),
          values: this.valueArraySerializer.serialize(values),
        },
      });
    }
    super.send(PrimitiveListMessage.encode(message).finish());
  }

  reset() {
    // TODO: allow using nulls
    // Or, have special reset message
    this.deleteAtRange(0, this.length);
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    const decoded = PrimitiveListMessage.decode(message);
    switch (decoded.op) {
      case "insert": {
        // TODO: best-effort error if it's already set?
        const seqId = this.sequenceSource.deserialize(
          decoded.insert!.seqId,
          this.runtime
        );
        seqId.senderCounter = timestamp.getSenderCounter();
        let index: number;
        [this.state.tree, index] = this.state.tree.insert(
          new TreedocIdWrapper(seqId, this),
          this.valueSerializer.deserialize(decoded.insert!.value, this.runtime)
        );
        this.emit("Insert", { seqId, index, timestamp });
        break;
      }
      case "range": {
        const seqId = this.sequenceSource.deserialize(
          decoded.range!.seqIdStart,
          this.runtime
        );
        const values = this.valueArraySerializer.deserialize(
          decoded.range!.values,
          this.runtime
        );
        // TODO: exploit the fact that they all have the
        // same anchor.
        const seqIds = this.sequenceSource.expand(seqId, values.length);
        for (let i = 0; i < values.length; i++) {
          seqIds[i].senderCounter = timestamp.getSenderCounter();
          let index: number;
          [this.state.tree, index] = this.state.tree.insert(
            new TreedocIdWrapper(seqIds[i], this),
            values[i]
          );
          // TODO: at least compress seqIds when they come
          // from a range?  Easy memory improvement for
          // todo-list.
          this.emit("Insert", { seqId: seqIds[i], index, timestamp });
        }
        break;
      }
      case "delete": {
        const seqIdStart = this.sequenceSource.deserialize(
          decoded.delete!.seqIdStart,
          this.runtime
        );
        const seqIdEnd =
          !decoded.delete!.seqIdEnd || decoded.delete!.seqIdEnd.length === 0
            ? null
            : TreedocIdWrapper.deserialize(decoded.delete!.seqIdEnd!, this);
        if (seqIdEnd === null) {
          // Single delete
          let index: number | null;
          [this.state.tree, index] = this.state.tree.remove(
            TreedocIdWrapper.deserialize(decoded.delete!.seqIdStart, this)
          );
          if (index !== null) {
            this.emit("Delete", {
              timestamp,
              index,
              seqId: seqIdStart,
            });
          }
        } else {
          const iter = this.state.tree.ge(
            TreedocIdWrapper.deserialize(decoded.delete!.seqIdStart, this)
          );
          const vc = timestamp.asVectorClock();
          const toDelete: [TreedocId, TreedocIdWrapper][] = [];
          while (
            iter.key !== undefined &&
            this.sequenceSource.compareWrappers(iter.key, seqIdEnd) <= 0
          ) {
            // Check causality
            const id = iter.key.id(this);
            const vcEntry = vc.get(id.sender);
            if (vcEntry !== undefined && vcEntry >= id.senderCounter!) {
              toDelete.push([id, iter.key]);
            }
            iter.next();
          }
          // Delete in reverse order, so that indices
          // are valid both before and at the time of
          // deletion.
          for (let i = toDelete.length - 1; i >= 0; i--) {
            let index: number | null;
            [this.state.tree, index] = this.state.tree.remove(toDelete[i][1]);
            this.emit("Delete", {
              timestamp,
              index: index!,
              seqId: toDelete[i][0],
            });
          }
        }
        break;
      }
      default:
        throw new Error("Unknown decoded.op: " + decoded.op);
    }
  }

  idsAsArray(): TreedocIdWrapper[] {
    return this.state.tree.keys;
  }

  asArray(): T[] {
    return this.state.tree.values;
  }

  // TODO: iterator versions of asArray methods

  get length(): number {
    return this.state.tree.length;
  }

  canGc(): boolean {
    return this.length === 0;
  }
}

// TODO: document, test.
// Note this is not a CRDT
// TODO: way to share with others (e.g., putting seqId
// in a LwwRegister).  Could make this a CRDT for that,
// but not desired if it's not going to be replicated.
export class Cursor<I> {
  private seqId: I | null = null;
  constructor(
    private readonly list: List<I, any> | TreedocPrimitiveList<any>,
    startIndex: number,
    private readonly binding: "left" | "right" = "left"
  ) {
    this.index = startIndex;
  }

  set index(index: number) {
    if (this.binding === "left") {
      if (index === 0) this.seqId = null;
      // @ts-ignore TODO
      else this.seqId = this.list.idAt(index - 1);
    } else {
      if (index === this.list.length) this.seqId = null;
      // @ts-ignore TODO
      else this.seqId = this.list.idAt(index);
    }
  }

  get index(): number {
    if (this.binding === "left") {
      if (this.seqId === null) return 0;
      // @ts-ignore TODO
      else return this.list.idsAsTree().gt(this.seqId).index;
    } else {
      if (this.seqId === null) return this.list.length;
      // @ts-ignore TODO
      else return this.list.idsAsTree().ge(this.seqId).index;
    }
  }
}

// Implementations

interface Disambiguator {
  readonly index: number;
  readonly sender: string;
  readonly uniqueNumber: number;
}

export class TreedocId {
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
export class TreedocSource implements ISequenceSource<TreedocId> {
  runtime!: Runtime;
  setRuntime(runtime: Runtime) {
    this.runtime = runtime;
  }

  compare(a: TreedocId, b: TreedocId): number {
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

  compareWrappers(a: TreedocIdWrapper, b: TreedocIdWrapper): number {
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

  createBetween(
    before: TreedocId | null,
    after: TreedocId | null,
    count: number
  ): TreedocId[] {
    return this.expand(this.createBetweenSpecial(before, after, count), count);
  }

  expand(startingId: TreedocId, count: number): TreedocId[] {
    let ans = new Array<TreedocId>(count);
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
      ans[i] = new TreedocId(iPath, iDisambiguators, startingId.senderCounter);
    }
    if (sign === -1) ans.reverse();
    return ans;
  }

  createBetweenSpecial(
    before: TreedocId | null,
    after: TreedocId | null,
    count: number
  ): TreedocId {
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
    // that all insertions are unique.  (TODO: not actually
    // true until we add counters to disambiguators.)

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
        let prefix: TreedocId | null;
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
    let ans = new TreedocId(path, [
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
    id: TreedocId,
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

  serialize(value: TreedocId): Uint8Array {
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
    let message = TreedocIdMessage.create({
      path: value.path.serialize(),
      disIndices: value.disambiguators.map((elem) => elem.index),
      disSendersIndex,
      disSenders,
      disUniqueNumbers: value.disambiguators.map((elem) => elem.uniqueNumber),
    });
    return TreedocIdMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array, _runtime: Runtime): TreedocId {
    let decoded = TreedocIdMessage.decode(message);
    let path = BitSet.deserialize(decoded.path);
    let disambiguators: Disambiguator[] = [];
    for (let i = 0; i < decoded.disIndices.length; i++) {
      disambiguators.push({
        index: decoded.disIndices[i],
        sender: decoded.disSendersIndex[decoded.disSenders[i]],
        uniqueNumber: decoded.disUniqueNumbers[i],
      });
    }
    return new TreedocId(path, disambiguators);
  }
}

export class TreedocList<C extends Crdt & Resettable> extends List<
  TreedocId,
  C
> {
  constructor(valueConstructor: (seqId: TreedocId) => C) {
    super(new TreedocSource(), valueConstructor);
  }
}

export class TextCrdt extends TreedocPrimitiveList<string> {
  constructor() {
    super(TextSerializer.instance, TextArraySerializer.instance);
  }
}

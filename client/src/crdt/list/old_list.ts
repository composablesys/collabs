// import {
//   CompositeCrdt,
//   Crdt,
//   CrdtEvent,
//   CrdtEventsRecord,
//   Runtime,
// } from "../core";
// import { Resettable } from "../helper_crdts";
// import { DefaultElementSerializer, ElementSerializer } from "../../util";
// import createTree from "functional-red-black-tree";
// import { Tree } from "functional-red-black-tree";
// import { RiakCrdtMap, SequentialPlainMap } from "../map";
// import { TreedocIdMessage } from "../../../generated/proto_compiled";
// import { BitSet } from "../../util/bitset";
//
// // TODO: should this have any events?
//
// /**
//  * A source of opaque immutable identifiers of type I
//  * from a dense total order.
//  *
//  * This class is a Crdt in case creating identifiers
//  * requires coordinating with other replicas
//  * (e.g., broadcasting new identifiers to other
//  * replicas if doing so is necessary for ordering,
//  * as in TreeDoc).
//  */
// export interface ISequenceSource<I> extends Crdt, ElementSerializer<I> {
//   /**
//    * Same semantics as compareFunction supplied to
//    * Array.sort: return < 0 if a < b, > 0 if a > b,
//    * 0 if equivalent.
//    * @param  a [description]
//    * @param  b [description]
//    * @return   [description]
//    */
//   compare(a: I, b: I): number;
//
//   /**
//    * Return count fresh (not used before) identifiers greater
//    * than before but less than after, in increasing order.
//    * before and after
//    * can be assumed to be adjacent on the generating
//    * replica, but they might not be adjacent on all replicas,
//    * since other replicas might concurrently make an
//    * identical method call.
//    *
//    * Typically freshness is ensured by attaching a unique id
//    * from Runtime.getUniqueId(), which can be used as
//    * an arbitrary tie-breaker between elements that
//    * would otherwise be equivalently ordered.
//    *
//    * @param  before null for start
//    * @param  after  null for end
//    * @param count   [description]
//    * @return        [description]
//    */
//   createBetween(before: I | null, after: I | null, count: number): I[];
// }
//
// export class List<I, C extends Crdt & Resettable>
//   extends CompositeCrdt
//   implements Resettable
// {
//   private readonly sequenceSource: ISequenceSource<I>;
//   private readonly valueMap: RiakCrdtMap<I, C>;
//   // Note this is a persistent (immutable) data structure.
//   private sortedKeys: Tree<I, true>;
//   constructor(
//     sequenceSource: ISequenceSource<I>,
//     valueConstructor: (seqId: I) => C
//   ) {
//     super();
//     this.sequenceSource = this.addChild("1", sequenceSource);
//     this.valueMap = this.addChild(
//       "2",
//       new RiakCrdtMap<I, C>(valueConstructor, this.sequenceSource)
//     );
//     this.sortedKeys = createTree(
//       this.sequenceSource.compare.bind(sequenceSource)
//     );
//     // Catch map key events and adjusting sortedKeys
//     // accordingly, so that its key set always coincides
//     // with valueMap's.
//     this.valueMap.on("KeyAdd", (event) => {
//       // Add the key if it is not present (Tree permits
//       // multiple instances of the same key, so adding it
//       // again if it already exists is not a no-op).
//       if (!this.sortedKeys.get(event.key)) {
//         this.sortedKeys = this.sortedKeys.insert(event.key, true);
//       }
//     });
//     this.valueMap.on("KeyDelete", (event) => {
//       this.sortedKeys = this.sortedKeys.remove(event.key);
//     });
//     // TODO: In tests, add assertions checking
//     // size equality constantly.
//     // TODO: dispatching events
//   }
//
//   idAt(index: number): I {
//     this.checkIndex(index);
//     return this.sortedKeys.at(index).key!;
//   }
//
//   private checkIndex(index: number) {
//     if (!this.hasAt(index)) {
//       throw new Error(
//         "Index out of bounds: " + index + " (length: " + this.length + ")"
//       );
//     }
//   }
//
//   getId(seqId: I): C | undefined {
//     return this.valueMap.get(seqId);
//   }
//
//   getAt(index: number): C {
//     return this.getId(this.idAt(index))!;
//   }
//
//   hasId(seqId: I): boolean {
//     return this.valueMap.has(seqId);
//   }
//
//   hasAt(index: number): boolean {
//     return !(index < 0 || index >= this.length);
//   }
//
//   // TODO: hide access if not persistent?
//   idsAsTree(): Tree<I, true> {
//     return this.sortedKeys;
//   }
//
//   deleteId(seqId: I) {
//     this.valueMap.delete(seqId);
//   }
//
//   deleteAt(index: number) {
//     this.deleteId(this.idAt(index));
//   }
//
//   insertAt(index: number): [seqId: I, value: C] {
//     return this.insertAtRange(index, 1)[0];
//   }
//
//   insertAtRange(index: number, count: number): [seqId: I, value: C][] {
//     if (index < 0 || index > this.length) {
//       throw new Error(
//         "insertAt index out of range: " +
//           index +
//           " (length: " +
//           this.length +
//           ")"
//       );
//     }
//     let before = index === 0 ? null : this.idAt(index - 1);
//     let after = index === this.length ? null : this.idAt(index);
//     return this.insertBetween(before, after, count);
//   }
//
//   insertAfter(seqId: I): [seqId: I, value: C] {
//     return this.insertAfterRange(seqId, 1)[0];
//   }
//
//   insertAfterRange(seqId: I, count: number): [seqId: I, value: C][] {
//     let after = this.sortedKeys.gt(seqId).key ?? null;
//     return this.insertBetween(seqId, after, count);
//   }
//
//   insertBefore(seqId: I): [seqId: I, value: C] {
//     return this.insertBeforeRange(seqId, 1)[0];
//   }
//
//   insertBeforeRange(seqId: I, count: number): [seqId: I, value: C][] {
//     let before = this.sortedKeys.lt(seqId).key ?? null;
//     return this.insertBetween(before, seqId, count);
//   }
//
//   private insertBetween(
//     before: I | null,
//     after: I | null,
//     count: number
//   ): [seqId: I, value: C][] {
//     let seqIds = this.sequenceSource.createBetween(before, after, count);
//     let ret: [seqId: I, value: C][] = [];
//     for (let seqId of seqIds) {
//       this.valueMap.addKey(seqId);
//       ret.push([seqId, this.valueMap.get(seqId)!]);
//     }
//     return ret;
//   }
//
//   reset() {
//     this.valueMap.reset();
//     // sortedKeys will be reset automatically in response
//     // to map events; no need to reset sequenceSource since
//     // it doesn't have any exposed state.
//   }
//
//   idsAsArray(): I[] {
//     return this.sortedKeys.keys;
//   }
//
//   asArray(): C[] {
//     let keys = this.sortedKeys.keys;
//     let arr = new Array<C>(keys.length);
//     for (let i = 0; i < keys.length; i++) {
//       arr[i] = this.getId(keys[i])!;
//     }
//     return arr;
//   }
//
//   // TODO: iterator versions of asArray methods
//
//   get length(): number {
//     return this.sortedKeys.length;
//   }
// }
//
// // /**
// //  * Mixin to automatically create subclasses of
// //  * ListCrdt that use a given IDenseSource
// //  * implementation.  The subclasses take the same
// //  * constructor arguments as the given IDenseSource.
// //  *
// //  * E.g.: class LSeqList<C extends Crdt & Resettable> extends WrapSequenceSource(LSeqSequenceSource)<C> {}
// //  *
// //  * TODO: checks this works with the generic C type properly,
// //  * and that it erased I types.  May have to reorder the
// //  * generics?  (not working currently)
// //  */
// // export function WrapSequenceSource<
// //   I,
// //   S extends ISequenceSource<I>,
// //   Args extends any[]
// // >(
// //   Source: ConstructorArgs<Args, S>
// // ): ConstructorArgs<
// //   [
// //     valueConstructor: (seqId: I) => C,
// //     gcValues: boolean | undefined,
// //     ...sourceArgs: Args
// //   ],
// //   List<I, C>
// // > {
// //   return class Wrapped<C extends Crdt & Resettable> extends List<I, C> {
// //     constructor(
// //       valueConstructor: (seqId: I) => C,
// //       gcValues: boolean | undefined,
// //       ...args: Args
// //     ) {
// //       super(new Source(...args), valueConstructor, gcValues);
// //     }
// //   };
// // }
//
// interface PrimitiveListInsertEvent<I, T> extends CrdtEvent {
//   readonly index: number;
//   readonly seqId: I;
//   readonly value: T;
// }
//
// interface PrimitiveListDeleteEvent<I> extends CrdtEvent {
//   readonly index: number;
//   readonly seqId: I;
// }
//
// interface PrimitiveListEventsRecord<I, T> extends CrdtEventsRecord {
//   Insert: PrimitiveListInsertEvent<I, T>;
//   Delete: PrimitiveListDeleteEvent<I>;
// }
//
// export class PrimitiveList<I, T>
//   extends CompositeCrdt<PrimitiveListEventsRecord<I, T>>
//   implements Resettable
// {
//   private readonly sequenceSource: ISequenceSource<I>;
//   private readonly valueMap: SequentialPlainMap<I, T>;
//   // Note this is a persistent (immutable) data structure.
//   // TODO: undefined instead of true?
//   private sortedKeys: Tree<I, true>;
//   constructor(
//     sequenceSource: ISequenceSource<I>,
//     valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
//   ) {
//     super();
//     this.sequenceSource = this.addChild("1", sequenceSource);
//     this.valueMap = this.addChild(
//       "2",
//       new SequentialPlainMap<I, T>(this.sequenceSource, valueSerializer)
//     );
//     this.sortedKeys = createTree(
//       this.sequenceSource.compare.bind(sequenceSource)
//     );
//     // Catch map key events and adjusting sortedKeys
//     // accordingly, so that its key set always coincides
//     // with valueMap's.
//     this.valueMap.on("Set", (event) => {
//       // Add the key if it is not present (Tree permits
//       // multiple instances of the same key, so adding it
//       // again if it already exists is not a no-op).
//
//       // TODO: use a library that lets us reduce the number
//       // of map lookups here (from 3 to 1).
//       if (!this.sortedKeys.get(event.key)) {
//         this.sortedKeys = this.sortedKeys.insert(event.key, true);
//         const index = this.sortedKeys.find(event.key)!.index;
//         this.emit("Insert", {
//           caller: this,
//           timestamp: event.timestamp,
//           index,
//           seqId: event.key,
//           value: event.value,
//         });
//       }
//       // TODO: use assertions instead?  Or just remove.  Same in delete.
//       if (this.sortedKeys.length !== this.valueMap.size) {
//         throw new Error("List size agreement error");
//       }
//     });
//     this.valueMap.on("Delete", (event) => {
//       // TODO: use a library that lets us reduce the number
//       // of map lookups here (from 2 to 1).
//       const found = this.sortedKeys.find(event.key);
//       // I think this check should always pass (it never
//       // caused an error when we were accidentally checking
//       // it in a way that always evaluated to true), but
//       // I'll leave it in just in case, since it is free.
//       if (found.valid) {
//         const index = found.index;
//         this.sortedKeys = this.sortedKeys.remove(event.key);
//         this.emit("Delete", {
//           caller: this,
//           timestamp: event.timestamp,
//           index,
//           seqId: event.key,
//         });
//         if (this.sortedKeys.length !== this.valueMap.size) {
//           throw new Error("List size agreement error");
//         }
//       }
//     });
//     // TODO: In tests, add assertions checking
//     // size equality constantly.
//     // TODO: dispatching events
//   }
//
//   idAt(index: number): I {
//     this.checkIndex(index);
//     return this.sortedKeys.at(index).key!;
//   }
//
//   private checkIndex(index: number) {
//     if (!this.hasAt(index)) {
//       throw new Error(
//         "Index out of bounds: " + index + " (length: " + this.length + ")"
//       );
//     }
//   }
//
//   getId(seqId: I): T | undefined {
//     return this.valueMap.get(seqId);
//   }
//
//   getAt(index: number): T {
//     return this.getId(this.idAt(index))!;
//   }
//
//   hasId(seqId: I): boolean {
//     return this.valueMap.has(seqId);
//   }
//
//   hasAt(index: number): boolean {
//     return !(index < 0 || index >= this.length);
//   }
//
//   // TODO: hide access if not persistent?
//   idsAsTree(): Tree<I, true> {
//     return this.sortedKeys;
//   }
//
//   deleteId(seqId: I) {
//     this.valueMap.delete(seqId);
//   }
//
//   deleteAt(index: number) {
//     this.deleteId(this.idAt(index));
//   }
//
//   insertAt(index: number, value: T): I {
//     return this.insertAtRange(index, [value])[0];
//   }
//
//   insertAtRange(index: number, values: T[]): I[] {
//     if (index < 0 || index > this.length) {
//       throw new Error(
//         "insertAt index out of range: " +
//           index +
//           " (length: " +
//           this.length +
//           ")"
//       );
//     }
//     let before = index === 0 ? null : this.idAt(index - 1);
//     let after = index === this.length ? null : this.idAt(index);
//     return this.insertBetween(before, after, values);
//   }
//
//   // TODO
//   // insertAfter(seqId: I): [seqId: I, value: C] {
//   //   return this.insertAfterRange(seqId, 1)[0];
//   // }
//   //
//   // insertAfterRange(seqId: I, count: number): [seqId: I, value: C][] {
//   //   let after = this.sortedKeys.gt(seqId).key ?? null;
//   //   return this.insertBetween(seqId, after, count);
//   // }
//   //
//   // insertBefore(seqId: I): [seqId: I, value: C] {
//   //   return this.insertBeforeRange(seqId, 1)[0];
//   // }
//   //
//   // insertBeforeRange(seqId: I, count: number): [seqId: I, value: C][] {
//   //   let before = this.sortedKeys.lt(seqId).key ?? null;
//   //   return this.insertBetween(before, seqId, count);
//   // }
//
//   private insertBetween(before: I | null, after: I | null, values: T[]): I[] {
//     let seqIds = this.sequenceSource.createBetween(
//       before,
//       after,
//       values.length
//     );
//     for (let i = 0; i < values.length; i++) {
//       this.valueMap.set(seqIds[i], values[i]);
//     }
//     return seqIds;
//   }
//
//   reset() {
//     this.valueMap.reset();
//     // sortedKeys will be reset automatically in response
//     // to map events; no need to reset sequenceSource since
//     // it doesn't have any exposed state.
//   }
//
//   idsAsArray(): I[] {
//     return this.sortedKeys.keys;
//   }
//
//   asArray(): T[] {
//     let keys = this.sortedKeys.keys;
//     let arr = new Array<T>(keys.length);
//     for (let i = 0; i < keys.length; i++) {
//       arr[i] = this.getId(keys[i])!;
//     }
//     return arr;
//   }
//
//   // TODO: iterator versions of asArray methods
//
//   get length(): number {
//     return this.sortedKeys.length;
//   }
// }
//
// // TODO: document, test.
// // Note this is not a CRDT
// // TODO: way to share with others (e.g., putting seqId
// // in a LwwRegister).  Could make this a CRDT for that,
// // but not desired if it's not going to be replicated.
// export class Cursor<I> {
//   private seqId: I | null = null;
//   constructor(
//     private readonly list: List<I, any> | PrimitiveList<I, any>,
//     startIndex: number,
//     private readonly binding: "left" | "right" = "left"
//   ) {
//     this.index = startIndex;
//   }
//
//   set index(index: number) {
//     if (this.binding === "left") {
//       if (index === 0) this.seqId = null;
//       else this.seqId = this.list.idAt(index - 1);
//     } else {
//       if (index === this.list.length) this.seqId = null;
//       else this.seqId = this.list.idAt(index);
//     }
//   }
//
//   get index(): number {
//     if (this.binding === "left") {
//       if (this.seqId === null) return 0;
//       else return this.list.idsAsTree().gt(this.seqId).index;
//     } else {
//       if (this.seqId === null) return this.list.length;
//       else return this.list.idsAsTree().ge(this.seqId).index;
//     }
//   }
// }
//
// // Implementations
//
// export class TreedocId {
//   /**
//    * @param path top bit is always 0
//    * @param disambiguators Sparse map from indices to values, represented
//    * as an array of index-value pairs, ordered by index
//    * increasing.
//    */
//   constructor(
//     readonly path: BitSet,
//     readonly disambiguators: [index: number, value: string][]
//   ) {}
//
//   get sender(): string {
//     return this.disambiguators[this.disambiguators.length - 1][1];
//   }
// }
//
// /**
//  * ISequenceSource based on the Treedoc sequence CRDT
//  * algorithm [1].
//  *
//  * [1] Nuno Preguiça, Joan Manuel Marquès, Marc Shapiro,
//  * Mihai Leția. A commutative replicated data type for
//  * cooperative editing. 29th IEEE International Conference on
//  * Distributed Computing Systems (ICDCS 2009), Jun 2009,
//  * Montreal, Québec, Canada. pp.395-403,
//  * 10.1109/ICDCS.2009.20.  inria-00445975
//  */
// export class TreedocSource
//   extends CompositeCrdt
//   implements ISequenceSource<TreedocId>
// {
//   compare(a: TreedocId, b: TreedocId): number {
//     // Formally, the comparison order is given by a
//     // standard tree walk.  The tree's layers alternate
//     // between "path layers", with edge label given by
//     // path.get(i), and "disambiguator layers", with
//     // edge label given by disambiguators.get(first = i).
//     // In the case that an id does not have a
//     // disambiguator at layer i, it instead implicitly
//     // uses a special "bit disambiguator", defined to
//     // equal the next path bit (path.get(i+1)), with
//     // comparison rules: 0 < sorted disambiguators < 1.
//     // The latter point follows from the paper's prose
//     // description of the tree walk, but I believe it
//     // is mis-stated in the formal definition of the
//     // total order.
//     // From this description, the order is obviously total.
//     // One can also check that the ids generated by
//     // createBetween are always indeed between before
//     // and after.
//
//     // We start by finding the first difference between
//     // either path or disambiguators.
//     // 1. path
//     let [pathCompare, pathIndex] = BitSet.compare(a.path, b.path);
//     // 2. disambiguators
//     let [disIndex, aDis, bDis] = this.diffDisambiguators(
//       a.disambiguators,
//       b.disambiguators
//     );
//
//     // The path level at depth i is above the disambiguator
//     // level at depth i.  So if pathIndex <= disIndex,
//     // compare by path.
//     if (pathIndex <= disIndex) return pathCompare;
//
//     // Now disIndex < pathIndex has the first difference.
//     // If a node has no disambiguator at disIndex, use
//     // its next path bit as its disambiguator,
//     // following the rule
//     // 0 < sorted disambiguators < 1.
//     if (aDis !== undefined && bDis !== undefined) {
//       // Compare by aDis and bDis.  We know they're not equal.
//       return aDis < bDis ? -1 : 1;
//     } else {
//       if (aDis === undefined) {
//         // 0 < bDis < 1
//         return a.path.get(disIndex + 1) ? 1 : -1;
//       } else {
//         // 0 < aDis < 1
//         return b.path.get(disIndex + 1) ? -1 : 1;
//       }
//     }
//   }
//
//   /**
//    *
//    * @param  a [description]
//    * @param  b [description]
//    * @return  [first index where differs
//    * (Number.MAX_VALUE if identical), a value at index,
//    * b value at index].  Present vs not present counts
//    * as a difference.
//    */
//   private diffDisambiguators(
//     a: [index: number, value: string][],
//     b: [index: number, value: string][]
//   ): [number, string | undefined, string | undefined] {
//     let i: number;
//     for (i = 0; i < Math.min(a.length, b.length); i++) {
//       if (a[i][0] < b[i][0]) return [a[i][0], a[i][1], undefined];
//       if (b[i][0] < a[i][0]) return [b[i][0], undefined, b[i][1]];
//       // Now a[i][0] === b[i][0]
//       if (a[i][1] !== b[i][1]) return [a[i][0], a[i][1], b[i][1]];
//     }
//     // At this point, they agree on their prefix,
//     // and i = Math.min(a.length, b.length).
//     if (a.length === b.length) {
//       // Identical
//       return [Number.MAX_VALUE, undefined, undefined];
//     }
//     // One has an entry at i while the other doesn't.
//     // That is the first disagreement.
//     if (i < a.length) return [a[i][0], a[i][1], undefined];
//     else return [b[i][0], undefined, b[i][1]];
//   }
//
//   createBetween(
//     before: TreedocId | null,
//     after: TreedocId | null,
//     count: number
//   ): TreedocId[] {
//     let path: BitSet;
//     let disambiguators: [index: number, value: string][];
//
//     // TODO: depth heuristic from Treedoc paper
//
//     // If they are both null, create the root.
//     if (before === null && after === null) {
//       // We make the first bit present so that the root
//       // can have an associated disambiguator.
//       path = new BitSet(1);
//       disambiguators = [];
//     } else {
//       // If one is the other's descendant, create an inside
//       // child of the descendant.
//       // We count the longer one as a descendant even
//       // if it does not have the shorter one's leaf
//       // disambiguator, since otherwise when we erase
//       // the disambiguator in the created node, we
//       // would end up with a parent of the longer one,
//       // possibly equal to it or on the wrong side.
//       let source: TreedocId;
//       let descendant = this.descendantOrNull(before, after);
//       if (descendant !== null) source = descendant;
//       // If one is null, create an inside child of the
//       // non-null node.
//       else if (before === null) source = after!;
//       else if (after === null) source = before;
//       // Otherwise, they are distinct leaves.
//       // Create an inside child of the node with
//       // fewer disambiguators, breaking ties by
//       // path length.
//       // TODO: instead weight disambiguators heavily?
//       else {
//         if (before.disambiguators.length < after.disambiguators.length) {
//           source = before;
//         } else {
//           source = before.path.length <= after.path.length ? before : after;
//         }
//       }
//
//       path = BitSet.copy(source.path, source.path.length + 1);
//       path.set(path.length - 1, source === before);
//       // Keep source's leaf disambiguator if before and after
//       // are mini-siblings, otherwise keep it off
//       // (due to slice ending one index early).
//       if (this.miniSiblings(before, after)) {
//         disambiguators = source!.disambiguators.slice();
//       } else {
//         disambiguators = source!.disambiguators.slice(
//           0,
//           source!.disambiguators.length - 1
//         );
//       }
//     }
//
//     let depth = Math.ceil(Math.log2(count));
//     // Set new leaf disambiguator
//     // TODO: it would be nicer to set this at
//     // path.length - 1, preventing interleaving.
//     // However we currently require the leaf to have
//     // a disambiguator.
//     disambiguators.push([path.length + depth - 1, this.runtime.replicaId]);
//     // Make count new ids as leaf descendants of path.
//     let ans = new Array<TreedocId>(count);
//     for (let i = 0; i < count; i++) {
//       let iPath = BitSet.copy(path, path.length + depth);
//       // Set depth next bits as the low depth bits of i
//       for (let d = 0; d < depth; d++) {
//         iPath.set(path.length + d, (i & (1 << (depth - d - 1))) !== 0);
//       }
//       ans[i] = new TreedocId(iPath, disambiguators);
//     }
//     return ans;
//   }
//
//   /**
//    * If one id is a (potential)
//    * strict descendant of the other, return it;
//    * else return null.
//    * @param  before [description]
//    * @param  after  [description]
//    * @return        [description]
//    */
//   private descendantOrNull(
//     before: TreedocId | null,
//     after: TreedocId | null
//   ): TreedocId | null {
//     if (before === null || after === null) return null;
//     if (before.path.length === after.path.length) return null;
//     let [shorter, longer] =
//       before.path.length > after.path.length
//         ? [after, before]
//         : [before, after];
//     // Check that they agree on their shared path
//     // TODO: optimize loop
//     for (let i = 0; i < shorter.path.length; i++) {
//       if (shorter.path.get(i) !== longer.path.get(i)) return null;
//     }
//     // Check that they agree on their shared disambiguators.
//     for (let d = 0; d < shorter.disambiguators.length - 1; d++) {
//       if (!this.disEqual(shorter.disambiguators[d], longer.disambiguators[d]))
//         return null;
//     }
//     // Special check for the shorter one's leaf disambiguator:
//     // it is okay if the other is not present.
//     // See the discussion at this method's call site.
//     let longerNextDis =
//       longer.disambiguators[shorter.disambiguators.length - 1];
//     if (
//       longerNextDis !== undefined &&
//       longerNextDis[0] <=
//         shorter.disambiguators[shorter.disambiguators.length - 1][0] &&
//       !this.disEqual(
//         longerNextDis,
//         shorter.disambiguators[shorter.disambiguators.length - 1]
//       )
//     ) {
//       return null;
//     }
//
//     // One is a descendant of the other
//     return longer;
//   }
//
//   /**
//    * @param  source [description]
//    * @param  other  [description]
//    * @return whether they are mini-siblings, i.e., they are
//    * identical except for their leaf disambiguators
//    */
//   private miniSiblings(
//     before: TreedocId | null,
//     after: TreedocId | null
//   ): boolean {
//     if (before === null || after === null) return false;
//     if (!before.path.equals(after.path)) return false;
//     if (before.disambiguators.length !== after.disambiguators.length)
//       return false;
//     // Compare all disambiguators except the last (leaf)
//     for (
//       let disIndex = 0;
//       disIndex < before.disambiguators.length - 1;
//       disIndex++
//     ) {
//       if (
//         !this.disEqual(
//           before.disambiguators[disIndex],
//           after.disambiguators[disIndex]
//         )
//       )
//         return false;
//     }
//     return true;
//   }
//
//   serialize(value: TreedocId): Uint8Array {
//     let message = TreedocIdMessage.create({
//       path: value.path.array,
//       pathLength: value.path.length,
//       disIndices: value.disambiguators.map((elem) => elem[0]),
//       disValues: value.disambiguators.map((elem) => elem[1]),
//     });
//     return TreedocIdMessage.encode(message).finish();
//   }
//
//   deserialize(message: Uint8Array, _runtime: Runtime): TreedocId {
//     let decoded = TreedocIdMessage.decode(message);
//     let path = new BitSet(decoded.pathLength, decoded.path);
//     let disambiguators: [index: number, value: string][] = [];
//     for (let i = 0; i < decoded.disIndices.length; i++) {
//       disambiguators.push([decoded.disIndices[i], decoded.disValues[i]]);
//     }
//     return new TreedocId(path, disambiguators);
//   }
//
//   private disEqual(
//     a: [index: number, value: string],
//     b: [index: number, value: string]
//   ): boolean {
//     return a[0] === b[0] && a[1] === b[1];
//   }
// }
//
// export class TreedocList<C extends Crdt & Resettable> extends List<
//   TreedocId,
//   C
// > {
//   constructor(valueConstructor: (seqId: TreedocId) => C) {
//     super(new TreedocSource(), valueConstructor);
//   }
// }
//
// export class TreedocPrimitiveList<T> extends PrimitiveList<TreedocId, T> {
//   constructor(
//     valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
//   ) {
//     super(new TreedocSource(), valueSerializer);
//   }
// }
//
// export class TextCrdt extends TreedocPrimitiveList<string> {}

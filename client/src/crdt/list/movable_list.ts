import { createRBTree, Optional, RBTree } from "../../util";
import { CompositeCrdt, Crdt, CrdtEvent, CrdtParent } from "../core";
import { Resettable } from "../helper_crdts";
import { LwwRegister } from "../register";
import { AddWinsPlainSet, CrdtSet, ExplicitCrdtSet, RiakCrdtSet } from "../set";
import { YjsCrdtSet } from "../set/yjs_crdt_set";
import { ISequenceSource, TreedocId, TreedocSource } from "./old_list";

// TODO: interfaces etc

class MovableListEntry<I, C extends Crdt>
  extends CompositeCrdt
  implements Resettable
{
  readonly content: C;
  readonly location: LwwRegister<I>;
  cachedLocation: Optional<I>;

  constructor(
    content: C,
    sequenceSource: ISequenceSource<I>,
    readonly onMove: (event: CrdtEvent, caller: MovableListEntry<I, C>) => void
  ) {
    super();
    this.content = this.addChild("0", content);
    this.location = this.addChild(
      "1",
      new LwwRegister<I>(undefined as unknown as I, sequenceSource)
    );
    this.location.on("Change", this.onLocationChange.bind(this));
    this.cachedLocation = this.location.optionalValue;
  }

  private onLocationChange(event: CrdtEvent) {
    this.onMove(event, this);
    this.cachedLocation = this.location.optionalValue;
  }

  reset() {
    (this.content as unknown as Resettable).reset();
    this.location.reset();
  }
}

export type InferResettable<C extends Crdt> = Crdt &
  (C extends Resettable ? Resettable : {});

// TODO: can we simplify/combine handling of seqIds with
// other lists?  E.g. avoid the repeated code for insert.
// TODO: bounds checking, ownership checking
export class MovableList<I, C extends Crdt>
  extends CompositeCrdt
  implements Resettable
{
  private readonly entries: CrdtSet<MovableListEntry<I, C>>;
  // Note this is a persistent (immutable) data structure.
  private sortedLocations: RBTree<I, MovableListEntry<I, C>>;
  private danglers: Set<MovableListEntry<I, C>> = new Set();

  constructor(
    private readonly sequenceSource: ISequenceSource<I>,
    setFactory: <D extends InferResettable<C>>(
      entryFactory: () => D
    ) => CrdtSet<D>,
    valueConstructor: () => C
  ) {
    super();
    // @ts-ignore TypeScript doesn't accept that
    // MovableListEntry extends InferResettable
    this.entries = this.addChild(
      "0",
      // @ts-ignore TypeScript doesn't accept that
      // MovableListEntry extends InferResettable
      setFactory(() => {
        return new MovableListEntry(
          valueConstructor(),
          this.sequenceSource,
          this.onLocationChange.bind(this)
        );
      })
    );
    this.sortedLocations = createRBTree(
      this.sequenceSource.compare.bind(sequenceSource)
    );
    // Catch map key events and adjusting sortedLocations
    // and danglers
    // accordingly, so that sortedLocations's key set always
    // equals the set of currently-set location
    // values, and danglers always equals the set of
    // entries with unset location values.
    this.entries.on("Add", (event) => {
      this.addLocation(event.value);
    });
    this.entries.on("Delete", (event) => {
      this.deleteLocation(event.value, event.value.location.optionalValue);
    });
    // TODO: dispatch events (including on Move)
  }

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);
    this.sequenceSource.setRuntime(this.runtime);
  }

  private onLocationChange(event: CrdtEvent, caller: MovableListEntry<I, C>) {
    this.deleteLocation(caller, caller.cachedLocation);
    this.addLocation(caller);
  }

  /**
   * @return if inserted, insertion index; if dangling,
   * true (regardless if present); if would be inserted
   * but already present (TODO: when can this happen?),
   * null.
   */
  private addLocation(value: MovableListEntry<I, C>): number | true | null {
    const seqId = value.location.optionalValue;
    if (seqId.isPresent) {
      // Add seqId if it is not present (Tree permits
      // multiple instances of the same key, so adding it
      // again if it already exists is not a no-op).
      // TODO: optimize out this get
      if (!this.sortedLocations.get(seqId.get())) {
        let index: number;
        [this.sortedLocations, index] = this.sortedLocations.insert(
          seqId.get(),
          value
        );
        // // TODO: debug mode only
        // const indexDebug = this.sortedKeys.find(event.key)!.index;
        // if (index !== indexDebug) {
        //   throw new Error(`index was wrong: ${index}, ${indexDebug}`);
        // }
        return index;
      } else return null;
    } else {
      this.danglers.add(value);
      return true;
    }
  }

  private deleteLocation(
    value: MovableListEntry<I, C>,
    deletedSeqId: Optional<I>
  ) {
    if (deletedSeqId.isPresent) {
      [this.sortedLocations] = this.sortedLocations.remove(deletedSeqId.get());
    } else {
      this.danglers.delete(value);
    }
  }

  insert(index: number): C {
    // TODO: due to event order, the element will be
    // briefly dangling.  Makes Insert event tricky.
    const seqId = this.insertionSeqId(index);
    const entry = this.entries.create();
    entry.location.value = seqId;
    return entry.content;
  }

  private insertionSeqId(index: number): I {
    if (index < 0 || index > this.length) {
      throw new Error(
        "insert index out of range: " + index + " (length: " + this.length + ")"
      );
    }
    const before = index === 0 ? null : this.sortedLocations.at(index - 1).key!;
    const after =
      index === this.length ? null : this.sortedLocations.at(index).key!;
    return this.sequenceSource.createBetween(before, after, 1)[0];
  }

  delete(index: number): boolean {
    return this.entries.delete(this.sortedLocations.at(index).value!);
  }

  restore(valueCrdt: C): void {
    this.entries.restore(valueCrdt.parent as MovableListEntry<I, C>);
  }

  /**
   * toIndex is evaluated before removing fromIndex
   * and is used the same as the insertion index.
   * So it'll end up at toIndex - 1 if fromIndex < toIndex,
   * else toIndex.
   * @param  fromIndex [description]
   * @param  toIndex   [description]
   * @return           [description]
   */
  move(fromIndex: number, toIndex: number) {
    if (toIndex === fromIndex) return;
    const seqId = this.insertionSeqId(toIndex);
    this.sortedLocations.at(fromIndex).value!.location.value = seqId;
  }

  /**
   * This is how to un-dangle a Crdt
   * @param  valueCrdt [description]
   * @param  toIndex   [description]
   * @return           [description]
   */
  moveValue(valueCrdt: C, toIndex: number) {
    const seqId = this.insertionSeqId(toIndex);
    (valueCrdt.parent as MovableListEntry<I, C>).location.value = seqId;
  }

  at(index: number): C {
    return this.sortedLocations.at(index).value!.content;
  }

  /**
   * @return undefined if not present or dangling
   */
  indexOf(valueCrdt: C): number | undefined {
    const entry = valueCrdt.parent as MovableListEntry<I, C>;
    if (!this.entries.has(entry)) return undefined;
    const seqId = entry.location.optionalValue;
    if (seqId.isPresent) {
      return this.sortedLocations.find(seqId.get()).index;
    } else return undefined;
  }

  /**
   * Excludes danglers
   */
  has(valueCrdt: C): boolean {
    return (
      this.entries.has(valueCrdt.parent as MovableListEntry<I, C>) &&
      !this.hasDangler(valueCrdt)
    );
  }

  asArray(): C[] {
    return this.sortedLocations.values.map((entry) => entry.content);
  }

  get length(): number {
    return this.sortedLocations.length;
  }

  reset() {
    this.entries.reset();
  }

  // TODO: decide on what to do about danglers in general.
  // Ideally you'll use a semantics that doesn't have them
  // (the set doesn't reset values unless they are gone
  // forever).  E.g. a non-resetting Riak set, or a Yjs
  // set.  Only the latter is memory-safe.

  hasDangler(valueCrdt: C): boolean {
    return this.danglers.has(valueCrdt.parent as MovableListEntry<I, C>);
  }

  *danglingValues(): IterableIterator<C> {
    for (let entry of this.danglers) {
      yield entry.content;
    }
  }
}

// TODO: eliminate dangling methods when not needed?

export class RevivingMovableList<C extends Crdt> extends MovableList<
  TreedocId,
  C
> {
  constructor(valueConstructor: () => C) {
    super(
      new TreedocSource(),
      (entryFactory) =>
        new ExplicitCrdtSet(entryFactory, new AddWinsPlainSet(), {
          includeImplicit: true,
        }),
      valueConstructor
    );
  }
}

export class RiakMovableList<C extends Crdt & Resettable> extends MovableList<
  TreedocId,
  C
> {
  constructor(valueConstructor: () => C) {
    super(
      new TreedocSource(),
      (entryFactory) => new RiakCrdtSet(entryFactory),
      valueConstructor
    );
  }
}

// TODO: allow args
export class DeletingMovableList<C extends Crdt> extends MovableList<
  TreedocId,
  C
> {
  constructor(valueConstructor: () => C) {
    super(
      new TreedocSource(),
      (entryFactory) => new YjsCrdtSet(entryFactory),
      valueConstructor
    );
  }
}

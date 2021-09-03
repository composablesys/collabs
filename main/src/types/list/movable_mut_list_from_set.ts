import {
  DefaultElementSerializer,
  ElementSerializer,
  PairSerializer,
} from "../../util";
import { Crdt, CrdtInitToken, Pre, RootParent } from "../../core";
import { CRegister } from "../register";
import { CSet } from "../set";
import { AbstractCListCompositeCrdt } from "./abstract_list";
import { DenseLocalList } from "./dense_local_list";
import { MovableCList, MovableCListEventsRecord } from "./interfaces";
import { CompositeCrdt } from "../../constructions";

export class MovableMutCListEntry<
  C extends Crdt,
  L,
  R extends CRegister<L>
> extends CompositeCrdt {
  readonly value: C;
  readonly loc: R;

  constructor(initToken: CrdtInitToken, value: Pre<C>, loc: Pre<R>) {
    super(initToken);
    this.value = this.addChild("", value);
    this.loc = this.addChild("0", loc);
  }
}

// Note that we do not use this construction with ResettingMutCSet.
// This is because deletes would do a reset on the whole
// entry, including loc, causing deleted-then-restored
// values to show up in their original location, instead
// of their most recent moved-to location.  (In terms
// of events, one would see a Move event immediately
// before each Delete event, moving the value back to
// its original location.)  For now, we just make
// ResettingMutCList be immovable.  A movable
// version is mathematically possible but tricky
// to implement within the library.

export class MovableMutCListFromSet<
    C extends Crdt,
    InsertArgs extends any[],
    L,
    RegT extends CRegister<L>,
    SetT extends CSet<MovableMutCListEntry<C, L, RegT>, [L, InsertArgs]>,
    DenseT extends DenseLocalList<L, MovableMutCListEntry<C, L, RegT>>,
    Events extends MovableCListEventsRecord<C> = MovableCListEventsRecord<C>
  >
  extends AbstractCListCompositeCrdt<C, InsertArgs, Events>
  implements MovableCList<C, InsertArgs>
{
  protected readonly set: SetT;

  /**
   * registerConstructor should make sure that the
   * register's initial value is initialValue, without
   * dispatching a Set event (i.e., pass it in RegT's
   * constructor, not as an operation, which wouldn't
   * make sense anyway).
   */
  constructor(
    initToken: CrdtInitToken,
    setCallback: (
      setValueConstructor: (
        setValueInitToken: CrdtInitToken,
        ...setValueArgs: [L, InsertArgs]
      ) => MovableMutCListEntry<C, L, RegT>,
      setArgsSerializer: ElementSerializer<[L, InsertArgs]>
    ) => Pre<SetT>,
    registerConstructor: (
      registerInitToken: CrdtInitToken,
      initialValue: L,
      registerSerializer: ElementSerializer<L>
    ) => RegT,
    protected readonly denseLocalList: DenseT,
    valueConstructor: (valueInitToken: CrdtInitToken, ...args: InsertArgs) => C,
    argsSerializer: ElementSerializer<InsertArgs> = DefaultElementSerializer.getInstance()
  ) {
    super(initToken);

    this.set = this.addChild(
      "",
      setCallback((setValueInitToken, loc, args) => {
        const entry = new MovableMutCListEntry<C, L, RegT>(
          setValueInitToken,
          (valueInitToken) => valueConstructor(valueInitToken, ...args),
          (registerInitToken) =>
            registerConstructor(registerInitToken, loc, denseLocalList)
        );
        entry.loc.on("Set", (event) => {
          // Maintain denseLocalList's key set as a cache
          // of the currently set locations, mapping to
          // the corresponding entry.
          // Also dispatch our own events.
          // Note that move is the only time register.set
          // is called; setting the initial state is done
          // in the registerConstructor, not as a
          // register.set operation, so it will not emit
          // a Set event.
          const startIndex = this.denseLocalList.delete(
            event.previousValue
          )![0];
          const resultingStartIndex = this.denseLocalList.set(
            entry.loc.value,
            entry
          );
          this.emit("Move", {
            startIndex,
            count: 1,
            resultingStartIndex,
            timestamp: event.timestamp,
          });
        });
        return entry;
      }, new PairSerializer(denseLocalList, argsSerializer))
    );

    // Maintain denseLocalList's key set as a cache
    // of the currently set locations, mapping to
    // the corresponding entry.
    // Also dispatch our own events.
    this.set.on("Add", (event) => {
      // Note that it is safe to do the set here, instead
      // of in valueConstructor, because:
      // - For any set (in particular ResettingMutCSet),
      // values are only recreated after being GC'd,
      // and denseLocalList prevents any of our values from
      // being GC'd.  So Add events are the same as
      // calls to valueConstructor, except during loading...
      // - And during loading, we manually fill in
      // denseLocalList.  This is more efficient since
      // it avoids filling it first with the initial
      // locations and then with the actual locations
      // (due to move operations before saving).
      const index = this.denseLocalList.set(event.value.loc.value, event.value);
      this.emit("Insert", {
        startIndex: index,
        count: 1,
        timestamp: event.timestamp,
      });
    });
    this.set.on("Delete", (event) => {
      const index = this.denseLocalList.delete(event.value.loc.value)![0];
      this.emit("Delete", {
        startIndex: index,
        count: 1,
        deletedValues: [event.value.value],
        timestamp: event.timestamp,
      });
    });
  }

  insert(index: number, ...args: InsertArgs): C {
    const loc = this.denseLocalList.createNewLocs(index, 1)[0];
    return this.set.add(loc, args).value;
  }

  /**
   * Note: event will show as singleton deletes.
   *
   * @param startIndex [description]
   * @param count=1    [description]
   */
  delete(startIndex: number, count = 1): void {
    if (count < 0 || !Number.isInteger(count)) {
      throw new Error("invalid count: " + count);
    }
    // Get the values to delete.
    const toDelete = new Array<MovableMutCListEntry<C, L, RegT>>(count);
    for (let i = 0; i < count; i++) {
      toDelete[i] = this.denseLocalList.get(startIndex + i);
    }
    // Delete them.
    for (const value of toDelete) {
      this.set.delete(value);
    }
  }

  /**
   * Note: event will show as singleton moves.
   *
   * @param  startIndex     [description]
   * @param  insertionIndex [description]
   * @param  count=1        [description]
   * @return                [description]
   */
  move(startIndex: number, insertionIndex: number, count = 1): number {
    // Locations to insert at.
    const locs = this.denseLocalList.createNewLocs(insertionIndex, count);
    // Values to move.
    const toMove = new Array<MovableMutCListEntry<C, L, RegT>>(count);
    for (let i = 0; i < count; i++) {
      toMove[i] = this.denseLocalList.get(startIndex + i);
    }
    // Move them.
    for (let i = 0; i < count; i++) {
      toMove[i].loc.set(locs[i]);
    }
    // Return the new index of toMove[0].
    return this.denseLocalList.indexOf(locs[0])!;
  }

  get(index: number): C {
    return this.denseLocalList.get(index).value;
  }

  *values(): IterableIterator<C> {
    for (const entry of this.denseLocalList.values()) {
      yield entry.value;
    }
  }

  get length(): number {
    return this.set.size;
  }

  indexOf(searchElement: C, fromIndex = 0): number {
    // Avoid errors from searchElement.parent in case it
    // is the root.
    if (searchElement.parent instanceof RootParent) return -1;

    if (
      this.set.has(searchElement.parent as MovableMutCListEntry<C, L, RegT>)
    ) {
      const loc = (searchElement.parent as MovableMutCListEntry<C, L, RegT>).loc
        .value;
      const index = this.denseLocalList.indexOf(loc)!;
      if (fromIndex < 0) fromIndex += this.length;
      if (index >= fromIndex) return index;
    }
    return -1;
  }

  lastIndexOf(searchElement: C, fromIndex = this.length - 1): number {
    const index = this.indexOf(searchElement);
    if (index !== -1) {
      if (fromIndex < 0) fromIndex += this.length;
      if (index <= fromIndex) return index;
    }
    return -1;
  }

  includes(searchElement: C, fromIndex = 0): boolean {
    return this.indexOf(searchElement, fromIndex) !== -1;
  }

  canGc(): boolean {
    // Even if the set is trivial, denseLocalList might
    // have tombstones, so we need to check for it here.
    return super.canGc() && this.denseLocalList.canGc();
  }

  postLoad() {
    // Fill in denseLocalList, which starts empty.
    for (const value of this.set) {
      this.denseLocalList.set(value.loc.value, value);
    }
  }
}

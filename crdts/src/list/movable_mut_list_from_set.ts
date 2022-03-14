import {
  bytesAsString,
  DefaultSerializer,
  PairSerializer,
  Serializer,
  stringAsBytes,
  Collab,
  InitToken,
  isRuntime,
  Pre,
  AbstractCListCObject,
  CVariable,
  CSet,
  FoundLocation,
  LocatableCList,
  MovableCList,
  MovableCListEventsRecord,
  CObject,
} from "@collabs/core";
import { DenseLocalList } from "./dense_local_list";

export class MovableMutCListEntry<
  C extends Collab,
  L,
  R extends CVariable<L>
> extends CObject {
  readonly value: C;
  readonly loc: R;

  constructor(initToken: InitToken, value: Pre<C>, loc: Pre<R>) {
    super(initToken);
    this.value = this.addChild("", value);
    this.loc = this.addChild("0", loc);
  }
}

export class MovableMutCListFromSet<
    C extends Collab,
    InsertArgs extends unknown[],
    L,
    VarT extends CVariable<L>,
    SetT extends CSet<MovableMutCListEntry<C, L, VarT>, [L, InsertArgs]>,
    DenseT extends DenseLocalList<L, MovableMutCListEntry<C, L, VarT>>,
    Events extends MovableCListEventsRecord<C> = MovableCListEventsRecord<C>
  >
  extends AbstractCListCObject<C, InsertArgs, Events>
  implements MovableCList<C, InsertArgs>, LocatableCList<C, InsertArgs, Events>
{
  protected readonly set: SetT;

  /**
   * variableConstructor should make sure that the
   * variable's initial value is initialValue, without
   * dispatching a Set event (i.e., pass it in VarT's
   * constructor, not as an operation, which wouldn't
   * make sense anyway).
   */
  constructor(
    initToken: InitToken,
    setCallback: (
      setValueConstructor: (
        setValueInitToken: InitToken,
        ...setValueArgs: [L, InsertArgs]
      ) => MovableMutCListEntry<C, L, VarT>,
      setInitialValuesArgs: [L, InsertArgs][],
      setArgsSerializer: Serializer<[L, InsertArgs]>
    ) => Pre<SetT>,
    variableConstructor: (
      variableInitToken: InitToken,
      initialValue: L,
      variableSerializer: Serializer<L>
    ) => VarT,
    protected readonly denseLocalList: DenseT,
    valueConstructor: (valueInitToken: InitToken, ...args: InsertArgs) => C,
    initialValuesArgs: InsertArgs[] = [],
    argsSerializer: Serializer<InsertArgs> = DefaultSerializer.getInstance()
  ) {
    super(initToken);

    const initialLocs = this.denseLocalList.createInitialLocs(
      initialValuesArgs.length
    );
    const setInitialValuesArgs: [L, InsertArgs][] = initialLocs.map(
      (loc, index) => [loc, initialValuesArgs[index]]
    );
    this.set = this.addChild(
      "",
      setCallback(
        (setValueInitToken, loc, args) => {
          const entry = new MovableMutCListEntry<C, L, VarT>(
            setValueInitToken,
            (valueInitToken) => valueConstructor(valueInitToken, ...args),
            (variableInitToken) =>
              variableConstructor(variableInitToken, loc, denseLocalList)
          );
          entry.loc.on("Set", (event) => {
            // Maintain denseLocalList's key set as a cache
            // of the currently set locations, mapping to
            // the corresponding entry.
            // Also dispatch our own events.
            // Note that move is the only time variable.set
            // is called; setting the initial state is done
            // in the variableConstructor, not as a
            // variable.set operation, so it will not emit
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
              meta: event.meta,
            });
          });
          return entry;
        },
        setInitialValuesArgs,
        new PairSerializer(denseLocalList, argsSerializer)
      )
    );

    // Events due to initial values get dispatched in
    // constructor, before we add event listeners, so we miss
    // them.  Perhaps instead have initial values as a second
    // function, but considered part of initialization?
    // Then could even do elements one at a time and get them
    // returned, which would make YATA easier.
    // For now we just hack in the effect of the "Add" events.
    for (const value of this.set) {
      this.denseLocalList.set(value.loc.value, value);
    }

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
        meta: event.meta,
      });
    });
    this.set.on("Delete", (event) => {
      const index = this.denseLocalList.delete(event.value.loc.value)![0];
      this.emit("Delete", {
        startIndex: index,
        count: 1,
        deletedValues: [event.value.value],
        meta: event.meta,
      });
    });
  }

  insert(index: number, ...args: InsertArgs): C | undefined {
    const loc = this.denseLocalList.createNewLocs(index, 1)[0];
    return this.set.add(loc, args)?.value;
  }

  /**
   * Note: event will show as singleton deletes.
   *
   * @param startIndex [description]
   * @param count=1    [description]
   */
  delete(startIndex: number, count = 1): void {
    if (count < 0 || !Number.isInteger(count)) {
      throw new Error(`invalid count: ${count}`);
    }
    // Get the values to delete.
    const toDelete = new Array<MovableMutCListEntry<C, L, VarT>>(count);
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
    const toMove = new Array<MovableMutCListEntry<C, L, VarT>>(count);
    for (let i = 0; i < count; i++) {
      toMove[i] = this.denseLocalList.get(startIndex + i);
    }
    // Move them.
    for (let i = 0; i < count; i++) {
      toMove[i].loc.set(locs[i]);
    }
    // Return the new index of toMove[0].
    return this.denseLocalList.locate(locs[0])[0];
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

  getLocation(index: number): string {
    return bytesAsString(
      this.denseLocalList.serialize(this.denseLocalList.getLoc(index))
    );
  }

  *locationEntries(): IterableIterator<[string, C]> {
    for (const [loc, entry] of this.denseLocalList.entries()) {
      yield [bytesAsString(this.denseLocalList.serialize(loc)), entry.value];
    }
  }

  findLocation(location: string): FoundLocation {
    return this.denseLocalList.findLoc(
      this.denseLocalList.deserialize(stringAsBytes(location))
    );
  }

  indexOf(searchElement: C, fromIndex = 0): number {
    // Avoid errors from searchElement.parent in case it
    // is the root.
    if (isRuntime(searchElement.parent)) return -1;

    if (
      this.set.has(searchElement.parent as MovableMutCListEntry<C, L, VarT>)
    ) {
      const loc = (searchElement.parent as MovableMutCListEntry<C, L, VarT>).loc
        .value;
      const index = this.denseLocalList.locate(loc)[0];
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

  canGC(): boolean {
    // Even if the set is trivial, denseLocalList might
    // have tombstones, so we need to check for it here.
    return super.canGC() && this.denseLocalList.canGC();
  }

  protected loadObject() {
    // Fill in denseLocalList, which starts empty.
    for (const value of this.set) {
      this.denseLocalList.set(value.loc.value, value);
    }
  }
}
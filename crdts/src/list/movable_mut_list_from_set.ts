import {
  DefaultSerializer,
  PairSerializer,
  Serializer,
  Collab,
  InitToken,
  isRuntime,
  Pre,
  AbstractCListCObject,
  CVariable,
  CSet,
  MovableCList,
  MovableCListEventsRecord,
  CObject,
  CMessenger,
  Optional,
  PositionedList,
} from "@collabs/core";
import {
  ArrayListItemManager,
  CreatedListPositionSerializer,
  ListPosition,
  ListPositionSerializer,
  ListPositionSource,
} from "./list_position_source";

export class MovableMutCListEntry<
  C extends Collab,
  VarT extends CVariable<ListPosition>
> extends CObject {
  readonly value: C;
  readonly position: VarT;

  constructor(initToken: InitToken, value: Pre<C>, position: Pre<VarT>) {
    super(initToken);
    this.value = this.addChild("", value);
    this.position = this.addChild("0", position);
  }
}

export class MovableMutCListFromSet<
    C extends Collab,
    InsertArgs extends unknown[],
    VarT extends CVariable<ListPosition>,
    SetT extends CSet<
      MovableMutCListEntry<C, VarT>,
      [ListPosition, InsertArgs]
    >,
    Events extends MovableCListEventsRecord<C> = MovableCListEventsRecord<C>
  >
  extends AbstractCListCObject<C, InsertArgs, Events>
  implements MovableCList<C, InsertArgs>, PositionedList
{
  protected readonly set: SetT;
  protected readonly createdPositionMessenger: CMessenger<
    [counter: number, startValueIndex: number, metadata: Uint8Array | null]
  >;
  protected readonly positionSource: ListPositionSource<
    MovableMutCListEntry<C, VarT>[]
  >;

  /**
   * variableConstructor should make sure that the
   * variable's initial value is initialValue, without
   * dispatching a Set event (i.e., pass it in VarT's
   * constructor, not as an operation, which wouldn't
   * make sense anyway).
   *
   * The set returned by setCallback must satisfy:
   * - Immediately after constructing with initial values,
   * values() returns them in the order corresponding to setInitialValuesArgs.
   */
  constructor(
    initToken: InitToken,
    setCallback: (
      setValueConstructor: (
        setValueInitToken: InitToken,
        ...setValueArgs: [ListPosition, InsertArgs]
      ) => MovableMutCListEntry<C, VarT>,
      setInitialValuesArgs: [ListPosition, InsertArgs][],
      setArgsSerializer: Serializer<[ListPosition, InsertArgs]>
    ) => Pre<SetT>,
    private readonly variableConstructor: (
      variableInitToken: InitToken,
      initialValue: ListPosition,
      variableSerializer: Serializer<ListPosition>
    ) => VarT,
    private readonly valueConstructor: (
      valueInitToken: InitToken,
      ...args: InsertArgs
    ) => C,
    initialValuesArgs: InsertArgs[] = [],
    argsSerializer: Serializer<InsertArgs> = DefaultSerializer.getInstance()
  ) {
    super(initToken);

    const setInitialValuesArgs: [ListPosition, InsertArgs][] =
      initialValuesArgs.map((args, index) => [["", 0, index + 1], args]);
    this.set = this.addChild(
      "",
      setCallback(
        this.setValueConstructor.bind(this),
        setInitialValuesArgs,
        new PairSerializer(ListPositionSerializer.instance, argsSerializer)
      )
    );

    // For initial values, note that this.set Add events don't get dispatched.
    // Thus we don't have to worry that positionSource is not yet created for
    // them.
    // Here we use the assumption (stated in constructor docs) that values()
    // are in order.
    this.positionSource = new ListPositionSource(
      this.runtime.replicaID,
      ArrayListItemManager.getInstance(),
      [...this.set]
    );

    this.createdPositionMessenger = this.addChild(
      "m",
      Pre(CMessenger)(CreatedListPositionSerializer.instance)
    );
    this.createdPositionMessenger.on("Message", (e) => {
      const [counter, startValueIndex, metadata] = e.message;
      const pos: ListPosition = [e.meta.sender, counter, startValueIndex];
      this.positionSource.receivePositions(pos, 1, metadata);
    });

    // Maintain positionSource's values as a cache of
    // of the currently set locations, mapping to
    // the corresponding entry.
    // Also dispatch our own events.
    this.set.on("Add", (event) => {
      this.positionSource.add(event.value.position.value, [event.value]);
      this.emit("Insert", {
        startIndex: this.positionSource.findPosition(
          event.value.position.value
        )[0],
        count: 1,
        meta: event.meta,
      });
    });
    this.set.on("Delete", (event) => {
      this.positionSource.delete(event.value.position.value);
      this.emit("Delete", {
        startIndex: this.positionSource.findPosition(
          event.value.position.value
        )[0],
        count: 1,
        deletedValues: [event.value.value],
        meta: event.meta,
      });
    });
  }

  private setValueConstructor(
    setValueInitToken: InitToken,
    position: ListPosition,
    args: InsertArgs
  ) {
    const entry = new MovableMutCListEntry<C, VarT>(
      setValueInitToken,
      (valueInitToken) => this.valueConstructor(valueInitToken, ...args),
      (variableInitToken) =>
        this.variableConstructor(
          variableInitToken,
          position,
          ListPositionSerializer.instance
        )
    );
    entry.position.on("Set", (event) => {
      // Maintain positionSource's values as a cache of
      // of the currently set locations, mapping to
      // the corresponding entry.
      // Also dispatch our own events.
      // Note that move is the only time variable.set
      // is called; setting the initial state is done
      // in the variableConstructor, not as a
      // variable.set operation, so it will not emit
      // a Set event.
      this.positionSource.delete(event.previousValue);
      this.positionSource.add(entry.position.value, [entry]);
      this.emit("Move", {
        startIndex: this.positionSource.findPosition(event.previousValue)[0],
        count: 1,
        resultingStartIndex: this.positionSource.findPosition(
          entry.position.value
        )[0],
        meta: event.meta,
      });
    });
    return entry;
  }

  insert(index: number, ...args: InsertArgs): C | undefined {
    const prevPos =
      index === 0 ? null : this.positionSource.getPosition(index - 1);
    // OPT: bulk inserts? Can just do createPositions once and deliver the
    // count on other side.
    const [counter, startValueIndex, metadata] =
      this.positionSource.createPositions(prevPos);
    const pos: ListPosition = [
      this.runtime.replicaID,
      counter,
      startValueIndex,
    ];
    this.createdPositionMessenger.sendMessage([
      counter,
      startValueIndex,
      metadata,
    ]);
    return this.set.add(pos, args)?.value;
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
    const toDelete = new Array<MovableMutCListEntry<C, VarT>>(count);
    for (let i = 0; i < count; i++) {
      const [item, offset] = this.positionSource.getItem(startIndex + i);
      toDelete[i] = item[offset];
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
    // Positions to insert at.
    const prevPos =
      insertionIndex === 0
        ? null
        : this.positionSource.getPosition(insertionIndex - 1);
    const [counter, startValueIndex, metadata] =
      this.positionSource.createPositions(prevPos);
    this.createdPositionMessenger.sendMessage([
      counter,
      startValueIndex,
      metadata,
    ]);
    // Values to move.
    const toMove = new Array<MovableMutCListEntry<C, VarT>>(count);
    for (let i = 0; i < count; i++) {
      // OPT: actually use items here.
      const [item, offset] = this.positionSource.getItem(startIndex + i);
      toMove[i] = item[offset];
    }
    // Move them.
    for (let i = 0; i < count; i++) {
      toMove[i].position.set([
        this.runtime.replicaID,
        counter,
        startValueIndex + i,
      ]);
    }
    // Return the new index of toMove[0].
    return this.positionSource.findPosition([
      this.runtime.replicaID,
      counter,
      startValueIndex,
    ])[0];
  }

  get(index: number): C {
    const [item, offset] = this.positionSource.getItem(index);
    return item[offset].value;
  }

  *values(): IterableIterator<C> {
    for (const item of this.positionSource.items()) {
      for (const entry of item) {
        yield entry.value;
      }
    }
  }

  get length(): number {
    return this.set.size;
  }

  getPosition(index: number): string {
    const pos = this.positionSource.getPosition(index);
    return JSON.stringify(pos);
  }

  findPosition(position: string): [geIndex: number, isPresent: boolean] {
    const pos = <ListPosition>JSON.parse(position);
    return this.positionSource.findPosition(pos);
  }

  indexOf(searchElement: C, fromIndex = 0): number {
    // Avoid errors from searchElement.parent in case it
    // is the root.
    if (isRuntime(searchElement.parent)) return -1;

    if (this.set.has(searchElement.parent as MovableMutCListEntry<C, VarT>)) {
      const position = (searchElement.parent as MovableMutCListEntry<C, VarT>)
        .position.value;
      const index = this.positionSource.findPosition(position)[0];
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

  /**
   * Returns a string "key" that uniquely identifies value and that does
   * not change when the value moves (either due to insertions/deletions
   * in front of it, or due to move operations).
   *
   * Useful for e.g. React lists - use the return value as the key.
   */
  getKey(value: C): string {
    return (<Collab>value.parent).name;
  }

  canGC(): boolean {
    // OPT: return true if not yet mutated.
    // Also, note in docs that this won't be true even if empty, due to
    // tombstones.
    return false;
  }

  protected saveObject(): Uint8Array {
    return this.positionSource.save();
  }

  protected loadObject(saveData: Optional<Uint8Array>) {
    if (!saveData.isPresent) return;

    // Note this.set is already loaded. Just need to load positionSource.

    // For filling in positionSource's values, create a map from positions
    // to entries.
    const entriesByPosition = new Map<
      string,
      Map<number, MovableMutCListEntry<C, VarT>>[]
    >();
    for (const entry of this.set) {
      const pos = entry.position.value;
      let bySender = entriesByPosition.get(pos[0]);
      if (bySender === undefined) {
        bySender = [];
        entriesByPosition.set(pos[0], bySender);
      }
      let byCounter = bySender[pos[1]];
      if (byCounter === undefined) {
        byCounter = new Map();
        bySender[pos[1]] = byCounter;
      }
      byCounter.set(pos[2], entry);
    }

    function nextItem(count: number, startPos: ListPosition) {
      const bySender = entriesByPosition.get(startPos[0])!;
      const byCounter = bySender[startPos[1]];
      const item = new Array<MovableMutCListEntry<C, VarT>>(count);
      for (let i = 0; i < count; i++) {
        item[i] = byCounter.get(startPos[2] + i)!;
      }
      return item;
    }

    this.positionSource.load(saveData.get(), nextItem);
  }
}

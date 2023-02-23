import {
  AbstractList_CObject,
  CMessenger,
  CObject,
  Collab,
  CollabEvent,
  DefaultSerializer,
  InitToken,
  int64AsNumber,
  isRuntime,
  ListEvent,
  ListEventsRecord,
  PairSerializer,
  Serializer,
} from "@collabs/core";
import { EntryStatusMessage } from "../../generated/proto_compiled";
import { CSet } from "../set";
import { CVar } from "../var";
import {
  ArrayListItemManager,
  CreatePositionsSerializer,
  ListPosition,
  ListPositionSource,
} from "./list_position_source";

/**
 * Event emitted by a [[CList]]`<C>`
 * when a range of values is moved.
 */
export interface ListMoveEvent<C> extends CollabEvent {
  index: number;
  previousIndex: number;
  values: C[];
}

/**
 * Events record for [[CList]]`<C>`.
 */
export interface ListExtendedEventsRecord<C> extends ListEventsRecord<C> {
  Insert: ListEvent<C> & { method: "insert" | "restore" };
  Delete: ListEvent<C> & { method: "delete" | "archive" };
  /**
   * Emitted when a range of values is moved.
   */
  Move: ListMoveEvent<C>;
}

interface EntryStatus {
  position: ListPosition;
  isPresent: boolean;
}

class EntryStatusSerializer implements Serializer<EntryStatus> {
  private constructor() {
    // Singleton.
  }

  static instance = new this();

  serialize(value: EntryStatus): Uint8Array {
    const message = EntryStatusMessage.create({
      sender: value.position[0],
      counter: value.position[1],
      valueIndex: value.position[2],
      notIsPresent: value.isPresent ? undefined : true,
    });
    return EntryStatusMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): EntryStatus {
    const decoded = EntryStatusMessage.decode(message);
    return {
      position: [
        decoded.sender,
        int64AsNumber(decoded.counter),
        decoded.valueIndex,
      ],
      isPresent: !decoded.notIsPresent,
    };
  }
}

class CListEntry<C extends Collab> extends CObject {
  readonly value: C;
  /**
   * Position and archival status.
   */
  readonly status: CVar<EntryStatus>;

  constructor(
    init: InitToken,
    valueCallback: (valueInit: InitToken) => C,
    initialStatus: EntryStatus
  ) {
    super(init);
    this.value = super.registerCollab("", valueCallback);
    this.status = super.registerCollab(
      "0",
      (init) => new CVar(init, initialStatus)
    );
  }
}

/**
 * A collaborative list with *mutable*
 * values of type C.
 *
 * Values are internally mutable.
 * Specifically, each value is its own [[Collab]], and
 * operations on that Collab are collaborative as usual.
 *
 * `CList<C>` has a similar API to `Array<C>`,
 * but it is mutated more like a linked list: instead of mutating
 * existing values, you [[insert]] and [[delete]]
 * list entries. Insertions and deletions
 * shift later entries, changing their indices, like
 * in collaborative text editing or
 * [Array.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).
 *
 * To insert values, you use the pattern described in
 * [dynamically-created Collabs](../../../guide/initialization.html#dynamically-created-collabs):
 * one user calls [[insert]] with `InsertArgs`; each
 * replica passes those `InsertArgs` to its
 * `valueConstructor`;
 * and `valueConstructor` returns the local copy of the new value Collab.
 *
 * When a value is deleted with [[delete]], it is deleted permanently and
 * can no longer be used; future and concurrent operations on that value
 * are ignored. Alternately, use [[archive]] and [[restore]].
 *
 * See also: [[CValueList]], [[CText]].
 */
export class CList<
  C extends Collab,
  InsertArgs extends unknown[]
> extends AbstractList_CObject<C, InsertArgs, ListExtendedEventsRecord<C>> {
  protected readonly set: CSet<CListEntry<C>, [EntryStatus, InsertArgs]>;
  protected readonly createdPositionMessenger: CMessenger<
    [counter: number, startValueIndex: number, metadata: Uint8Array | null]
  >;
  protected readonly positionSource: ListPositionSource<CListEntry<C>[]>;

  /**
   * Constructs a CList with the given `valueConstructor`.
   *
   * @param valueConstructor Callback used to construct a
   * value Collab with the given [[InitToken]] and arguments to [[insert]]. See [dynamically-created Collabs](../../../guide/initialization.html#dynamically-created-collabs)
   * for example usage.
   * @param options.argsSerializer A serializer for `InsertArgs` as an array.
   * Defaults to [[DefaultSerializer]].
   */
  constructor(
    init: InitToken,
    private readonly valueConstructor: (
      valueInit: InitToken,
      ...args: InsertArgs
    ) => C,
    options: { argsSerializer?: Serializer<InsertArgs> } = {}
  ) {
    super(init);

    const argsSerializer =
      options.argsSerializer ?? DefaultSerializer.getInstance();

    this.set = this.registerCollab(
      "",
      (init) =>
        new CSet(init, this.entryConstructor.bind(this), {
          argsSerializer: new PairSerializer(
            EntryStatusSerializer.instance,
            argsSerializer
          ),
        })
    );

    // For initial values, note that this.set Add events don't get dispatched.
    // Thus we don't have to worry that positionSource is not yet created for
    // them.
    // Here we use the assumption (stated in constructor docs) that values()
    // are in order.
    this.positionSource = new ListPositionSource(
      this.runtime.replicaID,
      ArrayListItemManager.getInstance(),
      { initialItem: [...this.set] }
    );

    this.createdPositionMessenger = this.registerCollab(
      "m",
      (init) =>
        new CMessenger(init, {
          messageSerializer: CreatePositionsSerializer.instance,
        })
    );
    this.createdPositionMessenger.on("Message", (e) => {
      const [counter, startValueIndex, metadata] = e.message;
      const pos: ListPosition = [e.meta.senderID, counter, startValueIndex];
      this.positionSource.receivePositions(pos, 1, metadata);
    });

    // Maintain positionSource's values as a cache of
    // of the currently set locations, mapping to
    // the corresponding entry.
    // Also dispatch our own events.
    this.set.on("Add", (event) => {
      const position = event.value.status.value.position;
      this.positionSource.add(position, [event.value]);
      this.emit("Insert", {
        index: this.positionSource.indexOfPosition(position),
        values: [event.value.value],
        positions: [JSON.stringify(position)],
        method: "insert",
        meta: event.meta,
      });
    });
    this.set.on("Delete", (event) => {
      const status = event.value.status.value;
      if (status.isPresent) {
        const index = this.positionSource.indexOfPosition(status.position);
        this.positionSource.delete(status.position);
        this.emit("Delete", {
          index,
          values: [event.value.value],
          positions: [JSON.stringify(status.position)],
          method: "delete",
          meta: event.meta,
        });
      }
      // else archived -> deleted; no new event.
      // A value that needs to know when it is deleted can override Collab.finalize.
    });
  }

  private entryConstructor(
    entryInit: InitToken,
    initialStatus: EntryStatus,
    args: InsertArgs
  ) {
    const entry = new CListEntry<C>(
      entryInit,
      (valueInit) => this.valueConstructor(valueInit, ...args),
      initialStatus
    );
    // OPT: avoid creating a closure per entry here?
    entry.status.on("Set", (event) => {
      // Maintain positionSource's values as a cache of
      // of the currently set locations, mapping to
      // the corresponding entry.
      // Also dispatch our own events.
      // Note that for the initial position, this is done
      // in set's Add event listener, not here.
      // Also note that entry is always non-deleted, since
      // restore() skips deleted values.
      if (event.value.isPresent && !event.previousValue.isPresent) {
        // entry was un-archived.
        this.positionSource.add(event.value.position, [entry]);
        this.emit("Insert", {
          index: this.positionSource.indexOfPosition(event.value.position),
          values: [entry.value],
          positions: [JSON.stringify(event.value.position)],
          method: "restore",
          meta: event.meta,
        });
      } else if (!event.value.isPresent && event.previousValue.isPresent) {
        // entry was archived.
        const index = this.positionSource.indexOfPosition(event.value.position);
        this.positionSource.delete(event.value.position);
        this.emit("Delete", {
          index,
          values: [entry.value],
          positions: [JSON.stringify(event.value.position)],
          method: "archive",
          meta: event.meta,
        });
      } else if (event.value.isPresent) {
        // status changed, but isPresent did not, so position must have changed:
        // entry was moved.
        // Note that we only do this when the value is present (not archived).
        const previousIndex = this.positionSource.indexOfPosition(
          event.previousValue.position
        );
        this.positionSource.delete(event.previousValue.position);
        this.positionSource.add(event.value.position, [entry]);
        this.emit("Move", {
          index: this.positionSource.indexOfPosition(event.value.position),
          previousIndex,
          values: [entry.value],
          meta: event.meta,
        });
      }
    });
    return entry;
  }

  /**
   * Inserts a value at the given index using args.
   *
   * All values currently at or after `index` shift
   * to the right, incrementing their indices.
   *
   * The args are broadcast to all replicas in serialized form.
   * Every replica then passes them to `valueConstructor` to construct the actual
   * value of type C, a new Collab that is collaborative as usual.
   *
   * @param index The insertion index in the range
   * `[0, this.length]`. If `this.length`, the value
   * is appended to the end of the list.
   * @return The inserted value, or undefined if it is not
   * constructed immediately.
   * @throws If index is not in `[0, this.length]`.
   */
  insert(index: number, ...args: InsertArgs): C {
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
    return this.set.add({ position: pos, isPresent: true }, args).value;
  }

  /**
   * Delete `count` values starting at `startIndex`, i.e., values
   * `[startIndex, startIndex + count - 1)`.
   *
   * All later values shift to the left,
   * decreasing their indices by `count`.
   *
   * The values are deleted permanently and
   * can no longer be used; future and concurrent operations on those values
   * are ignored. Local operations will succeed but will not affect
   * remote replicas. The values can perform cleanup in their
   * [[Collab.finalize]] methods.
   *
   * See also: [[archive]], [[CSet.delete]].
   */
  delete(startIndex: number, count = 1): void {
    if (count < 0 || !Number.isInteger(count)) {
      throw new Error(`invalid count: ${count}`);
    }
    // Get the values to delete.
    const toDelete = new Array<CListEntry<C>>(count);
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
   * Archives `count` values starting at `startIndex`, i.e., values
   * `[startIndex, startIndex + count - 1)`.
   *
   * All later values shift to the left,
   * decreasing their indices by `count`.
   *
   * Unlike [[delete]], archived merely marks values as not present.
   * Archived values can still perform collaborative operations,
   * and they can be made present again with [[restore]].
   *
   * @param count The number of values to archive.
   * Defaults to 1 (archive the value at `startIndex` only).
   *
   * @throws if `startIndex < 0` or
   * `startIndex + count >= this.length`.
   */
  archive(startIndex: number, count = 1): void {
    if (count < 0 || !Number.isInteger(count)) {
      throw new Error(`invalid count: ${count}`);
    }
    // Get the values to archive.
    const toArchive = new Array<CListEntry<C>>(count);
    for (let i = 0; i < count; i++) {
      const [item, offset] = this.positionSource.getItem(startIndex + i);
      toArchive[i] = item[offset];
    }
    // Archive them. We "remember" the current position for when they are
    // restored.
    for (const value of toArchive) {
      value.status.value = {
        position: value.status.value.position,
        isPresent: false,
      };
    }
  }

  /**
   * Restores the given value, marking it as present in the list.
   *
   * The value re-appears at its previous position, unless
   * moved by [[move]].
   * All values after that position shift to the right,
   * incrementing their indices.
   *
   * If value is deleted (not just archived), this
   * method has no effect.
   */
  restore(value: C): void {
    const entry = value.parent as CListEntry<C>;
    if (!this.set.has(entry)) {
      // Already deleted.
      return;
    }
    entry.status.value = {
      position: entry.status.value.position,
      isPresent: true,
    };
  }

  /**
   * Moves `count` values from `startIndex` to `insertionIndex`.
   *
   * That is, the range of values at `[startIndex, startIndex + count - 1)` is moved to the position
   * *currently* at `insertionIndex`.
   *
   * Other values shift to accommodate the move.
   *
   * Collaborative operations on the values continue to work
   * normally, even if concurrent to the move.
   *
   * @param count The number of values to move.
   * Defaults to 1 (move the value at `startIndex` only).
   * @returns The new index of the first moved value.
   * This will be less then `insertionIndex` if `startIndex < insertionIndex`.
   * @throws if `startIndex < 0` or
   * `startIndex + count >= this.length`.
   */
  move(startIndex: number, insertionIndex: number, count = 1): number {
    if (count < 0 || !Number.isInteger(count)) {
      throw new Error(`invalid count: ${count}`);
    }
    if (count === 0) return insertionIndex;

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
    const toMove = new Array<CListEntry<C>>(count);
    for (let i = 0; i < count; i++) {
      // OPT: actually use items here.
      const [item, offset] = this.positionSource.getItem(startIndex + i);
      toMove[i] = item[offset];
    }
    // Move them.
    for (let i = 0; i < count; i++) {
      toMove[i].status.value = {
        position: [this.runtime.replicaID, counter, startValueIndex + i],
        isPresent: true,
      };
    }
    // Return the new index of toMove[0].
    return this.positionSource.indexOfPosition([
      this.runtime.replicaID,
      counter,
      startValueIndex,
    ]);
  }

  get(index: number): C {
    const [item, offset] = this.positionSource.getItem(index);
    return item[offset].value;
  }

  *entries(): IterableIterator<[index: number, position: string, value: C]> {
    let i = 0;
    for (const [pos, length, item] of this.positionSource.itemsAndPositions()) {
      for (let j = 0; j < length; j++) {
        yield [i, JSON.stringify(pos), item[j].value];
        pos[2]++;
        i++;
      }
    }
  }

  /**
   * Returns an iterator of [position, value] pairs for every
   * archived but non-deleted value in the list.
   *
   * The iteration order is NOT eventually consistent:
   * it is unrelated to positions and
   * may differ on replicas with the same state.
   */
  *archivedEntries(): IterableIterator<[position: string, value: C]> {
    for (const entry of this.set) {
      if (!entry.status.value.isPresent) {
        yield [JSON.stringify(entry.status.value.position), entry.value];
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

  indexOfPosition(
    position: string,
    searchDir: "none" | "left" | "right" = "none"
  ): number {
    const pos = <ListPosition>JSON.parse(position);
    return this.positionSource.indexOfPosition(pos, searchDir);
  }

  indexOf(searchElement: C, fromIndex = 0): number {
    // Avoid errors from searchElement.parent in case it
    // is the root.
    if (isRuntime(searchElement.parent)) return -1;

    const entry = searchElement.parent as CListEntry<C>;
    if (this.set.has(entry) && entry.status.value.isPresent) {
      const index = this.positionSource.indexOfPosition(
        entry.status.value.position
      );
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

  positionOf(searchElement: C): string | undefined {
    // Avoid errors from searchElement.parent in case it
    // is the root.
    if (isRuntime(searchElement.parent)) return undefined;

    const entry = searchElement.parent as CListEntry<C>;
    if (this.set.has(entry) && entry.status.value.isPresent) {
      return JSON.stringify(entry.status.value.position);
    }
    return undefined;
  }

  includes(searchElement: C, fromIndex = 0): boolean {
    return this.indexOf(searchElement, fromIndex) !== -1;
  }

  protected saveObject(): Uint8Array | null {
    return this.positionSource.save();
  }

  protected loadObject(savedState: Uint8Array | null) {
    // Note this.set is already loaded. Just need to load positionSource.
    // For merging: will have problems b/c this is not in sync with set Add events.

    // For filling in positionSource's values, create a map from positions
    // to entries.
    const entriesByPosition = new Map<string, Map<number, CListEntry<C>>[]>();
    for (const entry of this.set) {
      const pos = entry.status.value.position;
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
      const item = new Array<CListEntry<C>>(count);
      for (let i = 0; i < count; i++) {
        item[i] = byCounter.get(startPos[2] + i)!;
      }
      return item;
    }

    this.positionSource.load(<Uint8Array>savedState, nextItem);
  }
}

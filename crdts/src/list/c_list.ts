import {
  AbstractList_CObject,
  CListEvent,
  CListEventsRecord,
  CMessenger,
  CObject,
  Collab,
  CollabEvent,
  DefaultSerializer,
  InitToken,
  int64AsNumber,
  isRuntime,
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

export interface CListMoveEvent<T> extends CollabEvent {
  index: number;
  previousIndex: number;
  values: T[];
}

export interface CListImplEventsRecord<T> extends CListEventsRecord<T> {
  Insert: CListEvent<T> & { method: "insert" | "restore" };
  /**
   * Note: if an archived value is deleted, you'll get a Delete event with
   * method: "delete" but index -1, since it didn't have a previous index.
   */
  Delete: CListEvent<T> & { method: "delete" | "archive" };
  Move: CListMoveEvent<T>;
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
    this.value = super.addChild("", valueCallback);
    this.status = super.addChild("0", (init) => new CVar(init, initialStatus));
  }
}

export class CList<
  C extends Collab,
  InsertArgs extends unknown[]
> extends AbstractList_CObject<C, InsertArgs, CListImplEventsRecord<C>> {
  protected readonly set: CSet<CListEntry<C>, [EntryStatus, InsertArgs]>;
  protected readonly createdPositionMessenger: CMessenger<
    [counter: number, startValueIndex: number, metadata: Uint8Array | null]
  >;
  protected readonly positionSource: ListPositionSource<CListEntry<C>[]>;

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

    this.set = this.addChild(
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

    this.createdPositionMessenger = this.addChild(
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
      let index: number;
      if (status.isPresent) {
        index = this.positionSource.indexOfPosition(status.position);
        this.positionSource.delete(status.position);
      } else {
        // archived -> deleted. In this case, there is no index; use -1.
        index = -1;
      }
      this.emit("Delete", {
        index,
        values: [event.value.value],
        positions: [JSON.stringify(status.position)],
        method: "delete",
        meta: event.meta,
      });
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
    return this.set.add({ position: pos, isPresent: true }, args)?.value;
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
   * Note: event will show as singleton archives.
   *
   * @param startIndex [description]
   * @param count=1    [description]
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

  restore(value: C): void {
    const entry = value.parent as CListEntry<C>;
    entry.status.value = {
      position: entry.status.value.position,
      isPresent: true,
    };
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
   * No particular order.
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

  canGC(): boolean {
    // OPT: return true if not yet mutated.
    // Also, note in docs that this won't be true even if empty, due to
    // tombstones.
    return false;
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

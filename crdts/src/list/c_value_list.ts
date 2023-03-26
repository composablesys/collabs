import {
  AbstractList_CObject,
  ArraySerializer,
  CMessenger,
  DefaultSerializer,
  InitToken,
  ListEvent,
  Position,
  Serializer,
  StringSerializer,
  Uint8ArraySerializer,
  UpdateMeta,
} from "@collabs/core";
import {
  IValueListInsertMessage,
  ValueListInsertMessage,
} from "../../generated/proto_compiled";
import { CPositionSource, PositionSourceLoadEvent } from "./c_position_source";
import { LocalList } from "./local_list";

// TODO: PositionSource optional input? In case you want
// multiple lists on the same source. Same for CList.

/**
 * A collaborative list with values of type T.
 *
 * `CValueList<T>` has a similar API to `Array<T>`,
 * but it is mutated more like a linked list: instead of mutating
 * existing values, you [[insert]] and [[delete]]
 * list entries. Insertions and deletions
 * shift later entries, changing their indices, like
 * in collaborative text editing or
 * [Array.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).
 *
 * Values must be internally immutable;
 * mutating a value internally will not change it on
 * other replicas. If you need to mutate values internally,
 * instead use a [[CList]].
 *
 * *Positions* are described in [IList](../../core/interfaces/IList.html).
 *
 * See also: [[CList]], [[CText]].
 *
 * @typeParam T The value type.
 */
export class CValueList<T> extends AbstractList_CObject<T, [T]> {
  private readonly positionSource: CPositionSource;
  private readonly insertMessenger: CMessenger<Uint8Array>;
  private readonly deleteMessenger: CMessenger<Position>;

  private readonly list: LocalList<T>;

  protected readonly valueSerializer: Serializer<T>;
  protected readonly valueArraySerializer: Serializer<T[]>;

  private sourceLoadEvent: PositionSourceLoadEvent | undefined = undefined;

  /**
   * Constructs a CValueList.
   *
   * @param options.valueSerializer Serializer for values. Defaults to [[DefaultSerializer]].
   * @param options.valueArraySerializer Serializer
   * for an array of values, used for bulk operations and saved states.
   * Defaults to using `valueSerializer` on each value.
   */
  constructor(
    init: InitToken,
    options: {
      valueSerializer?: Serializer<T>;
      valueArraySerializer?: Serializer<T[]>;
    } = {}
  ) {
    super(init);

    this.valueSerializer =
      options.valueSerializer ?? DefaultSerializer.getInstance();
    this.valueArraySerializer =
      options.valueArraySerializer !== undefined
        ? options.valueArraySerializer
        : ArraySerializer.getInstance(this.valueSerializer);

    this.positionSource = super.registerCollab(
      "",
      (init) => new CPositionSource(init)
    );
    this.list = new LocalList(this.positionSource);

    this.positionSource.on("Load", (e) => {
      this.sourceLoadEvent = e;
    });

    // OPT: Proper primitive CRDT, instead of two messengers?
    this.insertMessenger = super.registerCollab(
      "0",
      (init) =>
        new CMessenger(init, {
          messageSerializer: Uint8ArraySerializer.instance,
        })
    );
    this.deleteMessenger = super.registerCollab(
      "1",
      (init) =>
        new CMessenger(init, { messageSerializer: StringSerializer.instance })
    );

    // Operation handlers.
    this.insertMessenger.on("Message", (e) => {
      const decoded = ValueListInsertMessage.decode(e.message);
      const values =
        decoded.data === "value"
          ? [this.valueSerializer.deserialize(decoded.value)]
          : this.valueArraySerializer.deserialize(decoded.values);
      const positions = this.list.setNewSequence(decoded.position, values);
      // Here we exploit forwards non-interleaving, which guarantees
      // that the values are contiguous.
      this.emit("Insert", {
        // OPT: avoid redundant position decode.
        index: this.list.indexOfPosition(decoded.position),
        values,
        positions,
        meta: e.meta,
      });
    });
    this.deleteMessenger.on("Message", (e) => {
      // OPT: combine has/get calls?
      if (this.list.delete(e.message)) {
        const value = this.list.getByPosition(e.message)!;
        const index = this.list.indexOfPosition(e.message);
        this.emit("Delete", {
          index,
          values: [value],
          positions: [e.message],
          meta: e.meta,
        });
      }
    });
  }

  // OPT: optimize bulk methods.

  /**
   * Inserts values at the given index.
   *
   * All values currently at or after `index` shift
   * to the right, increasing their indices by `values.length`.
   *
   * @param index The insertion index in the range
   * `[0, this.length]`. If `this.length`, the values
   * are appended to the end of the list.
   * @return The first inserted value, or undefined if there are no values.
   * @throws If index is not in `[0, this.length]`.
   */
  insert(index: number, value: T): T;
  insert(index: number, ...values: T[]): T | undefined;
  insert(index: number, ...values: T[]): T | undefined {
    if (values.length === 0) return undefined;

    const prevPos = index === 0 ? null : this.list.getPosition(index - 1);
    const position = this.positionSource.encode(
      ...this.positionSource.createPositions(prevPos, values.length)
    );

    // OPT: Avoid sending the position again (redundant with createPositions).
    // Perhaps use the last created position (w/ CPositionSource Create event)?
    const insertMessage: IValueListInsertMessage = {
      position,
    };
    if (values.length === 1) {
      insertMessage.value = this.valueSerializer.serialize(values[0]);
    } else {
      insertMessage.values = this.valueArraySerializer.serialize(values);
    }
    this.insertMessenger.sendMessage(
      ValueListInsertMessage.encode(insertMessage).finish()
    );

    return values[0];
  }

  delete(startIndex: number, count = 1): void {
    if (startIndex < 0) {
      throw new Error(`startIndex out of bounds: ${startIndex}`);
    }
    if (startIndex + count > this.length) {
      throw new Error(
        `(startIndex + count) out of bounds: ${startIndex} + ${count} (length: ${this.length})`
      );
    }

    // OPT: native range deletes? E.g. compress waypoint valueIndex ranges.
    // OPT: optimize range iteration (ListView.slice for positions?)
    // Delete from back to front, so indices make sense.
    for (let i = startIndex + count - 1; i >= startIndex; i--) {
      this.deleteMessenger.sendMessage(this.list.getPosition(i));
    }
  }

  get(index: number): T {
    return this.list.get(index);
  }

  values(): IterableIterator<T> {
    return this.list.values();
  }

  get length(): number {
    return this.list.length;
  }

  // Override alias insert methods so we can accept
  // bulk values.

  /**
   * Inserts values at the end of the list.
   * Equivalent to `this.insert(this.length, ...values)`.
   */
  push(value: T): T;
  push(...values: T[]): T | undefined;
  push(...values: T[]): T | undefined {
    return this.insert(this.length, ...values);
  }

  /**
   * Inserts values at the beginning of the list.
   * Equivalent to `this.insert(0, ...values)`.
   */
  unshift(value: T): T;
  unshift(...values: T[]): T | undefined;
  unshift(...values: T[]): T | undefined {
    return this.insert(0, ...values);
  }

  /**
   * Deletes and inserts values like [Array.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).
   *
   * If `deleteCount` is provided, this method first deletes
   * `deleteCount` values starting at `startIndex`.
   * Next, this method inserts `values` at `startIndex`.
   *
   * All values currently at or after `startIndex + deleteCount`
   * shift to accommodate the change in length.
   */
  splice(startIndex: number, deleteCount?: number, ...values: T[]): void {
    // Sanitize deleteCount
    if (deleteCount === undefined || deleteCount > this.length - startIndex)
      deleteCount = this.length - startIndex;
    else if (deleteCount < 0) deleteCount = 0;
    // Delete then insert
    this.delete(startIndex, deleteCount);
    if (values.length > 0) {
      this.insert(startIndex, ...values);
    }
  }

  slice(start?: number, end?: number): T[] {
    return this.list.slice(start, end);
  }

  getPosition(index: number): Position {
    return this.list.getPosition(index);
  }

  indexOfPosition(
    position: Position,
    searchDir: "none" | "left" | "right" = "none"
  ): number {
    return this.list.indexOfPosition(position, searchDir);
  }

  hasPosition(position: Position): boolean {
    return this.list.hasPosition(position);
  }

  getByPosition(position: Position): T | undefined {
    return this.list.getByPosition(position);
  }

  entries(): IterableIterator<[index: number, position: Position, value: T]> {
    return this.list.entries();
  }

  /**
   * Returns a new instance of [[LocalList]] that uses this
   * CList's [[Position]]s, initially empty.
   *
   * Changes to the returned LocalList's values
   * do not affect this CValueList's values, and vice-versa.
   * However, the set of allowed positions does increase to
   * match this CValueList: you may use a CValueList position in
   * the returned LocalList even if that position was created
   * after the call to `newLocalList`.
   *
   * @typeParam U The value type of the returned list.
   * Defaults to T.
   */
  newLocalList<U = T>(): LocalList<U> {
    return new LocalList(this.positionSource);
  }

  protected saveObject(): Uint8Array {
    return this.list.save(this.valueArraySerializer);
  }

  protected loadObject(savedState: Uint8Array, meta: UpdateMeta): void {
    if (this.list.inInitialState) {
      // Shortcut: No need to merge, just load the state directly.
      this.list.load(savedState, this.valueArraySerializer);
      const values = new Array<T>(this.list.length);
      const positions = new Array<Position>(this.list.length);
      for (const [i, position, value] of this.list.entries()) {
        values[i] = value;
        positions[i] = position;
      }
      // OPT: only materialize positions on request? Lot of string encoding, memory.
      this.emit("Insert", { index: 0, values, positions, meta });
    } else {
      // We need to merge savedState with our existing state.
      const remote = new LocalList<T>(this.positionSource);
      remote.load(savedState, this.valueArraySerializer);
      if (this.sourceLoadEvent === undefined) {
        throw new Error("Internal error: this.sourceLoadEvent is undefined");
      }
      const sourceLoadEvent = this.sourceLoadEvent;
      this.sourceLoadEvent = undefined;

      // 1. Delete values whose positions were known to the remote CPositionSource
      // but not present in the remote list.
      // OPT: do changes by-waypoint instead, for shorter loops, optimized set/delete,
      // and fewer events.
      const deleteEvents: ListEvent<T>[] = [];
      for (const [index, position, value] of this.list.entries()) {
        if (
          !sourceLoadEvent.isNewRemotely(position) &&
          !remote.hasPosition(position)
        ) {
          // Wait to make changes until the end, to avoid modifications during iterators.
          deleteEvents.push({
            index,
            positions: [position],
            values: [value],
            meta,
          });
        }
      }
      // Do deletions in reverse order so the original indices are accurate.
      // (Not actually necessary - could manually adjust indices.)
      deleteEvents.reverse();
      for (const e of deleteEvents) {
        this.list.delete(e.positions[0]);
        // TODO: live events like this, or all at end? Note in docs regardless.
        this.emit("Delete", e);
      }

      // 2. Add values from remote whose positions were not known to the local
      // CPositionSource.
      const insertEvents: ListEvent<T>[] = [];
      let insertedSoFar = 0;
      for (const [, position, value] of remote.entries()) {
        // OPT: use waypoints to do bulk inserts. Need to be careful about missing
        // (remotely-deleted) elements, though.
        if (sourceLoadEvent.isNewLocally(position)) {
          // TODO: is there faster way to compute local indices for events?
          insertEvents.push({
            index: this.list.indexOfPosition(position, "right") + insertedSoFar,
            positions: [position],
            values: [value],
            meta,
          });
          insertedSoFar++;
        }
      }

      // Do insertions in order, so that get(index) works even if
      // you wait to handle all events until loading finishes.
      for (const e of insertEvents) {
        this.list.set(e.positions[0], e.values[0]);
        this.emit("Insert", e);
      }
    }
  }
}

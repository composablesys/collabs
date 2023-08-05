import {
  AbstractList_CObject,
  ArraySerializer,
  CMessenger,
  DefaultSerializer,
  InitToken,
  ListEvent,
  Position,
  SavedStateMeta,
  SavedStateTree,
  Serializer,
  StringSerializer,
  nonNull,
} from "@collabs/core";
import { CPositionSource, PositionSourceLoadEvent } from "./c_position_source";
import { LocalList } from "./local_list";

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
 * It is *not* safe to modify a CValueList while iterating over it. The iterator
 * will attempt to throw an exception if it detects such modification,
 * but this is not guaranteed.
 *
 * See also: [[CList]], [[CText]], [[CRichText]].
 *
 * @typeParam T The value type.
 */
export class CValueList<T> extends AbstractList_CObject<T, [T]> {
  private readonly positionSource: CPositionSource;
  private readonly deleteMessenger: CMessenger<Position>;

  private readonly list: LocalList<T>;

  protected readonly valueSerializer: Serializer<T>;
  protected readonly valueArraySerializer: Serializer<T[]>;

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

    this.deleteMessenger = super.registerCollab(
      "1",
      (init) =>
        new CMessenger(init, { messageSerializer: StringSerializer.instance })
    );

    // Operation handlers.
    this.positionSource.on("Create", (e) => {
      // e.info is valuesSer from this.insert.
      const info = nonNull(e.info);
      const values =
        e.count === 1
          ? [this.valueSerializer.deserialize(info)]
          : this.valueArraySerializer.deserialize(info);
      this.list.setCreated(e, values);
      // Here we exploit forwards non-interleaving, which guarantees
      // that the values are contiguous.
      this.emit("Insert", {
        index: this.list.indexOfPosition(e.positions[0]),
        values,
        positions: e.positions,
        meta: e.meta,
      });
    });
    this.deleteMessenger.on("Message", (e) => {
      // OPT: combine calls?
      if (this.list.hasPosition(e.message)) {
        // Use ! instead of nonNull because T might allow null.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const value = this.list.getByPosition(e.message)!;
        const index = this.list.indexOfPosition(e.message);
        this.list.delete(e.message);
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
    if (index < 0 || index > this.length) {
      throw new Error(`Index out of bounds: ${index} (length: ${this.length})`);
    }

    if (values.length === 0) return undefined;

    const prevPos = index === 0 ? null : this.list.getPosition(index - 1);
    // We pass valueSer in the info field, which shows up on the Create event.
    const valuesSer =
      values.length === 1
        ? this.valueSerializer.serialize(values[0])
        : this.valueArraySerializer.serialize(values);
    this.positionSource.createPositions(prevPos, values.length, valuesSer);

    return values[0];
  }

  delete(index: number, count = 1): void {
    if (index < 0) {
      throw new Error(`index out of bounds: ${index}`);
    }
    if (index + count > this.length) {
      throw new Error(
        `(index + count) out of bounds: ${index} + ${count} (length: ${this.length})`
      );
    }

    // OPT: native range deletes? E.g. compress waypoint valueIndex ranges.
    // OPT: optimize range iteration (ListView.slice for positions?)
    // Delete from back to front, so indices make sense.
    for (let i = index + count - 1; i >= index; i--) {
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
   * `deleteCount` values starting at `start`.
   * Next, this method inserts `values` at `start`.
   *
   * All values currently at or after `start + deleteCount`
   * shift to accommodate the change in length.
   *
   * @returns The deleted values.
   */
  splice(start: number, deleteCount?: number, ...values: T[]): T[] {
    // Sanitize start.
    if (start < 0) start += this.length;
    if (start < 0) start = 0;
    if (start > this.length) start = this.length;

    // Sanitize deleteCount.
    if (deleteCount === undefined || deleteCount > this.length - start)
      deleteCount = this.length - start;
    else if (deleteCount < 0) deleteCount = 0;

    // Delete then insert.
    const ret = this.slice(start, start + deleteCount);
    this.delete(start, deleteCount);
    if (values.length > 0) {
      this.insert(start, ...values);
    }
    return ret;
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

  positions(): IterableIterator<Position> {
    return this.list.positions();
  }

  entries(): IterableIterator<[index: number, value: T, position: Position]> {
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

  save(): SavedStateTree {
    const ans = super.save();
    ans.self = this.list.save(this.valueArraySerializer);
    return ans;
  }

  load(savedStateTree: SavedStateTree | null, meta: SavedStateMeta): void {
    // None of our children use null saved states, so just return.
    if (savedStateTree === null) return;

    let sourceLoadEvent!: PositionSourceLoadEvent;
    this.positionSource.on(
      "Load",
      (e) => {
        sourceLoadEvent = e;
      },
      { once: true }
    );
    super.load(savedStateTree, meta);

    const savedState = nonNull(savedStateTree.self);

    if (this.list.inInitialState) {
      // Shortcut: No need to merge, just load the state directly.
      this.list.load(savedState, this.valueArraySerializer);
      if (this.list.length > 0) {
        const values = new Array<T>(this.list.length);
        const positions = new Array<Position>(this.list.length);
        for (const [i, value, position] of this.list.entries()) {
          values[i] = value;
          positions[i] = position;
        }
        // It's important that we don't do this when the length is zero:
        // 0-length Insert events confuse CRichText and possibly others.
        this.emit("Insert", { index: 0, values, positions, meta });
      }
    } else {
      // We need to merge savedState with our existing state.
      const remote = new LocalList<T>(this.positionSource);
      remote.load(savedState, this.valueArraySerializer);

      // 1. Delete values whose positions were known to the remote CPositionSource
      // but not present in the remote list.
      // OPT: do changes by-waypoint instead, for shorter loops, optimized set/delete,
      // and fewer events.
      const deleteEvents: ListEvent<T>[] = [];
      for (const [index, value, position] of this.list.entries()) {
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
      deleteEvents.reverse();
      for (const e of deleteEvents) {
        this.list.delete(e.positions[0]);
        this.emit("Delete", e);
      }

      // 2. Add values from remote whose positions were not known to the local
      // CPositionSource.
      const insertEvents: ListEvent<T>[] = [];
      let insertedSoFar = 0;
      for (const [, value, position] of remote.entries()) {
        // OPT: use waypoints to do bulk inserts. Need to be careful about: missing
        // (remotely-deleted) elements; indices that skip over child waypoints.
        // Also, double-check that CRichText's Insert event handler still works
        // (it assumes no existing positions in the middle of an Insert event's values).
        if (sourceLoadEvent.isNewLocally(position)) {
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

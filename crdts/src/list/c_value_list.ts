import {
  AbstractList_CObject,
  ArraySerializer,
  CMessenger,
  DefaultSerializer,
  InitToken,
  Position,
  Serializer,
  StringSerializer,
} from "@collabs/core";
import {
  CValueListSave,
  ICValueListSave,
} from "../../generated/proto_compiled";
import { CPositionSource } from "./c_position_source";
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
  private readonly waypointStore: CPositionSource;
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
      options.valueSerializer !== undefined
        ? ArraySerializer.getInstance(options.valueSerializer)
        : DefaultSerializer.getInstance();

    this.waypointStore = super.registerCollab(
      "",
      (init) => new CPositionSource(init)
    );
    this.list = new LocalList(this.waypointStore);

    this.deleteMessenger = super.registerCollab(
      "0",
      (init) =>
        new CMessenger(init, { messageSerializer: StringSerializer.instance })
    );

    // Operation handlers.
    this.waypointStore.on("Create", (e) => {
      // Ignore events during loading; loadPrimitive updates this.list instead.
      if (e.meta.updateType === "savedState") return;

      const values =
        e.positions.length === 1
          ? [this.valueSerializer.deserialize(e.info!)]
          : this.valueArraySerializer.deserialize(e.info!);
      for (let i = 0; i < values.length; i++) {
        this.list.set(e.positions[i], values[i]);
      }
      // Here we exploit forwards non-interleaving, which guarantees
      // that the values are contiguous.
      this.emit("Insert", {
        // OPT: avoid redundant position decode
        index: this.list.indexOfPosition(e.positions[0]),
        values,
        positions: e.positions,
        meta: e.meta,
      });
    });
    this.deleteMessenger.on("Message", (e) => {
      // OPT: combine has/get calls
      if (this.list.hasPosition(e.message)) {
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

    // Use info to encode the values.
    const info =
      values.length === 1
        ? this.valueSerializer.serialize(values[0])
        : this.valueArraySerializer?.serialize(values);

    const prevPos = index === 0 ? null : this.list.getPosition(index - 1);
    this.waypointStore.createPositions(prevPos, values.length, info);

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
    return new LocalList(this.waypointStore);
  }

  protected saveObject(): Uint8Array {
    const imessage: ICValueListSave = {
      positionSourceSave: this.positionSource.save(),
    };
    if (this.valueArraySerializer !== undefined) {
      imessage.valuesArraySave = this.valueArraySerializer.serialize(
        this.slice()
      );
    } else {
      imessage.valuesSave = new Array(this.length);
      let i = 0;
      for (const value of this.values()) {
        imessage.valuesSave[i] = this.valueSerializer.serialize(value);
        i++;
      }
    }
    const message = CValueListSave.create(imessage);
    return CValueListSave.encode(message).finish();
  }

  // TODO: rewrite; events; shortcut case: initial load
  protected loadObject(savedState: Uint8Array): void {
    const decoded = CValueListSave.decode(savedState);
    let values: T[];
    if (this.valueArraySerializer !== undefined) {
      values = this.valueArraySerializer.deserialize(decoded.valuesArraySave);
    } else {
      values = decoded.valuesSave.map((value) =>
        this.valueSerializer.deserialize(value)
      );
    }
    let index = 0;
    this.positionSource.load(decoded.positionSourceSave, (count) => {
      const ans = values.slice(index, index + count);
      index += count;
      return ans;
    });
  }
}

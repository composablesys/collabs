import {
  CObject,
  CollabEvent,
  CollabEventsRecord,
  ICursorList,
  InitToken,
  Position,
  StringSerializer,
} from "@collabs/core";
import { CValueList } from "./c_value_list";
import { charArraySerializer } from "./char_array_serializer";
import { LocalList } from "./local_list";

/**
 * Event emitted by [[CText]] when a range of characters (values)
 * is inserted or deleted.
 */
export interface TextEvent extends CollabEvent {
  /**
   * The index of the first affected character.
   * Collectively, the characters have indices
   * `index` through `index + values.length - 1`.
   *
   * For [[TextEventsRecord.Delete]] events, this is the *former*
   * index of the first deleted character.
   */
  index: number;
  /**
   * The affected characters, concatenated into a single string.
   */
  values: string;
  /**
   * The positions corresponding to [[values]].
   */
  positions: Position[];
}

/**
 * Events record for [[CText]].
 */
export interface TextEventsRecord extends CollabEventsRecord {
  /**
   * Emitted when a range of characters is inserted.
   */
  Insert: TextEvent;
  /**
   * Emitted when a range of characters is deleted.
   */
  Delete: TextEvent;
}

/**
 * A collaborative text string, with the usual behavior
 * for collaborative text editing.
 *
 * CText is functionally equivalent to a [[CValueList]]`<string>` where each value
 * is a single character (UTF-16 codepoint),
 * but with an API more like [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String).
 *
 * It is *not* safe to modify a CText while iterating over it. The iterator
 * will attempt to throw an exception if it detects such modification,
 * but this is not guaranteed.
 *
 * See also:
 * - [[CRichText]]: for rich text (text with inline formatting).
 * - [[CValueList]], [[CList]]: for general lists.
 * - [[CVar]]`<string>`: for a string that can be set and get atomically instead of
 * edited like text.
 */
export class CText extends CObject<TextEventsRecord> implements ICursorList {
  // Internally, CText uses a CValueList containing its list of Unicode code
  // points. CText just wraps the API so that e.g. passing a multi-char
  // string to insert does a bulk character insert, instead of accidentally
  // inserting the whole string as a single list value.

  private readonly list: CValueList<string>;

  /**
   * Constructs a CText.
   */
  constructor(init: InitToken) {
    super(init);

    this.list = super.registerCollab(
      "",
      (init) =>
        new CValueList(init, {
          valueSerializer: StringSerializer.instance,
          valueArraySerializer: charArraySerializer,
        })
    );

    // Events.
    this.list.on("Insert", (e) =>
      this.emit("Insert", {
        index: e.index,
        values: e.values.join(""),
        positions: e.positions,
        meta: e.meta,
      })
    );
    this.list.on("Delete", (e) =>
      this.emit("Delete", {
        index: e.index,
        values: e.values.join(""),
        positions: e.positions,
        meta: e.meta,
      })
    );
  }

  /**
   * Inserts values as a substring at the given index.
   *
   * All values currently at or after `index` shift
   * to the right, increasing their indices by `values.length`.
   *
   * @param index The insertion index in the range
   * `[0, this.length]`. If `this.length`, the values
   * are appended to the end of the list.
   * @param values The characters to insert. They are inserted
   * as individual UTF-16 codepoints.
   * @throws If index is not in `[0, this.length]`.
   */
  insert(index: number, values: string): void {
    this.list.insert(index, ...values);
  }

  /**
   * Delete `count` characters starting at `startIndex`, i.e., characters
   * `[startIndex, startIndex + count - 1)`.
   *
   * All later characters shift to the left,
   * decreasing their indices by `count`.
   *
   * @param count The number of characters to delete.
   * Defaults to 1 (delete the character at `startIndex` only).
   *
   * @throws if `startIndex < 0` or
   * `startIndex + count >= this.length`.
   */
  delete(startIndex: number, count = 1): void {
    this.list.delete(startIndex, count);
  }

  /**
   * Deletes every character in the text string.
   */
  clear(): void {
    this.list.clear();
  }

  /**
   * Returns a string consisting of the single character
   * (UTF-16 codepoint) at `index`.
   *
   * @throws If index is not in `[0, this.length)`.
   * Note that this differs from an ordinary string,
   * which would instead return an empty string.
   */
  charAt(index: number): string {
    return this.list.get(index);
  }

  /**
   * Returns an iterator for characters (values) in the text string, in order.
   *
   * See also: [[toString]], which returns the entire text as a string.
   */
  values(): IterableIterator<string> {
    return this.list.values();
  }

  /** Returns an iterator for characters (values) in the text string, in order. */
  [Symbol.iterator]() {
    return this.values();
  }

  /**
   * Returns an iterator of [index, position, value] tuples for every
   * character (value) in the text string, in order.
   */
  entries(): IterableIterator<
    [index: number, position: Position, char: string]
  > {
    return this.list.entries();
  }

  /**
   * The length of the text string.
   */
  get length(): number {
    return this.list.length;
  }

  /**
   * Returns the text string as an ordinary string.
   */
  toString(): string {
    return this.list.slice().join("");
  }

  // Convenience mutators.

  /**
   * Inserts values as a substring at the end of the text.
   * Equivalent to `this.insert(this.length, values)`.
   *
   * @param values The characters to push. They are inserted
   * as individual UTF-16 codepoints.
   */
  push(values: string): void {
    this.insert(this.length, values);
  }

  /**
   * Inserts values as a substring at the beginning of the text.
   * Equivalent to `this.insert(0, values)`.
   *
   * @param values The characters to unshift. They are inserted
   * as individual UTF-16 codepoints.
   */
  unshift(values: string): void {
    return this.insert(0, values);
  }

  /**
   * Deletes and inserts values like [Array.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).
   *
   * If `deleteCount` is provided, this method first deletes
   * `deleteCount` values starting at `startIndex`.
   * Next, this method inserts `values` as a substring at `startIndex`.
   *
   * All values currently at or after `startIndex + deleteCount`
   * shift to accommodate the change in length.
   *
   * @param values The characters to insert. They are inserted
   * as individual UTF-16 codepoints.
   * @returns The deleted substring.
   */
  splice(startIndex: number, deleteCount?: number, values?: string): string {
    // Sanitize startIndex.
    if (startIndex < 0) startIndex += this.length;
    if (startIndex < 0) startIndex = 0;
    if (startIndex > this.length) startIndex = this.length;

    // Sanitize deleteCount.
    if (deleteCount === undefined || deleteCount > this.length - startIndex)
      deleteCount = this.length - startIndex;
    else if (deleteCount < 0) deleteCount = 0;

    // Delete then insert.
    const ret = this.slice(startIndex, startIndex + deleteCount);
    this.delete(startIndex, deleteCount);
    if (values !== undefined) {
      this.insert(startIndex, values);
    }
    return ret;
  }

  // Convenience accessors.

  // slice() is the most reasonable out of {slice, substring, substr}.

  /**
   * Returns a section of this text string,
   * with behavior like
   * [String.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice).
   */
  slice(start?: number, end?: number): string {
    return this.list.slice(start, end).join("");
  }

  // Positions.

  /**
   * @return The position currently at index.
   */
  getPosition(index: number): Position {
    return this.list.getPosition(index);
  }

  /**
   * Returns the current index of position.
   *
   * If position is not currently present in the list
   * ([[hasPosition]] returns false), then the result depends on searchDir:
   * - "none" (default): Returns -1.
   * - "left": Returns the next index to the left of position.
   * If there are no values to the left of position,
   * returns -1.
   * - "right": Returns the next index to the right of position.
   * If there are no values to the left of position,
   * returns [[length]].
   */
  indexOfPosition(
    position: Position,
    searchDir: "none" | "left" | "right" = "none"
  ): number {
    return this.list.indexOfPosition(position, searchDir);
  }

  /**
   * Returns whether position is currently present in the list,
   * i.e., its value is present.
   */
  hasPosition(position: Position): boolean {
    return this.list.hasPosition(position);
  }

  /**
   * Returns the value at position, or undefined if it is not currently present
   * ([[hasPosition]] returns false).
   */
  getByPosition(position: Position): string | undefined {
    return this.list.getByPosition(position);
  }

  /** Returns an iterator for present positions, in list order. */
  positions(): IterableIterator<Position> {
    return this.list.positions();
  }

  /**
   * Returns a new instance of [[LocalList]] that uses this
   * CText's [[Position]]s, initially empty.
   *
   * Changes to the returned LocalList's values
   * do not affect this CText's values, and vice-versa.
   * However, the set of allowed positions does increase to
   * match this CText: you may use a CText position in
   * the returned LocalList even if that position was created
   * after the call to `newLocalList`.
   *
   * @typeParam U The value type of the returned list.
   * Defaults to string.
   */
  newLocalList<U = string>(): LocalList<U> {
    return this.list.newLocalList();
  }
}

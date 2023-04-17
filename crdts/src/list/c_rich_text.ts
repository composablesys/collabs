import {
  CObject,
  CollabEvent,
  CollabEventsRecord,
  DefaultSerializer,
  InitToken,
  Position,
  Serializer,
  UpdateMeta,
} from "@collabs/core";
import { CSpanLog, Span } from "./c_span_log";
import { TextEvent } from "./c_text";
import { CValueList } from "./c_value_list";
import { LocalList } from "./local_list";

/**
 * Base type for [[CRichText]] format types, represented as an
 * interface (or Record type) mapping string keys to their value types.
 *
 * For example, if your rich text document allows format key "bold"
 * with boolean values and format key "link" with string values,
 * you can declare this in an interface:
 * ```ts
 * interface MyFormat {
 *   bold: boolean;
 *   link: string;
 * }
 * ```
 * and use it as CRichText's generic type parameter:
 * ```ts
 * const text = new CRichText<MyFormat>(...);
 * ```
 * Then [[CRichText.format]] and similar methods will force you to
 * use only those format keys, with the specified value types.
 * Note that queries like [[CRichText.formatted]] will use `Partial<MyFormat>`
 * instead of `MyFormat`, since a character might not have all format
 * keys present.
 *
 * If you do not specify a RichTextFormat, it defaults to
 * `Record<string, any>`.
 */
export interface RichTextFormat {
  // Need "any" here instead of "unknown" or else TypeScript
  // complains about a missing index signature when you
  // implement the interface.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Event emitted by [[CRichText]] when a range of characters (values)
 * is inserted.
 */
export interface RichTextInsertEvent<F extends RichTextFormat = RichTextFormat>
  extends TextEvent {
  /**
   * The characters' format as inherited from existing spans.
   *
   * This does not account for the format passed to
   * [[CRichText.insert]]; changes to match that format will show up
   * in later [[RichTextEventsRecord.Format]] events in the same transaction.
   */
  format: Partial<F>;
}

// Note: these events are emitted slightly behind - it may take several events to
// describe a span's local effect, but they are all emitted
// after completely updating the state.
/**
 * Event emitted by [[CRichText]] when a range of characters is formatted.
 *
 * A range can be formatted either by [[CRichText.format]],
 * or by [[CRichText.insert]] if its given format does not
 * match the new character's inherited format.
 */
export interface RichTextFormatEvent<
  F extends RichTextFormat = RichTextFormat,
  K extends keyof F & string = keyof F & string
> extends CollabEvent {
  /**
   * The range's starting index, inclusive.
   *
   * The affected characters are `text.slice(startIndex, endIndex)`.
   */
  startIndex: number;
  /**
   * The range's ending index, exclusive.
   *
   * The affected characters are `text.slice(startIndex, endIndex)`.
   */
  endIndex: number;
  /**
   * The format key that changed.
   */
  key: K;
  /**
   * The new format value at key, or undefined if the key's format was deleted.
   */
  value: F[K] | undefined;
  /**
   * The previous format value at key, or undefined if the key was previously not present.
   */
  previousValue: F[K] | undefined;
  /**
   * The range's complete new format.
   */
  format: Partial<F>;

  // We technically should include Positions (ordered map from Positions to
  // (value, format) model), but it would be inefficient and rarely useful.
}

/**
 * Events record for [[CRichText]].
 */
export interface RichTextEventsRecord<F extends RichTextFormat = RichTextFormat>
  extends CollabEventsRecord {
  /**
   * Emitted when a range of characters is inserted.
   */
  Insert: RichTextInsertEvent<F>;
  /**
   * Emitted when a range of characters is deleted.
   */
  Delete: TextEvent;
  /**
   * Emitted when a range of characters is formatted.
   *
   * A range can be formatted either by [[CRichText.format]],
   * or by [[CRichText.insert]] if its given format does not
   * match the new character's inherited format.
   */
  Format: RichTextFormatEvent<F>;
}

// TODO: algorithm description.

// Behavior differences from Peritext:
// - Does not infer *local* behavior following Peritext's rules (including
// edge cases around paragraph starts and tombstones). Instead, you must specify
// provide the desired format for each inserted char, then CRichText creates
// new spans if needed to match (i.e., if the existing spans give the
// wrong format).
// - Deleting the second half of a non-growEnd span: Peritext gives the deletion
// an open start, so that the remaining first half of the non-growEnd span is
// still closed at the end (won't grow). We don't yet implement this (TODO).
// - We only support key-value type formats where the latest value overwrites
// all previous, not "unique" formats like comments. Instead, you should store
// comments yourself together with their start & and end [[Position]]s.

/**
 * A collaborative rich-text string, i.e., a text string with inline formatting.
 *
 * Each character has an associated *format* of type `Partial<F>` (defualt: `Record<string, any>`), which
 * maps from format keys to format values.
 *
 * Formats are controlled
 * by *formatting spans*, which set (or delete) a format key-value pair in a given
 * range of text. A span affects all characters in its range, including
 * concurrent or future characters, until overridden
 * by another span.
 *
 * For a detailed discussion of formatting spans' behavior, see [Peritext](https://www.inkandswitch.com/peritext/),
 * which this Collab approximately implements. Note that you can tune spans'
 * behavior using the `growAtEnd` constructor option.
 *
 * Use [[format]] to format a range, and use
 * [[formatted]] to access an efficient representation of the formatted text.
 * Otherwise, the API
 * is similar to [[CText]].
 *
 * It is *not* safe to modify a CRichText while iterating over it. The iterator
 * will attempt to throw an exception if it detects such modification,
 * but this is not guaranteed.
 *
 * See also:
 * - [[CText]]: for plain text.
 * - [[CValueList]], [[CList]]: for general lists.
 *
 * @typeParam F The allowed format keys and value types, represented as an
 * interface (or Record type) mapping string keys to their value types.
 * See [[RichTextFormat]] for an example.
 * Default: `Record<string, any>`.
 */
export class CRichText<
  F extends RichTextFormat = RichTextFormat
> extends CObject<RichTextEventsRecord<F>> {
  // OPT: If CText becomes optimized relative to CValueList<string>,
  // we can use that instead.
  private readonly text: CValueList<string>;
  private readonly spanLog: CSpanLog<F>;

  /**
   * A view of spanLog that is designed for easy querying.
   * This is mostly as described in the Peritext paper, but with
   * a different handling of open/closed endpoints.
   */
  private readonly formatList: LocalList<FormatData<F>>;

  // TODO: replace with a set of grow-at-end keys, in preparation for
  // open-start deletion spans.
  private readonly growAtEnd: <K extends keyof F & string>(
    key: K,
    value: F[K] | undefined
  ) => boolean;

  /**
   * Constructs a CRichText.
   *
   * @param options.growAtEnd A function that returns whether spans with the given key-value pair should
   * grow at their end, affecting concurrent and future characters inserted
   * at the end of the original range (not just the middle).
   *
   * By default, this always returns true. You may wish to return
   * false for formats like hyperlinks, as described in
   * [Peritext's Example 9](https://www.inkandswitch.com/peritext/#example-9).
   * @param options.formatSerializer Serializer for format values. Defaults to [[DefaultSerializer]].
   */
  constructor(
    init: InitToken,
    options?: {
      growAtEnd?: <K extends keyof F & string>(
        key: K,
        value: F[K] | undefined
      ) => boolean;
      formatSerializer?: Serializer<F[keyof F & string]>;
    }
  ) {
    super(init);

    this.growAtEnd = options?.growAtEnd ?? (() => true);

    this.text = super.registerCollab("", (init) => new CValueList(init));
    this.spanLog = super.registerCollab(
      "0",
      (init) =>
        new CSpanLog(
          init,
          options?.formatSerializer ?? DefaultSerializer.getInstance()
        )
    );

    this.formatList = this.text.newLocalList();

    // Events.
    // this.addSpan also updates this.formatList.
    this.spanLog.on("Add", (e) => this.addSpan(e.span, e.meta));
    this.text.on("Insert", (e) =>
      this.emit("Insert", {
        index: e.index,
        values: e.values.join(""),
        positions: e.positions,
        // By non-interleaving and the fact that the positions are new,
        // all inserted chars have the same initial format.
        format: this.getFormatInternal(e.positions[0]),
        meta: e.meta,
      })
    );
    this.text.on("Delete", (e) =>
      this.emit("Delete", {
        index: e.index,
        values: e.values.join(""),
        positions: e.positions,
        meta: e.meta,
      })
    );
  }

  /**
   * this.spanLog "Add" event handler.
   */
  private addSpan(span: Span<F>, meta: UpdateMeta) {
    // 1. Update our view of the formatting spans in this.formatList.

    this.createData(span.startPosition);
    if (span.endPosition !== null) this.createData(span.endPosition);

    // Merge span into all FormatData.normalSpan in the range
    // [startPos, endPos). While doing so, build slices for the events
    // later.
    const start = this.formatList.indexOfPosition(span.startPosition);
    const end =
      span.endPosition === null
        ? this.formatList.length
        : this.formatList.indexOfPosition(span.endPosition);
    const sliceBuilder = new SliceBuilder<F, FormatChange<F>>(
      this,
      formatChangeEquals
    );
    for (let i = start; i < end; i++) {
      const position = this.formatList.getPosition(i);
      const data = this.formatList.getByPosition(position)!;
      if (this.wins(span, data.normalSpans.get(span.key))) {
        const previousValueOpen = getDataValue(data, false, span.key);
        const previousValueClosed = getDataValue(data, true, span.key);

        data.normalSpans.set(span.key, span);

        if (this.wins(span, data.endClosedSpans.get(span.key))) {
          // Overwrite the endClosedSpan (if it exists), to maintain the
          // invariant: an endClosedSpan is only present if it wins over the
          // normalSpan.
          data.endClosedSpans.delete(span.key);
          // Possible change in the interval [position].
          // (If it didn't actually delete anything, then previousValueClosed
          // === span.value, so we'll filter it when emitting events.)
          sliceBuilder.add(
            {
              previousValue: previousValueClosed,
              format: getDataRecord(data, true),
            },
            position,
            true
          );
        } else {
          // No change in the interval [position].
          sliceBuilder.add(null, position, true);
        }

        // Yes change in the interval starting (position,...
        sliceBuilder.add(
          {
            previousValue: previousValueOpen,
            format: getDataRecord(data, false),
          },
          position,
          false
        );
      } else {
        // No change in the interval starting [position,...
        sliceBuilder.add(null, position, true);
      }
    }

    let slices: Slice<FormatChange<F>>[];
    if (span.endPosition !== null && span.endClosed === true) {
      // Merge span into endPos's endClosedSpans.
      // We only store span if it wins over both the existing endClosedSpan
      // and the existing normalSpan, as described in FormatData.endClosedSpan's
      // docs.
      // Non-null assertion okay because we created the FormatData above.
      const data = this.formatList.getByPosition(span.endPosition)!;
      if (
        this.wins(span, data.endClosedSpans.get(span.key)) &&
        this.wins(span, data.normalSpans.get(span.key))
      ) {
        const previousValue = getDataValue(data, true, span.key);

        data.endClosedSpans.set(span.key, span);
        sliceBuilder.add(
          {
            previousValue,
            format: getDataRecord(data, true),
          },
          span.endPosition,
          true
        );
        slices = sliceBuilder.finish(span.endPosition, false);
      } else {
        slices = sliceBuilder.finish(span.endPosition, true);
      }
    } else slices = sliceBuilder.finish(null, false);

    // 2. Emit Format events for spans that actually changed.

    for (const slice of slices) {
      if (slice.data !== null && slice.data.previousValue !== span.value) {
        this.emit("Format", {
          startIndex: slice.startIndex,
          endIndex: slice.endIndex,
          key: span.key,
          value: span.value,
          previousValue: slice.data.previousValue,
          format: slice.data.format,
          meta,
        });
      }
    }

    // OPT: build formatList in loadObject instead of using span events, perhaps
    // based on our own save of the formatList,
    // then emit one big Quill delta at the end.
    // For efficiency (esp on initial load), and to
    // make fewer events.
  }

  /**
   * Creates FormatData at position if it doesn't already exist,
   * inferring the correct values from the previous FormatData.
   */
  private createData(position: Position): void {
    if (this.formatList.hasPosition(position)) return;

    // OPT: LocalList prevPosition func or similar, so we can avoid getting
    // prevIndex entirely.
    const prevIndex = this.formatList.indexOfPosition(position, "left");
    if (prevIndex === -1) {
      // No previous FormatData; make an empty one.
      this.formatList.set(position, {
        normalSpans: new Map(),
        endClosedSpans: new Map(),
      });
    } else {
      const prevSpan = this.formatList.get(prevIndex);
      // Clone normalSpans from prevSpan, since they are the same.
      // We don't clone endClosedSpans because the positions differ.
      this.formatList.set(position, {
        normalSpans: new Map(prevSpan.normalSpans),
        endClosedSpans: new Map(),
      });
    }
  }

  /**
   * Returns whether newSpans wins oldSpan, either in the Lamport
   * order (with senderID tiebreaker) or because
   * oldSpan is undefined.
   *
   * If newSpan and oldSpan come from the same transaction, this also
   * returns true. That is okay because we always call wins() in transaction order,
   * and later spans in the same transaction win over
   * earlier spans.
   */
  private wins(newSpan: Span<F>, oldSpan: Span<F> | undefined): boolean {
    if (oldSpan === undefined) return true;
    if (newSpan.lamport > oldSpan.lamport) return true;
    if (newSpan.lamport === oldSpan.lamport) {
      // In === case, the two spans come from the same transaction,
      // but newSpan is newer (a later message in the same transaction).
      if (newSpan.senderID >= oldSpan.senderID) return true;
    }
    return false;
  }

  /**
   * Inserts values as a substring at the given index, with the given initial format.
   *
   * All values currently at or after `index` shift
   * to the right, increasing their indices by `values.length`.
   *
   * Initially, the characters inherit some format from existing formatting spans.
   * If this does not match `format`, we create new formatting spans
   * for the differing format keys.
   *
   * @param index The insertion index in the range
   * `[0, this.length]`. If `this.length`, the values
   * are appended to the end of the list.
   * @param values The characters to insert. They are inserted
   * as individual UTF-16 codepoints.
   * @param format The characters' initial format.
   * @throws If index is not in `[0, this.length]`.
   */
  insert(index: number, values: string, format: Partial<F>): void {
    if (values.length === 0) return;
    this.text.insert(index, ...values);

    // Change formatting to match format.
    // No existing positions can be interleaved with the chars' positions,
    // so the chars all have the same existing formatting.
    const existing = this.getFormat(index);
    const startPos = this.text.getPosition(index);
    const endPosClosed = this.text.getPosition(index + values.length - 1);
    const endPosOpen = this.text.getPosition(index + values.length);
    for (const [key, value] of Object.entries(format)) {
      if (existing[key] !== value) {
        const endClosed = !this.growAtEnd(key, value);
        this.spanLog.add(
          key,
          value,
          startPos,
          endClosed ? endPosClosed : endPosOpen,
          endClosed
        );
      }
    }
    for (const key of Object.keys(existing)) {
      if (format[key] === undefined) {
        const endClosed = !this.growAtEnd(key, undefined);
        this.spanLog.add(
          key,
          undefined,
          startPos,
          endClosed ? endPosClosed : endPosOpen,
          endClosed
        );
      }
    }
  }

  /**
   * Formats the range of text `[startIndex, endIndex)`, setting the
   * given format key to `value`.
   *
   * Internally, this creates a new formatting span, even if it is
   * redundant. The span's grow-at-end behavior is determined by
   * the `growAtEnd` constructor option.
   *
   * @param value If undefined, the format key is deleted, clearing its
   * current value.
   */
  format<K extends keyof F & string>(
    startIndex: number,
    endIndex: number,
    key: K,
    value: F[K] | undefined
  ) {
    if (startIndex < 0 || startIndex >= this.length) {
      throw new Error(
        `startIndex out of bounds: ${startIndex} (length: ${this.length})`
      );
    }
    if (endIndex < 0 || endIndex > this.length) {
      throw new Error(
        `endIndex out of bound: ${endIndex} (length: ${this.length})`
      );
    }
    if (endIndex <= startIndex) {
      // Trivial span.
      return;
    }

    const endClosed = !this.growAtEnd(key, value);

    // From trivial span case, we're guaranteed endIndex >= 1, so this is
    // in [0, this.length].
    const actualEndIndex = endClosed ? endIndex - 1 : endIndex;
    const endPos =
      actualEndIndex === this.length ? null : this.getPosition(actualEndIndex);
    this.spanLog.add(
      key,
      value,
      this.getPosition(startIndex),
      endPos,
      endClosed
    );
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
  delete(startIndex: number, count?: number | undefined): void {
    this.text.delete(startIndex, count);
  }

  /**
   * Deletes every character in the text string.
   */
  clear() {
    this.text.clear();
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
    return this.text.get(index);
  }

  /**
   * Returns the format for the character at `index`.
   *
   * @throws If index is not in `[0, this.length)`.
   */
  getFormat(index: number): Partial<F> {
    return this.getFormatInternal(this.text.getPosition(index));
  }

  /**
   * Returns the format at position.
   *
   * If position is not currently present, returns the formatting that
   * a character at position would have if present
   * (unlike getFormatByPosition, which returns undefined).
   */
  private getFormatInternal(position: Position): Partial<F> {
    // Find the closest <= FormatData.
    // OPT: direct method for this in LocalList, to avoid getting index.
    const dataIndex = this.formatList.indexOfPosition(position, "left");
    if (dataIndex === -1) {
      // No format.
      return {};
    }
    const dataPos = this.formatList.getPosition(dataIndex);
    const data = this.formatList.getByPosition(dataPos)!;
    return getDataRecord(data, dataPos === position);
  }

  /**
   * Returns an iterator for characters (values) in the text string, in order.
   *
   * See also: [[toString]], which returns the entire (plain) text as a string.
   */
  values(): IterableIterator<string> {
    return this.text.values();
  }

  /**
   * Returns an iterator of [index, position, value, format] tuples
   * for every character (value) in the text string, in order.
   *
   * Typically, you should instead use [[formatted]], which returns
   * a more efficient representation of the formatted text.
   */
  *entries(): IterableIterator<
    [index: number, position: Position, value: string, format: Partial<F>]
  > {
    const positionsIter = this.text.positions();
    for (const { index, values, format } of this.formatted()) {
      for (let i = 0; i < values.length; i++) {
        yield [index + i, positionsIter.next().value, values[i], format];
      }
    }
  }
  /**
   * Returns an iterator of [index, position, value, format] tuples
   * for every character (value) in the text string, in order.
   *
   * Typically, you should instead use [[formatted]], which returns
   * a more efficient representation of the formatted text.
   */
  [Symbol.iterator](): IterableIterator<
    [index: number, position: Position, value: string, format: Partial<F>]
  > {
    return this.entries();
  }

  // We omit Positions for efficiency. If you want them, use entries().
  /**
   * Returns an efficient representation of the formatted text,
   *
   * Specifically, returns an array of formatted ranges in text order. Each range has
   * properties:
   * - `index`: the range's starting index.
   * - `values`: the range's text.
   * - `format`: the range's format.
   */
  formatted(): Array<{
    index: number;
    values: string;
    format: Partial<F>;
  }> {
    const sliceBuilder = new SliceBuilder<F, Partial<F>>(this, recordEquals);
    // Starting chars have no format.
    sliceBuilder.add({}, null, false);
    for (const [, position, data] of this.formatList.entries()) {
      // Format exactly at position, including closedEnds.
      if (this.text.hasPosition(position)) {
        sliceBuilder.add(getDataRecord(data, true), position, true);
      } // Else it is safe to skip.
      // Format for the rest of the span (the open part).
      sliceBuilder.add(getDataRecord(data, false), position, false);
      // OPT: stop early if we reach the end of the present list.
      // E.g. it was cleared and restarted, so there is a lot of junk at the end.
    }
    const slices = sliceBuilder.finish(null, false);

    // Map the slices to the expected format.
    return slices.map((slice) => ({
      index: slice.startIndex,
      values: this.text.slice(slice.startIndex, slice.endIndex).join(""),
      format: slice.data,
    }));
  }

  /**
   * The length of the text string.
   */
  get length(): number {
    return this.text.length;
  }

  /**
   * Returns the plain text as an ordinary string.
   */
  toString(): string {
    return this.text.slice().join("");
  }

  // Convenience mutators.

  /**
   * Inserts values as a substring at the end of the text, with the given format.
   * Equivalent to `this.insert(this.length, values, format)`.
   */
  push(values: string, format: Partial<F>): void {
    this.insert(this.length, values, format);
  }

  /**
   * Inserts values as a substring at the beginning of the text, with the given format.
   * Equivalent to `this.insert(0, values, format)`.
   */
  unshift(values: string, format: Partial<F>): void {
    return this.insert(0, values, format);
  }

  /**
   * Deletes and inserts values like [Array.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).
   *
   * If `deleteCount` is provided, this method first deletes
   * `deleteCount` values starting at `startIndex`.
   * Next, this method inserts `values` as a substring at `startIndex`, with the given format.
   *
   * All values currently at or after `startIndex + deleteCount`
   * shift to accommodate the change in length.
   */
  splice(startIndex: number, deleteCount: number): void;
  splice(
    startIndex: number,
    deleteCount: number | undefined,
    values: string,
    format: Partial<F>
  ): void;
  splice(
    startIndex: number,
    deleteCount: number | undefined,
    values?: string,
    format?: Partial<F>
  ): void {
    // Sanitize deleteCount
    if (deleteCount === undefined || deleteCount > this.length - startIndex)
      deleteCount = this.length - startIndex;
    else if (deleteCount < 0) deleteCount = 0;
    // Delete then insert
    this.delete(startIndex, deleteCount);
    if (values !== undefined) {
      this.insert(startIndex, values, format!);
    }
  }

  // Convenience accessors.

  /**
   * Returns a string consisting of the single character
   * (UTF-16 codepoint) at `index`, with behavior
   * like [String.at](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/at).
   *
   * Negative indices are relative to
   * end of the text string, and out-of-bounds
   * indices return undefined.
   */
  at(index: number): string | undefined {
    if (index < 0) index += this.length;
    if (index < 0 || index >= this.length) return undefined;
    return this.text.get(index);
  }

  // slice() is the most reasonable out of {slice, substring, substr}.

  /**
   * Returns a section of this text string,
   * with behavior like
   * [String.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice).
   */
  slice(start?: number, end?: number): string {
    return this.text.slice(start, end).join("");
  }

  // Positions.

  /**
   * @return The position currently at index.
   */
  getPosition(index: number): Position {
    return this.text.getPosition(index);
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
    searchDir?: "none" | "left" | "right" | undefined
  ): number {
    return this.text.indexOfPosition(position, searchDir);
  }

  /**
   * Returns whether position is currently present in the list,
   * i.e., its value is present.
   */
  hasPosition(position: Position): boolean {
    return this.text.hasPosition(position);
  }

  /**
   * Returns the value at position, or undefined if it is not currently present
   * ([[hasPosition]] returns false).
   */
  getByPosition(position: Position): string | undefined {
    return this.text.getByPosition(position);
  }

  /**
   * Returns the format at position, or undefined if it is not currently present
   * ([[hasPosition]] returns false).
   */
  getFormatByPosition(position: Position): Partial<F> | undefined {
    if (this.text.hasPosition(position)) {
      return this.getFormatInternal(position);
    } else return undefined;
  }

  /** Returns an iterator for present positions, in list order. */
  positions(): IterableIterator<Position> {
    return this.text.positions();
  }
}

/**
 * Set getDataValue.
 */
interface FormatData<F extends RichTextFormat> {
  /**
   * Map from formatting key to the winning span for that key,
   * according to the lamport order (w/ senderID tiebreaker).
   *
   * This only includes spans that start or internally contain
   * this position. To get the actual formatting at this position,
   * also consider endClosedSpans.
   */
  readonly normalSpans: Map<keyof F, Span<F>>;
  /**
   * Spans that have a closed end at this position and win
   * over the corresponding normalSpan, overriding it.
   *
   * For characters at this exact position only, if a key is
   * present in both normalSpan and endClosedSpan, use endClosedSpan's value.
   *
   * OPT: Omit this field if the map would be empty.
   * OPT: Clear this field once the position is deleted, and also
   * delete from spanLog any singleton spans (form [position]).
   * Such formats are no longer needed and might be large (e.g. if you
   * store Quill embeds as a single-char format). Note that then
   * we will have to change the contract of getFormatByPosition
   * (won't be accurate for deleted positions).
   */
  readonly endClosedSpans: Map<keyof F, Span<F>>;
}

// OPT: remove from CSpanLog any spans that are no longer referenced in
// formatData (because they were completely overridden by later spans).
// Could potentially do this using WeakRefs/WeakValueMap, so JS tells us
// which spans are no longer referenced.

/**
 * Returns data's value for key.
 *
 * @param includeClosed Whether to consider endClosedSpans, i.e., you are
 * getting the format exactly at data's position.
 */
function getDataValue<F extends RichTextFormat, K extends keyof F>(
  data: FormatData<F>,
  includeClosed: boolean,
  key: K
): F[K] | undefined {
  // eslint fails to infer types here, but TypeScript is fine.
  if (includeClosed && data.endClosedSpans.has(key)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data.endClosedSpans.get(key)!.value as F[K];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  } else return data.normalSpans.get(key)?.value;
}

function getDataRecord<F extends RichTextFormat>(
  data: FormatData<F>,
  includeClosed: boolean
): Partial<F> {
  const ans: Partial<F> = {};
  // Copy normalSpans, except omit undefined entries.
  for (const [key, span] of data.normalSpans) {
    if (span.value !== undefined) ans[key] = span.value;
  }
  if (includeClosed) {
    // data is exactly at position, so we need to copy endClosedSpans
    // on top of normalSpans. If the result would be undefined, omit it.
    for (const [key, span] of data.endClosedSpans) {
      if (span.value === undefined) delete ans[key];
      else ans[key] = span.value;
    }
  }
  return ans;
}

/**
 * An slice of CRichText.text with attached data, used to output
 * non-redundant formatting spans.
 */
interface Slice<D> {
  startIndex: number;
  endIndex: number;
  data: D;
}

class SliceBuilder<F extends RichTextFormat, D> {
  private readonly slices: Slice<D>[] = [];
  private prevIndex = -1;
  private prevData: D | null = null;

  constructor(
    readonly list: CRichText<F>,
    readonly equals: (a: D, b: D) => boolean
  ) {}

  add(data: D, startPos: Position | null, startClosed: boolean): void {
    // The index where this new span begins.
    let index: number;
    if (startPos === null) index = 0;
    else if (startClosed) {
      index = this.list.indexOfPosition(startPos, "right");
    } else index = this.list.indexOfPosition(startPos, "left") + 1;

    if (this.prevIndex !== -1) {
      // Record the previous call's data.
      this.record(this.prevIndex, index, this.prevData!);
    }

    this.prevIndex = index;
    this.prevData = data;
  }

  finish(nextPos: Position | null, nextClosed: boolean): Slice<D>[] {
    if (this.prevIndex !== -1) {
      // Record the previous call's data.
      // index is where the next span would begin, computed as in
      // add except that null maps to the end.
      let index: number;
      if (nextPos === null) index = this.list.length;
      else if (nextClosed) {
        index = this.list.indexOfPosition(nextPos, "right");
      } else index = this.list.indexOfPosition(nextPos, "left") + 1;

      this.record(this.prevIndex, index, this.prevData!);
    }
    return this.slices;
  }

  private record(startIndex: number, endIndex: number, data: D): void {
    if (startIndex === endIndex) return;

    if (this.slices.length !== 0) {
      const prevSlice = this.slices[this.slices.length - 1];
      if (this.equals(prevSlice.data, data)) {
        // Extend prevSlice.
        prevSlice.endIndex = endIndex;
        return;
      }
    }
    // Add a new slice.
    this.slices.push({ startIndex, endIndex, data });
  }
}

function recordEquals(
  a: Record<string, unknown>,
  b: Record<string, unknown>
): boolean {
  for (const [key, value] of Object.entries(a)) {
    if (b[key] !== value) return false;
  }
  for (const [key, value] of Object.entries(b)) {
    if (a[key] !== value) return false;
  }
  return true;
}

type FormatChange<F extends RichTextFormat> = {
  previousValue: F[keyof F] | undefined;
  format: Partial<F>;
} | null;

function formatChangeEquals(
  a: FormatChange<RichTextFormat>,
  b: FormatChange<RichTextFormat>
): boolean {
  if (a === null || b === null) return a === b;
  return (
    a.previousValue === b.previousValue && recordEquals(a.format, b.format)
  );
}

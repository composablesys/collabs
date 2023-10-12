import {
  CObject,
  CollabEvent,
  CollabEventsRecord,
  DefaultSerializer,
  InitToken,
  Position,
  Serializer,
  UpdateMeta,
  nonNull,
} from "@collabs/core";
import { Anchor, CSpanLog, Span } from "./c_span_log";
import { CTotalOrder } from "./c_total_order";
import { LocalList } from "./local_list";

export { Anchor };

/**
 * A formatted range in a [[CRichText]].
 */
export interface FormattedRange<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends Record<string, any> = Record<string, any>
> {
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
  /** The range's format. */
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
 * match the new characters' inherited format.
 */
export interface FormatEvent<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends Record<string, any> = Record<string, any>,
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

// TODO: search and replace: CRichText, text, characters
// TODO: all docs

/**
 * Events record for [[CRichText]].
 */
export interface FormatEventsRecord<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends Record<string, any> = Record<string, any>
> extends CollabEventsRecord {
  /**
   * Emitted when a range of characters is formatted.
   */
  Format: FormatEvent<F>;
}

// TODO: our lists should implement this
export interface IFormattableList {
  /**
   * Returns the position currently at index.
   */
  getPosition(index: number): Position;

  /**
   * Returns the current index of position.
   *
   * If position is not currently present in the list,
   * then the result depends on searchDir:
   * - "none" (default): Returns -1.
   * - "left": Returns the next index to the left of position.
   * If there are no values to the left of position,
   * returns -1.
   * - "right": Returns the next index to the right of position.
   * If there are no values to the right of position,
   * returns the length of the list.
   *
   * To find the index where a position would be if
   * present, use `searchDir = "right"`.
   */
  indexOfPosition(
    position: Position,
    searchDir?: "none" | "left" | "right"
  ): number;

  readonly totalOrder: CTotalOrder;
  readonly length: number;
}

/**
 * A collaborative rich-text string, i.e., a text string with inline formatting.
 *
 * Each character has an associated *format* of type `Record<string, any>`, which
 * maps from format keys to format values. Use [[format]] to format a range, and use
 * [[formatted]] to access an efficient representation of the formatted text.
 * Otherwise, the API is similar to [[CText]].
 *
 * You can restrict the allowed format keys
 * and their value types by using an interface for the generic type `F`, e.g.,
 * ```ts
 * interface MyFormat {
 *   bold: true;
 *   link: string;
 * }
 * const text = new CRichText<MyFormat>(...);
 * ```
 * Note that undefined is always allowed as a format value, indicating that a
 * key is not present. Thus we use type `Partial<F>`
 * to describe a character's format.
 *
 * Internally, formats are controlled
 * by *formatting spans*, which set (or delete) a format key-value pair in a given
 * range of text. A span affects all characters in its range, including
 * concurrent or future characters, until overridden
 * by another span.
 *
 * For a detailed discussion of formatting spans' behavior, see [Peritext](https://www.inkandswitch.com/peritext/),
 * which this Collab approximately implements. Note that you can tune spans'
 * behavior using the `noGrowAtEnd` constructor option.
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
 * Default: `Record<string, any>`.
 */
export class CFormat<
  // We need to use any (not unknown) or else TypeScript complains about
  // a missing index signature when you try to use an interface for F.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends Record<string, any> = Record<string, any>
> extends CObject<FormatEventsRecord<F>> {
  private readonly spanLog: CSpanLog<F>;

  /**
   * A view of spanLog that is designed for easy querying.
   * This is mostly as described in the Peritext paper, but with
   * a different handling of open/closed endpoints.
   */
  private readonly formatList: LocalList<FormatData<F>>;
  /**
   * Entry in formatList for the start of the list (Anchor.pos = null).
   * after is always defined, before is never defined.
   */
  private readonly startData: FormatData<F>;

  /**
   * Constructs a CRichText.
   *
   * @param options.formatSerializer Serializer for format values. Defaults to [[DefaultSerializer]].
   */
  constructor(
    init: InitToken,
    readonly list: IFormattableList,
    options?: {
      formatSerializer?: Serializer<F[keyof F & string]>;
    }
  ) {
    super(init);

    // TODO: inline (make this a primitive CRDT)?
    this.spanLog = super.registerCollab(
      "",
      (init) =>
        new CSpanLog(
          init,
          options?.formatSerializer ?? DefaultSerializer.getInstance()
        )
    );

    this.formatList = new LocalList(this.list.totalOrder);
    this.startData = { after: new Map() };

    // Events.
    // this.addSpan updates this.formatList.
    this.spanLog.on("Add", (e) => this.addSpan(e.span, e.meta));
  }

  /**
   * this.spanLog "Add" event handler.
   */
  private addSpan(span: Span<F>, meta: UpdateMeta) {
    // 1. Create FormatData at the start and end anchors if needed,
    // copying the previous anchor with data.

    this.createData(span.start);
    this.createData(span.end);

    // 2. Merge span into all FormatData in the range
    // [startPos, endPos). While doing so, build slices for the events
    // later.

    const sliceBuilder = new SliceBuilder<FormatChange<F>>(
      this.list,
      formatChangeEquals
    );

    const start =
      span.start.pos === null
        ? 0
        : this.formatList.indexOfPosition(span.start.pos);
    // If end is an after anchor, { end.pos, "before" } is handled after the loop.
    const end =
      span.end.pos === null
        ? this.formatList.length
        : this.formatList.indexOfPosition(span.end.pos);
    for (let i = start; i < end; i++) {
      const pos = this.formatList.getPosition(i);
      const data = nonNull(this.formatList.getByPosition(pos));
      if (data.before !== undefined) {
        this.updateOne({ pos, before: true }, data.before, sliceBuilder, span);
      }
      if (data.after !== undefined) {
        this.updateOne({ pos, before: false }, data.after, sliceBuilder, span);
      }
    }

    if (span.end.pos !== null && !span.end.before) {
      // span ends at an after anchor; update { end.pos, "before" } if present.
      const beforeEnd = this.formatList.getByPosition(span.end.pos)?.before;
      if (beforeEnd !== undefined) {
        this.updateOne(
          { pos: span.end.pos, before: true },
          beforeEnd,
          sliceBuilder,
          span
        );
      }
    }

    // 3. Emit Format events for spans that actually changed.

    const slices = sliceBuilder.finish(span.end);
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
   * Creates FormatData at anchor if it doesn't already exist,
   * copying the correct values from the previous FormatData.
   */
  private createData(anchor: Anchor): void {
    // We never need to create start or end: start is created in the
    // constructor, and end is not stored.
    if (anchor.pos === null) return;

    let data = this.formatList.getByPosition(anchor.pos);
    if (data === undefined) {
      data = {};
      this.formatList.set(anchor.pos, data);
    }

    if (anchor.before) {
      if (data.before !== undefined) return;

      data.before = this.copyPrevAnchor(anchor.pos);
    } else {
      if (data.after !== undefined) return;

      if (data.before !== undefined) data.after = new Map(data.before);
      else data.after = this.copyPrevAnchor(anchor.pos);
    }
  }

  /**
   * Returns a copy of the Map for the last anchor before { pos, "before" }.
   *
   * Assumes pos is present in this.formatList.
   */
  private copyPrevAnchor(pos: Position): Map<keyof F & string, Span<F>> {
    // OPT: LocalList prevPosition func or similar, so we can avoid getting
    // prevIndex entirely.
    const posIndex = this.formatList.indexOfPosition(pos);
    const prevData =
      posIndex === 0 ? this.startData : this.formatList.get(posIndex - 1);
    return new Map(nonNull(prevData.after ?? prevData.before));
  }

  private updateOne(
    anchor: Anchor,
    anchorData: Map<keyof F & string, Span<F>>,
    sliceBuilder: SliceBuilder<FormatChange<F>>,
    span: Span<F>
  ) {
    const previousSpan = anchorData.get(span.key);
    if (this.wins(span, previousSpan)) {
      anchorData.set(span.key, span);
      sliceBuilder.add(anchor, {
        previousValue: previousSpan?.value,
        format: spansToF(anchorData),
      });
    } else {
      sliceBuilder.add(anchor, null);
    }
  }

  /**
   * Returns whether newSpans wins over oldSpan, either in the Lamport
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
   * Formats the range of text `[startIndex, endIndex)`
   * (i.e., `text.slice(startIndex, endIndex)`), setting the
   * given format key to `value`.
   *
   * Internally, this creates a new formatting span, even if it is
   * redundant. The span's grow-at-end behavior is determined by
   * the `noGrowAtEnd` constructor option. TODO: doc expand
   *
   * @param value If undefined, the format key is deleted, clearing its
   * current value.
   */
  format<K extends keyof F & string>(
    startIndex: number,
    endIndex: number,
    key: K,
    value: F[K] | undefined,
    expand: "before" | "after" | "both" | "none"
  ) {
    if (startIndex < 0 || startIndex >= this.list.length) {
      throw new Error(
        `startIndex out of bounds: ${startIndex} (length: ${this.list.length})`
      );
    }
    if (endIndex < 0 || endIndex > this.list.length) {
      throw new Error(
        `endIndex out of bound: ${endIndex} (length: ${this.list.length})`
      );
    }
    if (endIndex < startIndex) {
      throw new Error(
        `endIndex ${endIndex} is less than startIndex ${startIndex}`
      );
    }
    if (endIndex === startIndex) {
      // Trivial span.
      // This also rules out the case endIndex = 0.
      return;
    }

    let start: Anchor;
    if (expand === "before" || expand === "both") {
      // Anchor is after startIndex - 1 (maybe the beginning of the list).
      start = {
        pos: startIndex === 0 ? null : this.list.getPosition(startIndex - 1),
        before: false,
      };
    } else {
      // Anchor is before startIndex.
      start = { pos: this.list.getPosition(startIndex), before: true };
    }

    let end: Anchor;
    if (expand === "after" || expand === "both") {
      // Anchor is before endIndex (maybe the end of the list).
      end = {
        pos:
          endIndex === this.list.length
            ? null
            : this.list.getPosition(endIndex),
        before: true,
      };
    } else {
      // Anchor is after endIndex - 1.
      end = { pos: this.list.getPosition(endIndex - 1), before: false };
    }

    this.spanLog.add(key, value, start, end);
  }

  /**
   * Returns the format for the character at `index`.
   *
   * @throws If index is not in `[0, this.list.length)`.
   */
  getFormat(index: number): Partial<F> {
    return this.getFormatInternal(this.list.getPosition(index));
  }

  /**
   * Returns the format at position.
   *
   * If position is not currently present, returns the formatting that
   * a character at position would have if present.
   */
  private getFormatInternal(position: Position): Partial<F> {
    // If { position, "before" } is present, use that.
    const justBefore = this.formatList.getByPosition(position)?.before;
    if (justBefore !== undefined) return spansToF(justBefore);

    // Else find the closest < FormatData.
    // OPT: direct method for this in LocalList, to avoid getting index.
    const dataIndex = this.formatList.indexOfPosition(position, "left");
    if (dataIndex === -1) {
      // No format.
      return {};
    }
    const dataPos = this.formatList.getPosition(dataIndex);
    const data = nonNull(this.formatList.getByPosition(dataPos));

    // Return the later anchor that's present.
    if (data.after !== undefined) return spansToF(data.after);
    else return spansToF(nonNull(data.before));
  }

  // We omit Positions for efficiency. If you want them, use entries().
  /**
   * Iterates over an efficient representation of the formatted text.
   *
   * Specifically, this method iterates over the formatted ranges in text order
   * (as returned by [[formatted]]).
   */
  [Symbol.iterator](): IterableIterator<FormattedRange<F>> {
    return this.formatted()[Symbol.iterator]();
  }

  /**
   * Returns an efficient representation of the formatted text.
   *
   * Specifically, returns an array of formatted ranges in text order.
   */
  formatted(): FormattedRange<F>[] {
    const sliceBuilder = new SliceBuilder<Partial<F>>(this.list, recordEquals);
    // Starting chars have no format.
    sliceBuilder.add({ pos: null, before: false }, {});
    for (const [, data, pos] of this.formatList.entries()) {
      if (data.before !== undefined) {
        sliceBuilder.add({ pos, before: true }, spansToF(data.before));
      }
      if (data.after !== undefined) {
        sliceBuilder.add({ pos, before: false }, spansToF(data.after));
      }
      // OPT: stop early if we reach the end of the present list.
      // E.g. it was cleared and restarted, so there is a lot of junk at the end.
    }
    const slices = sliceBuilder.finish({ pos: null, before: true });

    // Map the slices to the expected format.
    return slices.map((slice) => ({
      startIndex: slice.startIndex,
      endIndex: slice.endIndex,
      format: slice.data,
    }));
  }
}

/**
 * formatList value type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FormatData<F extends Record<string, any>> {
  // TODO: at least one is always defined
  /**
   * Spans starting at or strictly containing anchor { ourPos, "before" }.
   *
   * Specifically, maps from format key to the winning span for that key,
   * according to the lamport order (w/ senderID tiebreaker).
   *
   * undefined if not needed (no spans start or end here).
   */
  before?: Map<keyof F & string, Span<F>>;
  /**
   * Spans starting at or strictly containing anchor { ourPos, "after" }.
   *
   * Specifically, maps from format key to the winning span for that key,
   * according to the lamport order (w/ senderID tiebreaker).
   *
   * undefined if not needed (no spans start or end here).
   */
  after?: Map<keyof F & string, Span<F>>;
}

// OPT: remove from CSpanLog any spans that are no longer referenced in
// formatData (because they were completely overridden by later spans).
// Could potentially do this using WeakRefs/WeakValueMap, so JS tells us
// which spans are no longer referenced.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function spansToF<F extends Record<string, any>>(
  spans: Map<keyof F & string, Span<F>>
): Partial<F> {
  const ans: Partial<F> = {};
  for (const [key, span] of spans) {
    if (span.value !== undefined) ans[key] = span.value;
  }
  return ans;
}

/**
 * A slice of CRichText.text with attached data, used by SliceBuilder.
 */
interface Slice<D> {
  startIndex: number;
  endIndex: number;
  data: D;
}

/**
 * Utility class for outputting ranges in Format events and formatted().
 * This class takes care of converting anchors
 * to indexes, omitting empty ranges, and merging neighboring ranges
 * with the same data (according to the constructor's `equals` arg).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class SliceBuilder<D> {
  private readonly slices: Slice<D>[] = [];
  private prevIndex = -1;
  private prevData: D | null = null;

  constructor(
    readonly list: IFormattableList,
    readonly equals: (a: D, b: D) => boolean
  ) {}

  /**
   * Add a new range with the given data and interval start, ending the
   * previous interval.
   *
   * anchor must not be the end anchor.
   */
  add(anchor: Anchor, data: D): void {
    // The index where this new span begins.
    let index: number;
    if (anchor.pos === null) index = 0;
    else if (anchor.before) {
      index = this.list.indexOfPosition(anchor.pos, "right");
    } else index = this.list.indexOfPosition(anchor.pos, "left") + 1;

    if (this.prevIndex !== -1) {
      // Record the previous call's data.
      // Use ! instead of nonNull because D might allow null.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.record(this.prevIndex, index, this.prevData!);
    }

    this.prevIndex = index;
    this.prevData = data;
  }

  /**
   * Ends the most recent interval at nextAnchor and returns the
   * finished slices.
   */
  finish(nextAnchor: Anchor): Slice<D>[] {
    if (this.prevIndex !== -1) {
      // Record the previous call's data.
      // index is where the next span would begin, computed as in
      // add() except that null maps to the end.
      let index: number;
      if (nextAnchor.pos === null) index = this.list.length;
      else if (nextAnchor.before) {
        index = this.list.indexOfPosition(nextAnchor.pos, "right");
      } else index = this.list.indexOfPosition(nextAnchor.pos, "left") + 1;

      // Use ! instead of nonNull because D might allow null.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormatChange<F extends Record<string, any>> = {
  previousValue: F[keyof F & string] | undefined;
  format: Partial<F>;
} | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatChangeEquals<F extends Record<string, any>>(
  a: FormatChange<F>,
  b: FormatChange<F>
): boolean {
  if (a === null || b === null) return a === b;
  return (
    a.previousValue === b.previousValue && recordEquals(a.format, b.format)
  );
}

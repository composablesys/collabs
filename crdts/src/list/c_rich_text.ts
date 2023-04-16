import {
  CObject,
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  Position,
  UpdateMeta,
} from "@collabs/core";
import { CSpanLog, Span } from "./c_span_log";
import { TextEvent } from "./c_text";
import { CValueList } from "./c_value_list";
import { LocalList } from "./local_list";

export interface RichTextInsertEvent extends TextEvent {
  /**
   * The values' initial, inherited format. If insert() overrode the
   * inherited format, then this may have the old value;
   * overriding will come in a subsequent Format event.
   */
  format: Record<string, string>;
}

/**
 * TODO: if a format call is broken up into multiple intervals by
 * concurrent ops, it will emit several of these events in a row,
 * but the state is fully updated immediately. So first events
 * are technically "behind" the state. (I guess we could emit earlier
 * to prevent this?)
 */
export interface RichTextFormatEvent extends CollabEvent {
  /** Array.slice format - [startIndex, endIndex). */
  startIndex: number;
  endIndex: number;
  key: string;
  /**
   * undefined if the formatting at key was deleted (set to default).
   */
  value: string | undefined;
  previousValue: string | undefined;
  /** Whole format on the slice including this change. */
  format: Record<string, string>;
  // We technically should include Positions (ordered map from Positions to
  // (value, format) model), but it would be inefficient and rarely useful.
}

export interface RichTextEventsRecord extends CollabEventsRecord {
  Insert: RichTextInsertEvent;
  Delete: TextEvent;
  Format: RichTextFormatEvent;
}

// TODO: format type. Is Record<string, string> appropriate? Consider Quill, Prosemirror, Yjs, Automerge.
// Automerge has list of options. I guess we should allow general V w/ serializer option.

interface FormatData {
  /**
   * Map from formatting key to the winning span for that key,
   * according to the lamport order (w/ senderID tiebreaker).
   *
   * This only includes spans that start or internally contain
   * this position. To get the actual formatting at this position,
   * also consider endClosedSpans.
   */
  readonly normalSpans: Map<string, Span>;
  /**
   * Spans that have a closed end at this position and win
   * over the corresponding normalSpan, overriding it.
   *
   * For characters at this exact position only, if a key is
   * present in both normalSpan and endClosedSpan, use endClosedSpan's value.
   *
   * OPT: omit this field if the map would be empty.
   */
  readonly endClosedSpans: Map<string, Span>;
}

// TODO: string | object instead, for Quill compat? Arbitrary T?
// TODO: other IList methods (since we don't have defaults anymore).
// Adjust types as needed to include formatting
export class CRichText extends CObject<RichTextEventsRecord> {
  private readonly text: CValueList<string>;
  private readonly spanLog: CSpanLog;

  /**
   * A view of spanLog that is designed for easy querying.
   * This is mostly as described in the Peritext paper, but with
   * a different handling of open/closed endpoints.
   */
  private readonly formatList: LocalList<FormatData>;

  private readonly isEndClosed: (
    key: string,
    value: string | undefined
  ) => boolean;

  constructor(
    init: InitToken,
    options?: {
      /**
       * Formatting attributes whose spans should have closed ends
       * (not inherited by new following characters).
       * E.g. links, single-char formats (Quill \n stuff).
       * Default: none (always false)
       */
      isEndClosed?: (key: string, value: string | undefined) => boolean;
    }
  ) {
    super(init);

    this.isEndClosed = options?.isEndClosed ?? (() => false);

    this.text = super.registerCollab("", (init) => new CValueList(init));
    this.spanLog = super.registerCollab("0", (init) => new CSpanLog(init));

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
        format: this.getFormatByPosition(e.positions[0]),
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

  // TODO: if a span is closed and has the same start and end, is it handled reasonably?
  // Might end up in both normalSpans & endClosedSpans.

  private addSpan(span: Span, meta: UpdateMeta) {
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
    const sliceBuilder = new SliceBuilder(this, formatChangeEquals);
    for (let i = start; i < end; i++) {
      const position = this.formatList.getPosition(i);
      const data = this.formatList.getByPosition(position)!;
      if (this.wins(span, data.normalSpans.get(span.key))) {
        const previousValueOpen = data.normalSpans.get(span.key)?.value;
        data.normalSpans.set(span.key, span);
        if (this.wins(span, data.endClosedSpans.get(span.key))) {
          // Overwrite the endClosedSpan (if it exists), to maintain the
          // invariant: an endClosedSpan is only present if it wins over the
          // normalSpan.
          let previousValueClosed: string | undefined;
          if (data.endClosedSpans.has(span.key)) {
            previousValueClosed = data.endClosedSpans.get(span.key)!.value;
            data.endClosedSpans.delete(span.key);
          } else previousValueClosed = previousValueOpen;
          // Yes change in the interval [position].
          sliceBuilder.add(
            {
              previousValue: previousValueClosed,
              format: this.getFormatInternal(position, true, data),
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
            format: this.getFormatInternal(position, false, data),
          },
          position,
          false
        );
      } else {
        // No change in the interval starting [position,...
        sliceBuilder.add(null, position, true);
      }
    }

    let slices: Slice<FormatChange>[];
    if (span.endPosition !== null && span.endClosed === true) {
      // Merge span into endPos's endClosedSpans.
      // We only store span if it wins over both the existing endClosedSpan
      // and the existing normalSpan, as described in FormatData.endClosedSpan's
      // docs.
      // Non-null assertion okay because we created the FormatData above.
      const data = this.formatList.getByPosition(span.endPosition)!;
      if (
        this.wins(span, data.endClosedSpans.get(span.key)) &&
        // This works even if startPos == endPos (hence normalSpans contains
        // this span already), since a span wins over itself.
        this.wins(span, data.normalSpans.get(span.key))
      ) {
        const previousValue = data.endClosedSpans.has(span.key)
          ? data.endClosedSpans.get(span.key)!.value
          : data.normalSpans.get(span.key)?.value;
        data.endClosedSpans.set(span.key, span);
        sliceBuilder.add(
          {
            previousValue,
            format: this.getFormatInternal(span.endPosition, true, data),
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
   * TODO: doc same-tr rule. Also works for saves b/c those emit Add events
   * in order, and only for non-redundant spans.
   * Also returns true if it's the same span.
   */
  private wins(newSpan: Span, oldSpan: Span | undefined): boolean {
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
   *
   * @param index
   * @param text
   * @param format The exact format. keys will only be set as needed
   * (i.e., text doesn't inherit that format already).
   * @returns
   */
  insert(index: number, text: string, format: Record<string, string>): void {
    if (text.length === 0) return;
    this.text.insert(index, ...text);

    // Change formatting to match format.
    // No existing positions can be interleaved with the chars' positions,
    // so the chars all have the same existing formatting.
    const existing = this.getFormat(index);
    const startPos = this.text.getPosition(index);
    const endPosClosed = this.text.getPosition(index + text.length - 1);
    const endPosOpen = this.text.getPosition(index + text.length);
    for (const [key, value] of Object.entries(format)) {
      if (existing[key] !== value) {
        const endClosed = this.isEndClosed(key, value);
        this.formatInternal(
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
        const endClosed = this.isEndClosed(key, undefined);
        this.formatInternal(
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
   * Unlike insert, this will send the spans even if redundant
   * (already formatted like that).
   *
   * @param key
   * @param value undefined clears the format.
   * @param startIndex
   * @param endIndex unlike endPos, if endClosed, this is the next index
   * (exclusive range - slice behavior)
   */
  format(
    startIndex: number,
    endIndex: number,
    key: string,
    value: string | undefined
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

    const endClosed = this.isEndClosed(key, value);

    // From trivial span case, we're guaranteed endIndex >= 1, so this is
    // in [0, this.length].
    const actualEndIndex = endClosed ? endIndex - 1 : endIndex;
    const endPos =
      actualEndIndex === this.length ? null : this.getPosition(actualEndIndex);
    this.formatInternal(
      key,
      value,
      this.getPosition(startIndex),
      endPos,
      endClosed
    );
  }

  private formatInternal(
    key: string,
    value: string | undefined,
    startPos: Position,
    endPos: Position | null,
    endClosed: boolean
  ) {
    this.spanLog.add({
      key,
      value,
      startPosition: startPos,
      endPosition: endPos,
      endClosed: endClosed ? true : undefined,
    });
  }

  delete(startIndex: number, count?: number | undefined): void {
    this.text.delete(startIndex, count);
  }

  get(index: number): string {
    return this.text.get(index);
  }

  getFormat(index: number): Record<string, string> {
    return this.getFormatByPosition(this.text.getPosition(index));
  }

  /**
   * Returns the formatting at position.
   *
   * If position is not currently present, returns the formatting that
   * a character at position would have if present.
   */
  getFormatByPosition(position: Position): Record<string, string> {
    // Find the closest <= FormatData.
    // OPT: direct method for this in LocalList, to avoid getting index.
    const dataIndex = this.formatList.indexOfPosition(position, "left");
    if (dataIndex === -1) {
      // No format.
      return {};
    }
    const dataPos = this.formatList.getPosition(dataIndex);
    return this.getFormatInternal(dataPos, dataPos === position);
  }

  private getFormatInternal(
    dataPos: Position,
    includeClosed: boolean,
    data?: FormatData
  ): Record<string, string> {
    data = data ?? this.formatList.getByPosition(dataPos)!;

    const ans: Record<string, string> = {};
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

  getPosition(index: number): Position {
    return this.text.getPosition(index);
  }

  indexOfPosition(
    position: Position,
    searchDir?: "none" | "left" | "right" | undefined
  ): number {
    return this.text.indexOfPosition(position, searchDir);
  }

  hasPosition(position: Position): boolean {
    return this.text.hasPosition(position);
  }

  values(): IterableIterator<string> {
    return this.text.values();
  }

  // TODO: IList generally: put Position at the end in entries(), since it's less relevant?
  // If so, also put at end here (even though it doesn't exactly match the IList signature).
  *entries(): IterableIterator<
    [
      index: number,
      position: Position,
      value: string,
      format: Record<string, string>
    ]
  > {
    // TODO: caller needs to treat formats as immutable (shared by several outputs).
    // Likewise for Symbol.iterator.
    const positionsIter = this.text.positions();
    for (const { index, values, format } of this.formatted()) {
      for (let i = 0; i < values.length; i++) {
        yield [index + i, positionsIter.next().value, values[i], format];
      }
    }
  }

  [Symbol.iterator](): IterableIterator<
    [
      index: number,
      position: Position,
      value: string,
      format: Record<string, string>
    ]
  > {
    return this.entries();
  }

  // We omit Positions for efficiency. If you want them, use entries().
  formatted(): Array<{
    index: number;
    values: string;
    format: Record<string, string>;
  }> {
    const sliceBuilder = new SliceBuilder<Record<string, string>>(
      this,
      recordEquals
    );
    // Starting chars have no format.
    sliceBuilder.add({}, null, false);
    for (const [, position, data] of this.formatList.entries()) {
      // Format exactly at position, including closedEnds.
      if (this.text.hasPosition(position)) {
        sliceBuilder.add(
          this.getFormatInternal(position, true, data),
          position,
          true
        );
      } // Else it is safe to skip.
      // Format for the rest of the span (the open part).
      sliceBuilder.add(
        this.getFormatInternal(position, false, data),
        position,
        false
      );
    }
    const slices = sliceBuilder.finish(null, false);

    // Map the slices to the expected format.
    return slices.map((slice) => ({
      index: slice.startIndex,
      values: this.text.slice(slice.startIndex, slice.endIndex).join(""),
      format: slice.data,
    }));
  }

  get length(): number {
    return this.text.length;
  }

  toString(): string {
    // TODO: change if text allows non-chars.
    return this.text.slice().join("");
  }

  // TODO: other IList methods? See AbstractList.
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

class SliceBuilder<D> {
  private readonly slices: Slice<D>[] = [];
  // TODO: fast-path escape when it's list.length
  private prevIndex = -1;
  private prevData: D | null = null;

  constructor(
    readonly list: CRichText,
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

type FormatChange = {
  previousValue: string | undefined;
  format: Record<string, string>;
} | null;

function formatChangeEquals(a: FormatChange, b: FormatChange): boolean {
  if (a === null || b === null) return a === b;
  return (
    a.previousValue === b.previousValue && recordEquals(a.format, b.format)
  );
}

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

// TODO: generalize to other lists and market for use as e.g. comment
// spans? Could do so without affecting existing lists - add a static
// class with indexOfInterval/getInterval methods, instead of the ones
// on CRichText.
/**
 * An interval of [[Position]]s in a [[CRichText]].
 */
export interface Interval {
  /**
   * The interval's starting [[Position]].
   *
   * Null for open start of the document.
   */
  readonly start: Position | null;
  /**
   * The interval's ending [[Position]].
   *
   * Null for open end of the document.
   */
  readonly end: Position | null;
  /**
   * Whether the interval contains [[start]], i.e., it has
   * the form `[start,...` instead of `(start, ...`.
   */
  readonly startClosed: boolean;
  /**
   * Whether the interval contains [[end]], i.e., it has
   * the form `..., end]` instead of `..., end)`.
   */
  readonly endClosed: boolean;
}

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
 *
 * TODO: might not describe all spans fully (e.g. won't tell you
 * about spans with local startIndex = endIndex). OK b/c events are
 * just for describing the local state; Position/Internal stuff
 * is included b/c we think of Positions as part of the state
 * (ordered map API). (Perhaps then we shouldn't give proper Intervals,
 * just startPos and endPos?)
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
  // TODO. Closed ends complicate addSpan's intervals.
  // previousValue: string | undefined;
  /**
   * Underlying interval. startClosed/endClosed are unrelated to
   * [[startIndex]]/[[endIndex]] - those always use slice format.
   */
  interval: Interval;
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

    // Intervals of *formatList indices* (not text indices) that actually
    // changed.
    const intervalsPre = new Array<{
      start: number;
      end: number;
      startClosed: boolean;
      endClosed?: true;
    }>();

    // Merge span into all FormatData.normalSpan in the range
    // [startPos, endPos).
    const start = this.formatList.indexOfPosition(span.startPosition);
    const end =
      span.endPosition === null
        ? this.formatList.length
        : this.formatList.indexOfPosition(span.endPosition, "right");
    for (let i = start; i < end; i++) {
      const data = this.formatList.get(i);
      if (this.wins(span, data.normalSpans.get(span.key))) {
        data.normalSpans.set(span.key, span);
        if (this.wins(span, data.endClosedSpans.get(span.key))) {
          // Overwrite the endClosedSpan (if it exists), to maintain the
          // invariant: an endClosedSpan is only present if it wins over the
          // normalSpan.
          data.endClosedSpans.delete(span.key);
          // Add [i, i+1) to intervals, merging with the previous interval
          // if possible.
          if (
            intervalsPre.length > 0 &&
            intervalsPre[intervalsPre.length - 1].end === i
          ) {
            intervalsPre[intervalsPre.length - 1].end = i + 1;
          } else intervalsPre.push({ start: i, end: i + 1, startClosed: true });
        } else {
          // Add (i, i+1) to intervals.
          intervalsPre.push({
            start: i,
            end: i + 1,
            startClosed: false,
          });
        }
      }
    }

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
        data.endClosedSpans.set(span.key, span);
        // Add [end, end] to intervals, merging with the previous interval
        // if possible.
        if (
          intervalsPre.length > 0 &&
          intervalsPre[intervalsPre.length - 1].end === end
        ) {
          intervalsPre[intervalsPre.length - 1].endClosed = true;
        } else {
          intervalsPre.push({
            start: end,
            end: end,
            startClosed: true,
            endClosed: true,
          });
        }
      }
    }

    // 2. Emit Format events.
    for (const intervalPre of intervalsPre) {
      const interval: Interval = {
        start: this.formatList.getPosition(intervalPre.start),
        end: this.formatList.getPosition(intervalPre.end),
        startClosed: intervalPre.startClosed,
        endClosed: intervalPre.endClosed ?? false,
      };
      const [startIndex, endIndex] = this.indexOfInterval(interval);
      this.emit("Format", {
        startIndex,
        endIndex,
        key: span.key,
        value: span.value,
        interval: interval,
        meta,
      });
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
    // Find the closet <= FormatData.
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

  /**
   * Returns an Interval representing [startIndex, endIndex) with the given
   * end behavior (default [startPos, endPos)).
   *
   * TODO: cases when startPos >= endPos (might throw error currently if endPos = 0)
   */
  getInterval(
    startIndex: number,
    endIndex: number,
    startClosed = true,
    endClosed = false
  ): Interval {
    let start: Position | null;
    if (startClosed) start = this.getPosition(startIndex);
    else {
      start = startIndex === 0 ? null : this.getPosition(startIndex - 1);
    }

    // Note that endIndex is exclusive, i.e., 1 + the interval's
    // actual last value.
    let end: Position | null;
    if (endClosed) end = this.getPosition(endIndex - 1);
    else {
      end = endIndex === this.length ? null : this.getPosition(endIndex);
    }

    return { start, end, startClosed, endClosed };
  }

  indexOfInterval(interval: Interval): [startIndex: number, endIndex: number] {
    let startIndex: number;
    // Technically shouldn't have null and startClosed, but just accept it.
    if (interval.start === null) startIndex = 0;
    else {
      if (interval.startClosed) {
        startIndex = this.text.indexOfPosition(interval.start, "right");
      } else startIndex = this.text.indexOfPosition(interval.start, "left") + 1;
    }

    // Note that endIndex is exclusive, i.e., 1 + the interval's
    // actual last value.
    let endIndex: number;
    // Technically shouldn't have null and endClosed, but just accept it.
    if (interval.end === null) endIndex = this.length;
    else {
      if (interval.endClosed === true) {
        endIndex = this.text.indexOfPosition(interval.end, "left") + 1;
      } else endIndex = this.text.indexOfPosition(interval.end, "right");
    }

    return [startIndex, endIndex];
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
    for (const [index, values, format] of this.formatted()) {
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

  // TODO: include interval? Though may not accurately represent internal spans.
  // Alt method that does? Or option?
  *formatted(): IterableIterator<
    [index: number, values: string, format: Record<string, string>]
  > {
    let inProgress:
      | [startIndex: number, endIndex: number, format: Record<string, string>]
      | null = null;
    for (const formatted of this.formattedInternal()) {
      if (inProgress !== null) {
        if (recordEquals(formatted[2], inProgress[2])) {
          // Extend the in-progress interval.
          inProgress[1] = formatted[1];
        } else {
          // Yield the in-progress interval and start another.
          const forYield = this.forYield(inProgress);
          if (forYield !== null) yield forYield;
          inProgress = formatted;
        }
      } else inProgress = formatted;
    }
    if (inProgress !== null) {
      // Yield the last interval.
      const forYield = this.forYield(inProgress);
      if (forYield !== null) yield forYield;
    }
  }

  private forYield(
    inProgress:
      | [startIndex: number, endIndex: number, format: Record<string, string>]
  ): [index: number, values: string, format: Record<string, string>] | null {
    const [startIndex, endIndex, format] = inProgress;
    if (endIndex === startIndex) return null;
    return [startIndex, this.text.slice(startIndex, endIndex).join(""), format];
  }

  /**
   * Same as formatted(), but without eliminating redundant intervals
   * (same format in a row). Does eliminate 0-length intervals, to avoid
   * breaking up matching intervals with a tombstone between.
   */
  private *formattedInternal(): IterableIterator<
    [startIndex: number, endIndex: number, format: Record<string, string>]
  > {
    const iter = this.formatList.entries();

    let next = iter.next();
    if (next.done) return;
    // Yield [list start, next), which has no formatting.
    let index = this.text.indexOfPosition(next.value[1], "right");
    yield [0, index, {}];

    while (!next.done) {
      const [, currentPos, currentData] = next.value;
      next = iter.next();

      if (this.text.hasPosition(currentPos)) {
        // Yield [currentPos].
        const formatClosed = this.getFormatInternal(
          currentPos,
          true,
          currentData
        );
        yield [index, index + 1, formatClosed];
        index++;
      }
      // Yield (currentPos, nextPos).
      const format = this.getFormatInternal(currentPos, false, currentData);
      if (next.done) {
        // Treat nextPos as list end.
        if (this.length !== index) yield [index, this.length, format];
      } else {
        const nextIndex = this.text.indexOfPosition(next.value[1], "right");
        if (nextIndex !== index) yield [index, nextIndex, format];
        index = nextIndex;
        // Fast escape hatch: if we're done, skip over the rest of formatData.
        if (index === this.length) return;
      }
    }
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

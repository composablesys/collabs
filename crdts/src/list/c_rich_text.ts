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

// TODO: convert to class with toString, has functions?
// Perhaps also iterator to visit all (current) contained positions?
// Or, better to leave as interface for JSON ability; add helper
// functions in original class instead.
// Market these for use as e.g. comment ranges.

/**
 * An interval of [[Position]]s in a [[CRichText]].
 */
export interface PositionInterval {
  /**
   * The interval's starting [[Position]].
   */
  readonly start: Position;
  /**
   * The interval's ending [[Position]].
   */
  readonly end: Position;
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
  /*
   * TODO: emit with proper (final) formatting instead? Easy for messages;
   * for saved state, we'd need to load the position source first, then
   * the formatting, then the value list - e.g. by supplying a custom PositionSource
   * to this.text. Note that could still show weird formatting on to-be-deleted
   * stuff while merging.
   */
  /**
   * The values' initial, inherited format. If insert() overrode the
   * inherited format, then this will have the old value;
   * overriding will come in a subsequent Format event in the same transaction.
   * (TODO: what about saved states?)
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
   * TODO: change to null for sanity?
   */
  value: string | undefined;
  // TODO. Closed ends complicate addSpan's intervals.
  // previousValue: string | undefined;
  positionInterval: PositionInterval;
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

// TODO: allow open starts? Perhaps as general formattable-list class;
// could be useful for paragraph-start behavior. Then always take
// open/closed endpoints as arg; perhaps wrap in CRichText class
// that supplies default behavior (esp for inserts).
// General class could be wrapper around any IList, for fanciness.

// TODO: string | object instead, for Quill compat? Arbitrary T?
// TODO: other IList methods (since we don't have defaults anymore).
// Adjust types as needed to include formatting
export class CRichText extends CObject<RichTextEventsRecord> {
  private readonly text: CValueList<string>;
  private readonly spanLog: CSpanLog;

  /**
   * A view of spanLog that is designed for easy querying.
   * This is mostly as described in the Peritext paper.
   */
  private readonly formatList: LocalList<FormatData>;

  private readonly insertClosed: (
    key: string,
    value: string | undefined
  ) => boolean;

  constructor(
    init: InitToken,
    options?: {
      insertClosed?: (key: string, value: string | undefined) => boolean;
    }
  ) {
    super(init);

    this.insertClosed = options?.insertClosed ?? (() => false);

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
    const intervals = new Array<{
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
            intervals.length > 0 &&
            intervals[intervals.length - 1].end === i
          ) {
            intervals[intervals.length - 1].end = i + 1;
          } else intervals.push({ start: i, end: i + 1, startClosed: true });
        } else {
          // Add (i, i+1) to intervals.
          intervals.push({
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
          intervals.length > 0 &&
          intervals[intervals.length - 1].end === end
        ) {
          intervals[intervals.length - 1].endClosed = true;
        } else {
          intervals.push({
            start: end,
            end: end,
            startClosed: true,
            endClosed: true,
          });
        }
      }
    }

    // 2. Emit Format events.
    for (const interval of intervals) {
      const positionInterval: PositionInterval = {
        start: this.formatList.getPosition(interval.start),
        end: this.formatList.getPosition(interval.end),
        startClosed: interval.startClosed,
        endClosed: interval.endClosed ?? false,
      };
      const [startIndex, endIndex] =
        this.indexOfPositionInterval(positionInterval);
      this.emit("Format", {
        startIndex,
        endIndex,
        key: span.key,
        value: span.value,
        positionInterval,
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

  // TODO: PositionInterval -> Interval? At least for related names?

  indexOfPositionInterval(
    positionInterval: PositionInterval
  ): [startIndex: number, endIndex: number] {
    let startIndex: number;
    if (positionInterval.startClosed) {
      startIndex = this.text.indexOfPosition(positionInterval.start, "right");
    } else
      startIndex =
        this.text.indexOfPosition(positionInterval.start, "left") + 1;

    // Note that endIndex is exclusive, i.e., 1 + the interval's
    // actual last value.
    let endIndex: number;
    if (positionInterval.endClosed === true) {
      endIndex = this.text.indexOfPosition(positionInterval.end, "left") + 1;
    } else endIndex = this.text.indexOfPosition(positionInterval.end, "right");

    return [startIndex, endIndex];
  }

  /**
   *
   * @param index
   * @param text
   * @param format If omitted, format is inherited from existing spans.
   * To make the text unformatted, instead pass in `{}`.
   * (Note: this disagrees with Quill, which treates omitted as equivalent to {}.)
   * @returns
   */
  insert(index: number, text: string, format?: Record<string, string>): void {
    if (text.length === 0) return;
    this.text.insert(index, ...text);

    if (format === undefined) return;
    // Else change formatting to match format.
    // No existing positions can be interleaved with the chars' positions,
    // so the chars all have the same existing formatting.
    const existing = this.getFormat(index);
    const startPos = this.text.getPosition(index);
    const endPosClosed = this.text.getPosition(index + text.length - 1);
    const endPosOpen = this.text.getPosition(index + text.length);
    for (const [key, value] of Object.entries(format)) {
      if (existing[key] !== value) {
        const endClosed = this.insertClosed(key, value);
        this.formatRaw(
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
        const endClosed = this.insertClosed(key, undefined);
        this.formatRaw(
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
   * @param endClosed TODO: should we use this.insertClosed instead?
   */
  format(
    startIndex: number,
    endIndex: number,
    key: string,
    value: string | undefined,
    endClosed = false
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

    // From trivial span case, we're guaranteed endIndex >= 1, so this is
    // in [0, this.length].
    const actualEndIndex = endClosed ? endIndex - 1 : endIndex;
    const endPos =
      actualEndIndex === this.length ? null : this.getPosition(actualEndIndex);
    this.formatRaw(key, value, this.getPosition(startIndex), endPos, endClosed);
  }

  formatRaw(
    key: string,
    value: string | undefined,
    startPos: Position,
    endPos: Position | null,
    endClosed = false
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
    const data = this.formatList.getByPosition(dataPos)!;

    const ans: Record<string, string> = {};
    if (dataPos === position) {
      // data is exactly at position, so we need to consider its
      // endClosedSpans, which override normalSpans.
      for (const [key, span] of data.endClosedSpans) {
        if (span.value !== undefined) ans[key] = span.value;
      }
      for (const [key, span] of data.normalSpans) {
        if (!data.endClosedSpans.has(key)) {
          if (span.value !== undefined) ans[key] = span.value;
        }
      }
    } else {
      for (const [key, span] of data.normalSpans) {
        if (span.value !== undefined) ans[key] = span.value;
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

  // TODO: Quill delta format instead, at least for values()?
  // See what Yjs & Automerge do.

  // TODO: IList generally: put Position at the end in entries(), since it's less relevant?
  // To match formatted() below.

  /**
   * To get format info, use formatted() instead or call
   * getFormatByPosition on each entry.
   */
  entries(): IterableIterator<
    [index: number, position: Position, value: string]
  > {
    return this.text.entries();
  }

  *formatted(): IterableIterator<
    [
      index: number,
      values: string,
      format: Map<string, string>,
      positionInterval: PositionInterval
    ]
  > {
    let prevEntry: [position: Position, data: FormatData] | null = null;
    for (const [, position, data] of this.formatList.entries()) {
      if (prevEntry !== null) {
        // Emit an interval for [prevEntry, entry).
        const [prevPosition, prevData] = prevEntry;
        const startIndex = this.text.indexOfPosition(prevPosition, "right");
        const endIndex = this.text.indexOfPosition(position, "right") - 1;
      }

      prevEntry = [position, data];
    }
  }

  get length(): number {
    return this.text.length;
  }

  toString(): string {
    // TODO: change if text allows non-chars.
    return this.text.slice().join("");
  }

  // TODO: wrappers for overridden CValueList default methods
}

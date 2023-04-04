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
   * inherited format, then this will has the old value;
   * overriding will come in a subsequent Format event in the same transaction.
   */
  format: Record<string, string>;
}

/**
 * Event for a single format/formatRaw call (also used to adjust formats
 * on insert, one per key).
 *
 * Due to concurrent/redundant formats, the formatted span may be broken
 * up into several intervals - see [[intervals]].
 *
 * TODO: also give original startPos/endPos/endClosed? I guess hard
 * to make sense of without Lamport, which we shouldn't provide
 * (like how CVar doesn't provide VC info).
 */
export interface RichTextFormatEvent extends CollabEvent {
  key: string;
  /**
   * undefined if the formatting at key was deleted (set to default).
   * TODO: change to null for sanity?
   */
  value: string | undefined;
  /** Array.slice format - [startIndex, endIndex). */
  intervals: {
    startIndex: number;
    endIndex: number;
    // TODO: include below info about actual interval.
    // TODO: also include previous value for each range?
    // /**
    //  * May not match startIndex due to !startClosed.
    //  */
    // startPosition: Position;
    // /**
    //  * Note: even if true, startIndex is included in the current state.
    //  * This is just about positions.
    //  *
    //  * TODO: rename this and endClosed to make clear that they refer
    //  * to startPosition, not startIndex.
    //  */
    // startClosed: boolean;
    // /**
    //  * May not match endIndex due to closedness, tombstones.
    //  */
    // endPosition: Position;
    // /**
    //  * Note: even if true, endIndex is excluded in the current state.
    //  * This is just about positions.
    //  */
    // endClosed: boolean;
  }[];
}

export interface RichTextEventsRecord extends CollabEventsRecord {
  Insert: RichTextInsertEvent;
  Delete: TextEvent;
  Format: RichTextFormatEvent;
}

// TODO: format type. Is Record<string, string> appropriate? Consider Quill, Prosemirror, Yjs, Automerge.

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

    // 2. Emit Format event.
    // First we must convert intervals from formatList indices to text indices.
    const textIntervals = intervals.map((interval) => {
      const startPos = this.formatList.getPosition(interval.start);
      let startIndex: number;
      if (interval.startClosed) {
        startIndex = this.text.indexOfPosition(startPos, "right");
      } else startIndex = this.text.indexOfPosition(startPos, "left") + 1;

      const endPos = this.formatList.getPosition(interval.end);
      let endIndex: number;
      if (interval.endClosed === true) {
        endIndex = this.text.indexOfPosition(endPos, "left");
      } else endIndex = this.text.indexOfPosition(endPos, "right") - 1;

      return { startIndex, endIndex };
    });
    this.emit("Format", {
      key: span.key,
      value: span.value,
      intervals: textIntervals,
      meta,
    });

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
   * Unlike (original) insert, this will send the spans even if redundant
   * (already formatted like that).
   *
   * @param key
   * @param value undefined clears the format.
   * @param startIndex
   * @param endIndex unlike endPos, if endClosed, this is the next index
   * (exclusive range - slice behavior)
   * @param endClosed
   */
  format(
    key: string,
    value: string | undefined,
    startIndex: number,
    endIndex: number,
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

  entries(): IterableIterator<
    [index: number, position: Position, value: string]
  > {
    return this.text.entries();
  }

  get length(): number {
    return this.text.length;
  }

  toString(): string {
    // TODO: change if text allows non-chars.
    return this.text.slice().join("");
  }

  toIntervals(): Array<{
    index: number;
    text: string;
    format: Record<string, string>;
  }> {
    // TODO
  }

  // TODO: wrappers for overridden CValueList default methods
}

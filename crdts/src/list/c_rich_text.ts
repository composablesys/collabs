import { CObject, InitToken, Position, UpdateMeta } from "@collabs/core";
import { CSpanLog, Span } from "./c_span_log";
import { CValueList } from "./c_value_list";
import { LocalList } from "./local_list";

interface FormatData {
  /**
   * Map from formatting key to the winning span for that key,
   * according to the lamport order (w/ senderID tiebreaker).
   *
   * This only includes spans that start or internally contain
   * this position. To get the actual formatting at this position,
   * also consider closedEndSpans.
   */
  readonly normalSpans: Map<string, Span>;
  /**
   * Spans that have a closed end at this position and win
   * over the corresponding normalSpan, overriding it.
   *
   * For characters at this exact position only, if a key is
   * present in both normalSpan and closedEndSpan, use closedEndSpan's value.
   *
   * OPT: omit this field if the map would be empty.
   */
  readonly closedEndSpans: Map<string, Span>;
}

// TODO: events. Quill delta format like Yjs?

// TODO: string | object instead, for Quill compat? Arbitrary T?
// TODO: other IList methods (since we don't have defaults anymore).
// Adjust types as needed to include formatting
export class CRichText extends CObject {
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

    // TODO: our own events (text & format)
    this.spanLog.on("Add", (e) => this.addSpan(e.span, e.meta));
  }

  private addSpan(span: Span, meta: UpdateMeta) {
    this.createData(span.startPos);
    if (span.endPos !== null) this.createData(span.endPos);

    // Merge span into all FormatData.normalSpan in the range
    // [startPos, endPos).
    const start = this.formatList.indexOfPosition(span.startPos);
    const end =
      span.endPos === null
        ? this.formatList.length
        : this.formatList.indexOfPosition(span.endPos, "right");
    for (const data of this.formatList.slice(start, end)) {
      if (this.wins(span, data.normalSpans.get(span.key))) {
        data.normalSpans.set(span.key, span);
      }
    }

    if (span.endPos !== null && span.closedEnd === true) {
      // Merge span into endPos's closedEndSpans.
      // We only store span if it wins over both the existing closedEndSpan
      // and the existing normalSpan, as described in FormatData.closedEndSpan's
      // docs.
      // Non-null assertion okay because we created the FormatData above.
      const data = this.formatList.getByPosition(span.endPos)!;
      if (
        this.wins(span, data.closedEndSpans.get(span.key)) &&
        this.wins(span, data.normalSpans.get(span.key))
      ) {
        data.closedEndSpans.set(span.key, span);
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
        closedEndSpans: new Map(),
      });
    } else {
      const prevSpan = this.formatList.get(prevIndex);
      // Clone normalSpans from prevSpan, since they are the same.
      // We don't clone closedEndSpans because the positions differ.
      this.formatList.set(position, {
        normalSpans: new Map(prevSpan.normalSpans),
        closedEndSpans: new Map(),
      });
    }
  }

  /**
   * TODO: doc same-tr rule. Also works for saves b/c those emit Add events
   * in order, and only for non-redundant spans.
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
        const closedEnd = this.insertClosed(key, value);
        this.formatRaw(
          key,
          value,
          startPos,
          closedEnd ? endPosClosed : endPosOpen,
          closedEnd
        );
      }
    }
    for (const key of Object.keys(existing)) {
      if (format[key] === undefined) {
        const closedEnd = this.insertClosed(key, undefined);
        this.formatRaw(
          key,
          undefined,
          startPos,
          closedEnd ? endPosClosed : endPosOpen,
          closedEnd
        );
      }
    }
  }

  /**
   *
   * @param key
   * @param value undefined clears the format.
   * @param startIndex
   * @param endIndex unlike endPos, if closedEnd, this is the next index
   * (exclusive range - slice behavior)
   * @param closedEnd
   */
  format(
    key: string,
    value: string | undefined,
    startIndex: number,
    endIndex: number,
    closedEnd = false
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
    const actualEndIndex = closedEnd ? endIndex - 1 : endIndex;
    const endPos =
      actualEndIndex === this.length ? null : this.getPosition(actualEndIndex);
    this.formatRaw(key, value, this.getPosition(startIndex), endPos, closedEnd);
  }

  formatRaw(
    key: string,
    value: string | undefined,
    startPos: Position,
    endPos: Position | null,
    closedEnd = false
  ) {
    this.spanLog.add({
      key,
      value,
      startPos,
      endPos,
      closedEnd: closedEnd ? true : undefined,
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
      // closedEndSpans, which override normalSpans.
      for (const [key, span] of data.closedEndSpans) {
        if (span.value !== undefined) ans[key] = span.value;
      }
      for (const [key, span] of data.normalSpans) {
        if (!data.closedEndSpans.has(key)) {
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

  // TODO: wrappers for overridden CValueList default methods
}

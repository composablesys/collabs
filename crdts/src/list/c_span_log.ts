import {
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  int64AsNumber,
  Position,
  Serializer,
  UpdateMeta,
} from "@collabs/core";
import {
  SpanLogPartialSpanMessage,
  SpanLogSaveMessage,
} from "../../generated/proto_compiled";
import { PrimitiveCRDT } from "../base_collabs";
import { CRDTMessageMeta } from "../runtime";

export interface PartialSpan<F> {
  readonly key: string;
  readonly value: F | undefined;
  readonly startPosition: Position;
  /** null for open end of the document */
  readonly endPosition: Position | null;
  readonly endClosed?: true;
}

export interface Span<F> extends PartialSpan<F> {
  readonly lamport: number;
  /** Tiebreaker for lamport. */
  readonly senderID: string;
}

class PartialSpanSerializer<F> implements Serializer<PartialSpan<F>> {
  constructor(readonly formatSerializer: Serializer<F>) {}

  serialize(span: PartialSpan<F>): Uint8Array {
    const message = SpanLogPartialSpanMessage.create({
      ...span,
      value:
        span.value === undefined
          ? undefined
          : this.formatSerializer.serialize(span.value),
    });
    return SpanLogPartialSpanMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): PartialSpan<F> {
    const decoded = SpanLogPartialSpanMessage.decode(message);
    return {
      key: decoded.key,
      value: Object.prototype.hasOwnProperty.call(decoded, "value")
        ? this.formatSerializer.deserialize(decoded.value)
        : undefined,
      startPosition: decoded.startPosition,
      endPosition: Object.prototype.hasOwnProperty.call(decoded, "endPosition")
        ? decoded.endPosition
        : null,
      ...(decoded.endClosed ? { endClosed: true } : {}),
    };
  }
}

export interface SpanLogAddEvent<F> extends CollabEvent {
  span: Span<F>;
}

export interface SpanLogEventsRecord<F> extends CollabEventsRecord {
  Add: SpanLogAddEvent<F>;
}

/**
 * Append-only log of formatting spans, used by CRichText.
 *
 * This is an internal class and is not exported.
 */
export class CSpanLog<F> extends PrimitiveCRDT<SpanLogEventsRecord<F>> {
  /**
   * An append-only log of Spans. For easy searching, it
   * is stored as a Map from senderID to that sender's Spans
   * in send order.
   */
  private readonly log = new Map<string, Span<F>[]>();

  private readonly partialSpanSerializer: PartialSpanSerializer<F>;

  constructor(init: InitToken, formatSerializer: Serializer<F>) {
    super(init);
    this.partialSpanSerializer = new PartialSpanSerializer(formatSerializer);
  }

  add(
    key: string,
    value: F | undefined,
    startPos: Position,
    endPos: Position | null,
    endClosed: boolean
  ) {
    super.sendCRDT(
      this.partialSpanSerializer.serialize({
        key,
        value,
        startPosition: startPos,
        endPosition: endPos,
        endClosed: endClosed ? true : undefined,
      })
    );
  }

  protected receiveCRDT(
    message: string | Uint8Array,
    meta: UpdateMeta,
    crdtMeta: CRDTMessageMeta
  ): void {
    const decoded = this.partialSpanSerializer.deserialize(<Uint8Array>message);
    const span: Span<F> = {
      ...decoded,
      lamport: crdtMeta.lamportTimestamp!,
      senderID: crdtMeta.senderID,
    };
    this.emit("Add", { span, meta });
  }

  protected saveCRDT(): Uint8Array {
    const senderIDs = new Array<string>(this.log.size);
    const lengths = new Array<number>(this.log.size);
    const spans: Uint8Array[] = [];
    const lamports: number[] = [];

    let i = 0;
    for (const [senderID, senderSpans] of this.log) {
      senderIDs[i] = senderID;
      lengths[i] = senderSpans.length;
      for (const span of senderSpans) {
        spans.push(this.partialSpanSerializer.serialize(span));
        lamports.push(span.lamport);
      }
      i++;
    }

    const message = SpanLogSaveMessage.create({
      senderIDs,
      lengths,
      spans,
      lamports,
    });
    return SpanLogSaveMessage.encode(message).finish();
  }

  protected loadCRDT(savedState: Uint8Array | null, meta: UpdateMeta): void {
    if (savedState === null) return;

    const decoded = SpanLogSaveMessage.decode(savedState);
    let spanIndex = 0;
    for (let i = 0; i < decoded.senderIDs.length; i++) {
      const senderID = decoded.senderIDs[i];
      // Only add the spans we don't have already:
      // those with larger Lamport timestamp than our most
      // recent Span from senderID.
      let lastLamport: number;
      let bySender = this.log.get(senderID);
      if (bySender === undefined) {
        bySender = [];
        this.log.set(senderID, bySender);
        lastLamport = -1;
      } else {
        lastLamport = bySender[bySender.length - 1].lamport;
      }

      for (let j = 0; j < decoded.lengths[i]; j++) {
        const lamport = int64AsNumber(decoded.lamports[spanIndex]);
        if (lamport > lastLamport) {
          const span: Span<F> = {
            ...this.partialSpanSerializer.deserialize(decoded.spans[spanIndex]),
            lamport,
            senderID,
          };
          this.emit("Add", { span, meta });
        }
        spanIndex++;
      }
    }
  }
}

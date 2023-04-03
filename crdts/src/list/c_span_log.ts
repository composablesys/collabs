import {
  CollabEvent,
  CollabEventsRecord,
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

export interface PartialSpan {
  readonly key: string;
  readonly value: string | undefined;
  readonly startPos: Position;
  /** null for open end of the document */
  readonly endPos: Position | null;
  readonly closedEnd?: true;
}

export interface Span extends PartialSpan {
  readonly lamport: number;
  /** Tiebreaker for lamport. */
  readonly senderID: string;
}

const partialSpanSerializer: Serializer<PartialSpan> = {
  serialize(value) {
    const message = SpanLogPartialSpanMessage.create(value);
    return SpanLogPartialSpanMessage.encode(message).finish();
  },

  deserialize(message) {
    const decoded = SpanLogPartialSpanMessage.decode(message);
    return {
      key: decoded.key,
      value: Object.prototype.hasOwnProperty.call(decoded, "value")
        ? decoded.value
        : undefined,
      startPos: decoded.startPos,
      endPos: Object.prototype.hasOwnProperty.call(decoded, "endPos")
        ? decoded.endPos
        : null,
      ...(decoded.closedEnd ? { closedEnd: true } : {}),
    };
  },
} as const;

export interface SpanLogAddEvent extends CollabEvent {
  span: Span;
}

export interface SpanLogEventsRecord extends CollabEventsRecord {
  Add: SpanLogAddEvent;
}

export class CSpanLog extends PrimitiveCRDT<SpanLogEventsRecord> {
  /**
   * An append-only log of Spans. For easy searching, it
   * is stored as a Map from senderID to that sender's Spans
   * in send order.
   */
  private readonly log = new Map<string, Span[]>();

  add(span: PartialSpan) {
    super.sendCRDT(partialSpanSerializer.serialize(span));
  }

  protected receiveCRDT(
    message: string | Uint8Array,
    meta: UpdateMeta,
    crdtMeta: CRDTMessageMeta
  ): void {
    const decoded = partialSpanSerializer.deserialize(<Uint8Array>message);
    const span: Span = {
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
        spans.push(partialSpanSerializer.serialize(span));
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
          const span: Span = {
            ...partialSpanSerializer.deserialize(decoded.spans[spanIndex]),
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

import { CRDTExtraMetaLayerMessage } from "../../../../generated/proto_compiled";
import { int64AsNumber } from "../../../util";
import { CRDTExtraMeta, VectorClock } from "../crdt_extra_meta";
import { BasicVectorClock } from "./basic_vector_clock";
import { CRDTMetaSendMessageDelta } from "./crdt_meta_send_message";

export class CRDTMetaReceiveMessage {
  readonly firstSenderCounter: number;
  readonly count: number;
  readonly deltas: CRDTMetaSendMessageDelta[];

  constructor(serialized: Uint8Array) {
    const decoded = CRDTExtraMetaLayerMessage.decode(serialized);
    this.firstSenderCounter = int64AsNumber(decoded.firstSenderCounter);
    this.count = decoded.count;
    this.deltas = decoded.deltas.map((delta) => {
      const deltaVCEntries = new Map<string, number>();
      for (const [sender, entry] of Object.entries(delta.deltaVCEntries!)) {
        deltaVCEntries.set(sender, int64AsNumber(entry));
      }
      return {
        index: delta.index,
        deltaVCEntries,
        newWallClockTime: int64AsNumber(delta.newWallClockTime),
        deltaLamportTimestamp: int64AsNumber(delta.deltaLamportTimestamp),
      };
    });
  }
}

export class ReceivedCRDTExtraMeta implements CRDTExtraMeta {
  private readonly vcMap: Map<string, number>;
  readonly senderCounter: number;
  readonly vectorClock: VectorClock;
  readonly wallClockTime: number;
  readonly lamportTimestamp: number;

  constructor(
    receiveMessage: CRDTMetaReceiveMessage,
    index: number,
    sender: string
  ) {
    this.senderCounter = receiveMessage.firstSenderCounter + index;

    let lastNontrivialDeltaIndex = 0;
    this.vcMap = new Map();
    let wallClockTime = 0;
    let lamportTimestamp = 0;
    for (const delta of receiveMessage.deltas) {
      if (delta.index > index) break;
      lastNontrivialDeltaIndex = delta.index;
      for (const [sender, deltaEntry] of delta.deltaVCEntries) {
        this.vcMap.set(sender, (this.vcMap.get(sender) ?? 0) + deltaEntry);
      }
      wallClockTime = delta.newWallClockTime;
      lamportTimestamp += delta.deltaLamportTimestamp;
    }
    this.vcMap.set(sender, this.senderCounter);
    lamportTimestamp += index - lastNontrivialDeltaIndex;

    this.vectorClock = new BasicVectorClock(this.vcMap);
    this.wallClockTime = wallClockTime;
    this.lamportTimestamp = lamportTimestamp;
  }

  /**
   * Excludes the message's sender.
   * @return [description]
   */
  get causallyMaximalVCEntries(): IterableIterator<[string, number]> {
    // TODO: necessary entries only
    return this.vcMap.entries();
  }
}

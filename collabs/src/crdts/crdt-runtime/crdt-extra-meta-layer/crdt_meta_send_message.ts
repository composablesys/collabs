import { CRDTExtraMetaLayerMessage } from "../../../../generated/proto_compiled";
import { Serializable } from "../../../core";
import { CRDTExtraMeta } from "../crdt_extra_meta";

export interface CRDTMetaSendMessageDelta {
  index: number;
  /**
   * Maps each non-sender replica to the amount of increase in its
   * VC entry, i.e., the # of received messages.
   */
  deltaVCEntries: Map<string, number>;
  newWallClockTime: number;
  /**
   * The increase in the Lamport timestamp.
   */
  deltaLamportTimestamp: number;
}

export class CRDTMetaSendMessage implements Serializable {
  private readonly firstSenderCounter: number;
  /**
   * The number of sent messages corresponding to this
   * CRDTMetaSendMessage.
   */
  private count: number;
  /**
   * A sparse array of deltas describing how the CRDTExtraMeta
   * change as you go through the
   * messages in this batch.
   *
   * The delta with index i describes the differences leading
   * to the i-th message.
   *
   * When the i-th message only changes by incrementing
   * senderCounter and lamportTimestamp (because there
   * were no intervening messages from other users since
   * the last message), the delta is
   * implicit (not needed); this is why deltas is sparse.
   */
  private readonly deltas: CRDTMetaSendMessageDelta[];

  lastWallClockTime: number;
  private lastLamportTimestamp: number;
  private deltaLastVC = new Map<string, number>();

  /**
   * [constructor description]
   * @param firstMeta [description]
   * @param firstVC   Omits this replicaID.
   */
  constructor(
    firstMeta: CRDTExtraMeta,
    firstVC: Map<string, number>,
    private readonly invalidate: () => void
  ) {
    this.firstSenderCounter = firstMeta.senderCounter;
    this.count = 1;
    this.deltas = [
      {
        index: 0,
        deltaVCEntries: firstVC,
        newWallClockTime: firstMeta.wallClockTime,
        deltaLamportTimestamp: firstMeta.lamportTimestamp,
      },
    ];

    this.lastWallClockTime = firstMeta.wallClockTime;
    this.lastLamportTimestamp = firstMeta.lamportTimestamp;
  }

  /**
   * Don't call when sender is us.
   */
  receivedMessageFrom(sender: string) {
    this.deltaLastVC.set(sender, (this.deltaLastVC.get(sender) ?? 0) + 1);
  }

  hasReceivedMessage(): boolean {
    return this.deltaLastVC.size > 0;
  }

  addMessage(newCRDTMeta: CRDTExtraMeta) {
    if (this.deltaLastVC.size === 0) {
      // Trivial delta.
      // TODO: here we assume wallClockTime *only* changes upon received message.
      this.count++;
    } else {
      this.deltas.push({
        index: this.count,
        deltaVCEntries: this.deltaLastVC,
        newWallClockTime: newCRDTMeta.wallClockTime,
        deltaLamportTimestamp:
          newCRDTMeta.lamportTimestamp - this.lastLamportTimestamp,
      });
      this.count++;
      this.deltaLastVC = new Map();
      this.lastWallClockTime = newCRDTMeta.wallClockTime;
      this.lastLamportTimestamp = newCRDTMeta.lamportTimestamp;
    }
  }

  serialize(): Uint8Array {
    const message = CRDTExtraMetaLayerMessage.create({
      firstSenderCounter: this.firstSenderCounter,
      count: this.count,
      deltas: this.deltas.map((delta) => {
        return {
          ...delta,
          deltaVCEntries: Object.fromEntries(delta.deltaVCEntries),
        };
      }),
    });

    this.invalidate();

    return CRDTExtraMetaLayerMessage.encode(message).finish();
  }
}

import { CRDTExtraMetaBatchMessage } from "../../../../generated/proto_compiled";
import { Serializable } from "../../../core";
import { int64AsNumber } from "../../../util";
import { CRDTExtraMeta, VectorClock } from "../crdt_extra_meta";
import { BasicVectorClock } from "./basic_vector_clock";

/**
 * A delta (change between two CRDTExtraMeta's) within a
 * CRDTExtraMetaBatch.
 *
 * Trivial deltas (deltaVCEntries is empty and newWallClockTime,
 * newLamportTimestamp are null) are omitted in the list of
 * deltas.
 */
export interface CRDTExtraMetaDelta {
  index: number;
  /**
   * Maps each non-sender replica to the amount of increase in its
   * VC entry, i.e., the # of received messages.
   */
  deltaVCEntries: Map<string, number>;
  newWallClockTime: number | null;
  newLamportTimestamp: number | null;
}

/**
 * Represents a batch's worth of CRDTExtraMeta.
 *
 * This is what is actually sent on the network, for efficiency.
 */
export class CRDTExtraMetaBatch implements Serializable {
  private deltaLastVC = new Map<string, number>();

  /**
   * Sets initial values as given.
   *
   * @param firstSenderCounter [description]
   * @param count The number of sent messages corresponding to this
   * CRDTMetaBatch.
   * @param deltas A sparse array of deltas describing how the CRDTExtraMeta
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
   *
   * Note this is not copied in the constructor, so (1) it may
   * be mutated, and (2) you should not mutate it.
   * @param lastLamportTimestamp Must be non-null during sending.
   * @param invalidate Callback for when [[serialize]] is
   * called and this should no longer be built upon,
   * during sending. Must be non-null during sending.
   */
  private constructor(
    public readonly firstSenderCounter: number,
    public count: number,
    public readonly deltas: CRDTExtraMetaDelta[],
    private readonly invalidate: (() => void) | null
  ) {}

  /**
   * [constructor description]
   * @param firstMeta [description]
   * @param firstVC   Omits this replicaID.
   * @param invalidate Callback for when [[serialize]] is
   * called and this should no longer be built upon,
   * during sending.
   */
  static newForSending(
    firstVC: Map<string, number>,
    firstSenderCounter: number,
    firstWallClockTime: number | null,
    firstLamportTimestamp: number | null,
    invalidate: () => void
  ) {
    return new CRDTExtraMetaBatch(
      firstSenderCounter,
      1,
      [
        {
          index: 0,
          deltaVCEntries: firstVC,
          newWallClockTime: firstWallClockTime,
          newLamportTimestamp: firstLamportTimestamp,
        },
      ],
      invalidate
    );
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

  addMessage(wallClockTime: number | null, lamportTimestamp: number | null) {
    if (
      this.deltaLastVC.size === 0 &&
      wallClockTime === null &&
      lamportTimestamp === null
    ) {
      // TODO: also include the case that wallClockTime or
      // lamportTimestamp is set, but its value can be inferred
      // from previous deltas? Or perhaps that's just a thing
      // for serialization? But would like to avoid differences
      // between original & deserialized form.
      // Trivial delta.
      this.count++;
    } else {
      this.deltas.push({
        index: this.count,
        deltaVCEntries: this.deltaLastVC,
        newWallClockTime: wallClockTime,
        newLamportTimestamp: lamportTimestamp,
      });
      this.count++;
      this.deltaLastVC = new Map();
    }
  }

  serialize(): Uint8Array {
    // TODO: delta-encode numeric fields in deltas.
    // TODO: leave out index if it's just +1 from previous one.
    const message = CRDTExtraMetaBatchMessage.create({
      firstSenderCounter: this.firstSenderCounter,
      count: this.count,
      deltas: this.deltas.map((delta) => {
        return {
          ...delta,
          deltaVCEntries: Object.fromEntries(delta.deltaVCEntries),
        };
      }),
    });

    this.invalidate!();

    return CRDTExtraMetaBatchMessage.encode(message).finish();
  }

  static deserialize(serialized: Uint8Array) {
    const decoded = CRDTExtraMetaBatchMessage.decode(serialized);
    const firstSenderCounter = int64AsNumber(decoded.firstSenderCounter);
    const count = decoded.count;
    const deltas = decoded.deltas.map((delta) => {
      const deltaVCEntries = new Map<string, number>();
      for (const [sender, entry] of Object.entries(delta.deltaVCEntries!)) {
        deltaVCEntries.set(sender, int64AsNumber(entry));
      }
      const newWallClockTime = Object.prototype.hasOwnProperty.call(
        delta,
        "newWallClockTime"
      )
        ? int64AsNumber(delta.newWallClockTime!)
        : null;
      const newLamportTimestamp = Object.prototype.hasOwnProperty.call(
        delta,
        "newLamportTimestamp"
      )
        ? int64AsNumber(delta.newLamportTimestamp!)
        : null;
      return {
        index: delta.index,
        deltaVCEntries,
        newWallClockTime,
        newLamportTimestamp,
      };
    });

    return new CRDTExtraMetaBatch(firstSenderCounter, count, deltas, null);
  }
}

/**
 * A [[CRDTEXtraMeta]] derived from indexing into a
 * [[CRDTExtraMetaBatch]].
 */
export class CRDTExtraMetaFromBatch implements CRDTExtraMeta {
  private readonly vcMap: Map<string, number>;
  readonly senderCounter: number;
  readonly vectorClock: VectorClock;
  readonly wallClockTime: number | null;
  readonly lamportTimestamp: number | null;

  constructor(batch: CRDTExtraMetaBatch, index: number, sender: string) {
    this.senderCounter = batch.firstSenderCounter + index;

    let lastNontrivialDeltaIndex = 0;
    this.vcMap = new Map();
    let wallClockTime: number | null = null;
    let lamportTimestamp: number | null = null;
    for (const delta of batch.deltas) {
      if (delta.index > index) break;
      lastNontrivialDeltaIndex = delta.index;
      for (const [sender, deltaEntry] of delta.deltaVCEntries) {
        this.vcMap.set(sender, (this.vcMap.get(sender) ?? 0) + deltaEntry);
      }
      wallClockTime = delta.newWallClockTime;
      lamportTimestamp = delta.newLamportTimestamp;
    }
    this.vcMap.set(sender, this.senderCounter);
    if (lamportTimestamp !== null) {
      lamportTimestamp += index - lastNontrivialDeltaIndex;
    }

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

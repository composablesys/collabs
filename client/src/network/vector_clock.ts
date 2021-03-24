import { CausalTimestamp } from ".";

// The vector clock designed for CRDT library and casual broadcasting
// runtime to ensure correct causality.

/**
 * The vector clock class for ensuring casuality.
 * TODO: private / readonly
 */
export class VectorClock implements CausalTimestamp {
  /**
   * replicaId of the sender
   */
  sender: string;
  /**
   * The record map from replica ids to the number of lastest message.
   */
  vectorMap: Map<string, number>;
  local: boolean;

  /**
   * Initialize the vector with replica's own entry.
   */
  constructor(sender: string, local: boolean) {
    this.sender = sender;
    this.local = local;
    this.vectorMap = new Map();
    this.vectorMap.set(this.sender, 0);
  }
  /**
   * @returns the unique ID for this replica(replicaId).
   */
  getSender(): any {
    return this.sender;
  }
  isLocal(): boolean {
    return this.local;
  }
  /**
   * @returns the vector clock with all the entries.
   */
  asVectorClock(): Map<any, number> {
    return this.vectorMap;
  }
  /**
   * @returns the visible number of the counter from sender in
   * this vectorclock.
   */
  getSenderCounter(): number {
    return this.vectorMap.get(this.sender)!;
  }
  /**
   * @returns the total number of replicas invovled in this crdts.
   */
  getSize(): number {
    return this.vectorMap.size;
  }
  /**
   * Update the vector of the sender's entry.
   */
  increment(): void {
    const oldValue = this.vectorMap.get(this.sender);
    if (oldValue === undefined) {
      throw new Error("sender's vc entry is not set");
    }
    this.vectorMap.set(this.sender, oldValue + 1);
  }
  /**
   * Check if a message with a certain timestamp is ready for
   * delivery in causal order, given that this is
   * the vector clock merge of all previously-received
   * messages.
   *
   * @param other the vector clock
   * the other message
   * @returns other's message is ready or not.
   */
  isReady(other: VectorClock): boolean {
    let otherSender = other.getSender();
    let otherVectorMap = other.asVectorClock();

    // Check sender's entry is one more than ours
    if (this.vectorMap.has(otherSender)) {
      if (
        this.vectorMap.get(otherSender) !==
        otherVectorMap.get(otherSender)! - 1
      )
        return false;
    } else if (otherVectorMap.get(otherSender) !== 1) {
      return false;
    }

    // Check other entries are <= ours
    for (let id of otherVectorMap.keys()) {
      if (id === otherSender) continue;
      if (!this.vectorMap.has(id)) {
        return false;
      } else if (this.vectorMap.get(id)! < otherVectorMap.get(id)!) {
        return false;
      }
    }

    return true;
  }

  /**
   * TODO: test
   *
   * Check if a message with a certain timestamp has already
   * been received, given that this is
   * the vector clock merge of all previously-received
   * messages.
   *
   * @param  other the vector clock
   * the other message
   * @return if a message with VectorClock other has
   * already been received, according to this
   */
  isAlreadyReceived(other: VectorClock): boolean {
    let senderEntry = this.vectorMap.get(other.sender);
    if (senderEntry !== undefined) {
      if (senderEntry >= other.getSenderCounter()) return true;
    }
    return false;
  }

  /**
   * Increment sender's lastest entry received in this VectorClock
   * in the replica's own vectorMap.
   *
   * This operation is mainly done after correctly deliver the message
   * when isReady() function returns true.
   *
   * @param vc the VectorClock from other replica.
   */
  incrementSender(vc: VectorClock): void {
    let otherUid = vc.getSender();
    let otherVectorMap = vc.asVectorClock();

    this.vectorMap.set(otherUid, otherVectorMap.get(otherUid)!);
  }
  /**
   * Merge current VectorClock with the vector clock recevied from
   * other replica.
   *
   * @param vc the VectorClock from other replica.
   */
  merge(vc: VectorClock): void {
    let otherVectorMap = vc.asVectorClock();

    for (let id of otherVectorMap.keys()) {
      if (!this.vectorMap.has(id)) {
        this.vectorMap.set(id, otherVectorMap.get(id)!);
      } else {
        this.vectorMap.set(
          id,
          Math.max(this.vectorMap.get(id)!, otherVectorMap.get(id)!)
        );
      }
    }
  }
  /**
   *
   * @param replicaId the replicaId of the entry to set
   * @param clockValue the clock number of the replica.
   */
  setEntry(replicaId: string, clockValue: number): void {
    this.vectorMap.set(replicaId, clockValue);
  }

  toString(): string {
    return JSON.stringify({
      sender: this.sender,
      isLocal: this.local,
      clock: [...this.vectorMap.entries()],
    });
  }

  clone(): VectorClock {
    let copy = new VectorClock(this.sender, this.local);
    copy.vectorMap = new Map(this.vectorMap);
    return copy;
  }
}

import { CausalTimestamp } from "./causal_broadcast_network";

/**
 * Simple implementation of [[CausalTimestamp]] that uses
 * a vector clock directly.
 *
 * This is inefficient and will be optimized in the future.
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
  private local: boolean;
  time: number;

  /**
   * Initialize the vector with replica's own entry.
   */
  constructor(sender: string, local: boolean, time: number) {
    this.sender = sender;
    this.local = local;
    this.vectorMap = new Map();
    this.vectorMap.set(this.sender, 0);
    this.time = time;
  }

  getSender(): any {
    return this.sender;
  }

  isLocal(): boolean {
    return this.local;
  }

  asVectorClock(): Map<any, number> {
    return this.vectorMap;
  }

  getSenderCounter(): number {
    return this.vectorMap.get(this.sender)!;
  }

  getTime(): number {
    return this.time;
  }

  getSize(): number {
    return this.vectorMap.size;
  }

  /**
   * Update the sender's vector entry (mutating operation).
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
   * @param other The vector clock of
   * the other message.
   * @returns Whether other's message is ready.
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
   * Check if a message with a certain timestamp has already
   * been received, given that this is
   * the vector clock merge of all previously-received
   * messages.
   *
   * @param other The vector clock of
   * the other message.
   * @return If a message with timestamp `other` has
   * already been received, according to this.
   */
  isAlreadyReceived(other: VectorClock): boolean {
    let senderEntry = this.vectorMap.get(other.sender);
    if (senderEntry !== undefined) {
      if (senderEntry >= other.getSenderCounter()) return true;
    }
    return false;
  }

  /**
   * Set sender's lastest entry received in this VectorClock
   * to that of `vc` (mutating operation).
   *
   * @param vc
   */
  mergeSender(vc: VectorClock): void {
    this.vectorMap.set(vc.getSender(), vc.getSenderCounter());
  }

  /**
   * Merge this with `vc` (mutating operation).
   *
   * @param vc
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
   * Sets an entry in this vector clock (mutating operation).
   *
   * @param replicaId The entry's `replicaId`.
   * @param clockValue The clock value to set.
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

  /**
   * @return A clone of this.
   */
  clone(): VectorClock {
    let copy = new VectorClock(this.sender, this.local, this.time);
    copy.vectorMap = new Map(this.vectorMap);
    return copy;
  }
}

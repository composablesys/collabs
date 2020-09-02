// First attempt at the interface between the runtime
// (causal broadcast network, etc.) and the Crdts.

/**
 * Interface describing the causal timestamps that
 * get passed to Crdts when they receive a message
 * (e.g., a vector clock).
 */
export interface CausalTimestamp {
    /**
     * @return the message sender's replica id.
     */
    getSender(): string;
    /**
     * @return the counter for messages sent by this message's
     * sender.  It must be the same as
     * this.asVectorClock().get(this.getSender()).
     */
    getSenderCounter(): number;
    /**
     * @return this timestamp in the form of a vector clock,
     * i.e., as a map from replica ids to the number of their
     * most recent <= message.
     */
    asVectorClock(): Map<string, number>;
    // TODO: ?
}

/**
 * Interface describing something that listens for
 * Crdt messages sent over the runtime.
 * TODO: this probably doesn't need to an interface, since
 * there will probably be only one implementation.
 */
export interface CrdtMessageListener {
    // Callback used by CrdtRuntime.
    /**
     * Callback used by CrdtRuntime.
     * @param message   The received message
     * @param timestamp The timestamp of the received message
     */
    receive(message: string, timestamp: CausalTimestamp): void;
}

/**
 * Interface describing the runtime environment, which
 * handles networking, causal broadcast, etc. for the
 * Crdts.
 */
export interface CrdtRuntime {
    /**
     * Used by a Crdt to send a message to its other replicas.
     * @param message The message to send
     * @param crdtId  The sending Crdt's id, used to make
     * sure message only goes to other replicas of this Crdt
     * @param causalConsistencyGroup The causal
     * consistency group to use for this message.  Messages
     * sent in the same causal consistency group should use
     * a common source of timestamps, so that they are
     * all causally ordered with respect to each other, even
     * if they come from different Crdts.
     */
    send(message: string, crdtId: string, causalConsistencyGroup: string): void;
    /**
     * Registers the given listener to receive messages
     * from other replicas intended for the Crdt with the
     * given crdtId.  Such messages should be delivered
     * to crdtMessageListener.receive.
     * @param crdtMessageListener The listener
     * @param crdtId              The Crdt id that this
     * listener wants to receive messages for.
     */
    register(crdtMessageListener: CrdtMessageListener, crdtId: string): void;
    /**
     * @return This replica's id, used by some Crdts internally
     * (e.g., to generate unique identifiers of the form
     * (replica id, counter)).
     */
    getReplicaId(): string;
    /**
     * @return The timestamp that would be assigned to a Crdt
     * message sent by this replica and given
     * causalConsistencyGroup right now.
     * This is used when a Crdt processes its own message.
     */
    getNextTimestamp(causalConsistencyGroup: string): CausalTimestamp;
}

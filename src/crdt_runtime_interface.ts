// First attempt at the interface between the runtime
// (causal broadcast network, etc.) and the CRDTs.

/**
 * Interface describing the causal timestamps that
 * get passed to CRDTs when they receive a message
 * (e.g., a vector clock).
 */
export interface CausalTimestamp {
    /**
     * @return the message sender's replica id.
     */
    getSender(): any;
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
    asVectorClock(): Map<any, number>;
    // TODO: ?
}

/**
 * Interface describing something that listens for
 * CRDT messages sent over the runtime.
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
    receive(message: any, timestamp: CausalTimestamp): void;
}

/**
 * Interface describing the runtime environment, which
 * handles networking, causal broadcast, etc. for the
 * CRDTs.
 */
export interface CrdtRuntime {
    /**
     * Used by a CRDT to send a message to its other replicas.
     * @param message The message to send
     * @param crdtId  The sending CRDT's id, used to make
     * sure message only goes to other replicas of this CRDT
     */
    send(message: any, crdtId: any): void;
    /**
     * Registers the given listener to receive messages
     * from other replicas intended for the CRDT with the
     * given crdtId.  Such messages should be delivered
     * to crdtMessageListener.receive.
     * @param crdtMessageListener The listener
     * @param crdtId              The CRDT id that this
     * listener wants to receive messages for.
     */
    register(crdtMessageListener: CrdtMessageListener, crdtId: any): void;
    /**
     * @return This replica's id, used by some CRDTs internally
     * (e.g., to generate unique identifiers of the form
     * (replica id, counter)).
     */
    getReplicaId(): any;
}

import {CausalTimestamp, CrdtRuntime, CrdtMessageListener} from "../network";

// TODO: ids as strings instead of any

/**
 * Interface describing the internal workings of a CRDT in the
 * prepare/effect style of "Pure Operation-Based Replicated Data Types"
 * by Baquero et al.  This interface is also inspired by ShareDB's OT
 * types (https://github.com/ottypes/docs).
 * @param S The CRDT's state type
 */
export interface CrdtInternal<S> {
    /**
     * Returns an initial state, possibly basing its value
     * off of initialData.  Note that if states can be mutated
     * by effect, then each returned state should be a fresh
     * object.
     * @param  initialData A value used to optionally set the state's
     * initial value.
     * @return  A fresh initial state.
     */
    create(initialData?: any): S;
    /**
     * Returns a message describing the given operation, possibly
     * reading the current state and issuing replica id.
     * Messages and operations will have an implementation-specific
     * form.
     * @param  operation An implementation-specific description of
     * the operation.
     * @param  state The current state, which may be read to determine
     * the message.  This should not be mutated.
     * @param replicaId The id of the replica issuing this operation,
     * which may be read to determine the message.
     * @return An implementation-specific description of the resulting
     * message.  Note this will be sent on the wire using TODO
     * (serialization).
     * The message msut be null only if this operation does not
     * change the internal state, since if the message is null,
     * Crdt will skip sending the message to other replicas.
     */
    prepare(operation: any, state: S, replicaId: any): any;
    /**
     * Applies the given message to the state, returning the
     * resulting state as well as a description of the resulting
     * change.  Messages are assumed to be delivered in causal
     * order.  For efficiency, the input state will
     * not be reused, so an implementation is free to mutate
     * it in-place and return it.
     * @param  message   The message to be applied, coming from
     * some replica's prepare function.
     * @param  state     The input state.
     * @param replicaId The id of the replica applying this operation
     * (not the id of the replica that issued this message).
     * @param  timestamp The message's causal timestamp.  Note that
     * because several CRDTs can share the same runtime, timestamps
     * may not be continguous (e.g., entries in their vector clocks
     * might skip numbers).  However, causally ordered delivery is
     * still guaranteed.  If we are processing our own message
     * (i.e., replicaId === timestamp.getSender()), then it is
     * guaranteed that the message is causally greater than all prior
     * messages.  It is possible that multiple messages share the same
     * timestamp; if so, they are totally ordered by the causal order,
     * they will all be delivered in a row in causal order, and the
     * timestamp accurately reflects their causal relationship to
     * other messages (in particular, they all share the same causal
     * relationships with other messages).
     * @return           [The output state, an implementation-specific
     * description of the change.]  The description will be passed
     * to the application using this CRDT so they know what occurred.
     * Ideally, it should be described in terms of ordinary data
     * type operations, so that applications can understand the change
     * without needing to understand the CRDT's semantics.
     * The description must be null only if the externally visible
     * state is unchanged,
     * since Crdt will skip calling onchange if description is null.
     * (The converse---if the state was unchanged, then description
     * is null---need not hold, although it is nice if it does.)
     */
    effect(message: any, state: S, replicaId: any, timestamp: CausalTimestamp): [S, any];
}

/**
 * An event issued when a CRDT is changed by another replica.
 * @param caller      The Crdt instance that was changed.
 * @param description An implementation-specific descrption of the change.
 * @param timestamp   The causal timestamp of the change. Note that
 * because several CRDTs can share the same runtime, timestamps
 * may not be continguous (e.g., entries in their vector clocks
 * might skip numbers).  However, causally ordered delivery is
 * still guaranteed.
 */
export class CrdtChangeEvent {
    constructor(public readonly caller: Crdt<any>,
        public readonly description: any,
        public readonly timestamp: CausalTimestamp) { }
}

// User-facing wrappers around CRDTs should extend this class,
// adding methods for the CRDT's operations (e.g., increment())
// which call this class's apply method.
/**
 * Base class for application-facing CRDT implementations.
 * Instead of exposing CrdtInternal implementations directly,
 * which have an unfriendly prepare/effect interface,
 * each CRDT implementation should define a subclass of this
 * class with ordinary-looking methods to perform operations
 * and query the state.  Methods performing operations should
 * call applyOp with the corresponding CrdtInternal operation.
 * This class then automatically handles sending and receiving
 * of messages.
 * Cf. Algorithm 1 in the semidirect product paper.
 * @param S The state type of C.
 */
export class Crdt<S> implements CrdtMessageListener {
    /**
     * The current CrdtInternal state.  This should not
     * be mutated directly but may be read to get information about
     * the state.
     */
    protected state: S;
    /**
     * Set this to listen for when another replica updates
     * this object's state.
     */
    onchange : (event: CrdtChangeEvent) => void = ((_) => {});
    /**
     * [constructor description]
     * @param id      An id for this CRDT.  All CRDTs using the
     * same CrdtRuntime must have distinct ids, and the ids must
     * be the same for all replicas of a given CRDT, in order
     * for the CrdtRuntime to route messages to them properly.
     * @param crdtInternal    The CrdtInternal to use.  Note that since
     * CrdtInternal's don't store states, multiple objects may
     * share the same CrdtInternal instance.
     * @param runtime The CrdtRuntime to use for sending and
     * receiving messages.
     * @param initialData  Optional initial data to use when
     * setting the CrdtInternal's initial state.
     */
    constructor(public readonly id: any, public readonly crdtInternal: CrdtInternal<S>,
            public readonly runtime: CrdtRuntime, initialData?: any) {
        this.state = this.crdtInternal.create(initialData);
        this.runtime.register(this, this.id);
    }

    // TODO: describe "transactions".  Right word?  Rename
    // "atomic" stuff below.  Must happen synchronously so
    // that runtime.getTimestamp() doesn't change and
    // no messages are received in the interim.
    // Allow caller to start/end transactions?
    private inTransaction = false;
    private transactionMessages: Array<any> = [];
    private transactionDescriptions: Array<any> = [];
    protected startTransaction() {
        if (this.inTransaction) {
            throw new Error("A transaction is already in progress.");
        }
        this.inTransaction = true;
    }

    // TODO: Returns the descriptions (translated)
    protected endTransaction(): any {
        if (!this.inTransaction) {
            throw new Error("No transaction is in progress.");
        }
        if (this.transactionMessages.length !== 0) {
            this.runtime.send(this.transactionMessages, this.id);
        }
        let descriptions = this.transactionDescriptions;
        this.inTransaction = false;
        this.transactionMessages = [];
        this.transactionDescriptions = [];
        if (descriptions.length === 0) return null;
        else return this.translateDescriptions(descriptions);
    }

    /**
     * Apply the given operation to the state, using prepare and effect,
     * and sends the generated message over the network.
     * If a transaction is in progress, this sending is delayed
     * until
     * @param  operation The operation to apply.
     * @return           The description of the changes.
     * This is the list of individual message descriptions returned by
     * effect (skipping null messages),
     * after being passed through translateDescription.  An exception
     * is that if all messages are
     * null, null is returned without calling translateDescription.
     * TODO: null if in a transaction (use endTransaction instead).
     * TODO: but what if we want it to decide what to do next?
     */
    protected applyOp(operation: any) : any {
        let ownTransaction = false;
        if (!this.inTransaction) {
            ownTransaction = true;
            this.startTransaction();
        }
        let timestamp = this.runtime.getNextTimestamp(this.id);
        let message = this.crdtInternal.prepare(operation, this.state,
            this.runtime.getReplicaId());
        if (message !== null) {
            this.transactionMessages.push(message);
            let result = this.crdtInternal.effect(message,
                this.state, this.runtime.getReplicaId(),
                timestamp);
            this.state = result[0];
            this.transactionDescriptions.push(result[1]);
        }
        if (ownTransaction) return this.endTransaction();
        else return null;
    }

    /**
     * Override this to translate the descriptions returned by the
     * CrdtInternal before passing it to onchange.  This is
     * useful for semidirect products because the default
     * SemidirectInternal descriptions are not user-friendly.
     * If this method returns null, onchange is not called.
     *
     * The default implemention returns descriptions[0].  It is
     * appropriate when this.crdtInternal.effect already returns
     * user-friendly descriptions and applyOps is only ever called
     * with single operations.
     *
     * @param  descriptions A list of the descriptions returned by
     * this.crdtInternal.effect.  This will always be non-empty.
     * @return The translated description to pass to this.onchange,
     * or null if this.onchange should not be called.
     */
    protected translateDescriptions(descriptions: Array<any>): any {
        return descriptions[0];
    }
    /**
     * Override this to implement non-trivial observed resets
     * for when a CrdtObject containing this Crdt is
     * reset.  The
     * default returns null, so such map resets do nothing.
     * @return A message (not operation) that can be applied to
     * this Crdt together with any timestamp
     * to cause an observed-reset operation, or null to do
     * nothing.  For this Crdt
     * to be correct (eventually consistent) when used as a
     * property in an CrdtObject, the returned message
     * must satisfy:
     * - when paired with any CausalTimestamp, it commutes with
     * concurrent messages (usual Crdt requirement), including
     * concurrent resets and strong-resets.
     * - when applied to a state which has not received any
     * messages causally prior to the timestamp, it has
     * no effect.  In other words, applying it to a concurrently
     * initialized state has no effect.
     * Otherwise, it is free to have any semantics, including
     * doing nothing.  However, the intent is that it
     * at least approximates
     * the observed-reset semantics.
     *
     * TODO: return list of messages instead, for generality?
     */
    getUniversalResetMessage(): any {
        return null;
    }
    /**
     * Override this to implement nontrivial observed-resets.
     * Unlike getUniversalResetMessage(), there are no special
     * requirements (other than the usual Crdt commutativity).
     * However, the intent is that it
     * at least approximates
     * the observed-reset semantics.
     */
    reset(): void { }
    /**
     * Override this to implement nontrivial strong-resets.
     * Unlike getUniversalResetMessage(), there are no special
     * requirements (other than the usual Crdt commutativity).
     * However, the intent is that it
     * at least approximates
     * the strong-reset semantics.
     */
    resetStrong(): void { }
    // /**
    //  * Override this to implement non-trivial strong resets.  The
    //  * default returns null, so resets do nothing.
    //  * @return A message (not operation) that can be applied to
    //  * this Crdt together with any timestamp
    //  * to cause a strong-reset operation, or null to do
    //  * nothing.  For this Crdt
    //  * to be correct (eventually consistent) when used as a
    //  * property in an CrdtObject, the returned message
    //  * must satisfy:
    //  * - when paired with any CausalTimestamp, it commutes with
    //  * concurrent messages (usual Crdt requirement), including
    //  * concurrent resets and strong-resets.
    //  * Otherwise, it is free to have any semantics, including
    //  * doing nothing.  However, the intent is that it
    //  * at least approximates
    //  * the strong-reset semantics.
    //  */
    // getUniversalResetStrongMessage(): any {
    //     return null;
    // }

    /**
     * Callback for this.runtime when an atomic list of
     * messages is received from another replica.
     */
    receive(messages: any, timestamp: CausalTimestamp) {
        if (this.inTransaction) {
            throw new Error("In transaction; the transaction must " +
                    "be ended synchronously so that messages " +
                    "cannot be received in the interim.");
        }
        let descriptions: Array<any> = [];
        for (let message of messages) {
            let result = this.crdtInternal.effect(message, this.state,
                    this.runtime.getReplicaId(), timestamp);
            this.state = result[0];
            descriptions.push(result[1]);
        }
        if (this.onchange && descriptions.length !== 0) {
            let translated = this.translateDescriptions(descriptions);
            if (translated !== null) {
                this.onchange(new CrdtChangeEvent(this, translated, timestamp));
            }
        }
    }
}

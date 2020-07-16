import {CausalTimestamp, CrdtRuntime, CrdtMessageListener} from "../crdt_runtime_interface";

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

export enum ResetSemantics {
    /**
     * Undo the effect of causally prior operations but do not
     * affect concurrent operations.
     */
    ObservedReset,
    /**
     * Undo the effect of both causally prior operations and
     * concurrent operations.
     */
    ResetWins,
    /**
     * Preserve the state (i.e., do nothing).
     */
    PreserveState,
    /**
     * A custom remove semantics specific to the Crdt (e.g.,
     * the Riak counter's anomalous reset semantics).
     */
    Custom
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

    /**
     * Apply the given operations to the state, using prepare and effect,
     * and sends the generated messages over the network (atomically).
     * @param  operations An array of the operations to apply (atomically).
     * @return           The description of the changes.
     * This is the list of individual message descriptions returned by
     * effect (skipping null messages),
     * after being passed through translateDescription.  An exception
     * is that if all messages are
     * null, null is returned without calling translateDescription.
     */
    protected applyOps(...operations: any) : any {
        let messages: Array<any> = [];
        let descriptions: Array<any> = [];
        let timestamp = this.runtime.getNextTimestamp();
        for (let operation of operations) {
            let message = this.crdtInternal.prepare(operation, this.state,
                this.runtime.getReplicaId());
            if (message !== null) {
                messages.push(message);
                let result = this.crdtInternal.effect(message,
                    this.state, this.runtime.getReplicaId(),
                    timestamp);
                this.state = result[0];
                descriptions.push(result[1]);
            }
        }
        if (messages.length !== 0) {
            this.runtime.send(messages, this.id);
        }
        if (descriptions.length === 0) return null;
        else return this.translateDescriptions(descriptions);
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
     * Callback for this.runtime when an atomic list of
     * messages is received from another replica.
     */
    receive(messages: any, timestamp: CausalTimestamp) {
        let descriptions: Array<any> = [];
        for (let message of messages) {
            let result = this.crdtInternal.effect(message, this.state, this.runtime.getReplicaId(), timestamp);
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

    /**
     * Perform a reset operation appropriate
     * for the removal
     * of this value's key from a map, with the given semantics.
     * We require this method in Crdt so that any Crdt can be
     * used as a value in a map.
     *
     * If semantics is not supported, an error should be thrown.
     * If semantics is not specified, a default supported semantics
     * should be used.  That way, calling (TODO: precise name)
     * remove(k) on a map key k will always succeed (see TODO: MapCrdt
     * class).
     *
     * This default implementation supports only
     * ResetSemantics.PreserveState, its default semantics,
     * doing nothing.  Subclasses
     * should override to support additional semantics and override
     * the default semantics, which should typically be
     * ResetSemantics.ObservedReset.
     *
     * @param semantics The ResetSemantics to use.  If this is
     * undefined, a default semantics will be used.
     */
    reset(semantics = ResetSemantics.PreserveState): void {
        switch (semantics) {
            case ResetSemantics.ObservedReset:
                throw new Error("Unsupported reset semantics: ObservedReset");
            case ResetSemantics.ResetWins:
                throw new Error("Unsupported reset semantics: ResetWins");
            case ResetSemantics.PreserveState:
                return; // do nothing
            case ResetSemantics.Custom:
                throw new Error("Unsupported reset semantics: Custom");
            default:
                throw new Error("Unsupported reset semantics: " + semantics);
        }
    }
}

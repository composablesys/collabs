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
     * @param  timestamp The message's causal timestamp.  If
     * timestamp is undefined, it means that the message was
     * just issued locally, hence is causally greater than all
     * prior messages.  Note that
     * because several CRDTs can share the same runtime, timestamps
     * may not be continguous (e.g., entries in their vector clocks
     * might skip numbers).  However, causally ordered delivery is
     * still guaranteed.
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
    effect(message: any, state: S, replicaId: any, timestamp?: CausalTimestamp): [S, any];
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
    constructor(public readonly caller: Crdt<any, any>,
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
 * @param C The type of CrdtInternal that this wraps.
 * @param S The state type of C.
 */
export class Crdt<C extends CrdtInternal<S>, S> implements CrdtMessageListener {
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
    constructor(public readonly id: any, public readonly crdtInternal: C,
            public readonly runtime: CrdtRuntime, initialData?: any) {
        this.state = this.crdtInternal.create(initialData);
        this.runtime.register(this, this.id);
    }

    /**
     * Apply the given operation to the state, using prepare and effect.
     * @param  operation The operation.
     * @return           The description of the change returned by
     * effect, after being passed through translateDescription
     * (with the exception that null descriptions are not translated).
     * If prepare returns null, indicating that no change
     * occurs (hence effect and sending the message to other replicas
     * are skipped), the returned description is null.
     */
    protected applyOp(operation: any) : any {
        let message = this.crdtInternal.prepare(operation, this.state,
            this.runtime.getReplicaId());
        if (message === null) return null;
        else {
            let result = this.crdtInternal.effect(message, this.state,
                this.runtime.getReplicaId());
            this.state = result[0];
            this.runtime.send(result[1], this.id);
            if (result[1] === null) return null;
            else return this.translateDescription(result[1]);
        }
    }

    /**
     * Override this to translate the description returned by the
     * CrdtInternal before passing it to onchange.  This is
     * useful for semidirect products because the default semidirect
     * product descriptions are not user-friendly.  Note that
     * null descriptions skip onchange without being passed to this
     * method.  If this method returns null, onchange is not called.
     * @param  description The description returned by this.crdtInternal.effect.
     * @return The description to pass to this.onchange.
     */
    protected translateDescription(description: any): any {
        return description;
    }

    /**
     * Callback for this.runtime when a message is received from
     * another replica.
     */
    receive(message: any, timestamp: CausalTimestamp) {
        let result = this.crdtInternal.effect(message, this.state, timestamp);
        this.state = result[0];
        if (this.onchange && result[1] !== null) {
            let translated = this.translateDescription(result[1]);
            if (translated !== null) {
                this.onchange(new CrdtChangeEvent(this, translated, timestamp));
            }
        }
    }
}

// Utility components for building complex CrdtInternal's/Crdt's
import { DirectInternal } from "./semidirect";
import { CrdtInternal, Crdt } from "./crdt_core";
import { CausalTimestamp } from "../crdt_runtime_interface";

/**
 * CrdtInternal which uses any string as an operation/message
 * which does nothing.  Unlike using null messages to indicate that
 * nothing happened, the noop message is an explicit non-null
 * string supplied as the operation.
 *
 * Two use cases for adding noop messages to an existing CrdtInternal
 * via a direct product (using DirectInternal) with this crdt:
 * - Implementing the unremove method of Removable.  A noop message
 * "unremove" lets us know that the Crdt is no longer reset without
 * changing its state.  See DefaultResettableCrdt.
 * - As a "header" for sequence of operations passed to applyOps,
 * so that recipients can know what end-user operation the sequence
 * corresponds to.
 */
export class NoOpCrdtInternal<S> implements CrdtInternal<S> {
    constructor(public createFunc?: (initialData: any) => S) {}
    create(initialData?: any): S {
        if (this.createFunc) return this.createFunc(initialData);
        else throw new Error("CreateFunc not supplied");
    }
    prepare(operation: string, _state: S) {
        return operation;
    }
    /**
     * The returned description is the original operation.
     */
    effect(message: string, state: S, _replicaId: any, _timestamp: CausalTimestamp): [S, string] {
        return [state, message];
    }

    static addTo<S>(originalCrdt: CrdtInternal<S>) {
        return new DirectInternal<S>(originalCrdt,
            new NoOpCrdtInternal<S>(), 1
        );
    }
}

export class GrowOnlyMapInternal<K, S> implements CrdtInternal<Map<K, S>> {
    /**
     * [constructor description]
     * @param valueCrdtInternal [description]
     * @param initFactory [description] Note may be called by prepare
     * and then again for the same key when we actually init the value
     * (or re-init, if there's garbage collection).
     * @param shouldGc Given a value state, return whether it is safe
     * to garbage collect it, removing its key-value pair from the
     * map.  For correctness, if shouldGc(valueState) is true, then
     * valueState must be identical to valueCrdtInternal.create(valueInitialData);
     * and if shouldGc is nontrivial, then users should keep in
     * mind that state.has(key) is not reliable, since it may be
     * false even after key has been initialized because the value
     * has been garbage collected.
     */
    constructor(public readonly valueCrdtInternal: CrdtInternal<S>,
            public initFactory: (key: K) => S,
            public readonly shouldGc: (valueState: S) => boolean = (() => false)) {
    }
    create(_initialData?: any): Map<K, S> {
        return new Map<K, S>();
    }
    /**
     * Operations:
     * - ["applyOp", key, C operation]: applies the C operation to the
     * given key (calling valueCrdtInternal.prepare to turn it
     * into a message), initializing the key if needed.
     * - ["applyMessage", key, C message]: applies the C message to
     * the given key, initializing the key if needed.
     * - ["applySkip", key, C message]: applies the C message to
     * the given key, except for their sender, who is assumed
     * to have already applied the message.  This is used by
     * CrdtValuedGrowOnlyMapInternal, whose messages are
     * sometimes derived from values applying messages to
     * themselves.  TODO: in principle can optimize so we
     * don't have to send "skip" over the network.
     * - ["init", key]: initializes the given key using create
     * if it is not already present in the map.
     */
    prepare(operation: [string, K, any], state: Map<K, S>, replicaId: any): [string, K, any?] {
        let key = operation[1];
        switch (operation[0]) {
            case "applyOp":
                let keyState = state.get(key);
                if (keyState === undefined) {
                    keyState = this.initFactory(key);
                }
                return ["apply", key, this.valueCrdtInternal.prepare(
                    operation[2], keyState as S, replicaId
                )];
            case "applyMessage":
                return ["apply", key, operation[2]];
            case "applySkip":
                return ["applySkip", key, operation[2]];
            case "init":
                if (!state.has(key)) return ["init", key];
            default:
                throw new Error("Unrecognized operation: " + JSON.stringify(operation));
        }
    }
    /**
     * Description format:
     * - for an applyOp/applyMessage operation:
     * ["apply", key, value description]
     * - for an init operation: null if the key already existed,
     * otherwise ["init", key]
     */
    effect(message: [string, K, any?], state: Map<K, S>,
            replicaId: any, timestamp: CausalTimestamp):
            [Map<K, S>, [string, K, any?] | null] {
        let key = message[1];
        switch (message[0]) {
            case "applySkip":
                if (replicaId === timestamp.getSender()) {
                    // Skip applying it to the state.
                    // We can still gc, though, in case the
                    // already-applied message has made it
                    // gc-able.
                    let keyState = state.get(key);
                    if (keyState !== undefined &&
                            this.shouldGc(keyState)) {
                        state.delete(key);
                    }
                    return [state, null];
                }
                // Otherwise fall through.
            case "apply":
                let keyState = state.get(key);
                if (keyState === undefined) {
                    keyState = this.initFactory(key);
                }
                else {
                    let result = this.valueCrdtInternal.effect(
                        message[2], keyState, replicaId, timestamp
                    );
                    if (this.shouldGc(result[0])) {
                        state.delete(key);
                    }
                    else state.set(key, result[0]);
                    if (result[1] === null) return [state, null];
                    else return [state, ["apply", key, result[1]]];
                }
            case "init":
                if (state.has(key)) return [state, null];
                else {
                    let initState = this.initFactory(key);
                    if (!this.shouldGc(initState)) {
                        state.set(key, initState);
                    }
                    return [state, ["init", key]];
                }
            default:
                throw new Error("Unrecognized message: " + JSON.stringify(message));
        }
    }
}

/**
 * Wraps a Crdt in a CrdtInternal, so that you can change
 * the Crdt's state in the effect style.
 * This is useful for making a Crdt-valued map from the
 * above CrdtInternal-valued map, so that you can hand the
 * map values off to an external user as Crdt's instead of
 * CrdtInternal's.
 * TODO: note someone else has to capture the Crdt's messages
 * (as a CrdtRuntime) and submit them to the map as applyMessage
 * operations.
 * TODO: to use this, map needs the keyed factory function, so
 * that it can call new Crdt() on init.
 */
export class CrdtAsCrdtInternal<C extends Crdt<any>> implements CrdtInternal<C>{
    create(_initialData?: any): C {
        throw new Error("Method not implemented.");
    }
    prepare(_operation: any, _state: C, _replicaId: any) {
        throw new Error("Method not implemented.");
    }
    effect(message: any, state: C, _replicaId: any, timestamp: CausalTimestamp): [C, any] {
        // TODO: message is actually an atomic list of messages
        // In map: will need to give this list of messages in
        // applyMessage ops.
        state.receive(message, timestamp);
        // Descriptions are propagated through state's onchange, so
        // we don't also give a description.
        // TODO: instead, listen to onchange so we can get the description.
        return [state, null];
    }
}

/**
 * CrdtInternal whose operations are to apply a given operation
 * to every value in map (that is present when the message
 * is received at each replica), i.e., a higher-order map
 * operation (homap).
 */
export class HomapComponent<K, S> implements CrdtInternal<Map<K, S>> {
    /**
     * Translate a given operation (as given to prepare) to
     * the message to apply to key, or null if nothing should
     * be applied to key.  This is useful for encoding operations
     * that have a different effect on different keys (e.g.,
     * an operation that only applies to keys matching a certain
     * filter, or that performs different operations depending
     * on the value's type and can infer the value type from the
     * key) without having to serialize the whole function over
     * the network.
     *
     * For correctness, this must be a function solely
     * of its arguments.  So in particular, it cannot depend
     * on replicaId or the current state.
     *
     * The default applies the given operation to every
     * key as-is (interpreted as a message).  Note that this
     * only works if the value's effect functions do not
     * modify their input message in-place; if that is the case,
     * you should make translateOp return a copy.
     */
    translateOp: (key: K, operation: any) => (any | null)
            = (_key: K, operation: any) => operation;
    constructor(public readonly mapInternal:
        CrdtInternal<Map<K, S>>) { }
    create(initialData?: any): Map<K, S> {
        return this.mapInternal.create(initialData);
    }
    prepare(operation: any, _state: Map<K, S>, _replicaId: any) {
        return operation;
    }
    // Returned description is an array of [key, description]
    // for each key application that returned a non-null description.
    effect(message: any, state: Map<K, S>, replicaId: any, timestamp: CausalTimestamp): [Map<K, S>, Array<[K, any]>] {
        let description: Array<[K, any]> = [];
        for (let key of state.keys()) {
            let keyMessage = this.translateOp(key, message);
            if (keyMessage !== null) {
                let result = this.mapInternal.effect(["apply", key, keyMessage],
                    state, replicaId, timestamp);
                state = result[0];
                if (result[1] !== null) description.push([key, result[1]]);
            }
        }
        return [state, description];
    }
    /**
     * Add a HomapComponent to the given map-valued CrdtInternal
     * with a direct product.  For this to be a Crdt, any homap
     * operation must have no effect on values that were added
     * to the map concurrently to the homap operation
     * (e.g., an observed-reset operation has this property), so that
     * homap operations commute with key initialization.
     * (Necessary because a replica receiving a homap message applies
     * it to all of its values, even ones that were not present
     * in the sending replica when they sent the message.)
     *
     * If you want to set the HomapComponent's translateOp function,
     * you can access it with (return value).crdt2.translateOp.
     */
    static addToCommuting<K, S>(originalCrdt: CrdtInternal<Map<K, S>>) {
        return new DirectInternal<Map<K, S>>(originalCrdt,
            new HomapComponent<K, S>(originalCrdt), 1
        );
    }
}

/**
 * Combines two CrdtInternal's into a CrdtInternal whose state
 * consists of a state of each CrdtInternal, with the operations of
 * each CrdtInternal acting on its respective state.
 *
 * Unlike DirectProduct and SemidirectProduct, we 0-index the
 * two CrdtInternal's, for consistency with indexing into the
 * state.
 */
export class PairCrdtInternal<S0, S1> implements CrdtInternal<[S0, S1]> {
    constructor(public readonly crdt0: CrdtInternal<S0>,
            public readonly crdt1: CrdtInternal<S1>) { }
    create(initialData?: [any, any]): [S0, S1] {
        if (initialData === undefined) {
            return [this.crdt0.create(), this.crdt1.create()];
        }
        else {
            return [this.crdt0.create(initialData[0]), this.crdt1.create(initialData[1])];
        }
    }
    /**
     * Operation/message format: [crdt number (0 or 1),
     * operation/message for that crdt].  An exception is if
     * the internal crdt returns a null message, in which case
     * we just return null, not [0, null] or [1, null].  This
     * allows the Crdt class to optimize away sending the
     * message.
     */
    prepare(operation: [number, any], state: [S0, S1], replicaId: any) {
        let message: any;
        switch (operation[0]) {
            case 0:
                message = this.crdt0.prepare(operation[1], state[0], replicaId);
                break;
            case 1:
                message = this.crdt1.prepare(operation[1], state[1], replicaId);
                break;
            default:
                throw new Error("Bad crdt number in operation: " + operation);
        }
        if (message == null) return null;
        else return [operation[0], message];
    }
    /**
     * Message/descrption format: [crdt number (0 or 1),
     * message for/description from that crdt].
     * An exception is if the description from the internal
     * crdt is null,
     * the returned description is just null, not [0, null] or [1, null].
     * This allows the Crdt class to optimize away calling onchange.
     * TODO: perhaps add translating descriptions to this class, so
     * the Crdt doesn't have to understand all of the layers at
     * once?
     */
    effect(message: [number, any], state: [S0, S1], replicaId: any,
            timestamp: CausalTimestamp): [[S0, S1], [number, any] | null] {
        let result;
        switch (message[0]) {
            case 0:
                result = this.crdt0.effect(message[1], state[0], replicaId, timestamp);
                state[0] = result[0];
                break;
            case 1:
                result = this.crdt1.effect(message[1], state[1], replicaId, timestamp);
                state[1] = result[0];
                break;
            default:
                throw new Error("Bad crdt number in message: " + message);
        }
        if (result[1] === null) return [state, null];
        else return [state, [message[0], result[1]]];
    }
}

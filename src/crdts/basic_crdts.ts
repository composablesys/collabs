import {CausalTimestamp, CrdtRuntime} from "../crdt_runtime_interface";
import {CrdtInternal, Crdt} from "./crdt_core";
import { DirectInternal } from "./semidirect";

/**
 * Operations, messages, and descriptions are all just the
 * number to add/added.
 * TODO: optimize away 0 adds?
 */
export class CounterInternal implements CrdtInternal<number> {
    create(initialData?: number): number {
        if (initialData !== undefined) return initialData;
        else return 0;
    }
    prepare(operation: number, _state: number): number {
        return operation;
    }
    effect(message: number, state: number, _replicaId: any, _timestamp: CausalTimestamp): [number, number] {
        return [state + message, message];
    }
    static instance = new CounterInternal();
}

/**
 * A simple counter CRDT.
 *
 * In onchange, event.description is the number that was added.
 *
 * Warning: addition is not actually commutative if there is an
 * overflow or if you use floating point numbers.  TODO: is there a
 * better type we can use?
 */
export class CounterCrdt extends Crdt<number> {
    constructor(id: any, runtime: CrdtRuntime, initialData?: number) {
        super(id, CounterInternal.instance, runtime, initialData);
    }
    increment() {
        this.add(1);
    }
    decrement() {
        this.add(-1);
    }
    add(n: number) {
        this.applyOps(n);
    }
    get value() : number {
        return this.state;
    }
    /**
     * Performs an equivalent add.  As a consequence,
     * counter.value += n and counter.value -= n work
     * as expected (converted to CRDT additions).
     */
    set value(newValue: number) {
        this.add(newValue - this.value);
    }
}

/**
 * Operations, messages, and descriptions are all just the
 * number to multiply/multiplied.
 * TODO: optimize away 1 mults?
 */
export class MultRegisterInternal implements CrdtInternal<number> {
    create(initialData?: number): number {
        if (initialData !== undefined) return initialData;
        else return 1;
    }
    prepare(operation: number, _state: number): number {
        return operation;
    }
    effect(message: number, state: number, _replicaId: any, _timestamp: CausalTimestamp): [number, number] {
        return [state * message, message];
    }
    static instance = new MultRegisterInternal();
}

/**
 * A simple numerical register CRDT with multiplication operations.
 *
 * In onchange, event.description is the number that was multiplied.
 *
 * Warning: multiplication is not actually commutative if there is an
 * overflow or if you use floating point numbers.  TODO: is there a
 * better type we can use?
 */
export class MultRegisterCrdt extends Crdt<number> {
    constructor(id: any, runtime: CrdtRuntime, initialData?: number) {
        super(id, MultRegisterInternal.instance, runtime, initialData);
    }
    mult(n: number) {
        this.applyOps(n);
    }
    get value() : number {
        return this.state;
    }
    /**
     * Performs an equivalent multiplication.  As a consequence,
     * register.value *= n and register.value /= n work
     * as expected (converted to CRDT multiplications).
     * Throws an error if the current value is 0.
     */
    set value(newValue: number) {
        if (this.value === 0) {
            if (newValue !== 0) {
                throw new Error("Impossible to set to nonzero value when current value is zero");
            }
            else return; // 0 -> 0 is no-op
        }
        this.mult(newValue / this.value);
    }
}

/**
 * Operations and messages are the element to add.  TODO:
 * this means that adding null won't work as GSetCrdt will treat
 * its message as a no-op.  Description is the element added
 * (if it's redundant, description is null, so onchange won't
 * see anything).
 */
class GSetInternal implements CrdtInternal<Set<any>> {
    create(initialData?: Set<any>): Set<any> {
        if (initialData) return new Set<any>(initialData);
        else return new Set<any>();
    }
    prepare(operation: any, state: Set<any>) {
        if (state.has(operation)) return null;
        else return operation;
    }
    effect(message: any, state: Set<any>, _timestamp: CausalTimestamp): [Set<any>, any] {
        if (state.has(message)) {
            // does nothing
            return [state, null];
        }
        else {
            state.add(message);
            return [state, message];
        }
    }
    static instance = new GSetInternal();
}

/**
 * A grow-only set.
 *
 * In onchange, event.description is the array of elements added
 * ([] or [added element]).
 *
 * TODO: adding a null value will be ignored.
 * TODO: add a type annotation
 * TODO: same interface as JS Set
 */
export class GSetCrdt extends Crdt<Set<any>> {
    constructor(id: any, runtime: CrdtRuntime, initialData?: Set<any>) {
        super(id, GSetInternal.instance, runtime, initialData);
    }
    add(element: any) {
        this.applyOps(element);
    }
    /**
     * @return The current set.  This should be treated as immutable.
     */
    get value() : Set<any> {
        return this.state;
    }
}


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
    private readonly initStateForPrepare: S;
    constructor(public readonly valueCrdtInternal: CrdtInternal<S>,
            public readonly valueInitialData: any) {
        this.initStateForPrepare = valueCrdtInternal.create(valueInitialData);
    }
    create(_initialData?: any): Map<K, S> {
        return new Map<K, S>();
    }
    /**
     * Operations:
     * - ["apply", key, C operation]: applies the C operation to the
     * given key, initializing it if needed.
     * - ["init", key]: initializes the given key using create
     * if it is not already present in the map.
     */
    prepare(operation: [string, K, any], state: Map<K, S>, replicaId: any): [string, K, any?] {
        let key = operation[1];
        switch (operation[0]) {
            case "apply":
                let keyState = state.get(key);
                if (keyState === undefined) {
                    keyState = this.initStateForPrepare;
                }
                return ["apply", key, this.valueCrdtInternal.prepare(
                    operation[2], keyState, replicaId
                )];
            case "init":
                return ["init", key];
            default:
                throw new Error("Unrecognized operation: " + JSON.stringify(operation));
        }
    }
    /**
     * Description format:
     * - for an apply operation: ["apply", key, value description]
     * - for an init operation: null if the key already existed,
     * otherwise ["init", key]
     */
    effect(message: [string, K, any?], state: Map<K, S>,
            replicaId: any, timestamp: CausalTimestamp):
            [Map<K, S>, [string, K, any?] | null] {
        let key = message[1];
        switch (message[0]) {
            case "apply":
                let keyState = state.get(key);
                if (keyState === undefined) {
                    keyState = this.valueCrdtInternal.create(this.valueInitialData);
                }
                let result = this.valueCrdtInternal.effect(
                    message[2], keyState, replicaId, timestamp
                );
                state.set(key, result[0]);
                return [state, ["apply", key, result[1]]];
            case "init":
                if (state.has(key)) return [state, null];
                else {
                    state.set(key, this.valueCrdtInternal.create(this.valueInitialData));
                    return [state, ["init", key]];
                }
            default:
                throw new Error("Unrecognized message: " + JSON.stringify(message));
        }
    }
}

/**
 * Like GrowOnlyMapInternal, but keys whose values are the initial
 * state are garbage collected.
 */
export class GcGrowOnlyMapInternal<K, S> implements CrdtInternal<Map<K, S>> {
    private readonly initStateForPrepare: S;
    /**
     * @param readonlyisInitialState    A function which may return
     * true if the given state is an initial state (i.e., an output
     * of valueCrdtInternal.create(valueInitialData)).  It need not
     * always return true given this condition, but it must return
     * false if this condition fails.
     */
    constructor(public readonly valueCrdtInternal: CrdtInternal<S>,
            public readonly valueInitialData: any,
            public readonly isInitialState: (state: S) => boolean) {
        this.initStateForPrepare = valueCrdtInternal.create(valueInitialData);
    }
    create(_initialData?: any): Map<K, S> {
        return new Map<K, S>();
    }
    /**
     * Operations:
     * - [key, C operation]: applies the C operation to the
     * given key, initializing it if needed.
     */
    prepare(operation: [K, any], state: Map<K, S>, replicaId: any): [K, any?] {
        let key = operation[0];
        let keyState = state.get(key);
        if (keyState === undefined) {
            keyState = this.initStateForPrepare;
        }
        return [key, this.valueCrdtInternal.prepare(
            operation[1], keyState, replicaId
        )];
    }
    /**
     * Description format:
     * - for an apply operation: [key, value description]
     */
    effect(message: [K, any?], state: Map<K, S>,
            replicaId: any, timestamp: CausalTimestamp):
            [Map<K, S>, [K, any?] | null] {
        let key = message[0];
        let keyState = state.get(key);
        if (keyState === undefined) {
            keyState = this.valueCrdtInternal.create(this.valueInitialData);
        }
        let result = this.valueCrdtInternal.effect(
            message[1], keyState, replicaId, timestamp
        );
        if (this.isInitialState(result[0])) {
            state.delete(key);
        }
        else state.set(key, result[0]);
        return [state, [key, result[1]]];
    }
}

/**
 * CrdtInternal whose operations are to apply a given operation
 * to every value in map (that is present when the message
 * is received at each replica), i.e., a higher-order map
 * operation (homap).
 */
export class HomapComponent<K, S> implements CrdtInternal<Map<K, S>> {
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
        // To duplicate the message (in case individual values modify
        // messages internally), we use JSON stringify/parsed.
        let stringified = JSON.stringify(message);
        let description: Array<[K, any]> = [];
        for (let key of state.keys()) {
            let result = this.mapInternal.effect([key, JSON.parse(stringified)],
                state, replicaId, timestamp);
            state = result[0];
            if (result[1] !== null) description.push([key, result[1]]);
        }
        return [state, description];
    }
    /**
     * Add a HomapComponent to the given map-valued CrdtInternal
     * with a direct product.  For this to be a Crdt, any homap
     * operation must have no effect on values that were added
     * to the map concurrently to the homap operation, so that
     * homap operations commute with key initialization.
     * (Necessary because a replica receiving a homap message applies
     * it to all of its values, even ones that were not present
     * in the sending replica when they sent the message.)
     */
    static addToCommuting<K, S>(originalCrdt: CrdtInternal<Map<K, S>>) {
        return new DirectInternal<Map<K, S>>(originalCrdt,
            new HomapComponent<K, S>(originalCrdt), 1
        );
    }
}

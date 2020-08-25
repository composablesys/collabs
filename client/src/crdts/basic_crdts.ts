import {CausalTimestamp, CrdtRuntime} from "../network";
import {CrdtInternal, Crdt} from "./crdt_core";

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
        this.applyOp(n);
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
        this.applyOp(n);
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

// export class CounterModInternal implements CrdtInternal<number> {
//     constructor(readonly modulus: number) {
//         if (modulus < 0) throw new Error("modulus is negative: " + modulus);
//     }
//     create(initialData?: number): number {
//         if (initialData !== undefined) return initialData;
//         else return 0;
//     }
//     prepare(operation: number, _state: number): number {
//         return this.mod(operation);
//     }
//     effect(message: number, state: number, _replicaId: any, _timestamp: CausalTimestamp): [number, number] {
//         return [this.mod(state + message), message];
//     }
//     mod(x: number): number {
//         if (x >= 0) return x % this.modulus;
//         else return this.modulus - ((-x) % this.modulus);
//     }
// }

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
        this.applyOp(element);
    }
    /**
     * @return The current set.  This should be treated as immutable.
     */
    get value() : Set<any> {
        return new Set(this.state);
    }
}

class MultiValueRegisterInternal<T> implements CrdtInternal<Set<[T, any, number]>> {
    /**
     * @param  initialData An initial value to set.
     */
    create(initialData?: T): Set<[T, any, number]> {
        if (initialData !== undefined) return new Set([[initialData, null, -1]]);
        else return new Set();
    }
    /**
     * Operations:
     * - ["set", value]: set to the given single value.
     * - ["reset"]: reset, setting the value set to [].
     * @param  operation [description]
     * @param  _state    [description]
     * @return           [description]
     */
    prepare(operation: [string, any?], _state: Set<[T, any, number]>, _replicaId: any) {
        if (!((operation[0] === "set" && operation[1] !== undefined)
                || operation[0] === "reset")) {
            throw new Error("Unrecognized operation: " + JSON.stringify(operation));
        }
        return operation;
    }
    /**
     * Returned description is:
     * - for set message, ["set", set value] (even if it
     * doesn't eliminate all causally prior values).
     * - for resets, ["reset"].
     */
    effect(message: [string, any?], state: Set<[T, any, number]>, _replicaId: any, timestamp: CausalTimestamp): [Set<[T, any, number]>, any] {
        if (!((message[0] === "set" && message[1] !== undefined)
                || message[0] === "reset")) {
            throw new Error("Unrecognized message: " + JSON.stringify(message));
        }
        let vc = timestamp.asVectorClock();
        for (let value of state) {
            if (value[1] === null) state.delete(value);//initial element
            else {
                let vcEntry = vc.get(value[1]);
                if (vcEntry !== undefined && vcEntry >= value[2]) state.delete(value);
            }
        }
        if (message[0] === "set") {
            state.add([message[1], timestamp.getSender(), timestamp.getSenderCounter()]);
        }
        return [state, message];
    }
    static instance = new MultiValueRegisterInternal();
}

export class MultiValueRegister<T> extends Crdt<Set<[T, any, number]>> {
    constructor(id: any, runtime: CrdtRuntime, initialData?: T) {
        super(id,
            MultiValueRegisterInternal.instance as MultiValueRegisterInternal<T>,
            runtime, initialData);
    }
    set value(value: T) {
        this.applyOp(["set", value]);
    }
    get valueSet(): Set<T> {
        let values = new Set<T>();
        for (let value of this.state) values.add(value[0]);
        return values;
    }
    reset() {
        this.applyOp(["reset"]);
    }
    getUniversalResetMessage() {
        return ["reset"];
    }
    // TODO: reset strong
}

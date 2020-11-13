import { CrdtEvent, Crdt, CrdtRuntime } from "./crdt_core";
import { CausalTimestamp } from "../network";
import {CounterNonResettableMessage, CounterResettableMessage, GSetMessage, LwwMessage, MultRegisterMessage, MvrMessage} from "../proto_compiled";
import { defaultCollectionSerializer, newDefaultCollectionDeserializer } from "./utils";
import { HardResettable } from "./resettable";
import { AddAbilitiesViaHistory, OutOfOrderAble, AddStrongResettable, AllAble, AbilityFlag, InterfaceOf, StrongResettable, Resettable } from "./abilities";

export class AddEvent implements CrdtEvent {
    type = "Add";
    constructor(
        public readonly caller: Crdt,
        public readonly timestamp: CausalTimestamp,
        public readonly valueAdded: number) { }
}

export class NumberState {
    constructor(public value: number) { }
}

export interface CounterBase extends Crdt {
    add(toAdd: number): void;
    /**
     *  Setting value performs an equivalent add.
     */
    value: number;
}

export class CounterNonResettable extends Crdt<NumberState> implements CounterBase, OutOfOrderAble, HardResettable {
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        readonly initialValue: number = 0
    ) {
        super(parentOrRuntime, id, new NumberState(initialValue));
    }

    add(toAdd: number) {
        if (toAdd !== 0) {
            let message = CounterNonResettableMessage.create({toAdd: toAdd});
            let buffer = CounterNonResettableMessage.encode(message).finish()
            super.send(buffer);
        }
    }

    receiveInternal(
        timestamp: CausalTimestamp,
        message: Uint8Array
    ) {
        try {
            let decoded = CounterNonResettableMessage.decode(message);
            this.state.value += decoded.toAdd;
            this.dispatchEvent(new AddEvent(
                this, timestamp, decoded.toAdd
            ));
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
        }
    }

    get value(): number {
        return this.state.value;
    }
    /**
     * Performs an equivalent add.
     */
    set value(value: number) {
        this.add(value - this.value);
    }

    receiveOutOfOrder(targetPath: string[], timestamp: CausalTimestamp, message: Uint8Array): void {
        this.receive(targetPath, timestamp, message);
    }

    hardReset() {
        this.state.value = this.initialValue;
    }
}

/**
 * TODO: Counter with pure operations.  Less efficient state size.
 */
export class CounterPure extends AddAbilitiesViaHistory(CounterNonResettable) implements CounterBase, AllAble {}

export class CounterResettableState {
    plusP: {[k: string]: number} = {};
    plusN: {[k: string]: number} = {};
    minusP: {[k: string]: number} = {};
    minusN: {[k: string]: number} = {};
}

export class CounterResettable extends Crdt<CounterResettableState> implements CounterBase, OutOfOrderAble, Resettable, HardResettable {
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        readonly initialValue: number = 0
    ) {
        super(parentOrRuntime, id, new CounterResettableState());
    }

    add(toAdd: number) {
        if (toAdd !== 0) {
            let message = CounterResettableMessage.create({toAdd: toAdd});
            let buffer = CounterResettableMessage.encode(message).finish()
            super.send(buffer);
        }
    }

    reset() {
        let message = CounterResettableMessage.create({
            toReset: {
                plusReset: this.state.plusP,
                minusReset: this.state.minusP
            }
        });
        let buffer = CounterResettableMessage.encode(message).finish()
        super.send(buffer);
    }

    receiveInternal(
        timestamp: CausalTimestamp,
        message: Uint8Array
    ) {
        try {
            let decoded = CounterResettableMessage.decode(message);
            switch (decoded.data) {
                case "toAdd":
                    if (decoded.toAdd > 0) {
                        let current = this.state.plusP[timestamp.getSender()];
                        if (current === undefined) current = 0;
                        this.state.plusP[timestamp.getSender()] = current + decoded.toAdd;
                    }
                    else {
                        let current = this.state.minusP[timestamp.getSender()];
                        if (current === undefined) current = 0;
                        this.state.minusP[timestamp.getSender()] = current - decoded.toAdd;
                    }
                    this.dispatchEvent(new AddEvent(
                        this, timestamp, decoded.toAdd
                    ));
                    break;
                case "toReset":
                    this.merge(this.state.plusN, decoded.toReset!.plusReset!);
                    this.merge(this.state.minusN, decoded.toReset!.minusReset!);
                    // TODO: reset event
                    break;
                default:
                    throw new Error("CounterResettable: Bad decoded.data: " + decoded.data);
            }
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
        }
    }

    private merge(target: {[k: string]: number}, source: {[k: string]: number}) {
        for (let k of Object.keys(source)) {
            if (target[k] === undefined || target[k] < source[k]) {
                target[k] = source[k];
            }
        }
    }

    get value(): number {
        let value = this.initialValue;
        value += this.addValues(this.state.plusP);
        value -= this.addValues(this.state.plusN);
        value -= this.addValues(this.state.minusP);
        value += this.addValues(this.state.minusN);
        return value;
    }

    private addValues(record: {[k: string]: number}) {
        let ans = 0;
        for (let value of Object.values(record)) ans += value;
        return ans;
    }
    /**
     * Performs an equivalent add.
     */
    set value(value: number) {
        this.add(value - this.value);
    }

    receiveOutOfOrder(targetPath: string[], timestamp: CausalTimestamp, message: Uint8Array): void {
        // TODO.
        // Error on resets.
        // For adds, if causally less than merger of all reset timestamps,
        // also add it to the reset side.  This ensures that
        // OoO adds also obey the observed-reset semantics.
        // However we also have to make sure this works in the opposite order:
        // if I receive an OoO add and later receive a causally (but not
        // logically) later reset, I have to increase that reset to take into
        // account the add.
        throw new Error("not yet implemented");
        // this.receive(targetPath, timestamp, message);
    }

    hardReset() {
        this.state.plusP = {}
        this.state.plusN = {};
        this.state.minusP = {};
        this.state.minusN = {};
    }
}

export class CounterStrongResettable extends AddStrongResettable(CounterNonResettable) implements CounterBase, StrongResettable, OutOfOrderAble {}

export class Counter extends AddStrongResettable(CounterResettable) implements AllAble {
    static withAbilities<F extends AbilityFlag>(
        abilityFlag: F,
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        initialValue: number = 0
    ): CounterBase & InterfaceOf<F> {
        if (abilityFlag.resettable !== undefined) {
            if (abilityFlag.strongResettable !== undefined) {
                return new Counter(parentOrRuntime, id, initialValue) as any;
            }
            else {
                return new CounterResettable(parentOrRuntime, id, initialValue) as any;
            }
        }
        else {
            if (abilityFlag.strongResettable !== undefined) {
                return new CounterStrongResettable(parentOrRuntime, id, initialValue) as any;
            }
            else {
                return new CounterNonResettable(parentOrRuntime, id, initialValue) as any;
            }
        }
    }
}

// TODO: keep old history-based resettable counter as "PureCounter"?

export class MultEvent implements CrdtEvent {
    type = "Mult";
    constructor(
        public readonly caller: Crdt,
        public readonly timestamp: CausalTimestamp,
        public readonly valueMulted: number) { }
}

export class MultRegisterBase extends Crdt<NumberState> implements HardResettable {
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        readonly initialValue: number = 1
    ) {
        super(parentOrRuntime, id, new NumberState(initialValue));
    }

    mult(toMult: number) {
        if (toMult !== 1) {
            let message = MultRegisterMessage.create({toMult: toMult});
            let buffer = MultRegisterMessage.encode(message).finish()
            super.send(buffer);
        }
    }

    receiveInternal(
        timestamp: CausalTimestamp,
        message: Uint8Array
    ): boolean {
        try {
            let decoded = MultRegisterMessage.decode(message);
            this.state.value *= decoded.toMult;
            this.dispatchEvent(new MultEvent(
                this, timestamp, decoded.toMult
            ));
            return true;
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
            return false;
        }
    }

    get value(): number {
        return this.state.value;
    }
    /**
     * Performs an equivalent mult.
     */
    set value(value: number) {
        this.mult(value / this.value);
    }

    hardReset() {
        this.state.value = this.initialValue;
    }
}

export class MultRegister extends AddAbilitiesViaHistory(MultRegisterBase) {}

export class SetAddEvent<T> implements CrdtEvent {
    type = "SetAdd";
    constructor(
        public readonly caller: Crdt,
        public readonly timestamp: CausalTimestamp,
        public readonly valueAdded: T) { }
}

export class GSet<T> extends Crdt<Set<T>> implements OutOfOrderAble {
    private readonly serialize: (value: T) => Uint8Array;
    private readonly deserialize: (serialized: Uint8Array) => T;
    /**
     * Grow-only set with elements of type T.
     *
     * The default serializer behaves as follows.  string, number,
     * undefined, and null types are stored
     * by-value, as in ordinary JS Set's, so that different
     * instances of the same value are identified
     * (even if they are added by different
     * replicas).  Crdt types are stored
     * by-reference, as they would be in ordinary JS set's,
     * with replicas of the same Crdt being identified
     * (even if they are added by different replicas).
     * Other types are serialized using BSON (via
     * https://github.com/mongodb/js-bson).  Note this means
     * that they will effectively be sent by-value to other
     * replicas, but on each replica, they are treated by reference,
     * following JS's usual set semantics.
     */
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        serialize: (value: T) => Uint8Array = defaultCollectionSerializer,
        deserialize: (serialized: Uint8Array) => T = newDefaultCollectionDeserializer(parentOrRuntime)
    ) {
        super(parentOrRuntime, id, new Set());
        this.serialize = serialize;
        this.deserialize = deserialize;
    }

    add(value: T) {
        // TODO: if we make this resettable, send values
        // anyway (or make that an option).
        if (!this.has(value)) {
            let message = GSetMessage.create({
                toAdd: this.serialize(value)
            });
            let buffer = GSetMessage.encode(message).finish()
            super.send(buffer);
        }
    }

    has(value: T) {
        return this.state.has(value);
    }

    receiveInternal(
        timestamp: CausalTimestamp,
        message: Uint8Array
    ): boolean {
        try {
            let decoded = GSetMessage.decode(message);
            let value = this.deserialize(decoded.toAdd);
            if (!this.state.has(value)) {
                this.state.add(value);
                this.dispatchEvent(new SetAddEvent(
                    this, timestamp, value
                ));
                return true;
            }
            else return false;
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
            return false;
        }
    }

    receiveOutOfOrder(targetPath: string[], timestamp: CausalTimestamp, message: Uint8Array): void {
        // GSet Add ops are commutative, so OoO doesn't matter
        this.receive(targetPath, timestamp, message);
    }

    /**
     * Don't mutate this directly.
     */
    get value(): Set<T> {
        return this.state;
    }

    // TODO: other helper methods
}

// TODO: resettable GSet.  Share common interface.  Needs to track timestamps
// like MVR.

export class MvrEntry<T> {
    constructor(
        readonly value: T,
        readonly sender: string | null,
        readonly counter: number,
    ) {}
}

export class MvrEvent<T> implements CrdtEvent {
    type = "Mvr";
    constructor(
        public readonly caller: Crdt,
        public readonly timestamp: CausalTimestamp,
        public readonly valueAdded: T,
        public readonly valuesRemoved: Set<T>
    ) { }
}

export class MultiValueRegisterBase<T> extends Crdt<Set<MvrEntry<T>>> implements HardResettable {
    private readonly serialize: (value: T) => Uint8Array;
    private readonly deserialize: (serialized: Uint8Array) => T;
    private readonly initialValue: T; // TODO: might unexpectedly prevent GC, or
    // change mutably
    /**
     * Multi-value register of type T.
     *
     * The default serializer behaves as follows.  string, number,
     * undefined, and null types are stored
     * by-value, as in ordinary JS Set's, so that different
     * instances of the same value are identified
     * (even if they are added by different
     * replicas).  Crdt types are stored
     * by-reference, as they would be in ordinary JS set's,
     * with replicas of the same Crdt being identified
     * (even if they are added by different replicas).
     * Other types are serialized using BSON (via
     * https://github.com/mongodb/js-bson).  Note this means
     * that they will effectively be sent by-value to other
     * replicas, but on each replica, they are treated by reference,
     * following JS's usual set semantics.
     */
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        initialValue: T,
        serialize: (value: T) => Uint8Array = defaultCollectionSerializer,
        deserialize: (serialized: Uint8Array) => T = newDefaultCollectionDeserializer(parentOrRuntime)
    ) {
        let initialSet = new Set<MvrEntry<T>>();
        // TODO: use generic way (runLocally), to
        // reduce code duplication.
        initialSet.add(new MvrEntry(
            initialValue, null, -1
        ));
        super(parentOrRuntime, id, initialSet);
        this.serialize = serialize;
        this.deserialize = deserialize;
        this.initialValue = initialValue;
    }

    set value(value: T) {
        let message = MvrMessage.create({
            value: this.serialize(value)
        });
        let buffer = MvrMessage.encode(message).finish()
        super.send(buffer);
    }

    receiveInternal(
        timestamp: CausalTimestamp,
        message: Uint8Array
    ): boolean {
        try {
            let decoded = MvrMessage.decode(message);
            let value = this.deserialize(decoded.value);
            let removed = new Set<T>();
            let vc = timestamp.asVectorClock();
            for (let entry of this.state) {
                if (entry.sender === null) {
                    // Initial element
                    this.state.delete(entry);
                }
                else {
                    let vcEntry = vc.get(entry.sender);
                    if (vcEntry !== undefined && vcEntry >= entry.counter) {
                        this.state.delete(entry);
                        removed.add(entry.value);
                    }
                }
            }
            this.state.add(new MvrEntry(
                value, timestamp.getSender(),
                timestamp.getSenderCounter()
            ));
            if (removed.size === 1 && removed.entries().next().value === value) {
                return false; // no change to actual value
            }
            else {
                // TODO: don't dispatch if value stayed put?
                this.dispatchEvent(new MvrEvent(
                    this, timestamp, value, removed
                ));
                return true;
            }
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
            return false;
        }
    }

    /**
     * Return the current set of values, i.e., the
     * set of non-overwritten values.  This may have
     * more than one element due to concurrent writes,
     * but it will never have zero elements.  (If you
     * want to allow null/undefined values, include
     * that in T's type.)
     */
    get valueSet(): Set<T> {
        let values = new Set<T>();
        for (let entry of this.state) values.add(entry.value);
        return values;
    }

    hardReset() {
        this.state.clear();
        this.state.add(new MvrEntry(
            this.initialValue, null, -1
        ));
    }
}

export class MultiValueRegister<T> extends AddAbilitiesViaHistory(MultiValueRegisterBase, true)<T> {}

export class LwwState<T> {
    constructor(
        public value: T,
        public sender: string | null,
        public counter: number,
        public time: number | null
    ) {}
}

export class LwwEvent<T> implements CrdtEvent {
    type = "Lww";
    constructor(
        public readonly caller: Crdt,
        public readonly timestamp: CausalTimestamp,
        public readonly value: T,
        public readonly timeSet: Date
    ) { }
}

export class LwwRegisterBase<T> extends Crdt<LwwState<T>> implements HardResettable {
    private readonly serialize: (value: T) => Uint8Array;
    private readonly deserialize: (serialized: Uint8Array) => T;
    private readonly initialValue: T; // TODO: might unexpectedly prevent GC, or
    // change mutably
    /**
     * Last-writer-wins (LWW) register of type T.  Ties
     * between concurrent messages are based on UTC
     * timestamps (however, a message will always overwrite
     * a causally prior value regardless of timestamps).
     *
     * The default serializer behaves as follows.  string, number,
     * undefined, and null types are stored
     * by-value, as in ordinary JS Set's, so that different
     * instances of the same value are identified
     * (even if they are added by different
     * replicas).  Crdt types are stored
     * by-reference, as they would be in ordinary JS set's,
     * with replicas of the same Crdt being identified
     * (even if they are added by different replicas).
     * Other types are serialized using BSON (via
     * https://github.com/mongodb/js-bson).  Note this means
     * that they will effectively be sent by-value to other
     * replicas, but on each replica, they are treated by reference,
     * following JS's usual set semantics.
     */
     constructor(
         parentOrRuntime: Crdt | CrdtRuntime,
         id: string,
         initialValue: T,
         serialize: (value: T) => Uint8Array = defaultCollectionSerializer,
         deserialize: (serialized: Uint8Array) => T = newDefaultCollectionDeserializer(parentOrRuntime)
     ) {
         let initialState = new LwwState(initialValue, null, -1, null);
         super(parentOrRuntime, id, initialState);
         this.serialize = serialize;
         this.deserialize = deserialize;
         this.initialValue = initialValue;
     }

    set value(value: T) {
        let message = LwwMessage.create({
            value: this.serialize(value),
            time: Date.now()
        });
        let buffer = LwwMessage.encode(message).finish()
        super.send(buffer);
    }

    get value(): T {
        return this.state.value;
    }

    receiveInternal(
        timestamp: CausalTimestamp,
        message: Uint8Array
    ): boolean {
        try {
            let decoded = LwwMessage.decode(message);
            let value = this.deserialize(decoded.value);
            // See if it's causally greater than the current state
            let vc = timestamp.asVectorClock();
            let overwrite = false;
            if (this.state.sender === null) {
                // Initial element
                overwrite = true;
            }
            else {
                let vcEntry = vc.get(this.state.sender);
                if (vcEntry !== undefined && vcEntry >= this.state.counter) {
                    overwrite = true;
                }
            }
            // If it's concurrent, compare timestamps.  Use
            // arbitrary order on sender as tiebreaker.
            if (!overwrite) {
                if (decoded.time > this.state.time!) overwrite = true;
                else if (decoded.time == this.state.time) {
                    overwrite = (timestamp.getSender() > this.state.sender!)
                }
            }

            if (overwrite) {
                let changed = (this.state.value !== value);
                this.state.counter = timestamp.getSenderCounter();
                this.state.sender = timestamp.getSender();
                this.state.time = decoded.time;
                this.state.value = value;
                if (changed) {
                    this.dispatchEvent(new LwwEvent(
                        this, timestamp, value, new Date(decoded.time)
                    ));
                }
                return changed;
            }
            else return false;
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
            return false;
        }
    }

    hardReset() {
        this.state.value = this.initialValue;
        this.state.sender = null;
        this.state.counter = -1;
        this.state.time = null;
    }
}

export class LwwRegister<T> extends AddAbilitiesViaHistory(LwwRegisterBase, true)<T> {}

import { CrdtEvent, Crdt, CrdtRuntime } from "./crdt_core";
import { CausalTimestamp } from "../network";
import {CounterMessage, GSetMessage, LwwMessage, MultRegisterMessage, MvrMessage} from "../proto_compiled";
import { defaultCollectionSerializer, newDefaultCollectionDeserializer } from "./utils";

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

// TODO: make resettable
export class CounterCrdt extends Crdt<NumberState> {
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        initialValue: number = 0
    ) {
        super(parentOrRuntime, id, new NumberState(initialValue));
    }

    add(toAdd: number) {
        if (toAdd !== 0) {
            let message = CounterMessage.create({toAdd: toAdd});
            let buffer = CounterMessage.encode(message).finish()
            super.send(buffer);
        }
    }

    receiveInternal(
        timestamp: CausalTimestamp,
        message: Uint8Array
    ): boolean {
        try {
            let decoded = CounterMessage.decode(message);
            this.state.value += decoded.toAdd;
            this.dispatchEvent(new AddEvent(
                this, timestamp, decoded.toAdd
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
     * Performs an equivalent add.
     */
    set value(value: number) {
        this.add(value - this.value);
    }
}

export class MultEvent implements CrdtEvent {
    type = "Mult";
    constructor(
        public readonly caller: Crdt,
        public readonly timestamp: CausalTimestamp,
        public readonly valueMulted: number) { }
}

export class MultRegisterCrdt extends Crdt<NumberState> {
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        initialValue: number = 1
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
}

export class GSetAddEvent<T> implements CrdtEvent {
    type = "GSetAdd";
    constructor(
        public readonly caller: Crdt,
        public readonly timestamp: CausalTimestamp,
        public readonly valueAdded: T) { }
}

export class GSetCrdt<T> extends Crdt<Set<T>> {
    private readonly serialize: (value: T) => Uint8Array;
    private readonly deserialize: (serialized: Uint8Array) => T;
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
        let message = GSetMessage.create({
            toAdd: this.serialize(value)
        });
        let buffer = GSetMessage.encode(message).finish()
        super.send(buffer);
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
                this.dispatchEvent(new GSetAddEvent(
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

    /**
     * Don't mutate this directly.
     */
    get value(): Set<T> {
        return this.state;
    }
}

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

export class MultiValueRegister<T> extends Crdt<Set<MvrEntry<T>>> {
    private readonly serialize: (value: T) => Uint8Array;
    private readonly deserialize: (serialized: Uint8Array) => T;
    /**
     * Multi-value register of type T.
     *
     * The default serializer supports types string, number,
     * and Crdt.  string and number types are stored
     * by-value, as in ordinary JS Set's, so that different
     * instances of the same value are identified
     * (even if they are added by different
     * replicas).  Crdt types are stored
     * by-reference, as they would be in ordinary JS set's,
     * with replicas of the same Crdt being identified
     * (even if they are added by different replicas).
     * Other types are not supported and will cause an
     * error when you attempt to add them; use a custom
     * serializer and deserializer instead, being
     * aware of JS's clunky set semantics (all Objects
     * are stored by-reference only, while naive
     * serialization/deserialization, e.g. with JSON,
     * will create non-equal
     * copies of Objects on other replicas,
     * even if they intuitively correspond to the "same"
     * variable.)
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

    // TODO: reset.  Settable reset value.
}

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

export class LwwRegister<T> extends Crdt<LwwState<T>> {
    private readonly serialize: (value: T) => Uint8Array;
    private readonly deserialize: (serialized: Uint8Array) => T;
    /**
     * Last-writer-wins (LWW) register of type T.  Ties
     * between concurrent messages are based on UTC
     * timestamps (however, a message will always overwrite
     * a causally prior value regardless of timestamps).
     *
     * The default serializer supports types string, number,
     * and Crdt.  string and number types are stored
     * by-value, as in ordinary JS Set's, so that different
     * instances of the same value are identified
     * (even if they are added by different
     * replicas).  Crdt types are stored
     * by-reference, as they would be in ordinary JS set's,
     * with replicas of the same Crdt being identified
     * (even if they are added by different replicas).
     * Other types are not supported and will cause an
     * error when you attempt to add them; use a custom
     * serializer and deserializer instead, being
     * aware of JS's clunky set semantics (all Objects
     * are stored by-reference only, while naive
     * serialization/deserialization, e.g. with JSON,
     * will create non-equal
     * copies of Objects on other replicas,
     * even if they intuitively correspond to the "same"
     * variable.)
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

    // TODO: reset.  Settable reset value.
}

// TODO: make above Crdts optional resettable, with
// settable reset values (either in constructor or via
// a builder pattern).  Perhaps more generally, Crdts
// should allow a reset callback, that gets run locally in
// hardReset (check this is EC).

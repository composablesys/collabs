import { CrdtEvent, Crdt, CrdtRuntime } from "./crdt_core";
import { CausalTimestamp } from "../network";
import {CounterMessage, GSetMessage, MultRegisterMessage, MvrMessage} from "../proto_compiled";
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
        initialValue: Set<T> = new Set(),
        serialize: (value: T) => Uint8Array = defaultCollectionSerializer,
        deserialize: (serialized: Uint8Array) => T = newDefaultCollectionDeserializer(parentOrRuntime)
    ) {
        super(parentOrRuntime, id, initialValue);
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
        initialValue?: T,
        serialize: (value: T) => Uint8Array = defaultCollectionSerializer,
        deserialize: (serialized: Uint8Array) => T = newDefaultCollectionDeserializer(parentOrRuntime)
    ) {
        let initialSet = new Set<MvrEntry<T>>();
        if (initialValue !== undefined) {
            initialSet.add(new MvrEntry(
                initialValue, null, -1
            ));
        }
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

    get valueSet(): Set<T> {
        let values = new Set<T>();
        for (let entry of this.state) values.add(entry.value);
        return values;
    }
}

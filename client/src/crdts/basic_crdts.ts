import { CrdtChangeEvent, Crdt, CrdtRuntime } from "./crdt_core";
import { CausalTimestamp } from "../network";
import {CounterMessage, MultRegisterMessage} from "../proto_compiled";
import { SemidirectProduct } from "./semidirect";

export class CrdtAddEvent implements CrdtChangeEvent {
    type = "add";
    constructor(
        public readonly caller: Crdt,
        public readonly timestamp: CausalTimestamp,
        public readonly valueAdded: number,
        public readonly newValue: number) { }
}

class NumberState {
    constructor(public value: number) { }
}

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
            this.dispatchEvent(new CrdtAddEvent(
                this, timestamp, decoded.toAdd, this.state.value
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

export class CrdtMultEvent implements CrdtChangeEvent {
    type = "mult";
    constructor(
        public readonly caller: Crdt,
        public readonly timestamp: CausalTimestamp,
        public readonly valueMulted: number,
        public readonly newValue: number) { }
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
            this.dispatchEvent(new CrdtMultEvent(
                this, timestamp, decoded.toMult, this.state.value
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

export class IntRegisterCrdt extends SemidirectProduct<NumberState> {
    addCrdt: CounterCrdt;
    multCrdt: MultRegisterCrdt;
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        initialValue: number = 0
    ) {
        super(parentOrRuntime, id);
        this.addCrdt = new CounterCrdt(this, "add", 0/*, false*/);
        this.multCrdt = new MultRegisterCrdt(this, "mult", 0/*, false*/);
        super.setup(
            this.addCrdt, this.multCrdt,
            this.action.bind(this),
            new NumberState(initialValue)
        )
    }

    action(
        m2: Uint8Array, _m2Timestamp: CausalTimestamp,
        m1: Uint8Array
    ): Uint8Array | null
    {
        try {
            let m2Decoded = MultRegisterMessage.decode(m2);
            let m1Decoded = CounterMessage.decode(m1);
            let acted = CounterMessage.create({toAdd: m2Decoded.toMult * m1Decoded.toAdd});
            return CounterMessage.encode(acted).finish()
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
            return null;
        }
    }
}

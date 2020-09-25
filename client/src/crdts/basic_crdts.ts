import { CrdtChangeEvent, Crdt, SemidirectProduct, OptionalResettableCrdt } from ".";
import { CausalTimestamp, CrdtRuntime } from "../network";
import {CounterMessage, MultRegisterMessage} from "./basic_crdts_proto";

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

export class CounterCrdt extends OptionalResettableCrdt<NumberState> {
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        initialValue: number = 0,
        resettable = true
    ) {
        super(parentOrRuntime, id, new NumberState(initialValue), resettable);
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
}

export class CrdtMultEvent implements CrdtChangeEvent {
    type = "mult";
    constructor(
        public readonly caller: Crdt,
        public readonly timestamp: CausalTimestamp,
        public readonly valueMulted: number,
        public readonly newValue: number) { }
}

export class MultRegisterCrdt extends OptionalResettableCrdt<NumberState> {
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        initialValue: number = 1,
        resettable = true
    ) {
        super(parentOrRuntime, id, new NumberState(initialValue), resettable);
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
            this.state.value += decoded.toMult;
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
        this.addCrdt = new CounterCrdt(this, "add", 0, false);
        this.multCrdt = new MultRegisterCrdt(this, "mult", 0, false);
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

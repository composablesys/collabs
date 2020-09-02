import { CrdtChangeEvent, Crdt } from ".";
import { CausalTimestamp, CrdtRuntime } from "../network";

export class CounterAddEvent implements CrdtChangeEvent {
    type = "add";
    constructor(
        public readonly caller: Crdt,
        public readonly isLocal: boolean,
        public readonly timestamp: CausalTimestamp,
        public readonly valueAdded: number,
        public readonly newValue: number) { }
}

// TODO: have just one IntRegister, with option to
// turn off resets if you want efficiency.
// Also let turn off ops you're not using, to avoid
// storing them in the semidirect history?  Or could make
// those different classes.
export class UnresettableCounterCrdt extends Crdt {
    private state: number;
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        initialValue?: number
    ) {
        super(parentOrRuntime, id);
        if (initialValue === undefined) this.state = 0;
        else this.state = initialValue;
    }

    add(toAdd: number) {
        if (toAdd !== 0) {
            super.callRemote(this.remoteAdd, toAdd);
        }
    }

    remoteAdd(isLocal: boolean, timestamp: CausalTimestamp, toAdd: number): [boolean, void] {
        this.state += toAdd;
        this.dispatchEvent(new CounterAddEvent(
            this, isLocal, timestamp, toAdd, this.state
        ));
        return [true, undefined];
    }

    get value(): number {
        return this.state;
    }
}

import { CrdtMessageListener, CrdtRuntime, CausalTimestamp } from "../network";

/**
 * An event issued when a CRDT is changed by another replica.
 * Crdt's should define events implementing this interface
 * and pass those to registered listeners when the Crdt's
 * state is changed by a remote message (i.e., in a
 * remote method when remoteCaller is false).
 *
 * @param caller      The Crdt instance that was changed.
 * @param timestamp   The causal timestamp of the change. Note that
 * because several CRDTs can share the same runtime, timestamps
 * may not be continguous (e.g., entries in their vector clocks
 * might skip numbers).  However, causally ordered delivery is
 * still guaranteed.
 * @param type        A string containing the event's type.
 */
export interface CrdtChangeEvent2 {
    readonly caller: Crdt2;
    readonly timestamp: CausalTimestamp;
    readonly type: string;
}

class CrdtMessage {
    constructor(
        public readonly method: string,
        public readonly args: any[]
    ) {}
}

export class Crdt2 implements CrdtMessageListener {
    /**
     * @param id      An id for this CRDT.  All CRDTs using the
     * same CrdtRuntime must have distinct ids, and the ids must
     * be the same for all replicas of a given CRDT, in order
     * for the CrdtRuntime to route messages to them properly.
     * @param runtime The CrdtRuntime to use for sending and
     * receiving messages.
     */
    constructor(
        public readonly id: string,
        public readonly runtime: CrdtRuntime
    ) {
        this.runtime.register(this, this.id);
    }

    protected callRemote<Args extends any[], Return>(
        method: (remoteCaller: boolean, timestamp: CausalTimestamp, ...args: Args) => Return,
        ...args: Args
    ): Return {
        // Serialize the method name and args
        // Do this first in case calling method changes them
        let message = JSON.stringify(
            new CrdtMessage(method.name, args)
        );
        // Call the local function
        let result = method(
            false, this.runtime.getNextTimestamp(this.id),
            ...args
        );
        // Send message on the network
        this.runtime.send(message, this.id);
        // Return local result
        return result;
    }
    /**
     * Callback for this.runtime when an atomic list of
     * messages is received from another replica.
     */
    receive(message: string, timestamp: CausalTimestamp) {
        let messageObj: CrdtMessage = JSON.parse(message);
        if (!(messageObj instanceof CrdtMessage)) {
            // TODO: don't throw here, to avoid messing
            // with caller.
            throw new Error("Failed to parse CrdtMessage: " + message);
        }
        // @ts-ignore: Call method by name
        let method = this[messageObj.method]() as
            (remoteCaller: boolean, timestamp: CausalTimestamp, ...args: any[]) => any;
        if (method === undefined) {
            // TODO: don't throw here, to avoid messing
            // with caller.
            throw new Error("Unknown method called remotely: " + messageObj.method);
        }
        // TODO: Check type?  At least make sure it's a function?
        method(true, timestamp, messageObj.args);
    }

    // TODO: resets
}

export class Counter2AddEvent implements CrdtChangeEvent2 {
    type = "add";
    constructor(
        public readonly caller: Crdt2,
        public readonly timestamp: CausalTimestamp,
        public readonly valueAdded: number,
        public readonly newValue: number) { }
}

export class Counter2 extends Crdt2 {
    private state: number;
    public onchange?: (event: Counter2AddEvent) => void;
    constructor(
        public readonly id: string,
        public readonly runtime: CrdtRuntime,
        initialValue?: number
    ) {
        super(id, runtime);
        if (initialValue === undefined) this.state = 0;
        else this.state = initialValue;
    }

    protected remoteAdd(remoteCaller: boolean, timestamp: CausalTimestamp, toAdd: number): void {
        this.state += toAdd;
        if (remoteCaller && this.onchange) {
            this.onchange(new Counter2AddEvent(
                this, timestamp, toAdd, this.state
            ));
        }
    }

    add(toAdd: number) {
        super.callRemote(this.remoteAdd.bind(this), toAdd);
    }

    get value(): number {
        return this.state;
    }
}

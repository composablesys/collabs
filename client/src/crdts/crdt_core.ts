import { CrdtMessageListener, CrdtRuntime, CausalTimestamp } from "../network";

/**
 * An event issued when a CRDT is changed by another replica.
 * Crdt's should define events implementing this interface
 * and pass those to registered listeners when the Crdt's
 * state is changed by a remote message (i.e., in a
 * remote method when remoteCaller is false).
 *
 * @param caller      The Crdt instance that was changed.
 * @param type        A string containing the event's type.
 * @param isLocal     Whether the change was caused by the caller's
 * replica (i.e., by a local operation on caller instead of an
 * operation on another replica).
 * @param timestamp   The causal timestamp of the change. Note that
 * because several CRDTs can share the same runtime, timestamps
 * may not be continguous (e.g., entries in their vector clocks
 * might skip numbers).  However, causally ordered delivery is
 * still guaranteed.
 */
export interface CrdtChangeEvent {
    readonly caller: Crdt;
    readonly type: string;
    readonly isLocal: boolean;
    readonly timestamp: CausalTimestamp;
}

class CrdtMessage {
    constructor(
        public readonly method: string,
        public readonly args: any[]
    ) {}
}

export class Crdt implements CrdtMessageListener {
    readonly isCrdt = true;
    readonly parent: Crdt | null;
    readonly runtime: CrdtRuntime;
    readonly id: string;
    /**
     * The id of this Crdt qualified by the fullId of its
     * parent, if parent is a Crdt; if parent is a CrdtRuntime,
     * this is equal to id.  "." is used to delimit levels
     * in the hierarchy, e.g., "grandparentId.parentId.childId".
     */
    readonly fullId: string;
    readonly causalConsistencyGroup: string;
    /**
     * @param parentOrRuntime A parent for this Crdt, either another
     * Crdt, or the CrdtRuntime if this has no Crdt parent.
     * Typically parent will be the Crdt containing this
     * as an instance variable, or the CrdtRuntime if there is
     * no such Crdt.  Crdts with the same parent share a common
     * namespace and causal consistency group, and the default
     * reset() behavior is to call reset() on each child.
     * Different replicas of a Crdt must be assigned parents
     * which are also replicas of each other.
     * @param id      An id for this Crdt.  All Crdts with the
     * same parent must have distinct ids, and the ids must
     * be the same for all replicas of a given CRDT, in order
     * for the CrdtRuntime to route messages to them properly.
     * The "." character is reserved.
     */
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string
    ) {
        this.id = id;
        if ("isCrdt" in parentOrRuntime) {
            this.parent = parentOrRuntime;
            this.runtime = this.parent.runtime;
            this.fullId = this.parent.fullId + "." + id;
            this.causalConsistencyGroup = this.parent.causalConsistencyGroup;
            this.parent.registerChild(this);
        }
        else {
            this.parent = null;
            this.runtime = parentOrRuntime;
            this.fullId = id;
            this.causalConsistencyGroup = id;
        }
        this.runtime.register(this, this.fullId);
    }

    private readonly children: Crdt[] = [];
    protected registerChild(child: Crdt) {
        this.children.push(child);
    }

    private readonly eventListeners = new Map<string, [(event: CrdtChangeEvent) => void, boolean][]>();
    // TODO: typing, or at least check type exists?
    // TODO: ability to remove listeners?  Look at how DOM does it.
    /**
     * TODO: copy DOM description.
     * @param  type     [description]
     * @param  listener [description]
     * @param  receiveLocal = false  If false, events with isLocal = true
     * are not delivered.
     * @return          [description]
     */
    addEventListener(
        type: string, listener: (event: CrdtChangeEvent) => void,
        ignoreLocal = true
    ) {
        let list = this.eventListeners.get(type);
        if (list === undefined) {
            list = [];
            this.eventListeners.set(type, list);
        }
        list.push([listener, ignoreLocal]);
    }
    /**
     * A subclass should call this in a remote method
     * when it has an event
     * it wants to deliver to listeners.
     */
    protected dispatchEvent(event: CrdtChangeEvent) {
        let list = this.eventListeners.get(event.type);
        if (list === undefined) return;
        for (let [listener, receiveLocal] of list) {
            if (receiveLocal || !event.isLocal) {
                try {
                    listener(event);
                }
                catch(e) {}
            }
        }
    }

    /**
     * Call the given method of this remotely.
     * method must be on this, but it should not be bound,
     * so that it can be called on remote replicas using
     * (replica of this)[method.name].call((replica of this), args).
     * TODO: must commute with concurrent remote method
     * calls (with modifications due to semidirect actions).
     * method's arguments must be:
     * - isLocal boolean: whether the method is being called
     * locally (by the current replica).
     * - timestamp: the timestamp of this method call.
     * - ...args: any method-specific args.  These must
     * work properly after begin serialized to JSON and
     * then deserialized on remote replicas.
     * method must return a pair [boolean, Return],
     * where Return can be anything, and where boolean
     * indicates whether the Crdt's state was changed
     * (specifically, whether a CrdtChangeEvent should
     * be dispatched to listeners for the "change" event
     * type).
     * @return The second value returned by method when
     * called on the local replica.
     *
     */
    protected callRemote<Args extends any[], Return>(
        method: (this: this, isLocal: boolean, timestamp: CausalTimestamp, ...args: Args) => [boolean, Return],
        ...args: Args
    ): Return {
        // Serialize the method name and args
        // Do this first in case calling method changes them
        let message = JSON.stringify(
            new CrdtMessage(method.name, args)
        );
        // Call the local function
        let timestamp = this.runtime.getNextTimestamp(this.causalConsistencyGroup);
        // @ts-ignore: This should work but TS is confused by args[] vs Any
        let result = method.call(
            this, true, timestamp, ...args
        );
        // Send message on the network
        this.runtime.send(message, this.fullId, this.causalConsistencyGroup);
        // Dispatch generic CrdtChangeEvent if instructed
        if (result[0]) {
            this.dispatchEvent({
                caller: this,
                type: "change",
                isLocal: true,
                timestamp: timestamp
            })
        }
        // Return local result
        return result[1];
    }
    /**
     * Callback for this.runtime when a
     * message is received from another replica.
     */
    receive(message: string, timestamp: CausalTimestamp) {
        let messageObj: CrdtMessage = JSON.parse(message);
        if (messageObj.method === undefined) {
            // TODO: don't throw here, to avoid messing
            // with caller.
            console.log("Failed to parse CrdtMessage: " + message);
            return;
        }
        // @ts-ignore: Call method by name
        let method = this[messageObj.method] as
            (this: this, isLoal: boolean, timestamp: CausalTimestamp, ...args: any[]) => [boolean, any];
        if (method === undefined) {
            // TODO: don't throw here, to avoid messing
            // with caller.
            console.log("Unknown method called remotely: " + messageObj.method);
            return;
        }
        // TODO: Check type?  At least make sure it's a function?
        let result = method.call(this, true, timestamp, ...messageObj.args);
        // Dispatch generic CrdtChangeEvent if instructed
        if (result[0]) {
            this.dispatchEvent({
                caller: this,
                type: "change",
                isLocal: true,
                timestamp: timestamp
            })
        }
    }

    /**
     * Performs an observed-reset operation on this Crdt.
     * The default behavior is to reset every child Crdt;
     * override to implement different behavior.
     */
    reset() {
        for (let child of this.children) child.reset();
    }
}

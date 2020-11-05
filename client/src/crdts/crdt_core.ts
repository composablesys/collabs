import { CrdtNetwork, CausalTimestamp } from "../network";
import { CrdtRuntimeMessage } from "../proto_compiled";

/**
 * An event issued when a CRDT is changed by another replica.
 * Crdt's should define events implementing this interface
 * and pass those to registered listeners when the Crdt's
 * state is changed by a remote message (i.e., in a
 * remote method when remoteCaller is false).
 *
 * @param caller      The Crdt instance that was changed.
 * @param type        A string containing the event's type.
 * @param timestamp   The causal timestamp of the change. Note that
 * because several CRDTs can share the same runtime, timestamps
 * may not be continguous (e.g., entries in their vector clocks
 * might skip numbers).  However, causally ordered delivery is
 * still guaranteed.
 */
export interface CrdtEvent {
    readonly caller: Crdt;
    readonly type: string;
    readonly timestamp: CausalTimestamp;
}

export abstract class Crdt<S extends Object | null = Object | null> {
    readonly isCrdt = true;
    readonly parent: Crdt | null;
    readonly runtime: CrdtRuntime;
    readonly id: string;
    /**
     * The id of this crdt and all of its ancestors in order
     * from this crdt on up, excluding the root.
     */
    readonly pathToRoot: string[];
    /**
     * The id of the root Crdt, i.e., the highest-up
     * ancestor.  The rootId corresponds to a CrdtNetwork
     * group, so that Crdts with the same rootId are shared
     * by the same set of replicas and are causally consistent.
     */
    readonly rootId: string;
    /**
     * All of this Crdt's mutable non-child-Crdt state should be stored
     * in state, which should have a descriptive type,
     * ideally a custom class.  E.g., a CounterCrdt has state of type
     * NumberState, containing a single number (the
     * current counter value).  Putting all mutable state
     * into this.state enables semidirect product
     * compositions, in which two Crdt's share the same
     * state.  Note that semidirect products may cause
     * state to change without this Crdt's action; also,
     * when SemidirectProduct.setup() is called, it
     * will change the pointers of its children's states
     * (ignoring the readonly descriptor).
     * state is readonly to force you to only update it
     * internally, not change its pointer/
     * If you do not plan to use your Crdt in semidirect
     * products, and you are sure no one else will want
     * to do so, you can safely disregard this and store
     * your state elsewhere instead.
     */
    readonly state: S;
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
     */
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        state: S
    ) {
        this.id = id;
        this.state = state;
        if ("isCrdt" in parentOrRuntime) {
            this.parent = parentOrRuntime;
            this.runtime = this.parent.runtime;
            this.pathToRoot = [id, ...this.parent.pathToRoot];
            this.rootId = this.parent.rootId;
            this.parent.registerChild(this);
        }
        else {
            this.parent = null;
            this.runtime = parentOrRuntime;
            this.pathToRoot = [];
            this.rootId = id;
            this.runtime.registerRoot(this);
        }
    }

    /**
     * Note: children should not be used by subclasses to implement
     * functionality because it may not be what you expect.  In particular:
     * - A user of this may attach extra children that you don't expect.
     * - If you add a child Crdt (by passing this as parentOrRuntime in
     * its constructor), that Crdt may interject a separate Crdt in
     * in between it and this (e.g., a Crdt that helps implement
     * reset abilities, like in AddAbilitiesViaHistory), and the interjected
     * Crdt is what will appear in children.
     *
     * If you want to track of the children that you add, you should do so
     * using your own instance variables, so that you can completely
     * control them.
     *
     * TODO: way to "lock" adding children?
     */
    readonly children: Map<string, Crdt> = new Map();
    protected registerChild(child: Crdt) {
        this.children.set(child.id, child)
    }

    private readonly eventListeners = new Map<string, [(event: CrdtEvent) => void, boolean][]>();
    // TODO: typing, or at least check type exists?
    // TODO: ability to remove listeners?  Look at how DOM does it.
    /**
     * TODO: copy DOM description.
     * An event of type "Change" is dispatched whenever this Crdt
     * or one of its children
     * finishes receiving a message.  (TODO: separate out this vs
     * child changes.  Note we may later optimize away this Crdt's
     * seeing child messages.)
     * @param  type     [description]
     * @param  listener [description]
     * @param  receiveLocal = false  If false, events with isLocal = true
     * are not delivered.
     * @return          [description]
     */
    addEventListener(
        type: string, listener: (event: CrdtEvent) => void,
        receiveLocal = false
    ) {
        let list = this.eventListeners.get(type);
        if (list === undefined) {
            list = [];
            this.eventListeners.set(type, list);
        }
        list.push([listener, receiveLocal]);
    }
    /**
     * A subclass should call this in a remote method
     * when it has an event
     * it wants to deliver to listeners.
     */
    protected dispatchEvent(event: CrdtEvent) {
        let list = this.eventListeners.get(event.type);
        if (list === undefined) return;
        for (let [listener, receiveLocal] of list) {
            if (receiveLocal || !event.timestamp.isLocal()) {
                try {
                    listener(event);
                }
                catch(e) {}
            }
        }
    }

    protected send(message: Uint8Array) {
        this.runtime.send(this, message);
    }

    protected inOwnReceiveInternal = false;

   /**
     * Callback used by CrdtRuntime or a parent Crdt.
     * @targetPath: the target Crdt's id followed by
     * the ids of its ancestors in ascending order,
     * excluding the current Crdt.
     * @param timestamp The timestamp of the received message
     * @param message   The received message
     */
    receive(
        targetPath: string[], timestamp: CausalTimestamp,
        message: Uint8Array
    ): void {
        // TODO: use (homebrew?) iterator for targetPath.
        // Make it easy to copy for multiple uses (copying
        // index but not the underlying array).
        if (targetPath.length === 0) {
            // We are the target
            let oldInOwnReceiveInternal = this.inOwnReceiveInternal;
            this.inOwnReceiveInternal = true;
            this.receiveInternal(timestamp, message);
            this.inOwnReceiveInternal = oldInOwnReceiveInternal;
        }
        else {
            let child = this.children.get(targetPath[targetPath.length - 1]);
            if (child === undefined) {
                // TODO: deliver error somewhere reasonable
                throw new Error("Unknown child: " + targetPath[targetPath.length - 1] +
                        " in: " + JSON.stringify(targetPath) + ", children: " + JSON.stringify([...this.children.keys()]));
            }
            targetPath.length--;
            this.receiveInternalForChild(
                child, targetPath, timestamp, message
            );
        }
        if (!this.inOwnReceiveInternal) {
            // Dispatch a generic "Change" event, unless it's a message
            // (possibly for a child) that we generated by calling
            // a method locally as part of our own receiveInternal call,
            // in which case we skip it because we're going to
            // do so at the end of that call.
            this.dispatchEvent({
                caller: this,
                type: "Change",
                timestamp: timestamp
            });
        }
    }

    /**
     * Override this to receive messages sent by send
     * on children of this Crdt.
     * The default behavior is to pass the
     * message to child unchanged, by
     * calling child.receive(targetPath, timestamp, message).
     * @param child The child
     * @param  targetPath The targetPath that would normally
     * be delivered to the child, i.e., the ids of the Crdts
     * on the path
     * from the message's ultimate target to child, excluding
     * child.
     * @param  timestamp  [description]
     * @param  message    [description]
     * @return Whether this Crdt's state was changed, i.e.,
     * a CrdtEvent of type "Change" should be
     * dispatched.
     */
    protected receiveInternalForChild(
        child: Crdt, targetPath: string[],
        timestamp: CausalTimestamp,
        message: Uint8Array
    ): void {
        child.receive(
            targetPath, timestamp, message
        );
    }

    /**
     * Receives messages sent by send
     * on replicas of this crdt (including those sent
     * locally).
     *
     * The default implementation throws an error, since if you
     * expect to receive any messages, you should override this method.
     * @param  timestamp  [description]
     * @param  message    [description]
     */
    protected receiveInternal(
        _timestamp: CausalTimestamp,
        _message: Uint8Array
    ) {
        throw new Error("Received message but receiveInternal is not overridden");
    }
}

// TODO: generic change events from return values

export class CrdtRuntime {
    readonly rootCrdts = new Map<string, Crdt>();
    constructor(readonly network: CrdtNetwork) {
        this.network.register(this);
    }

    registerRoot(crdt: Crdt) {
        this.rootCrdts.set(crdt.id, crdt);
    }

    send(sender: Crdt, message: Uint8Array) {
        let timestamp = this.network.getNextTimestamp(sender.rootId);
        // Deliver to self
        // TODO: error handling
        this.rootCrdts.get(sender.rootId)!.receive(
            sender.pathToRoot.slice(), timestamp, message
        );
        let runtimeMessage = CrdtRuntimeMessage.create({
            innerMessage: message,
            pathToRoot: sender.pathToRoot
        });
        let buffer = CrdtRuntimeMessage.encode(runtimeMessage).finish()
        this.network.send(sender.rootId, buffer, timestamp);
    }

    /**
     * Callback for CrdtNetwork.
     */
    receive(group: string, message: Uint8Array, timestamp: CausalTimestamp) {
        try {
            let decoded = CrdtRuntimeMessage.decode(message);
            this.rootCrdts.get(group)!.receive(
                decoded.pathToRoot, timestamp, decoded.innerMessage
            );
        }
        catch (e) {
            // TODO
            console.log("Decoding error: " + e);
        }
    }

    getReplicaId(): string {
        return this.network.getReplicaId();
    }

    getCrdtByReference(rootId: string, pathToRoot: string[]): Crdt {
        // TODO: optimize?
        let currentCrdt = this.rootCrdts.get(rootId);
        if (!currentCrdt) {
            throw new Error("Unknown rootId: " + rootId);
        }
        for (let i = pathToRoot.length - 1; i >= 0; i--) {
            currentCrdt = currentCrdt.children.get(pathToRoot[i]);
            if (!currentCrdt) {
                throw new Error(
                    "Unknown child: " + pathToRoot[i] +
                    " at index " + i + " in reference: rootId=" +
                    rootId + ", pathToRoot=" + pathToRoot
                );
            }
        }
        return currentCrdt;
    }

    private idCounter = 0;
    /**
     * @return A unique string that will only appear once
     * in this CrdtRuntime, obtained by concatenating our
     * replica id with a counter.
     */
    getUid() {
        return (this.idCounter++) + " " + this.getReplicaId();
    }
}

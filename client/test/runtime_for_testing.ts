import {CrdtRuntime, CrdtMessageListener, CausalTimestamp} from "../src/crdt_runtime_interface";

class TestingRuntime implements CrdtRuntime {
    listenersById = new Map<any, CrdtMessageListener>();
    vectorClock = new Map<any, number>();
    constructor(private generator : TestingRuntimeGenerator,
            private replicaId : any) {
        this.vectorClock.set(replicaId, 0);
    }
    send(message: any, crdtId: any): void {
        this.vectorClock.set(this.replicaId, this.vectorClock.get(
            this.replicaId) as number + 1
        );
        let myReplicaId = this.replicaId;
        let vcCopy = new Map(this.vectorClock);
        let timestamp = {
            getSender() { return myReplicaId; },
            getSenderCounter() { return vcCopy.get(this.getSender()) as number;},
            asVectorClock() { return vcCopy; }
        }
        let queueMap = this.generator.messageQueues.get(this) as
            Map<TestingRuntime, Array<[any, any, CausalTimestamp]>>;
        for (let queue of queueMap.values()) {
            // Use different copies for each Crdt, in case they
            // modify message while processing it
            queue.push([JSON.parse(JSON.stringify(message)), crdtId, timestamp]);
        }
    }
    register(crdtMessageListener: CrdtMessageListener, crdtId: any): void {
        if (this.listenersById.has(crdtId)) {
            throw new Error("Duplicate crdtId: " + crdtId);
        }
        this.listenersById.set(crdtId, crdtMessageListener);
    }
    getReplicaId() {
        return this.replicaId;
    }
    getNextTimestamp() {
        let vcCopy = new Map(this.vectorClock);
        vcCopy.set(this.replicaId, this.vectorClock.get(
            this.replicaId) as number + 1
        );
        let myReplicaId = this.replicaId;
        let timestamp = {
            getSender() { return myReplicaId; },
            getSenderCounter() { return vcCopy.get(this.getSender()) as number;},
            asVectorClock() { return vcCopy; }
        }
        return timestamp;
    }
}

/**
 * Creates a collection of CrdtRuntimes linked together
 * (i.e., in-memory networking) that deliver messages
 * when release is called.
 */
export class TestingRuntimeGenerator {
    newRuntime(replicaId?: any) : TestingRuntime {
        if (replicaId === undefined) replicaId = this.messageQueues.size;
        let runtime = new TestingRuntime(this, replicaId);
        let newQueue = new Map<TestingRuntime, Array<any>>();
        for (let oldEntry of this.messageQueues.entries()) {
            newQueue.set(oldEntry[0], []);
            oldEntry[1].set(runtime, []);
        }
        this.messageQueues.set(runtime, newQueue);
        return runtime;
    }
    // Maps sender and recipient to an array of queued [message,
    // crdtId, timestamp] tuples.
    messageQueues = new Map<TestingRuntime,
        Map<TestingRuntime, Array<[any, any, CausalTimestamp]>>>();
    /**
     * Release all queued messages sender to the specified recipients.
     * If recipients are not specified, releases them to all
     * recipients.  Only recipients that existed at the time
     * of sending will receive a message.
     */
    release(sender: TestingRuntime, ...recipients: TestingRuntime[]) {
        if (recipients.length === 0) recipients = [...this.messageQueues.keys()];
        let senderMap = this.messageQueues.get(sender) as
            Map<TestingRuntime, Array<any>>;
        for (let recipient of recipients) {
            if (recipient === sender) continue;
            for (let messagePair of (senderMap.get(recipient) as Array<[any, any, CausalTimestamp]>)) {
                let listener = recipient.listenersById.get(
                    messagePair[1]);
                if (listener === undefined) {
                    throw new Error("No Crdt with id " + messagePair[1] +
                        " on replica " + recipient.getReplicaId());
                }
                listener.receive(messagePair[0], messagePair[2]);
                recipient.vectorClock.set(sender.getReplicaId(), messagePair[2].getSenderCounter());
            }
            senderMap.set(recipient, []);
        }
    }
    releaseAll() {
        for (let sender of this.messageQueues.keys()) this.release(sender);
    }
}

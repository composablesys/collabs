import { CrdtRuntime } from "../src/crdts";
import {CausalTimestamp, CausalBroadcastNetwork} from "../src/network";

class TestingNetwork implements CausalBroadcastNetwork {
    crdtRuntime!: CrdtRuntime;
    vectorClock = new Map<any, number>();
    constructor(private generator : TestingNetworkGenerator,
            private replicaId : string) {
        this.vectorClock.set(replicaId, 0);
    }
    joinGroup(group: string): void {
        // Ignored
    }
    send(group: string, message: Uint8Array, timestamp: CausalTimestamp): void {
        this.vectorClock.set(this.replicaId, this.vectorClock.get(
            this.replicaId) as number + 1
        );
        // Version for remote replicas
        timestamp = {
            getSender: timestamp.getSender,
            getSenderCounter: timestamp.getSenderCounter,
            asVectorClock: timestamp.asVectorClock,
            isLocal() { return false; }
        }
        let queueMap = this.generator.messageQueues.get(this)!;
        for (let queue of queueMap.values()) {
            queue.push([group, message, timestamp]);
        }
    }
    register(crdtRuntime: CrdtRuntime): void {
        this.crdtRuntime = crdtRuntime;
    }
    getReplicaId() {
        return this.replicaId;
    }
    getNextTimestamp(_group: string) {
        let vcCopy = new Map(this.vectorClock);
        vcCopy.set(this.replicaId, this.vectorClock.get(
            this.replicaId) as number + 1
        );
        let myReplicaId = this.replicaId;
        let timestamp = {
            getSender() { return myReplicaId; },
            getSenderCounter() { return vcCopy.get(this.getSender()) as number;},
            asVectorClock() { return vcCopy; },
            isLocal() { return true; }
        }
        return timestamp;
    }
}

/**
 * Creates a collection of CrdtRuntimes linked together
 * (i.e., in-memory networking) that deliver messages
 * when release is called.
 */
export class TestingNetworkGenerator {
    newRuntime(replicaId?: string) {
        if (replicaId === undefined) replicaId = this.messageQueues.size + "";
        let network = new TestingNetwork(this, replicaId);
        let newQueue = new Map<TestingNetwork, Array<any>>();
        for (let oldEntry of this.messageQueues.entries()) {
            newQueue.set(oldEntry[0], []);
            oldEntry[1].set(network, []);
        }
        this.messageQueues.set(network, newQueue);
        return new CrdtRuntime(network);
    }
    // Maps sender and recipient to an array of queued [message,
    // crdtId, timestamp] tuples.
    messageQueues = new Map<TestingNetwork,
        Map<TestingNetwork, Array<[string, Uint8Array, CausalTimestamp]>>>();
    /**
     * Release all queued messages sender to the specified recipients.
     * If recipients are not specified, releases them to all
     * recipients.  Only recipients that existed at the time
     * of sending will receive a message.
     */
    release(sender: TestingNetwork, ...recipients: TestingNetwork[]) {
        if (recipients.length === 0) recipients = [...this.messageQueues.keys()];
        let senderMap = this.messageQueues.get(sender)!;
        for (let recipient of recipients) {
            if (recipient === sender) continue;
            for (let message of senderMap.get(recipient)!) {
                recipient.crdtRuntime.receive(...message);
                recipient.vectorClock.set(sender.getReplicaId(), message[2].getSenderCounter());
            }
            senderMap.set(recipient, []);
        }
    }
    releaseAll() {
        for (let sender of this.messageQueues.keys()) this.release(sender);
    }
}

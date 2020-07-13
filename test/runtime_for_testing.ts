import {CrdtRuntime, CrdtMessageListener, CausalTimestamp} from "../src/crdt_runtime_interface";

class TestingInOrderRuntime implements CrdtRuntime {
    listenersById = new Map<any, CrdtMessageListener>();
    constructor(private generator : TestingInOrderRuntimeGenerator,
        private replicaId : number) { }
    send(message: any, crdtId: any): void {
        for (let runtime of this.generator.runtimesByReplicaId.values()) {
            if (runtime !== this) {
                let listener = runtime.listenersById.get(crdtId);
                if (listener === undefined) {
                    throw new Error("No Crdt with id " + crdtId +
                        " on replica " + runtime.getReplicaId());
                }
                let myReplicaId = this.replicaId;
                listener.receive(message, {getSender() { return myReplicaId;}} as CausalTimestamp);
            }
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
}

/**
 * Creates a collection of CrdtRuntimes linked together
 * (i.e., in-memory networking) that deliver messages
 * immediately in order, for testing.  TODO: timestamps.
 */
export class TestingInOrderRuntimeGenerator {
    runtimesByReplicaId = new Map<number, TestingInOrderRuntime>();
    newRuntime() : CrdtRuntime {
        let runtime = new TestingInOrderRuntime(this,
            this.runtimesByReplicaId.size);
        this.runtimesByReplicaId.set(this.runtimesByReplicaId.size, runtime);
        return runtime;
    }
}

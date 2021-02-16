import { CrdtSuite } from "../../crdt_suite";
import { crdts, network } from "compoventuals-client";

// Crdt with no-op ops that send an empty message.
class BaselineCrdt extends crdts.Crdt<null> {
  constructor(parentOrRuntime: crdts.Crdt | crdts.CrdtRuntime, id: string) {
    super(parentOrRuntime, id, null);
  }
  noop() {
    //console.log("Sending op, me=" + this.runtime.getReplicaId());
    this.send(new Uint8Array());
  }
  receiveInternal(
    _timestamp: network.CausalTimestamp,
    _message: Uint8Array
  ): boolean {
    //console.log("Received op, sender=" + timestamp.getSender());
    return false;
  }
}

new CrdtSuite<BaselineCrdt>("crdts/Baseline").runTest(
  "",
  (parentOrRuntime) => new BaselineCrdt(parentOrRuntime, "BaselineId"),
  { MessageWeight: [(crdt) => crdt.noop(), 1] }
);

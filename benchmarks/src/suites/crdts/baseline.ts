import { CrdtSuite } from "../../crdt_suite";
import { crdts } from "compoventuals-client";

new CrdtSuite<crdts.NoopCrdt>("crdts/Baseline").addTest(
  "",
  () => new crdts.NoopCrdt(),
  { Noop: [(crdt) => crdt.noop(), 1] }
);

import { CrdtSuite } from "../../crdt_suite";
import { crdts } from "compoventuals-client";

const counters = { Counter: crdts.Counter, CounterPure: crdts.CounterPure };
for (let entry of Object.entries(counters)) {
  const counterSuite = new CrdtSuite<crdts.CounterBase & crdts.Resettable>(
    `crdts/${entry[0]}`
  );
  counterSuite.runTest(
    "add",
    (parentOrRuntime) => new entry[1](parentOrRuntime, "CounterId"),
    { Add: [(crdt, rng) => crdt.add(rng() * 100 - 50), 1] }
  );
  counterSuite.runTest(
    "resetHalf",
    (parentOrRuntime) => new entry[1](parentOrRuntime, "CounterId"),
    {
      Add: [(crdt, rng) => crdt.add(rng() * 100 - 50), 0.5],
      Reset: [(crdt) => crdt.reset(), 0.5],
    }
  );
  counterSuite.runTest(
    "resetOnePercent",
    (parentOrRuntime) => new entry[1](parentOrRuntime, "CounterId"),
    {
      Add: [(crdt, rng) => crdt.add(rng() * 100 - 50), 0.99],
      Reset: [(crdt) => crdt.reset(), 0.01],
    }
  );
}

const multRegisterSuite = new CrdtSuite<crdts.MultRegister>(
  "crdts/MultRegister"
);
multRegisterSuite.runTest(
  "mult",
  (parentOrRuntime) => new crdts.MultRegister(parentOrRuntime, "CounterId"),
  { Add: [(crdt, rng) => crdt.mult(rng() * 4 - 2), 1] }
);
multRegisterSuite.runTest(
  "resetHalf",
  (parentOrRuntime) => new crdts.MultRegister(parentOrRuntime, "CounterId"),
  {
    Add: [(crdt, rng) => crdt.mult(rng() * 4 - 2), 0.5],
    Reset: [(crdt) => crdt.reset(), 0.5],
  }
);
multRegisterSuite.runTest(
  "resetOnePercent",
  (parentOrRuntime) => new crdts.MultRegister(parentOrRuntime, "CounterId"),
  {
    Add: [(crdt, rng) => crdt.mult(rng() * 4 - 2), 0.99],
    Reset: [(crdt) => crdt.reset(), 0.01],
  }
);

// TODO: resets for remaining data types.
// TODO: try out serializers for different entry/value types

const gSetSuite = new CrdtSuite<crdts.GSet<number>>("crdts/GSet");
gSetSuite.runTest(
  "add",
  (parentOrRuntime) => new crdts.GSet(parentOrRuntime, "GSetId"),
  { Add: [(crdt, rng) => crdt.add(rng()), 1] }
);

const mvrSuite = new CrdtSuite<crdts.MultiValueRegister<number>>(
  "crdts/MultiValueRegister"
);
mvrSuite.runTest(
  "set",
  (parentOrRuntime) =>
    new crdts.MultiValueRegister(parentOrRuntime, "MultiValueRegisterId", 0),
  { Set: [(crdt, rng) => (crdt.value = rng), 1] }
);

const lwwSuite = new CrdtSuite<crdts.LwwRegister<number>>("crdts/LwwRegister");
lwwSuite.runTest(
  "set",
  (parentOrRuntime) =>
    new crdts.LwwRegister(parentOrRuntime, "LwwRegisterId", 0),
  { Set: [(crdt, rng) => (crdt.value = rng), 1] }
);

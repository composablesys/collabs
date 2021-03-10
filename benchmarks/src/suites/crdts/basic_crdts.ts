import { CrdtSuite } from "../../crdt_suite";
import { crdts } from "compoventuals-client";

const counters = { Counter: crdts.Counter, CounterPure: crdts.CounterPure };
for (let entry of Object.entries(counters)) {
  const counterSuite = new CrdtSuite<crdts.CounterBase & crdts.Resettable>(
    `crdts/${entry[0]}`
  );
  counterSuite.addTest(
    "add",
    (parentOrRuntime) => new entry[1](parentOrRuntime, "CounterId"),
    { Add: [(crdt, rng) => crdt.add(rng() * 100 - 50), 1] }
  );
  /*counterSuite.addTest(
    "resetHalf",
    (parentOrRuntime) => new entry[1](parentOrRuntime, "CounterId"),
    {
      Add: [(crdt, rng) => crdt.add(rng() * 100 - 50), 0.5],
      Reset: [(crdt) => crdt.reset(), 0.5],
    }
  );*/
  counterSuite.addTest(
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
multRegisterSuite.addTest(
  "mult",
  (parentOrRuntime) => new crdts.MultRegister(parentOrRuntime, "CounterId"),
  { Add: [(crdt, rng) => crdt.mult(rng() * 4 - 2), 1] }
);
/*multRegisterSuite.addTest(
  "resetHalf",
  (parentOrRuntime) => new crdts.MultRegister(parentOrRuntime, "CounterId"),
  {
    Add: [(crdt, rng) => crdt.mult(rng() * 4 - 2), 0.5],
    Reset: [(crdt) => crdt.reset(), 0.5],
  }
);*/
multRegisterSuite.addTest(
  "resetOnePercent",
  (parentOrRuntime) => new crdts.MultRegister(parentOrRuntime, "CounterId"),
  {
    Mult: [(crdt, rng) => crdt.mult(rng() * 4 - 2), 0.99],
    Reset: [(crdt) => crdt.reset(), 0.01],
  }
);

// TODO: resets for remaining data types.
// TODO: try out serializers for different entry/value types

const gSetSuite = new CrdtSuite<crdts.GSet<number>>("crdts/GSet");
gSetSuite.addTest(
  "add",
  (parentOrRuntime) => new crdts.GSet(parentOrRuntime, "GSetId"),
  { Add: [(crdt, rng) => crdt.add(rng()), 1] }
);

const mvrSuite = new CrdtSuite<crdts.MultiValueRegister<number>>(
  "crdts/MultiValueRegister"
);
mvrSuite.addTest(
  "set",
  (parentOrRuntime) =>
    new crdts.MultiValueRegister(parentOrRuntime, "MultiValueRegisterId", 0),
  { Set: [(crdt, rng) => (crdt.value = rng), 1] }
);

const lwwSuite = new CrdtSuite<crdts.LwwRegister<number>>("crdts/LwwRegister");
lwwSuite.addTest(
  "set",
  (parentOrRuntime) =>
    new crdts.LwwRegister(parentOrRuntime, "LwwRegisterId", 0),
  { Set: [(crdt, rng) => (crdt.value = rng), 1] }
);

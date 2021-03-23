import { CrdtSuite } from "../../crdt_suite";
import { crdts } from "compoventuals-client";

const counters = { Counter: crdts.Counter, CounterPure: crdts.CounterPure };
for (let entry of Object.entries(counters)) {
  const counterSuite = new CrdtSuite<crdts.ICounter & crdts.Resettable>(
    `crdts/${entry[0]}`
  );
  counterSuite.addTest("add", () => new entry[1](), {
    Add: [(crdt, rng) => crdt.add(rng() * 100 - 50), 1],
  });
  /*counterSuite.addTest(
    "resetHalf",
    () => new entry[1](, "CounterId"),
    {
      Add: [(crdt, rng) => crdt.add(rng() * 100 - 50), 0.5],
      Reset: [(crdt) => crdt.reset(), 0.5],
    }
  );*/
  counterSuite.addTest("resetOnePercent", () => new entry[1](), {
    Add: [(crdt, rng) => crdt.add(rng() * 100 - 50), 0.99],
    Reset: [(crdt) => crdt.reset(), 0.01],
  });
}

const multRegisterSuite = new CrdtSuite<crdts.MultRegister>(
  "crdts/MultRegister"
);
multRegisterSuite.addTest("mult", () => new crdts.MultRegister(), {
  Add: [(crdt, rng) => crdt.mult(rng() * 4 - 2), 1],
});
/*multRegisterSuite.addTest(
  "resetHalf",
  () => new crdts.MultRegister(, "CounterId"),
  {
    Add: [(crdt, rng) => crdt.mult(rng() * 4 - 2), 0.5],
    Reset: [(crdt) => crdt.reset(), 0.5],
  }
);*/
multRegisterSuite.addTest("resetOnePercent", () => new crdts.MultRegister(), {
  Mult: [(crdt, rng) => crdt.mult(rng() * 4 - 2), 0.99],
  Reset: [(crdt) => crdt.reset(), 0.01],
});

// TODO: resets for remaining data types.
// TODO: try out serializers for different entry/value types

const gSetSuite = new CrdtSuite<crdts.GSet<number>>("crdts/GSet");
gSetSuite.addTest("add", () => new crdts.GSet(), {
  Add: [(crdt, rng) => crdt.add(rng()), 1],
});

const mvrSuite = new CrdtSuite<crdts.MultiValueRegister<number>>(
  "crdts/MultiValueRegister"
);
mvrSuite.addTest("set", () => new crdts.MultiValueRegister(), {
  Set: [(crdt, rng) => (crdt.value = rng()), 1],
});

const lwwSuite = new CrdtSuite<crdts.LwwRegister<number>>("crdts/LwwRegister");
lwwSuite.addTest("set", () => new crdts.LwwRegister(0), {
  Set: [(crdt, rng) => (crdt.value = rng()), 1],
});

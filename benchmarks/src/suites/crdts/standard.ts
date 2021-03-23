import { CrdtSuite } from "../../crdt_suite";
import { crdts } from "compoventuals-client";

const numberSuite = new CrdtSuite<crdts.NumberCrdt>("crdts/NumberCrdt");
numberSuite.addTest("add", () => new crdts.NumberCrdt(), {
  Add: [(crdt, rng) => crdt.add(rng()), 1],
});
numberSuite.addTest("mult", () => new crdts.NumberCrdt(1), {
  Mult: [(crdt, rng) => crdt.mult(4 * rng() - 2), 1],
});
numberSuite.addTest("50_50", () => new crdts.NumberCrdt(1), {
  Add: [(crdt, rng) => crdt.add(rng()), 0.5],
  Mult: [(crdt, rng) => crdt.mult(4 * rng() - 2), 0.5],
});

let flags = {
  EnableWinsFlag: crdts.EnableWinsFlag,
  DisableWinsFlag: crdts.DisableWinsFlag,
};
for (let entry of Object.entries(flags)) {
  const flagSuite = new CrdtSuite<crdts.EnableWinsFlag | crdts.DisableWinsFlag>(
    `crdts/${entry[0]}`
  );
  flagSuite.addTest("enable", () => new entry[1](), {
    Enable: [(crdt) => crdt.enable(), 1],
  });
  flagSuite.addTest("disable", () => new entry[1](), {
    Disable: [(crdt) => crdt.disable(), 1],
  });
  flagSuite.addTest("50_50", () => new entry[1](), {
    Enable: [(crdt) => crdt.enable(), 0.5],
    Disable: [(crdt) => crdt.disable(), 0.5],
  });
}

// TODO: rename data to LazyMap
// TODO: once GC is implemented, need to disable it for this benchmark
const gMapSuite = new CrdtSuite<crdts.LazyMap<number, crdts.NoopCrdt>>(
  "crdts/GMapCrdt"
);
gMapSuite.addTest(
  "addKey",
  () => new crdts.LazyMap(() => new crdts.NoopCrdt()),
  { AddKey: [(crdt, rng) => crdt.get(Math.floor(rng() * 100)).noop(), 1] }
);
gMapSuite.addTest(
  "valueOp",
  () => new crdts.LazyMap(() => new crdts.NoopCrdt()),
  { ValueOp: [(crdt) => crdt.get(0).noop(), 1] }
);

const mapSuite = new CrdtSuite<crdts.MapCrdt<number, crdts.NoopCrdt>>(
  "crdts/MapCrdt"
);
mapSuite.addTest(
  "addKey",
  () => new crdts.MapCrdt(() => new crdts.NoopCrdt()),
  { AddKey: [(crdt, rng) => crdt.addKey(Math.floor(rng() * 100)), 1] }
);
mapSuite.addTest(
  "valueOp",
  () => new crdts.MapCrdt(() => new crdts.NoopCrdt()),
  { ValueOp: [(crdt) => crdt.getForce(0).noop(), 1] }
);
mapSuite.addTest(
  "addDelete",
  () => new crdts.MapCrdt(() => new crdts.NoopCrdt()),
  {
    AddKey: [(crdt, rng) => crdt.addKey(Math.floor(rng() * 100)), 0.5],
    DeleteKey: [(crdt, rng) => crdt.delete(Math.floor(rng() * 100)), 0.5],
  }
);
mapSuite.addTest(
  "opDelete",
  () => new crdts.MapCrdt(() => new crdts.NoopCrdt()),
  {
    ValueOp: [(crdt, rng) => crdt.getForce(Math.floor(rng() * 5)).noop(), 0.5],
    DeleteKey: [(crdt, rng) => crdt.delete(Math.floor(rng() * 5)), 0.5],
  }
);
// TODO: test that demonstrates GC of removed keys.  Same for sets.

const setSuite = new CrdtSuite<crdts.AddWinsSet<number>>("crdts/AddWinsSet");
setSuite.addTest("add", () => new crdts.AddWinsSet(), {
  Add: [(crdt, rng) => crdt.add(Math.floor(rng() * 100)), 1],
});
setSuite.addTest("50_50", () => new crdts.AddWinsSet(), {
  Add: [(crdt, rng) => crdt.add(Math.floor(rng() * 100)), 0.5],
  Delete: [(crdt, rng) => crdt.delete(Math.floor(rng() * 100)), 0.5],
});

// TODO: RuntimeCrdtGenerator

const lwwMapSuite = new CrdtSuite<crdts.LwwMap<number, number>>("crdts/LwwMap");
lwwMapSuite.addTest("set", () => new crdts.LwwMap(), {
  Set: [(crdt, rng) => crdt.set(Math.floor(rng() * 100), rng()), 1],
});
lwwMapSuite.addTest("setDelete", () => new crdts.LwwMap(), {
  Set: [(crdt, rng) => crdt.set(Math.floor(rng() * 100), rng()), 0.5],
  DeleteKey: [(crdt, rng) => crdt.delete(Math.floor(rng() * 100)), 0.5],
});

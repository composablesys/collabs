import { CrdtSuite } from "../../crdt_suite";
import { crdts } from "compoventuals-client";
import { BaselineCrdt } from "./baseline";

const numberSuite = new CrdtSuite<crdts.NumberCrdt>("crdts/NumberCrdt");
numberSuite.addTest(
  "add",
  (parentOrRuntime) => new crdts.NumberCrdt(parentOrRuntime, "NumberId"),
  { Add: [(crdt, rng) => crdt.add(rng()), 1] }
);
numberSuite.addTest(
  "mult",
  (parentOrRuntime) => new crdts.NumberCrdt(parentOrRuntime, "NumberId", 1),
  { Mult: [(crdt, rng) => crdt.mult(4 * rng() - 2), 1] }
);
numberSuite.addTest(
  "50_50",
  (parentOrRuntime) => new crdts.NumberCrdt(parentOrRuntime, "NumberId", 1),
  {
    Add: [(crdt, rng) => crdt.add(rng()), 0.5],
    Mult: [(crdt, rng) => crdt.mult(4 * rng() - 2), 0.5],
  }
);

let flags = {
  EnableWinsFlag: crdts.EnableWinsFlag,
  DisableWinsFlag: crdts.DisableWinsFlag,
};
for (let entry of Object.entries(flags)) {
  const flagSuite = new CrdtSuite<crdts.EnableWinsFlag | crdts.DisableWinsFlag>(
    `crdts/${entry[0]}`
  );
  flagSuite.addTest(
    "enable",
    (parentOrRuntime) => new entry[1](parentOrRuntime, "FlagId"),
    { Enable: [(crdt) => crdt.enable(), 1] }
  );
  flagSuite.addTest(
    "disable",
    (parentOrRuntime) => new entry[1](parentOrRuntime, "FlagId"),
    { Disable: [(crdt) => crdt.disable(), 1] }
  );
  flagSuite.addTest(
    "50_50",
    (parentOrRuntime) => new entry[1](parentOrRuntime, "FlagId"),
    {
      Enable: [(crdt) => crdt.enable(), 0.5],
      Disable: [(crdt) => crdt.disable(), 0.5],
    }
  );
}

const gMapSuite = new CrdtSuite<crdts.GMapCrdt<number, BaselineCrdt>>(
  "crdts/GMapCrdt"
);
gMapSuite.addTest(
  "addKey",
  (parentOrRuntime) =>
    new crdts.GMapCrdt(
      parentOrRuntime,
      "GMapId",
      (parent, id) => new BaselineCrdt(parent, id)
    ),
  { AddKey: [(crdt, rng) => crdt.addKey(Math.floor(rng() * 100)), 1] }
);
gMapSuite.addTest(
  "valueOp",
  (parentOrRuntime) =>
    new crdts.GMapCrdt(
      parentOrRuntime,
      "GMapId",
      (parent, id) => new BaselineCrdt(parent, id)
    ),
  { ValueOp: [(crdt) => crdt.getForce(0).noop(), 1] }
);

const mapSuite = new CrdtSuite<crdts.MapCrdt<number, BaselineCrdt>>(
  "crdts/MapCrdt"
);
mapSuite.addTest(
  "addKey",
  (parentOrRuntime) =>
    new crdts.MapCrdt(
      parentOrRuntime,
      "MapId",
      (parent, id) => new BaselineCrdt(parent, id)
    ),
  { AddKey: [(crdt, rng) => crdt.addKey(Math.floor(rng() * 100)), 1] }
);
mapSuite.addTest(
  "valueOp",
  (parentOrRuntime) =>
    new crdts.MapCrdt(
      parentOrRuntime,
      "MapId",
      (parent, id) => new BaselineCrdt(parent, id)
    ),
  { ValueOp: [(crdt) => crdt.getForce(0).noop(), 1] }
);
mapSuite.addTest(
  "addDelete",
  (parentOrRuntime) =>
    new crdts.MapCrdt(
      parentOrRuntime,
      "MapId",
      (parent, id) => new BaselineCrdt(parent, id)
    ),
  {
    AddKey: [(crdt, rng) => crdt.addKey(Math.floor(rng() * 100)), 0.5],
    DeleteKey: [(crdt, rng) => crdt.delete(Math.floor(rng() * 100)), 0.5],
  }
);
mapSuite.addTest(
  "opDelete",
  (parentOrRuntime) =>
    new crdts.MapCrdt(
      parentOrRuntime,
      "MapId",
      (parent, id) => new BaselineCrdt(parent, id)
    ),
  {
    ValueOp: [(crdt, rng) => crdt.getForce(Math.floor(rng() * 5)).noop(), 0.5],
    DeleteKey: [(crdt, rng) => crdt.delete(Math.floor(rng() * 5)), 0.5],
  }
);
// TODO: test that demonstrates GC of removed keys.  Same for sets.

const setSuite = new CrdtSuite<crdts.AddWinsSet<number>>("crdts/AddWinsSet");
setSuite.addTest(
  "add",
  (parentOrRuntime) => new crdts.AddWinsSet(parentOrRuntime, "AddWinsSetId"),
  { Add: [(crdt, rng) => crdt.add(Math.floor(rng() * 100)), 1] }
);
setSuite.addTest(
  "50_50",
  (parentOrRuntime) => new crdts.AddWinsSet(parentOrRuntime, "AddWinsSetId"),
  {
    Add: [(crdt, rng) => crdt.add(Math.floor(rng() * 100)), 0.5],
    Delete: [(crdt, rng) => crdt.delete(Math.floor(rng() * 100)), 0.5],
  }
);

// TODO: RuntimeCrdtGenerator

const lwwMapSuite = new CrdtSuite<crdts.LwwMap<number, number>>("crdts/LwwMap");
lwwMapSuite.addTest(
  "set",
  (parentOrRuntime) => new crdts.LwwMap(parentOrRuntime, "MapId"),
  { Set: [(crdt, rng) => crdt.set(Math.floor(rng() * 100), rng()), 1] }
);
lwwMapSuite.addTest(
  "setDelete",
  (parentOrRuntime) => new crdts.LwwMap(parentOrRuntime, "MapId"),
  {
    Set: [(crdt, rng) => crdt.set(Math.floor(rng() * 100), rng()), 0.5],
    DeleteKey: [(crdt, rng) => crdt.delete(Math.floor(rng() * 100)), 0.5],
  }
);

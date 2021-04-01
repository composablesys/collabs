import { CrdtSuite } from "../../crdt_suite";
import { crdts } from "compoventuals-client";

const lists = { TreedocList: crdts.TreedocList };

for (let entry of Object.entries(lists)) {
  const listSuite = new CrdtSuite<crdts.List<any, crdts.LwwRegister<string>>>(
    `crdts/${entry[0]}`
  );
  listSuite.addTest(
    "type-LtR",
    () => new entry[1](() => new crdts.LwwRegister("")),
    {
      Type: [(crdt) => (crdt.insertAt(crdt.length)[1].value = "a"), 1],
    }
  );
  listSuite.addTest(
    "type-random",
    () => new entry[1](() => new crdts.LwwRegister("")),
    {
      Type: [
        (crdt, rng) =>
          (crdt.insertAt(Math.floor(rng() * (crdt.length + 1)))[1].value = "a"),
        1,
      ],
    }
  );
}

import { InitToken } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CValueMap } from "../../src";
import { EventView } from "../event_view";
import { Source, Traces } from "../traces";
import { IMapView } from "./views";

class ValueMapSource
  implements Source<CValueMap<string, string>, Record<string, string[]>>
{
  constructor(readonly rng: seedrandom.prng, readonly mode: "set" | "delete") {}

  pre(init: InitToken) {
    const map = new CValueMap<string, string>(init);
    new IMapView(map, false);
    return map;
  }
  check(
    actual: CValueMap<string, string>,
    expected: Record<string, string[]>
  ): void {
    assert.deepStrictEqual(
      new Set(actual.keys()),
      new Set(Object.keys(expected))
    );
    for (const key of actual.keys()) {
      assert.deepStrictEqual(actual.get(key), expected[key][0]);
      assert.deepStrictEqual(actual.getConflicts(key), expected[key]);
    }
    EventView.check(actual);
  }
  op(c: CValueMap<string, string>, n: number): void {
    switch (this.mode) {
      case "set":
        // "all" gets set every time; "keyN" gets set separately by each
        // operation.
        c.set("all", `op${n}`);
        c.set(`key${n}`, `value${n}`);
        break;
      case "delete":
        // "all" switches between set and delete ops; "keyN" gets set in
        // operation n and deleted in operation n + 2.
        if (n % 2 === 0) c.set("all", `op${n}`);
        else c.delete("all");
        c.set(`key${n}`, `value${n}`);
        c.delete(`key${n - 2}`);
        break;
    }
  }
}

describe("CValueMap", () => {
  let rng!: seedrandom.prng;
  let source!: ValueMapSource;

  beforeEach(() => {
    rng = seedrandom("42");
  });

  describe("set", () => {
    beforeEach(() => {
      source = new ValueMapSource(rng, "set");
    });

    it("initial", () => {
      Traces.initial(source, {});
    });

    it("singleOp", () => {
      Traces.singleOp(source, { all: ["op0"], key0: ["value0"] });
    });

    it("sequential", () => {
      Traces.sequential(
        source,
        { all: ["op0"], key0: ["value0"] },
        { all: ["op1"], key0: ["value0"], key1: ["value1"] },
        { all: ["op2"], key0: ["value0"], key1: ["value1"], key2: ["value2"] },
        {
          all: ["op3"],
          key0: ["value0"],
          key1: ["value1"],
          key2: ["value2"],
          key3: ["value3"],
        }
      );
    });

    it("concurrent", () => {
      Traces.concurrent(
        source,
        { all: ["op0"], key0: ["value0"] },
        { all: ["op1"], key1: ["value1"] },
        // op 0 is done by the lower replicaID, which wins the conflict.
        { all: ["op0", "op1"], key0: ["value0"], key1: ["value1"] }
      );
    });

    it("diamond", () => {
      Traces.diamond(
        source,
        { all: ["op0"], key0: ["value0"] },
        { all: ["op1"], key0: ["value0"], key1: ["value1"] },
        { all: ["op2"], key0: ["value0"], key2: ["value2"] },
        // op 1 is done by the lower replicaID, which wins the conflict.
        {
          all: ["op1", "op2"],
          key0: ["value0"],
          key1: ["value1"],
          key2: ["value2"],
        },
        {
          all: ["op3"],
          key0: ["value0"],
          key1: ["value1"],
          key2: ["value2"],
          key3: ["value3"],
        }
      );
    });

    it("partition", () => {
      Traces.partition(
        source,
        {
          all: ["op3"],
          key0: ["value0"],
          key1: ["value1"],
          key2: ["value2"],
          key3: ["value3"],
        },
        {
          all: ["op7"],
          key4: ["value4"],
          key5: ["value5"],
          key6: ["value6"],
          key7: ["value7"],
        },
        // op 3 is done by the lower replicaID, which wins the conflict.
        {
          all: ["op3", "op7"],
          key0: ["value0"],
          key1: ["value1"],
          key2: ["value2"],
          key3: ["value3"],
          key4: ["value4"],
          key5: ["value5"],
          key6: ["value6"],
          key7: ["value7"],
        }
      );
    });
  });

  describe("delete", () => {
    beforeEach(() => {
      source = new ValueMapSource(rng, "delete");
    });

    it("initial", () => {
      Traces.initial(source, {});
    });

    it("singleOp", () => {
      Traces.singleOp(source, { all: ["op0"], key0: ["value0"] });
    });

    it("sequential", () => {
      Traces.sequential(
        source,
        { all: ["op0"], key0: ["value0"] },
        { key0: ["value0"], key1: ["value1"] },
        { all: ["op2"], key1: ["value1"], key2: ["value2"] },
        {
          key2: ["value2"],
          key3: ["value3"],
        }
      );
    });

    it("concurrent", () => {
      Traces.concurrent(
        source,
        { all: ["op0"], key0: ["value0"] },
        { key1: ["value1"] },
        // set wins over concurrent delete.
        { all: ["op0"], key0: ["value0"], key1: ["value1"] }
      );
    });

    it("diamond", () => {
      Traces.diamond(
        source,
        { all: ["op0"], key0: ["value0"] },
        { key0: ["value0"], key1: ["value1"] },
        { all: ["op2"], key2: ["value2"] },
        // set wins over concurrent delete.
        {
          all: ["op2"],
          key1: ["value1"],
          key2: ["value2"],
        },
        {
          key2: ["value2"],
          key3: ["value3"],
        }
      );
    });

    it("partition", () => {
      Traces.partition(
        source,
        {
          key2: ["value2"],
          key3: ["value3"],
        },
        {
          key6: ["value6"],
          key7: ["value7"],
        },
        {
          key2: ["value2"],
          key3: ["value3"],
          key6: ["value6"],
          key7: ["value7"],
        }
      );
    });
  });
});

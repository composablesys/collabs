import { InitToken } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CValueSet } from "../../src";
import { EventView } from "../event_view";
import { Source, Traces } from "../traces";
import { ISetView } from "./views";

class ValueSetSource implements Source<CValueSet<string>, string[]> {
  constructor(readonly rng: seedrandom.prng, readonly mode: "add" | "delete") {}

  pre(init: InitToken) {
    const set = new CValueSet<string>(init);
    new ISetView(set, false);
    return set;
  }
  check(actual: CValueSet<string>, expected: string[]): void {
    assert.deepStrictEqual(new Set(actual.values()), new Set(expected));
    for (const value of expected) {
      assert(actual.has(value));
    }
    assert.isFalse(actual.has("not present"));
    EventView.check(actual);
  }
  op(c: CValueSet<string>, n: number): void {
    switch (this.mode) {
      case "add":
        // "all" gets added every time; "valueN" gets added separately by each
        // operation.
        c.add("all");
        c.add(`value${n}`);
        break;
      case "delete":
        // "all" switches between add and delete ops; "valueN" gets added in
        // operation n and deleted in operation n + 2.
        if (n % 2 === 0) c.add("all");
        else c.delete("all");
        c.add(`value${n}`);
        c.delete(`value${n - 2}`);
        break;
    }
  }
}

describe("CValueSet", () => {
  let rng!: seedrandom.prng;
  let source!: ValueSetSource;

  beforeEach(() => {
    rng = seedrandom("42");
  });

  describe("add", () => {
    beforeEach(() => {
      source = new ValueSetSource(rng, "add");
    });

    it("initial", () => {
      Traces.initial(source, []);
    });

    it("singleOp", () => {
      Traces.singleOp(source, ["all", "value0"]);
    });

    it("sequential", () => {
      Traces.sequential(
        source,
        ["all", "value0"],
        ["all", "value0", "value1"],
        ["all", "value0", "value1", "value2"],
        ["all", "value0", "value1", "value2", "value3"]
      );
    });

    it("concurrent", () => {
      Traces.concurrent(
        source,
        ["all", "value0"],
        ["all", "value1"],
        ["all", "value0", "value1"]
      );
    });

    it("diamond", () => {
      Traces.diamond(
        source,
        ["all", "value0"],
        ["all", "value0", "value1"],
        ["all", "value0", "value2"],
        ["all", "value0", "value1", "value2"],
        ["all", "value0", "value1", "value2", "value3"]
      );
    });

    it("partition", () => {
      Traces.partition(
        source,
        ["all", "value0", "value1", "value2", "value3"],
        ["all", "value4", "value5", "value6", "value7"],
        [
          "all",
          "value0",
          "value1",
          "value2",
          "value3",
          "value4",
          "value5",
          "value6",
          "value7",
        ]
      );
    });
  });

  describe("delete", () => {
    beforeEach(() => {
      source = new ValueSetSource(rng, "delete");
    });

    it("initial", () => {
      Traces.initial(source, []);
    });

    it("singleOp", () => {
      Traces.singleOp(source, ["all", "value0"]);
    });

    it("sequential", () => {
      Traces.sequential(
        source,
        ["all", "value0"],
        ["value0", "value1"],
        ["all", "value1", "value2"],
        ["value2", "value3"]
      );
    });

    it("concurrent", () => {
      Traces.concurrent(
        source,
        ["all", "value0"],
        ["value1"],
        // add wins over concurrent delete.
        ["all", "value0", "value1"]
      );
    });

    it("diamond", () => {
      Traces.diamond(
        source,
        ["all", "value0"],
        ["value0", "value1"],
        ["all", "value2"],
        // add wins over concurrent delete.
        ["all", "value1", "value2"],
        ["value2", "value3"]
      );
    });

    it("partition", () => {
      Traces.partition(
        source,
        ["value2", "value3"],
        ["value6", "value7"],
        ["value2", "value3", "value6", "value7"]
      );
    });
  });
});

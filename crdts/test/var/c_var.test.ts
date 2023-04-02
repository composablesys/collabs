import { InitToken } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CVar } from "../../src";
import { EventView } from "../event_view";
import { Source, Traces } from "../traces";
import { IVarView } from "./views";

class VarSource implements Source<CVar<string>, [string, string[]]> {
  constructor(readonly rng: seedrandom.prng) {}

  pre(init: InitToken) {
    const cvar = new CVar(init, "initial");
    new IVarView(cvar, false);
    return cvar;
  }
  check(actual: CVar<string>, expected: [string, string[]]): void {
    assert.deepStrictEqual(actual.value, expected[0]);
    assert.deepStrictEqual(actual.conflicts(), expected[1]);
    EventView.check(actual);
  }
  op(c: CVar<string>, n: number): void {
    c.value = `op${n}`;
  }
}

describe("CVar", () => {
  let rng!: seedrandom.prng;
  let source!: VarSource;

  beforeEach(() => {
    rng = seedrandom("42");
    source = new VarSource(rng);
  });

  it("initial", () => {
    Traces.initial(source, ["initial", []]);
  });

  it("singleOp", () => {
    Traces.singleOp(source, ["op0", ["op0"]]);
  });

  it("sequential", () => {
    Traces.sequential(
      source,
      ["op0", ["op0"]],
      ["op1", ["op1"]],
      ["op2", ["op2"]],
      ["op3", ["op3"]]
    );
  });

  it("concurrent", () => {
    Traces.concurrent(
      source,
      ["op0", ["op0"]],
      ["op1", ["op1"]],
      // op 0 is done by the lower replicaID, which wins the conflict.
      ["op0", ["op0", "op1"]]
    );
  });

  it("diamond", () => {
    Traces.diamond(
      source,
      ["op0", ["op0"]],
      ["op1", ["op1"]],
      ["op2", ["op2"]],
      // op 1 is done by the lower replicaID, which wins the conflict.
      ["op1", ["op1", "op2"]],
      ["op3", ["op3"]]
    );
  });

  it("partition", () => {
    Traces.partition(
      source,
      ["op3", ["op3"]],
      ["op7", ["op7"]],
      // op 3 is done by the lower replicaID, which wins the conflict.
      ["op3", ["op3", "op7"]]
    );
  });
});

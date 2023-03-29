import { InitToken } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CBoolean } from "../../src";
import { Source, Traces } from "../traces";

class BooleanSource implements Source<CBoolean, [boolean, boolean[]]> {
  constructor(
    readonly rng: seedrandom.prng,
    readonly options?: { winner?: boolean; initialValue?: boolean }
  ) {}

  pre(init: InitToken) {
    return new CBoolean(init, this.options);
  }
  check(actual: CBoolean, expected: [boolean, boolean[]]): void {
    assert.deepStrictEqual(actual.value, expected[0]);
    assert.deepStrictEqual(actual.conflicts(), expected[1]);
  }
  /** 1, 4, 7, ... set to false; others set to true. */
  op(c: CBoolean, n: number): void {
    c.value = n % 3 !== 1;
  }
}

describe("CBoolean", () => {
  let rng!: seedrandom.prng;
  let source!: BooleanSource;

  beforeEach(() => {
    rng = seedrandom("42");
  });

  for (const winner of [true, false]) {
    for (const initialValue of [false, true]) {
      describe(`winner ${winner}, initialValue ${initialValue}`, () => {
        beforeEach(() => {
          source = new BooleanSource(rng, { winner, initialValue });
        });

        it("initial", () => {
          Traces.initial(source, [initialValue, []]);
        });

        it("singleOp", () => {
          Traces.singleOp(source, [true, [true]]);
        });

        it("sequential", () => {
          Traces.sequential(
            source,
            [true, [true]],
            [false, [false]],
            [true, [true]],
            [true, [true]]
          );
        });

        it("concurrent", () => {
          Traces.concurrent(
            source,
            [true, [true]],
            [false, [false]],
            // Note conflicts are sorted by replicaID; op 0 is first there.
            [winner, [true, false]]
          );
        });

        it("diamond", () => {
          Traces.diamond(
            source,
            [true, [true]],
            [false, [false]],
            [true, [true]],
            // Note conflicts are sorted by replicaID; op 1 is first there.
            [winner, [false, true]],
            [true, [true]]
          );
        });

        it("partition", () => {
          Traces.partition(
            source,
            [true, [true]],
            [false, [false]],
            // op 3 is done by the lower replicaID, which is first among conflicts.
            [winner, [true, false]]
          );
        });
      });
    }
  }
});

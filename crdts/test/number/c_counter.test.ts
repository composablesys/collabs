import { InitToken } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CCounter } from "../../src";
import { EventView } from "../event_view";
import { Source, Traces } from "../traces";
import { CCounterView } from "./views";

function addArg(mode: "inc" | "inc/dec" | "ints", n: number): number {
  switch (mode) {
    case "inc":
      return 1;
    case "inc/dec":
      // 1, -1, 1, -1, ...
      return n % 2 === 0 ? 1 : -1;
    case "ints":
      // 1, -2, 3, -4, ...
      const sign = n % 2 === 0 ? 1 : -1;
      return sign * (n + 1);
  }
}

class CounterSource implements Source<CCounter, number> {
  constructor(
    readonly rng: seedrandom.prng,
    readonly mode: "inc" | "inc/dec" | "ints",
    readonly options?: { initialValue?: number }
  ) {}

  pre(init: InitToken) {
    const counter = new CCounter(init, this.options);
    new CCounterView(counter, false);
    return counter;
  }
  check(actual: CCounter, expected: number): void {
    assert.strictEqual(actual.value, expected);
    EventView.check(actual);
  }
  op(c: CCounter, n: number): void {
    c.add(addArg(this.mode, n));
  }
}

describe("CCounter", () => {
  let rng!: seedrandom.prng;
  let source!: CounterSource;

  beforeEach(() => {
    rng = seedrandom("42");
  });

  for (const options of [undefined, { initialValue: 11 }]) {
    describe(`options: ${JSON.stringify(options)}`, () => {
      const s = options?.initialValue ?? 0;
      for (const mode of <("inc" | "inc/dec" | "ints")[]>[
        "inc",
        "inc/dec",
        "ints",
      ]) {
        describe(mode, () => {
          beforeEach(() => {
            source = new CounterSource(rng, mode, options);
          });

          function f(n: number) {
            return addArg(mode, n);
          }

          it("initial", () => {
            Traces.initial(source, s);
          });

          it("singleOp", () => {
            Traces.singleOp(source, s + f(0));
          });

          it("sequential", () => {
            Traces.sequential(
              source,
              s + f(0),
              s + f(0) + f(1),
              s + f(0) + f(1) + f(2),
              s + f(0) + f(1) + f(2) + f(3)
            );
          });

          it("concurrent", () => {
            Traces.concurrent(
              source,
              s + f(0),
              s + f(1),
              // Both added.
              s + f(0) + f(1)
            );
          });

          it("diamond", () => {
            Traces.diamond(
              source,
              s + f(0),
              s + f(0) + f(1),
              s + f(0) + f(2),
              // Both added.
              s + f(0) + f(1) + f(2),
              s + f(0) + f(1) + f(2) + f(3)
            );
          });

          it("partition", () => {
            Traces.partition(
              source,
              s + f(0) + f(1) + f(2) + f(3),
              s + f(4) + f(5) + f(6) + f(7),
              // All added.
              s + f(0) + f(1) + f(2) + f(3) + f(4) + f(5) + f(6) + f(7)
            );
          });
        });
      }
    });
  }
});

// TODO: test errors for non-ints

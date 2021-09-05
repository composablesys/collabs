import { assert } from "chai";
import { CNumberComponentMessage } from "../../generated/proto_compiled";
import {
  CausalTimestamp,
  CrdtInitToken,
  Pre,
  Runtime,
  SemidirectProduct,
  TestingNetworkGenerator,
} from "../../src";
import {
  AddComponent,
  CNumberEventsRecord,
  CNumberState,
  MultComponent,
} from "../../src/types/number/number";
import { debug } from "../debug";
import seedrandom from "seedrandom";

/**
 * Warning: eventual consistency is not guaranteed due
 * to floating-point rounding errors, which can violate
 * associativity, commutativity, or distributivity.
 */
class CNumberSimple extends SemidirectProduct<
  CNumberState,
  CNumberEventsRecord
> {
  private addCrdt: AddComponent;
  private multCrdt: MultComponent;
  constructor(initToken: CrdtInitToken, initialValue: number = 0) {
    super(initToken, false);

    const state = new CNumberState(initialValue);
    [this.addCrdt, this.multCrdt] = super.setup(
      Pre(AddComponent)(state),
      Pre(MultComponent)(state),
      state
    );

    // Events
    this.addCrdt.on("Add", (event) => super.emit("Add", event));
    this.multCrdt.on("Mult", (event) => super.emit("Mult", event));
  }

  protected action(
    _m2TargetPath: string[],
    _m2Timestamp: CausalTimestamp | null,
    m2Message: Uint8Array,
    _m1TargetPath: string[],
    _m1Timestamp: CausalTimestamp,
    m1Message: Uint8Array
  ): { m1TargetPath: string[]; m1Message: Uint8Array } | null {
    let m2Decoded = CNumberComponentMessage.decode(m2Message);
    let m1Decoded = CNumberComponentMessage.decode(m1Message);
    let acted = CNumberComponentMessage.create({
      arg: m2Decoded.arg * m1Decoded.arg,
    });
    return {
      m1TargetPath: [],
      m1Message: CNumberComponentMessage.encode(acted).finish(),
    };
  }

  add(toAdd: number) {
    this.addCrdt.add(toAdd);
  }

  mult(toMult: number) {
    this.multCrdt.mult(toMult);
  }

  get value(): number {
    // Although -0 === 0, some notions of equality
    // (in particular chai's assert.deepStrictEqual)
    // treat them differently.  This is a hack to prevent
    // -0 vs 0 from violating EC under this equality def.
    // It might be related to general floating point
    // noncommutativity and may go away once we fix that.
    return this.state.internalState.value === -0
      ? 0
      : this.state.internalState.value;
  }
}
describe("SemidirectProduct", () => {
  let runtimeGen: TestingNetworkGenerator;
  let alice: Runtime;
  let bob: Runtime;
  let rng: seedrandom.prng;

  beforeEach(() => {
    rng = seedrandom("42");
    runtimeGen = new TestingNetworkGenerator();
    alice = runtimeGen.newRuntime(undefined, rng);
    bob = runtimeGen.newRuntime(undefined, rng);
  });

  describe("CNumberSimple", () => {
    let aliceNumber: CNumberSimple;
    let bobNumber: CNumberSimple;

    beforeEach(() => init(0));

    function init(initialValue: number, name = "numberId"): void {
      aliceNumber = alice.registerCrdt(name, Pre(CNumberSimple)(initialValue));
      bobNumber = bob.registerCrdt(name, Pre(CNumberSimple)(initialValue));
      if (debug) {
        addEventListeners(aliceNumber, "Alice");
        addEventListeners(bobNumber, "Bob");
      }
    }

    function addEventListeners(number: CNumberSimple, name: string): void {
      number.on("Add", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} added ${event.arg}`
        )
      );

      number.on("Mult", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} multed ${event.arg}`
        )
      );
      // number.on("Reset", (event) =>
      //   console.log(
      //     `${name}: ${event.timestamp.getSender()} reset ${event.timestamp.getSender()}`
      //   )
      // );
    }

    it("is initially 0", () => {
      assert.strictEqual(aliceNumber.value, 0);
      assert.strictEqual(bobNumber.value, 0);
    });

    describe("add", () => {
      it("works with non-concurrent updates", () => {
        aliceNumber.add(3);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, 3);
        assert.strictEqual(bobNumber.value, 3);

        bobNumber.add(-4);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, -1);
        assert.strictEqual(bobNumber.value, -1);
      });

      it("works with concurrent updates", () => {
        aliceNumber.add(3);
        bobNumber.add(-4);
        assert.strictEqual(aliceNumber.value, 3);
        assert.strictEqual(bobNumber.value, -4);

        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, -1);
        assert.strictEqual(bobNumber.value, -1);
      });
    });

    describe("add and mult", () => {
      it("works with non-concurrent updates", () => {
        aliceNumber.add(3);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, 3);
        assert.strictEqual(bobNumber.value, 3);

        bobNumber.mult(-4);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, -12);
        assert.strictEqual(bobNumber.value, -12);

        aliceNumber.add(7);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, -5);
        assert.strictEqual(bobNumber.value, -5);
      });

      it("works with concurrent updates", () => {
        aliceNumber.add(2);
        assert.strictEqual(aliceNumber.value, 2);
        assert.strictEqual(bobNumber.value, 0);

        bobNumber.add(1);
        bobNumber.mult(5);
        assert.strictEqual(aliceNumber.value, 2);
        assert.strictEqual(bobNumber.value, 5);

        // Arbitration order places multiplication last
        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, 15);
        assert.strictEqual(bobNumber.value, 15);
      });

      it("works with the example from the paper", () => {
        // See https://arxiv.org/abs/2004.04303, §3.1
        init(1, "numberIdPaper");

        aliceNumber.mult(2);
        aliceNumber.add(1);
        bobNumber.mult(3);
        bobNumber.add(4);
        assert.strictEqual(aliceNumber.value, 3);
        assert.strictEqual(bobNumber.value, 7);

        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, 17);
        assert.strictEqual(bobNumber.value, 17);
      });
    });
  });
});

import { prng } from "seedrandom";
import { Trace } from "../replica_benchmark";

/**
 * Number of ops to do.
 */
const OPS = 10000;

class WeightedChoiceSource<T> {
  private readonly totalWeight: number;
  private readonly weightIndexedChoices: T[];
  private readonly cumulativeWeights: number[];

  constructor(weightedChoices: {
    [name: string]: [choice: T, weight: number];
  }) {
    // Init ability to choose randomly with given weights.
    this.cumulativeWeights = [];
    this.weightIndexedChoices = [];
    let cumulativeWeight = 0;
    let index = 0;
    for (let choice of Object.values(weightedChoices)) {
      if (choice[1] < 0) throw new Error("Negative weight: " + choice[1]);
      this.weightIndexedChoices[index] = choice[0];
      cumulativeWeight += choice[1];
      this.cumulativeWeights[index] = cumulativeWeight;
      index++;
    }
    this.totalWeight = cumulativeWeight;
  }

  getWeightedChoice(rng: seedrandom.prng): T {
    const rand = rng() * this.totalWeight;
    for (let i = 0; i < this.weightIndexedChoices.length; i++) {
      if (rand < this.cumulativeWeights[i]) return this.weightIndexedChoices[i];
    }
    throw new Error("rand out of range");
  }
}

export abstract class MicroTrace<I> implements Trace<I> {
  private readonly weightedOpsSource: WeightedChoiceSource<
    (replica: I, rng: seedrandom.prng, opNum: number) => void
  >;

  protected constructor(ops: {
    [opName: string]: [
      (replica: I, rng: seedrandom.prng, opNum: number) => void,
      number
    ];
  }) {
    this.weightedOpsSource = new WeightedChoiceSource(ops);
  }

  doOp(replica: I, rng: prng, opNum: number): void {
    this.weightedOpsSource.getWeightedChoice(rng)(replica, rng, opNum);
  }

  readonly numOps = OPS;

  /**
   * No checking (undefined).
   */
  readonly correctState = undefined;

  abstract getState(replica: I): unknown;
}

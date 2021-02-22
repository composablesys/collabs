import { network, crdts } from "compoventuals-client";
import framework, { FrameworkSuite } from "./framework";
import { v4 as uuid } from "uuid";
import seedrandom from "seedrandom";

export class CrdtSuite<C> {
  suite: FrameworkSuite;

  constructor(suiteName: string) {
    this.suite = framework.newSuite(suiteName);
  }

  addTest(
    testName: string,
    crdtConstructor: (parentOrRuntime: crdts.Crdt | crdts.CrdtRuntime) => C,
    ops: {
      [opName: string]: [(crdt: C, rng: seedrandom.prng) => void, number];
    },
    userCounts = [1, 2, 4, 8, 16],
    roundCounts = [1, 10, 100],
    seed = "42"
  ) {
    // Init ability to choose random ops with given weights
    let cumulativeWeights: number[] = [];
    let weightIndexedOps: ((crdt: C, rng: seedrandom.prng) => void)[] = [];
    let cumulativeWeight = 0;
    let index = 0;
    for (let op of Object.values(ops)) {
      if (op[1] < 0) throw new Error("Negative weight: " + op[1]);
      weightIndexedOps[index] = op[0];
      cumulativeWeight += op[1];
      cumulativeWeights[index] = cumulativeWeight;
      index++;
    }
    const totalWeight = cumulativeWeight;
    function getWeightedRandomOp(rng: seedrandom.prng) {
      const rand = rng() * totalWeight;
      for (let i = 0; i < weightIndexedOps.length; i++) {
        if (rand < cumulativeWeights[i]) return weightIndexedOps[i];
      }
      throw new Error("rand out of range");
    }

    // Actual tests
    for (let users of userCounts) {
      for (let rounds of roundCounts) {
        // Record param metadata in extraFields
        let extraFields: { [field: string]: string } = {
          Users: `${users}`,
          Rounds: `${rounds}`,
        };
        for (let entry of Object.entries(ops)) {
          // TODO: depending on the randomness, this won't be
          // exactly right.  Currently can't use after-the-fact measurement
          // in extraFields.
          extraFields[entry[0]] = entry[1][1] + "";
        }

        let generator: network.TestingNetworkGenerator;
        let runtimes: crdts.CrdtRuntime[] = [];
        let crdts: C[] = [];
        let rng: seedrandom.prng;
        let setupFun = async () => {
          generator = new network.TestingNetworkGenerator();
          rng = seedrandom(seed);
          for (let i = 0; i < users; i++) {
            runtimes[i] = generator.newRuntime(uuid());
            crdts[i] = crdtConstructor(runtimes[i]);
          }
        };

        // 1. Each active user sends concurrently in each round.
        let funConcurrent = async () => {
          // Have each active user send a message concurrently,
          // in rounds.
          for (let r = 0; r < rounds; r++) {
            for (let i = 0; i < users; i++) {
              getWeightedRandomOp(rng)(crdts[i], rng);
            }
            // TODO: await sending
            for (let i = 0; i < users; i++) generator.release(runtimes[i]);
            // TODO: await delivery
          }
          return runtimes;
        };

        // 2. Each active user sends in sequence in each round.
        let funLinear = async () => {
          for (let r = 0; r < rounds; r++) {
            for (let i = 0; i < users; i++) {
              getWeightedRandomOp(rng)(crdts[i], rng);
              // TODO: await sending
              generator.release(runtimes[i]);
              // TODO: await delivery
            }
          }
          return runtimes;
        };

        // 3. Partition the users and active users by parity.  Each partition
        // sends in sequence for 10 rounds, then the partitions are reunited,
        // repeatedly.
        let funPartition = async () => {
          for (let r = 0; r < rounds; r++) {
            for (let i = 0; i < users; i++) {
              getWeightedRandomOp(rng)(crdts[i], rng);
              // TODO: await sending
              // Deliver to all users in the same partition (parity)
              for (let j = 0; j < users; j++) {
                if ((j - i) % 2 == 0) {
                  generator.release(runtimes[i], runtimes[j]);
                }
              }
              // TODO: await delivery
            }
            // Every 10 rounds, briefly heal the partition
            if (rounds % 10 == 0) generator.releaseAll();
            // TODO: await delivery
          }
          return runtimes;
        };

        let funs = {
          Concurrent: funConcurrent,
          Linear: funLinear,
          Partition: funPartition,
        };

        // TODO: When to do setupFun?  For now we do it with each test,
        // since most of it can be subtracted out, although any complex
        // stuff done in crdtConstructor will affect it.
        const testNameMaybeHash = testName == "" ? testName : testName + "-";
        for (let entry of Object.entries(funs)) {
          this.suite.addMemoryBenchmark(
            `${testNameMaybeHash}${entry[0]}-Memory`,
            () => {},
            async () => {
              await setupFun();
              return await entry[1]();
            },
            extraFields
          );
          this.suite.addCpuBenchmark(
            `${testNameMaybeHash}${entry[0]}-Cpu`,
            async () => {
              await setupFun();
              await entry[1]();
            },
            extraFields
          );
          this.suite.addGeneralBenchmark(
            `${testNameMaybeHash}${entry[0]}-SentBytes`,
            "Sent Bytes",
            () => {},
            async () => {
              await setupFun();
              let startBytes = generator.getTotalSentBytes();
              await entry[1]();
              return generator.getTotalSentBytes() - startBytes;
            },
            extraFields,
            1
          );
        }
      }
    }
  }
}

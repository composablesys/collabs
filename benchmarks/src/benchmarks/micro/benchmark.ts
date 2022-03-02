import { record, getRecordedTrials, getWarmupTrials } from "../../record";
import seedrandom from "seedrandom";
import { assert } from "chai";
import {
  byteLength,
  Data,
  Implementation,
  Replica,
} from "../../implementation";
import { getMemoryUsed, sleep } from "../../util";
import {
  CollabsMap,
  CollabsMapRolling,
  CollabsRegister,
  CollabsTextLtr,
  CollabsTextRandom,
} from "./implementations/collabs";

// Experiment params.
const SEED = "42";
const OPS = 200;

export interface MicroReplica extends Replica {
  /**
   * This is assumed to transact() automatically.
   *
   * TODO: opNum guarantees (unique; mostly in-order on
   * same replica)
   */
  doOp(rng: seedrandom.prng, opNum: number): void;

  /**
   * Used for checking that all replicas end up in the
   * same state when they should.
   *
   * The return value must be comparable using
   * assert.deepStrictEqual.
   */
  getState(): any;
}

class MicroBenchmark {
  constructor(
    /**
     * The library.
     */
    private readonly implementationName: string,
    private readonly implementation: Implementation<MicroReplica>,
    /**
     * The replica/message/measurement pattern -
     * e.g., SendTime.
     */
    private readonly benchmarkName: string,
    /**
     * The data type being tested - e.g., Register.
     * Used as the Label for results.
     */
    private readonly dataTypeName: string
  ) {}

  /**
   * Benchmark cost of a single user's sending all the ops.
   */
  async send(measurement: "time" | "memory" | "network") {
    const values = new Array<number>(getRecordedTrials());
    values.fill(0);
    let bases = new Array<number>(getRecordedTrials());
    bases.fill(0);

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      await sleep(1000); // Sleep between trials
      console.log("Starting trial " + trial);

      let bytesSent: number;
      let onSend: (msg: Data) => void = () => {};
      if (measurement === "network") {
        onSend = (msg) => {
          bytesSent += byteLength(msg);
        };
      }
      const sender = new this.implementation(
        onSend,
        seedrandom(SEED + "sender")
      );
      sender.skipLoad();

      const rng = seedrandom(SEED);

      // Prep measurement.
      let startTime: bigint;
      if (trial >= 0) {
        switch (measurement) {
          case "time":
            startTime = process.hrtime.bigint();
            break;
          case "memory":
            bases[trial] = await getMemoryUsed();
            break;
          case "network":
            bytesSent = 0;
            break;
        }
      }

      // Send all edits.
      for (let op = 0; op < OPS; op++) {
        sender.doOp(rng, op);
      }

      // Take measurement.
      if (trial >= 0) {
        switch (measurement) {
          case "time":
            values[trial] = new Number(
              process.hrtime.bigint() - startTime!
            ).valueOf();
            break;
          case "memory":
            values[trial] = await getMemoryUsed();
            break;
          case "network":
            values[trial] = bytesSent!;
            break;
        }
      }
    }

    // Record measurements.
    record(
      "micro/" + this.benchmarkName,
      this.implementationName,
      this.dataTypeName,
      values,
      measurement === "memory" ? bases : undefined
    );
  }

  /**
   * Benchmark cost of a single user's receiving all
   * the ops, which were generated (off the clock)
   * by a different user.
   */
  async receive(measurement: "time" | "memory") {
    const values = new Array<number>(getRecordedTrials());
    values.fill(0);
    let bases = new Array<number>(getRecordedTrials());
    bases.fill(0);

    // Prepare messages to receive.
    const msgs: Data[] = [];
    let expectedState: any;
    {
      const sender = new this.implementation((msg) => {
        msgs.push(msg);
      }, seedrandom(SEED + "sender"));
      sender.skipLoad();
      const rng = seedrandom(SEED);
      for (let op = 0; op < OPS; op++) {
        sender.doOp(rng, op);
      }
      expectedState = sender.getState();
    }

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      await sleep(1000); // Sleep between trials
      console.log("Starting trial " + trial);

      const rng = seedrandom(SEED);
      const receiver = new this.implementation(() => {}, rng);
      receiver.skipLoad();

      // Prep measurement.
      let startTime: bigint;
      if (trial >= 0) {
        switch (measurement) {
          case "time":
            startTime = process.hrtime.bigint();
            break;
          case "memory":
            bases[trial] = await getMemoryUsed();
            break;
        }
      }

      // Receive all edits.
      for (let i = 0; i < msgs.length; i++) {
        receiver.receive(msgs[i]);
      }

      // Take measurement.
      if (trial >= 0) {
        switch (measurement) {
          case "time":
            values[trial] = new Number(
              process.hrtime.bigint() - startTime!
            ).valueOf();
            break;
          case "memory":
            values[trial] = await getMemoryUsed();
            break;
        }
      }

      // Check result.
      assert.strictEqual(
        receiver.getState(),
        expectedState,
        "receiver state does not equal sender state"
      );
    }

    // Record measurements.
    record(
      "micro/" + this.benchmarkName,
      this.implementationName,
      this.dataTypeName,
      values,
      measurement === "memory" ? bases : undefined
    );
  }

  async save() {
    // Prepare saver.
    const saver = new this.implementation(() => {}, seedrandom(SEED + "saver"));
    saver.skipLoad();
    const rng = seedrandom(SEED);
    for (let op = 0; op < OPS; op++) {
      saver.doOp(rng, op);
    }

    await this.saveTime(saver);

    const saveData = saver.save();
    record(
      "micro/" + this.benchmarkName + "Size",
      this.implementationName,
      this.dataTypeName,
      [byteLength(saveData)]
    );

    await this.loadTime(saveData);
  }

  private async saveTime(saver: MicroReplica) {
    const saveValues = new Array<number>(getRecordedTrials());
    saveValues.fill(0);

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      await sleep(1000); // Sleep between trials
      console.log("Starting time/size trial " + trial);

      // Prep measurement.
      const startTime = process.hrtime.bigint();

      // Save.
      saver.save();

      // Take measurements.
      if (trial >= 0) {
        saveValues[trial] = new Number(
          process.hrtime.bigint() - startTime!
        ).valueOf();
      }
    }

    // Record measurements.
    record(
      "micro/" + this.benchmarkName + "SaveTime",
      this.implementationName,
      this.dataTypeName,
      saveValues
    );
  }

  private async loadTime(saveData: Data) {
    const loadValues = new Array<number>(getRecordedTrials());
    loadValues.fill(0);

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      await sleep(1000); // Sleep between trials
      console.log("Starting time/size trial " + trial);

      // Prepare loader.
      const loader = new this.implementation(() => {},
      seedrandom(SEED + "loader"));

      // Prep measurement.
      const startTime = process.hrtime.bigint();

      // Load.
      loader.load(saveData);

      // Take measurements.
      if (trial >= 0) {
        loadValues[trial] = new Number(
          process.hrtime.bigint() - startTime!
        ).valueOf();
      }
    }

    // Record measurements.
    record(
      "micro/" + this.benchmarkName + "LoadTime",
      this.implementationName,
      this.dataTypeName,
      loadValues
    );
  }

  async offlineReceive(
    measurement: "time" | "memory",
    /**
     * Coarse: each user sends all messages alone.
     * Fine: rounds in which each user sends one message concurrently.
     */
    concType: "coarse" | "fine",
    numUsers: number,
    concOpStart: number,
    concOps: number
  ) {
    const values = new Array<number>(getRecordedTrials());
    values.fill(0);
    let bases = new Array<number>(getRecordedTrials());
    bases.fill(0);

    // Prepare messages to receive.
    let saveData: Data;
    const msgs: Data[] = [];
    {
      // Initial concOpStart.
      const setupRng = seedrandom(SEED + "setup");
      const sender = new this.implementation(() => {}, setupRng);
      sender.skipLoad();
      const rng = seedrandom(SEED);
      for (let op = 0; op < concOpStart; op++) {
        sender.doOp(rng, op);
      }
      saveData = sender.save();

      // Further replicas each send concOps concurrently.
      const concurrers: MicroReplica[] = [];
      const lastMsgs = new Array<Data>(numUsers);
      for (let i = 0; i < numUsers; i++) {
        const concurrerI = new this.implementation((msg) => {
          msgs.push(msg);
          lastMsgs[i] = msg;
        }, setupRng);
        concurrerI.load(saveData);
        concurrers.push(concurrerI);
      }
      for (let j = 0; j < concOps; j++) {
        for (let i = 0; i < numUsers; i++) {
          concurrers[i].doOp(rng, concOpStart + i * concOps + j);
        }
        if (concType === "fine") {
          // Everyone receives each others' messages.
          for (let sender = 0; sender < numUsers; sender++) {
            for (let receiver = 0; receiver < numUsers; receiver++) {
              if (sender !== receiver) {
                concurrers[receiver].receive(lastMsgs[sender]);
              }
            }
          }
        }
      }
    }

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      await sleep(1000); // Sleep between trials
      console.log("Starting trial " + trial);

      const rng = seedrandom(SEED);
      const receiver = new this.implementation(() => {}, rng);
      receiver.load(saveData);

      // Prep measurement.
      let startTime: bigint;
      if (trial >= 0) {
        switch (measurement) {
          case "time":
            startTime = process.hrtime.bigint();
            break;
          case "memory":
            bases[trial] = await getMemoryUsed();
            break;
        }
      }

      // Receive all edits.
      for (let i = 0; i < msgs.length; i++) {
        receiver.receive(msgs[i]);
      }

      // Take measurement.
      if (trial >= 0) {
        switch (measurement) {
          case "time":
            values[trial] = new Number(
              process.hrtime.bigint() - startTime!
            ).valueOf();
            break;
          case "memory":
            values[trial] = await getMemoryUsed();
            break;
        }
      }

      // Checking result doesn't make sense because we
      // are not replaying the trace faithfully.
    }

    // Record measurements.
    record(
      "micro/" + this.benchmarkName,
      this.implementationName,
      this.dataTypeName + "," + numUsers + "," + concOpStart + "," + concOps,
      values,
      measurement === "memory" ? bases : undefined
    );
  }
}

const implementations: {
  [dataTypeName: string]: {
    [implementationName: string]: Implementation<MicroReplica>;
  };
} = {
  // TODO: other libs
  Register: { Collabs: CollabsRegister },
  Map: { Collabs: CollabsMap },
  MapRolling: { Collabs: CollabsMapRolling },
  TextLtr: { Collabs: CollabsTextLtr },
  TextRandom: { Collabs: CollabsTextRandom },
};

// Usage(example): benchmarkName(SendTime) dataTypeName(Register)
// implementationName(Yjs))
export default async function text_trace(args: string[]) {
  const dataTypeImplementations = implementations[args[1]];
  if (dataTypeImplementations === undefined) {
    throw new Error("Unrecognized data type name: " + args[1]);
  }
  const implementation = dataTypeImplementations[args[2]];
  if (implementation === undefined) {
    throw new Error("Unrecognized implementation name: " + args[2]);
  }
  const benchmark = new MicroBenchmark(
    args[2],
    implementation,
    args[0],
    args[1]
  );

  console.log("Starting text_trace test: " + args);

  switch (args[0]) {
    case "SendTime":
      await benchmark.send("time");
      break;
    case "SendMemory":
      await benchmark.send("memory");
      break;
    case "Network":
      await benchmark.send("network");
      break;
    case "Save":
      await benchmark.save();
      break;
    case "ReceiveTime":
      await benchmark.receive("time");
      break;
    case "ReceiveMemory":
      await benchmark.receive("memory");
      break;
    case "OfflineReceiveTime":
    case "OfflineReceiveMemory":
      if (args.length !== 6) {
        throw new Error(
          'Not enough args, needs: ("coarse" | "fine"), numUsers, concOpStart, concOps'
        );
      }
      if (!(args[3] === "coarse" || args[3] === "fine")) {
        throw new Error("Bad concType: " + args[3] + " (needs: coarse | fine)");
      }
      await benchmark.offlineReceive(
        args[0] === "OfflineReceiveTime" ? "time" : "memory",
        args[3],
        parseInt(args[4]),
        parseInt(args[5]),
        parseInt(args[6])
      );
      break;
    default:
      throw new Error("Unrecognized sub-benchmark: " + args[0]);
  }
}

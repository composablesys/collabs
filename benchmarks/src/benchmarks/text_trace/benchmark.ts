import { edits, finalText } from "./editing_trace";
import { record, getRecordedTrials, getWarmupTrials } from "../../record";
import { getMemoryUsed, sleep } from "../../util";
import seedrandom from "seedrandom";
import { assert } from "chai";
import {
  byteLength,
  Data,
  Implementation,
  Replica,
} from "../../implementation";
import { Text } from "./implementations/text";
import { YjsText } from "./implementations/yjs";
import { AutomergeText } from "./implementations/automerge";
import { DeletingLww } from "./implementations/deleting_lww";
import { ResettingLww } from "./implementations/resetting_lww";
import { RichText } from "./implementations/rich_text";

// Based on https://github.com/automerge/automerge-perf/blob/master/edit-by-index/baseline.js

// Experiment params.
const SEED = "42";

export interface TextReplica extends Replica {
  insert(index: number, char: string): void;
  delete(index: number): void;
  getText(): string;
  readonly length: number;
}

class TextTraceBenchmark {
  constructor(
    private readonly implementationName: string,
    private readonly implementation: Implementation<TextReplica>,
    private readonly benchmarkName: string
  ) {}

  private processEdit(
    textReplica: TextReplica,
    edit: [number, number, string | undefined]
  ) {
    textReplica.transact(() => {
      if (edit[2] !== undefined) {
        // Insert edit[2] at edit[0]
        textReplica.insert(edit[0], edit[2]);
      } else {
        // Delete character at edit[0]
        textReplica.delete(edit[0]);
      }
    });
  }

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

      const rng = seedrandom(SEED);
      let bytesSent: number;
      let onSend: (msg: Data) => void = () => {};
      if (measurement === "network") {
        onSend = (msg) => {
          bytesSent += byteLength(msg);
        };
      }
      const sender = new this.implementation(onSend, rng);
      sender.skipLoad();

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
      for (let op = 0; op < edits.length; op++) {
        this.processEdit(sender, edits[op]);
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

      // Check result.
      assert.strictEqual(
        sender.getText(),
        finalText,
        "textResult does not equal final text"
      );
    }

    // Record measurements.
    record(
      "text_trace/" + this.benchmarkName,
      this.implementationName,
      "",
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
    {
      const sender = new this.implementation((msg) => {
        msgs.push(msg);
      }, seedrandom(SEED + "sender"));
      sender.skipLoad();
      for (let op = 0; op < edits.length; op++) {
        this.processEdit(sender, edits[op]);
      }
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
        receiver.getText(),
        finalText,
        "textResult does not equal final text"
      );
    }

    // Record measurements.
    record(
      "text_trace/" + this.benchmarkName,
      this.implementationName,
      "",
      values,
      measurement === "memory" ? bases : undefined
    );
  }

  async save() {
    // Prepare saver.
    const saver = new this.implementation(() => {}, seedrandom(SEED + "saver"));
    saver.skipLoad();
    for (let op = 0; op < edits.length; op++) {
      this.processEdit(saver, edits[op]);
    }

    await this.saveTime(saver);

    const saveData = saver.save();
    record(
      "text_trace/" + this.benchmarkName + "Size",
      this.implementationName,
      "",
      [byteLength(saveData)]
    );

    await this.loadTime(saveData);
  }

  private async saveTime(saver: TextReplica) {
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
      "text_trace/" + this.benchmarkName + "SaveTime",
      this.implementationName,
      "",
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
      "text_trace/" + this.benchmarkName + "LoadTime",
      this.implementationName,
      "",
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
      for (let op = 0; op < concOpStart; op++) {
        this.processEdit(sender, edits[op]);
      }
      saveData = sender.save();

      // Further replicas each send concOps concurrently.
      const concurrers: TextReplica[] = [];
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
          const edit = edits[concOpStart + i * concOps + j];
          const concurrerI = concurrers[i];
          // Since we're not replaying the trace faithfully,
          // indices may be out of bounds.
          // Let's just clamp them.
          this.processEdit(concurrerI, [
            Math.min(edit[0], concurrerI.length - 1),
            edit[1],
            edit[2],
          ]);
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
      "text_trace/" + this.benchmarkName,
      this.implementationName,
      numUsers + "," + concOpStart + "," + concOps,
      values,
      measurement === "memory" ? bases : undefined
    );
  }
}

const implementations: {
  [name: string]: Implementation<TextReplica>;
} = {
  Automerge: AutomergeText,
  DeletingLww: DeletingLww,
  ResettingLww: ResettingLww,
  RichText: RichText,
  Text: Text,
  Yjs: YjsText,
};

export default async function text_trace(args: string[]) {
  const implementation = implementations[args[1]];
  if (implementation === undefined) {
    throw new Error("Unrecognized implementation name: " + args[1]);
  }
  const benchmark = new TextTraceBenchmark(args[1], implementation, args[0]);

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
      if (args.length !== 5) {
        throw new Error(
          'Not enough args, needs: ("coarse" | "fine"), numUsers, concOpStart, concOps'
        );
      }
      if (!(args[2] === "coarse" || args[2] === "fine")) {
        throw new Error("Bad concType: " + args[2] + " (needs: coarse | fine)");
      }
      await benchmark.offlineReceive(
        args[0] === "OfflineReceiveTime" ? "time" : "memory",
        args[2],
        parseInt(args[3]),
        parseInt(args[4]),
        parseInt(args[5])
      );
      break;
    default:
      throw new Error("Unrecognized sub-benchmark: " + args[0]);
  }
}

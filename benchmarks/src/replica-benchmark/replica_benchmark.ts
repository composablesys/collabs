// Benchmarks that involve one or more replicas communicating normally.

import { record, getRecordedTrials, getWarmupTrials } from "../record";
import seedrandom from "seedrandom";
import { assert } from "chai";
import { byteLength, Data, getMemoryUsed, sleep } from "../util";

const SEED = "42";

export interface Replica {
  /**
   * Execute doOps, which performs ops on this replica, in a single
   * transaction, i.e., sending a single message
   * via onsend (provided to Implementation).
   */
  transact(doOps: () => void): void;

  receive(msg: Data): void;

  save(): Data;

  load(saveData: Data): void;

  skipLoad(): void;
}

/**
 * A Replica constructor with the given constructor args,
 * i.e., a Replica factory.
 */
export type Implementation<I> = new (
  onsend: (msg: Data) => void,
  replicaIdRng: seedrandom.prng
) => Replica & I;

export interface Trace<I> {
  /**
   * Do one op on replica. In practice, replica will be a Replica,
   * but we don't express that constraint by default because we don't
   * expect you to need any Replica methods. In particular, don't call
   * transact (we'll call it for you as needed, possibly transacting
   * more than one op at a time).
   *
   * TODO: opNum guarantees (unique; mostly in-order on
   * same replica)
   */
  doOp(replica: I, rng: seedrandom.prng, opNum: number): void;

  /**
   * Used for checking that all replicas end up in the
   * same state when they should.
   *
   * The return value must be comparable using
   * assert.deepStrictEqual.
   */
  getState(replica: I): unknown;

  /**
   * The intended number of ops.
   */
  readonly numOps: number;

  /**
   * The correct output of getState after performing
   * numOps operations sequentially, or undefined if N/A.
   */
  readonly correctState: unknown;
}

export class ReplicaBenchmark<I> {
  // TODO: mention measurement.csv used as file name
  // (e.g. sendTime.csv). Method name convention (lowerCamelCase).
  // Label used for method params (e.g. ops), space-separated.
  // Describe full file/folder name.
  constructor(
    private readonly trace: Trace<I>,
    /**
     * The name of the trace
     * (e.g. text-trace, counter). Used as the results
     * folder name. Folder name convention
     * (lower-hyphen-case).
     */
    private readonly traceName: string,
    private readonly implementation: Implementation<I>,
    /**
     * The name of the implementation
     * (e.g. Yjs, CollabsDeleting). Used in the results
     * "Implementation" column. Class name convention
     * (UpperCamelCase).
     */
    private readonly implementationName: string
  ) {}

  /**
   * Do one trace op in a transaction.
   */
  private transactOp(
    replica: Replica & I,
    rng: seedrandom.prng,
    op: number
  ): void {
    replica.transact(() => this.trace.doOp(replica, rng, op));
  }

  /**
   * Benchmark cost of a single user's sending all the ops.
   */
  async send(metric: "Time" | "Memory" | "Network") {
    const values = new Array<number>(getRecordedTrials());
    values.fill(0);
    let bases = new Array<number>(getRecordedTrials());
    bases.fill(0);

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      await sleep(1000); // Sleep between trials
      console.log("Starting trial " + trial);

      let bytesSent: number;
      let onSend: (msg: Data) => void = () => {};
      if (metric === "Network") {
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
        switch (metric) {
          case "Time":
            startTime = process.hrtime.bigint();
            break;
          case "Memory":
            bases[trial] = await getMemoryUsed();
            break;
          case "Network":
            bytesSent = 0;
            break;
        }
      }

      // Send all edits.
      for (let op = 0; op < this.trace.numOps; op++) {
        this.transactOp(sender, rng, op);
      }

      // Take measurement.
      if (trial >= 0) {
        switch (metric) {
          case "Time":
            values[trial] = new Number(
              process.hrtime.bigint() - startTime!
            ).valueOf();
            break;
          case "Memory":
            values[trial] = await getMemoryUsed();
            break;
          case "Network":
            values[trial] = bytesSent!;
            break;
        }
      }

      // Check final state.
      if (this.trace.correctState !== undefined) {
        assert.deepStrictEqual(
          this.trace.getState(sender),
          this.trace.correctState,
          "sender state does not equal trace.correctState"
        );
      }
    }

    // Record measurements.
    record(
      this.traceName + "/" + "send" + metric,
      this.implementationName,
      "",
      values,
      metric === "Memory" ? bases : undefined
    );
  }

  /**
   * Benchmark cost of a single user's receiving all
   * the ops, which were generated (off the clock)
   * by a different user.
   */
  async receive(metric: "Time" | "Memory") {
    const values = new Array<number>(getRecordedTrials());
    values.fill(0);
    let bases = new Array<number>(getRecordedTrials());
    bases.fill(0);

    // Prepare messages to receive.
    const msgs: Data[] = [];
    let senderState: any;
    {
      const sender = new this.implementation((msg) => {
        msgs.push(msg);
      }, seedrandom(SEED + "sender"));
      sender.skipLoad();
      const rng = seedrandom(SEED);
      for (let op = 0; op < this.trace.numOps; op++) {
        this.transactOp(sender, rng, op);
      }
      senderState = this.trace.getState(sender);
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
        switch (metric) {
          case "Time":
            startTime = process.hrtime.bigint();
            break;
          case "Memory":
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
        switch (metric) {
          case "Time":
            values[trial] = new Number(
              process.hrtime.bigint() - startTime!
            ).valueOf();
            break;
          case "Memory":
            values[trial] = await getMemoryUsed();
            break;
        }
      }

      // Check final state.
      assert.deepStrictEqual(
        this.trace.getState(receiver),
        senderState,
        "receiver state does not equal sender state"
      );
    }

    // Record measurements.
    record(
      this.traceName + "/" + "receive" + metric,
      this.implementationName,
      "",
      values,
      metric === "Memory" ? bases : undefined
    );
  }

  async save() {
    // Prepare saver.
    const saver = new this.implementation(() => {}, seedrandom(SEED + "saver"));
    saver.skipLoad();
    const rng = seedrandom(SEED);
    for (let op = 0; op < this.trace.numOps; op++) {
      this.transactOp(saver, rng, op);
    }

    await this.saveTime(saver);

    const saveData = saver.save();
    record(this.traceName + "/" + "saveSize", this.implementationName, "", [
      byteLength(saveData),
    ]);

    const saverState = this.trace.getState(saver);
    await this.loadTime(saveData, saverState);
  }

  private async saveTime(saver: Replica) {
    const values = new Array<number>(getRecordedTrials());
    values.fill(0);

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      await sleep(1000); // Sleep between trials
      console.log("Starting time/size trial " + trial);

      // Prep measurement.
      const startTime = process.hrtime.bigint();

      // Save.
      saver.save();

      // Take measurements.
      if (trial >= 0) {
        values[trial] = new Number(
          process.hrtime.bigint() - startTime!
        ).valueOf();
      }
    }

    // Record measurements.
    record(
      this.traceName + "/" + "saveTime",
      this.implementationName,
      "",
      values
    );
  }

  private async loadTime(saveData: Data, saverState: unknown) {
    const values = new Array<number>(getRecordedTrials());
    values.fill(0);

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
        values[trial] = new Number(
          process.hrtime.bigint() - startTime!
        ).valueOf();
      }

      // Check loaded state.
      assert.deepStrictEqual(
        this.trace.getState(loader),
        saverState,
        "loader state does not equal saver state"
      );
    }

    // Record measurements.
    record(
      this.traceName + "/" + "loadTime",
      this.implementationName,
      "",
      values
    );
  }

  async concurrentReceive(
    metric: "Time" | "Memory",
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
        this.transactOp(sender, rng, op);
      }
      saveData = sender.save();

      // Further replicas each send concOps concurrently.
      const concurrers: (Replica & I)[] = [];
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
          this.transactOp(concurrers[i], rng, concOpStart + i * concOps + j);
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

      // TODO: check all states are equal.
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
        switch (metric) {
          case "Time":
            startTime = process.hrtime.bigint();
            break;
          case "Memory":
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
        switch (metric) {
          case "Time":
            values[trial] = new Number(
              process.hrtime.bigint() - startTime!
            ).valueOf();
            break;
          case "Memory":
            values[trial] = await getMemoryUsed();
            break;
        }
      }

      // TODO: check state equals common concurrer state.
    }

    // Record measurements.
    record(
      this.traceName + "/" + "concurrentReceive" + metric,
      this.implementationName,
      concType + " " + numUsers + " " + concOpStart + " " + concOps,
      values,
      metric === "Memory" ? bases : undefined
    );
  }
}

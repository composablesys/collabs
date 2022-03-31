// Benchmarks that involve one or more replicas communicating normally.

import { record, getRecordedTrials, getWarmupTrials } from "../record";
import seedrandom from "seedrandom";
import { assert } from "chai";
import { byteLength, Data, getMemoryUsed } from "../util";

const SEED = "42";
const MULTI_NUM_CONCURRENT = 10;
const MULTI_NUM_ROTATED = 1000;

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
   * Returns the sent messages for the given mode, which are to be received
   * during "receive" benchmarks.
   *
   * For Multi-Sender mode, the first half (rounded down) of the messages are
   * from Device Rotation, while the second half are from Concurrency.
   *
   * Also returns the intended finalState, for checking against the receiver's
   * final state. Before returning, it is checked that all of the concurrent
   * senders are also in this finalState.
   */
  private getSentMessages(
    mode: "single" | "multi"
  ): [msgs: Data[], finalState: unknown] {
    if (mode === "single") {
      const msgs: Data[] = [];
      const sender = new this.implementation((msg) => {
        msgs.push(msg);
      }, seedrandom(SEED + "sender"));
      sender.skipLoad();
      const rng = seedrandom(SEED);
      for (let op = 0; op < this.trace.numOps; op++) {
        this.transactOp(sender, rng, op);
      }
      const finalState = this.trace.getState(sender);
      return [msgs, finalState];
    } else {
      const msgs: Data[] = [];
      const deviceRotationOps = Math.floor(this.trace.numOps / 2);
      const concurrencyOps = this.trace.numOps - deviceRotationOps;
      const rng = seedrandom(SEED);
      const senderRng = seedrandom(SEED + "sender");

      // 1. Device Rotation: The ops are performed by MULTI_NUM_ROTATED
      // devices, sequentially.
      let saveData: Data;
      {
        const opsPerSender = Math.floor(deviceRotationOps / MULTI_NUM_ROTATED);
        let sender = new this.implementation((msg) => {
          msgs.push(msg);
        }, senderRng);
        sender.skipLoad();
        for (let op = 0; op < deviceRotationOps; op++) {
          // Each device performs opsPerSender ops, except the last, who performs
          // the remainder if the ops do not divide evenly.
          if (
            op % opsPerSender === 0 &&
            op / opsPerSender < MULTI_NUM_ROTATED
          ) {
            if ((op / opsPerSender) % 100 === 0) {
              console.log(
                "Setup: Rotated device " +
                  op / opsPerSender +
                  "/" +
                  MULTI_NUM_ROTATED
              );
            }
            const saveData = sender.save();
            sender = new this.implementation((msg) => {
              msgs.push(msg);
            }, senderRng);
            sender.load(saveData);
          }

          this.transactOp(sender, rng, op);
        }
        saveData = sender.save();
      }

      // 2. Concurrency: Ops are performed by MULTI_NUM_CONCURRENT devices
      // acting concurrently.
      const concurrers: (Replica & I)[] = [];
      const lastMsgs = new Array<Data>(MULTI_NUM_CONCURRENT);
      for (let i = 0; i < MULTI_NUM_CONCURRENT; i++) {
        const concurrerI = new this.implementation((msg) => {
          msgs.push(msg);
          lastMsgs[i] = msg;
        }, senderRng);
        concurrerI.load(saveData);
        concurrers.push(concurrerI);
      }

      // Each device performs a contiguous range of ops. If the ops do not
      // divide evenly, then the last concurrer performs fewer ops.
      const numRounds = Math.ceil(concurrencyOps / MULTI_NUM_CONCURRENT);
      const lastConcurrerOps =
        concurrencyOps - numRounds * (MULTI_NUM_CONCURRENT - 1);

      for (let round = 0; round < numRounds; round++) {
        if (round % 100 === 0) {
          console.log("Setup: Concurrency round " + round + "/" + numRounds);
        }
        // For the last round, might not have enough messages for all senders.
        const numSenders =
          round >= lastConcurrerOps
            ? MULTI_NUM_CONCURRENT - 1
            : MULTI_NUM_CONCURRENT;
        for (let i = 0; i < numSenders; i++) {
          this.transactOp(
            concurrers[i],
            rng,
            deviceRotationOps + i * numRounds + round
          );
        }
        // Everyone receives each others' messages.
        for (let sender = 0; sender < numSenders; sender++) {
          for (let receiver = 0; receiver < MULTI_NUM_CONCURRENT; receiver++) {
            if (sender !== receiver) {
              concurrers[receiver].receive(lastMsgs[sender]);
            }
          }
        }
      }

      // Check all states are equal.
      const finalState = this.trace.getState(concurrers[0]);
      for (let i = 1; i < concurrers.length; i++) {
        assert.deepStrictEqual(
          this.trace.getState(concurrers[i]),
          finalState,
          "unequal concurrer states"
        );
      }

      return [msgs, finalState];
    }
  }

  /**
   * Benchmark time to send all the ops.
   */
  async sendTime(mode: "single" | "multi") {
    if (mode === "multi") {
      throw new Error("Not implemented: sendTime multi");
    }

    const values = new Array<number>(getRecordedTrials());
    values.fill(0);

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      // Between trials, force GC.
      await getMemoryUsed();

      console.log("Starting trial " + trial);

      const sender = new this.implementation(() => {},
      seedrandom(SEED + "sender"));
      sender.skipLoad();

      const rng = seedrandom(SEED);

      // Prep measurement.
      const startTime = process.hrtime.bigint();

      // Send all edits.
      // We don't use getSentMessages here because it adds overhead that we
      // don't want to measure (e.g., recording the messages).
      for (let op = 0; op < this.trace.numOps; op++) {
        this.transactOp(sender, rng, op);
      }

      // Take measurement.
      if (trial >= 0) {
        values[trial] = new Number(
          process.hrtime.bigint() - startTime!
        ).valueOf();
      }

      // // For profiling memory usage:
      // console.log("Ready to profile");
      // await new Promise((resolve) => setTimeout(resolve, 1000 * 1000));

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
      "sendTime/" + this.traceName,
      this.implementationName,
      "single",
      values
    );
  }

  /**
   * Benchmark memory of a sender after sending all the ops.
   */
  async sendMemory(mode: "single" | "multi") {
    if (mode === "multi") {
      throw new Error("Not implemented: sendMemory multi");
    }

    const values = new Array<number>(getRecordedTrials());
    values.fill(0);
    let bases = new Array<number>(getRecordedTrials());
    bases.fill(0);

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      // Between trials, force GC.
      // We do this even for warmup trials because empirically, after the first
      // few GCs (usually 3), the memory usage suddenly gets smaller.
      // Presumably this is due to some Node internal optimization.
      // If that happens during a recorded trial, it gives a spuriously
      // low (often negative) memory measurement. By forcing GC's during warmup,
      // with sufficiently many warmup trials, we avoid that happening.
      await getMemoryUsed();

      console.log("Starting trial " + trial);

      const sender = new this.implementation(() => {},
      seedrandom(SEED + "sender"));
      sender.skipLoad();

      const rng = seedrandom(SEED);

      // Prep measurement.
      bases[trial] = await getMemoryUsed();

      // Send all edits.
      // We don't use getSentMessages here because it adds overhead that we
      // don't want to measure (e.g., recording the messages).
      for (let op = 0; op < this.trace.numOps; op++) {
        this.transactOp(sender, rng, op);
      }

      // Take measurement.
      if (trial >= 0) {
        values[trial] = await getMemoryUsed();
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
      "sendMemory/" + this.traceName,
      this.implementationName,
      "single",
      values,
      bases
    );
  }

  /**
   * Benchmark network bytes of sending all the ops.
   */
  async sendNetwork(mode: "single" | "multi") {
    const [msgs] = this.getSentMessages(mode);
    let bytesSent = 0;
    for (const msg of msgs) bytesSent += byteLength(msg);

    // Record measurements.
    record("sendNetwork/" + this.traceName, this.implementationName, mode, [
      bytesSent,
    ]);
  }

  /**
   * Benchmark time of a user's receiving all
   * the ops, which were generated (off the clock)
   * by other user(s) according to the mode.
   */
  async receiveTime(mode: "single" | "multi") {
    const values = new Array<number>(getRecordedTrials());
    values.fill(0);

    // Get messages to receive.
    const [msgs, senderState] = this.getSentMessages(mode);

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      // Between trials, force GC.
      // See comment in sendMemorySingle().
      await getMemoryUsed();

      console.log("Starting trial " + trial);

      const receiver = new this.implementation(() => {},
      seedrandom(SEED + "receiver"));
      receiver.skipLoad();

      // Prep measurement.
      const startTime = process.hrtime.bigint();

      // Receive all edits.
      for (let i = 0; i < msgs.length; i++) {
        receiver.receive(msgs[i]);
      }

      // Take measurement.
      if (trial >= 0) {
        values[trial] = new Number(
          process.hrtime.bigint() - startTime!
        ).valueOf();
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
      "receiveTime/" + this.traceName,
      this.implementationName,
      mode,
      values
    );
  }

  /**
   * Benchmark memory of a user after receiving all
   * the ops, which were generated (off the clock)
   * by other user(s) according to the mode.
   */
  async receiveMemory(mode: "single" | "multi") {
    const values = new Array<number>(getRecordedTrials());
    values.fill(0);
    let bases = new Array<number>(getRecordedTrials());
    bases.fill(0);

    // Get messages to receive.
    const [msgs, senderState] = this.getSentMessages(mode);

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      // Between trials, force GC.
      // See comment in sendMemorySingle().
      await getMemoryUsed();

      console.log("Starting trial " + trial);

      const receiver = new this.implementation(() => {},
      seedrandom(SEED + "receiver"));
      receiver.skipLoad();

      // Prep measurement.
      bases[trial] = await getMemoryUsed();

      // Receive all edits.
      for (let i = 0; i < msgs.length; i++) {
        receiver.receive(msgs[i]);
      }

      // Take measurement.
      if (trial >= 0) {
        values[trial] = await getMemoryUsed();
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
      "receiveMemory/" + this.traceName,
      this.implementationName,
      mode,
      values,
      bases
    );
  }

  async receiveSave(mode: "single" | "multi") {
    // Get messages to receive.
    const [msgs, senderState] = this.getSentMessages(mode);

    // Receive all messages.
    const receiver = new this.implementation(() => {},
    seedrandom(SEED + "receiver"));
    receiver.skipLoad();
    for (let i = 0; i < msgs.length; i++) {
      receiver.receive(msgs[i]);
    }

    // Measure save time, save size, and load time for receiver.
    await this.saveTime(receiver, "receiveSaveTime", mode);

    const saveData = receiver.save();
    record("receiveSaveSize/" + this.traceName, this.implementationName, mode, [
      byteLength(saveData),
    ]);

    await this.loadTime(saveData, senderState, "receiveLoadTime", mode);
  }

  private async saveTime(saver: Replica, metric: string, label: string) {
    const values = new Array<number>(getRecordedTrials());
    values.fill(0);

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      // Between trials, force GC.
      await getMemoryUsed();

      console.log("Starting saveTime trial " + trial);

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
      metric + "/" + this.traceName,
      this.implementationName,
      label,
      values
    );
  }

  private async loadTime(
    saveData: Data,
    saverState: unknown,
    metric: string,
    label: string
  ) {
    const values = new Array<number>(getRecordedTrials());
    values.fill(0);

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      // Between trials, force GC.
      await getMemoryUsed();

      console.log("Starting loadTime trial " + trial);

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
      metric + "/" + this.traceName,
      this.implementationName,
      label,
      values
    );
  }
}

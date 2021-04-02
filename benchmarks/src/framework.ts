import Benchmark from "benchmark";
import path from "path";
import * as math from "mathjs";
import fs from "fs";
import csvWriter from "csv-write-stream";
import streams from "memory-streams";

const maxTime = 1; // max time for all benchmarks, in seconds.
// addGeneralBenchmark will stop after this time is exceeded so long
// as at least minRuns have elapsed,
// so it may run over.
const minRuns = 5; // min runs for all benchmarks
const maxRuns = 10; // max runs for addGeneralBenchmark.
const warmupRuns = 5;
const warmupStopTime = 1; // stop warmup early if it takes
// at least this many seconds

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export class Framework {
  constructor() {}

  outDir!: string;
  version!: string;
  noWrite!: boolean;
  regex!: RegExp;
  setup(outDir: string, version: string, noWrite: boolean, regex: RegExp) {
    this.outDir = outDir;
    this.version = version;
    this.noWrite = noWrite;
    this.regex = regex;
  }

  pendingSuites: FrameworkSuite[] = [];
  newSuite(suiteName: string) {
    let suite = new FrameworkSuite(suiteName, this);
    this.pendingSuites.push(suite);
    return suite;
  }

  async runToCompletion() {
    for (let suite of this.pendingSuites) {
      console.log("    " + suite.suiteName);
      await suite.runToCompletion();
    }
    this.pendingSuites = [];
  }
}

// Benchmark's deferred arg
type Deferred = {
  resolve(): void;
};

export class FrameworkSuite {
  constructor(readonly suiteName: string, readonly framework: Framework) {}

  private pendingBenchmarks: (() => Promise<void>)[] = [];

  async runToCompletion() {
    for (let benchmark of this.pendingBenchmarks) {
      try {
        await benchmark();
      } catch (e) {
        console.log("Error in benchmark suite " + this.suiteName + ":");
        console.log(e);
      }
    }
    this.pendingBenchmarks = [];
  }

  /**
   * Add an arbitrary function to run when
   * this.runToCompletion() is called.  benchmark
   * should record its results by calling this.recordResult.
   * @param  benchmark [description]
   * @return           [description]
   */
  addBenchmark(testName: string, benchmark: () => Promise<void>) {
    this.pendingBenchmarks.push(async () => {
      if (await this.shouldSkip(testName)) return;
      await benchmark();
    });
  }

  /**
   * Benchmark the CPU time of fun, using benny.
   * @param  testName File to output this test's results to,
   * within this suite's directory
   * @param  fun Function to benchmark
   * @param  extraFields extra fields to include in the CSV output row
   * for this test, in the form {header: value}
   */
  addCpuBenchmark(
    testName: string,
    //setupFun: (() => void) | (() => Promise<void>),
    fun: () => Promise<void>,
    extraFields: { [header: string]: string } = {}
  ) {
    // Time with benchmark
    let suite = new Benchmark.Suite(this.suiteName);
    suite.add(testName, {
      defer: true,
      fn: (deferred: Deferred) => {
        // TODO: might this overestimate on short sync functions,
        // due to promise's extra event loop iteration?
        // Not sure if just calling deferred.resolve() directly is
        // a good idea, in case benchmark.js is depending on it's being
        // called in the next event loop iteration.
        fun().then(() => deferred.resolve());
      },
      maxTime: maxTime,
      minSamples: minRuns,
    });
    this.addCpuBenchmarkCommon(testName, fun, extraFields, suite);
  }

  private addCpuBenchmarkCommon(
    testName: string,
    fun: (() => void) | (() => Promise<void>),
    extraFields: { [header: string]: string },
    internalSuite: Benchmark.Suite
  ) {
    this.pendingBenchmarks.push(async () => {
      if (
        await this.prepare(testName, () => Promise.resolve(), fun, extraFields)
      )
        return;
      let myThis = this;
      // Record results when complete
      let onComplete = new Promise<void>((resolve) => {
        internalSuite.on("complete", function (this: Benchmark[]) {
          let result = this[0];
          myThis.recordResult(
            testName,
            "Time (sec)",
            result.stats.mean,
            result.stats.deviation,
            result.stats.sample.length,
            extraFields
          );
          resolve();
        });
      });
      // Run
      internalSuite.run();
      // Await completion
      await onComplete;
    });
  }

  addCpuBenchmarkSync(
    testName: string,
    //setupFun: (() => void) | (() => Promise<void>),
    fun: () => void,
    extraFields: { [header: string]: string } = {}
  ) {
    // Time with benchmark
    let suite = new Benchmark.Suite(this.suiteName);
    suite.add(testName, fun, {
      maxTime: maxTime,
      minSamples: minRuns,
    });
    this.addCpuBenchmarkCommon(testName, fun, extraFields, suite);
  }

  /**
   * Benchmark the memory usage of fun.
   * @param  testName File to output this test's results to,
   * within this suite's directory
   * @param  setupFun Function to run once before each call
   * to fun
   * @param  fun Function to benchmark.  It should output
   * an object that references all of the memory you want
   * to count, to ensure it is not GC'd before we count it.
   * Note that either through the return value or other
   * still-in-memory variables, any memory in use after
   * setupFun() should still be in-use at the end of fun(),
   * since the memory usage will be subtracted between those
   * two times to get the measured value.
   * TODO: what's the best way to do this?
   */
  addMemoryBenchmark(
    testName: string,
    setupFun: (() => void) | (() => Promise<void>),
    fun: () => Object | Promise<Object>,
    extraFields: { [header: string]: string } = {}
  ) {
    let memStart = 0;
    let wrappedSetupFun = async () => {
      await setupFun();
      sleep(100); // Sleep a bit to help the GC?
      global.gc();
      memStart = process.memoryUsage().heapUsed;
    };
    let wrappedFun = async () => {
      let memoryRef = await fun();
      sleep(100); // Sleep a bit to help the GC?
      global.gc();
      let memDiff = process.memoryUsage().heapUsed - memStart;
      return memDiff;
    };
    this.addGeneralBenchmark(
      testName,
      "Memory (bytes)",
      wrappedSetupFun,
      wrappedFun,
      extraFields
    );
  }

  /**
   * Benchmark an arbitrary parameter, returned by fun.  E.g.
   * internally-counted network usage.
   * @param  testName File to output this test's results to,
   * within this suite's directory
   * @param  metric "Name (units)" of the parameter
   * @param  setupFun Function to run once before each call
   * to fun
   * @param  fun Function to benchmark
   * @param runs If set, runs the benchmark the specified
   * number of times.  Set this to 1 if you know the result
   * is deterministic (e.g. network traffic for CRDT
   * microbenchmarks).
   */
  addGeneralBenchmark(
    testName: string,
    metric: string,
    setupFun: (() => void) | (() => Promise<void>),
    fun: () => number | Promise<number>,
    extraFields: { [header: string]: string } = {},
    runs?: number
  ) {
    this.pendingBenchmarks.push(async () => {
      if (await this.prepare(testName, setupFun, fun, extraFields)) return;
      let results: number[] = [];
      let startTime = Date.now();
      for (let i = 0; i < (runs ? runs : maxRuns); i++) {
        if (!runs && i >= minRuns && Date.now() - startTime >= maxTime * 1000)
          break;
        await setupFun();
        results[i] = await fun();
      }
      // TODO: what metrics?
      this.recordResult(
        testName,
        metric,
        math.mean(results),
        math.std(results),
        results.length,
        extraFields
      );
    });
  }

  /**
   * Records this result as a line in the CSV file
   * outDir/suiteName/testName.csv.
   * @param  testName
   * @param  metric   Label for the values, in the format
   * "Label (units)"
   * @param  mean     Mean result
   * @param  stdDev   Sample (unbiased) standard deviation
   * @param  count    Number of samples in the result
   * @param  extraFields Extra fields to include in the csv
   * file, with entries in the form
   * { "header": "this row value"}.
   */
  recordResult(
    testName: string,
    metric: string,
    mean: number,
    stdDev: number,
    count: number,
    extraFields: { [header: string]: string }
  ) {
    let headers = [
      "Date",
      "Version",
      "Metric",
      "Mean",
      "StdDev",
      "Count",
      ...Object.keys(extraFields),
    ];
    let parentDir = path.join(this.framework.outDir, this.suiteName);
    let outFile = path.join(parentDir, testName + ".csv");
    let writer;
    let buffer = new streams.WritableStream();

    if (this.framework.noWrite) {
      console.log("        Intended output file: " + outFile);
      console.log("        Intended output (including header):\n");
      writer = csvWriter({
        headers: headers,
      });
      writer.pipe(process.stdout);
    } else {
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      if (!fs.existsSync(outFile)) {
        writer = csvWriter({
          headers: headers,
        });
      } else {
        writer = csvWriter({ sendHeaders: false });
      }
      writer.pipe(buffer);
    }

    writer.write({
      Date: new Date().toDateString(),
      Version: this.framework.version,
      Metric: metric,
      Mean: mean,
      StdDev: stdDev,
      Count: count,
      ...extraFields,
    });
    writer.end();
    if (this.framework.noWrite) {
      console.log();
      // Try to prevent MaxListenersExceededWarning
      writer.unpipe(process.stdout);
    } else {
      // Write the buffer to file
      fs.appendFileSync(outFile, buffer.toString());
    }
  }

  /**
   * @return          true if the test should be skipped
   */
  private async prepare(
    testName: string,
    setupFun: (() => void) | (() => Promise<void>),
    fun: (() => void) | (() => Promise<void>),
    _extraFields: { [header: string]: string }
  ) {
    if (!(await this.shouldSkip(testName))) {
      await sleep(100); // Sleep a bit to help GC, test independence?
      global.gc();
      await this.warmup(setupFun, fun);
      return false;
    } else return true;
  }

  private async shouldSkip(testName: string) {
    if (this.framework.regex.test(this.suiteName + "/" + testName)) {
      console.log("      " + testName);
      return false;
    } else return true;
  }

  private async warmup(
    setupFun: (() => void) | (() => Promise<void>),
    fun: (() => void) | (() => Promise<void>)
  ) {
    // Run warmupRuns times or until warmupStopTime
    // seconds pass, whichever is shorter
    let startTime = Date.now();
    for (let i = 0; i < warmupRuns; i++) {
      if (Date.now() - startTime >= warmupStopTime * 1000) break;
      await setupFun();
      await fun();
    }
  }
}

export default new Framework();

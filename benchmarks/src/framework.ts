import Benchmark from "benchmark";
import path from "path";
import * as math from "mathjs";
import fs from "fs";
import csvWriter from "csv-write-stream";
import streams from "memory-streams";

const maxTime = 1; // max time for all benchmarks, in seconds.
// benchGeneral will stop after this time is exceeded so long
// as at least minRuns have elapsed,
// so it may run over.
const minRuns = 5; // min runs for all benchmarks
const maxRuns = 10; // max runs for benchGeneral.
const warmupRuns = 5;
const warmupStopTime = 1; // stop warmup early if it takes
// at least this many seconds

class Framework {
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

  newSuite(suiteName: string) {
    console.log("    " + suiteName);
    return new FrameworkSuite(suiteName, this);
  }
}

class FrameworkSuite {
  constructor(readonly suiteName: string, readonly framework: Framework) {}

  /**
   * Benchmark the CPU time of fun, using benny.
   * @param  testName File to output this test's results to,
   * within this suite's directory
   * @param  setupFun Function to run once before each cycle
   * (series of fun calls run in a row to generate a timeable
   * interval)
   * @param  fun Function to benchmark
   */
  benchCpu(
    testName: string,
    setupFun: () => void,
    fun: () => void,
    extraFields: { [header: string]: string } = {}
  ) {
    if (this.prepare(testName, setupFun, fun, extraFields)) return;
    // Time with benchmark
    let suite = new Benchmark.Suite(this.suiteName);
    suite.add(testName, fun, { maxTime: maxTime, minSamples: minRuns });
    // Run setup function before each cycle
    suite.on("start", () => {
      setupFun();
    });
    suite.on("cycle", () => {
      setupFun();
    });
    let myThis = this;
    // Record results when complete
    suite.on("complete", function (this: Benchmark[]) {
      let result = this[0];
      myThis.recordResult(
        testName,
        "Time (sec)",
        result.stats.mean,
        result.stats.deviation,
        result.stats.sample.length,
        extraFields
      );
    });
    // Run
    suite.run();
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
  benchMemory(
    testName: string,
    setupFun: () => void,
    fun: () => Object,
    extraFields: { [header: string]: string } = {}
  ) {
    let memStart = 0;
    let wrappedSetupFun = () => {
      setupFun();
      global.gc();
      memStart = process.memoryUsage().heapUsed;
    };
    let wrappedFun = () => {
      let memoryRef = fun();
      global.gc();
      let memDiff = process.memoryUsage().heapUsed - memStart;
      return memDiff;
    };
    this.benchGeneral(
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
  benchGeneral(
    testName: string,
    metric: string,
    setupFun: () => void,
    fun: () => number,
    extraFields: { [header: string]: string } = {},
    runs?: number
  ) {
    if (this.prepare(testName, setupFun, fun, extraFields)) return;
    let results: number[] = [];
    let startTime = Date.now();
    for (let i = 0; i < (runs ? runs : maxRuns); i++) {
      if (!runs && i >= minRuns && Date.now() - startTime >= maxTime * 1000)
        break;
      setupFun();
      results[i] = fun();
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
  private recordResult(
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
    if (this.framework.noWrite) console.log();
    else {
      // Write the buffer to file
      fs.appendFileSync(outFile, buffer.toString());
    }
  }

  /**
   * @return          true if the test should be skipped
   */
  private prepare(
    testName: string,
    setupFun: () => void,
    fun: () => void,
    extraFields: { [header: string]: string }
  ): boolean {
    if (this.framework.regex.test(this.suiteName + "/" + testName)) {
      console.log("      " + testName + ", " + JSON.stringify(extraFields));
      this.warmup(setupFun, fun);
      return false;
    } else return true;
  }

  private warmup(setupFun: () => void, fun: () => void) {
    // Run warmupRuns times or until warmupStopTime
    // seconds pass, whichever is shorter
    let startTime = Date.now();
    for (let i = 0; i < warmupRuns; i++) {
      if (Date.now() - startTime >= warmupStopTime * 1000) break;
      setupFun();
      fun();
    }
  }
}

export default new Framework();

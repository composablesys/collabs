import Benchmark from "benchmark";
import path from "path";
import * as math from "mathjs";
import fs from "fs";
import csvWriter from "csv-write-stream";

const maxTime = 5; // max time for all benchmark, in seconds.
// benchGeneral will stop after this time is exceeded,
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
  setup(outDir: string, version: string) {
    this.outDir = outDir;
    this.version = version;
  }

  newSuite(suiteName: string) {
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
  benchCpu(testName: string, setupFun: () => void, fun: () => void) {
    this.warmup(setupFun, fun);
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
        result.stats.sample.length
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
   * TODO: what's the best way to do this?
   */
  benchMemory(testName: string, setupFun: () => void, fun: () => Object) {
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
    this.benchGeneral(testName, "Memory (bytes)", wrappedSetupFun, wrappedFun);
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
   */
  benchGeneral(
    testName: string,
    metric: string,
    setupFun: () => void,
    fun: () => number
  ) {
    this.warmup(setupFun, fun);
    let results: number[] = [];
    let startTime = Date.now();
    for (let i = 0; i < maxRuns; i++) {
      if (i >= minRuns && Date.now() - startTime >= maxTime * 1000) break;
      setupFun();
      results[i] = fun();
    }
    // TODO: what metrics?
    this.recordResult(
      testName,
      metric,
      math.mean(results),
      math.std(results),
      results.length
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
   */
  private recordResult(
    testName: string,
    metric: string,
    mean: number,
    stdDev: number,
    count: number
  ) {
    let parentDir = path.join(this.framework.outDir, this.suiteName);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    let outFile = path.join(parentDir, testName + ".csv");
    let writer;
    if (!fs.existsSync(outFile)) {
      writer = csvWriter({
        headers: ["Metric", "Version", "Mean", "StdDev", "Count"],
      });
    } else {
      writer = csvWriter({ sendHeaders: false });
    }

    writer.pipe(fs.createWriteStream(outFile, { flags: "a" }));
    writer.write({
      Metric: metric,
      Version: this.framework.version,
      Mean: mean,
      StdDev: stdDev,
      Count: count,
    });
    writer.end();
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

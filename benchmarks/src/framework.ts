import b from "benny";
import path from "path";
import math from "mathjs";
import fs from "fs";
import { csvWriter } from "csv-write-stream";

const maxTime = 120; // max time for a benchmark, in seconds
const warmupRuns = 5;
const warmupStopTime = 1; // stop warmup early if it takes
// at least this many seconds
const generalMinRuns = 5; // min runs for benchGeneral
const generalMaxRuns = 10; // max runs for benchGeneral.
const generalStopTime = maxTime; // The test ends early if
// this time is exceeded, so long as at least generalMinRuns
// runs have completed.

class Framework {
  constructor() {}

  outDir!: string;
  version!: string;
  setup(outDir: string, version: string) {
    this.outDir = outDir;
    this.version = version;
  }

  newSuite(name: string) {
    return new FrameworkSuite(name, this);
  }
}

class FrameworkSuite {
  constructor(readonly name: string, readonly framework: Framework) {}

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
    // Time with benny
    b.suite(
      this.name,
      b.add(
        testName,
        () => {
          setupFun();
          return fun;
        },
        { maxTime: maxTime }
      ),
      b.cycle(),
      b.complete((summary) => console.log(summary))
      //b.complete(summary => this.recordResult(testName, "Time (sec)", summary) // TODO
    );
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
    for (let i = 0; i < generalMaxRuns; i++) {
      if (
        i >= generalMinRuns &&
        Date.now() - startTime >= generalStopTime * 1000
      )
        break;
      setupFun();
      results[i] = fun();
    }
    // TODO: what metrics?
    this.recordResult(testName, metric, math.mean(results), math.std(results));
  }

  private recordResult(
    testName: string,
    metric: string,
    mean: number,
    deviation: number
  ) {
    let outFile = path.join(this.framework.outDir, this.name, testName);
    let writer;
    if (!fs.existsSync(outFile)) {
      writer = csvWriter({
        headers: ["Metric", "Version", "Mean", "Deviation"],
      });
    } else {
      writer = csvWriter({ sendHeaders: false });
    }

    writer.pipe(fs.createWriteStream(outFile, { flags: "a" }));
    writer.write({
      Metric: metric,
      Version: this.framework.version,
      Mean: mean,
      Deviation: deviation,
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

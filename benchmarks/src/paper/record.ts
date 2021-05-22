import path from "path";
import * as math from "mathjs";
import fs from "fs";
import csvWriter from "csv-write-stream";
import streams from "memory-streams";
import memwatch from "@airbnb/node-memwatch";

let folder = ".";

export function record(
  fileBase: string,
  name: string,
  frequency: "whole" | "rounds",
  trials: number,
  results: number[],
  roundResults: number[][],
  roundOps: number[],
  baseValues: number[],
  startingBaseline: number
) {
  // Skip if there were no recorded trials
  if (getRecordedTrials() === 0) return;

  // Output to files
  let headers;
  if (frequency === "whole")
    headers = ["Date", "Version", "Name", "Mean", "StdDev", "Count"];
  else
    headers = [
      "Date",
      "Version",
      "Name",
      "Round",
      "OpsSoFar",
      "Mean",
      "StdDev",
      "Count",
    ];
  for (let i = 0; i < trials; i++) {
    headers.push("Sample " + i);
  }
  for (let i = 0; i < trials; i++) {
    headers.push("Base " + i);
  }
  headers.push("StartingBaseline");
  let outFile = path.join(folder, fileBase + "-" + frequency + ".csv");
  let parent = path.dirname(outFile);
  let buffer = new streams.WritableStream();

  if (!fs.existsSync(parent)) {
    fs.mkdirSync(parent, { recursive: true });
  }
  let writer;
  if (!fs.existsSync(outFile)) {
    writer = csvWriter({
      headers: headers,
    });
  } else {
    writer = csvWriter({ sendHeaders: false });
  }
  writer.pipe(buffer);

  switch (frequency) {
    case "whole":
      // Print final mean, stddev, data
      let mean = math.mean(results);
      let stddev = math.std(results);
      console.log("Results:");
      console.log(results);
      console.log(`Mean: ${mean}\nStdDev: ${stddev}`);
      let data: any = {
        Date: new Date().toDateString(),
        Version: version,
        Name: name,
        Mean: mean,
        StdDev: stddev,
        Count: results.length,
      };
      for (let i = 0; i < results.length; i++) {
        data["Sample " + i] = results[i];
      }
      for (let i = 0; i < results.length; i++) {
        data["Base " + i] = baseValues[i];
      }
      data["StartingBaseline"] = startingBaseline;
      writer.write(data);
      break;
    case "rounds":
      for (let i = 0; i < roundOps.length; i++) {
        let roundResult = roundResults.map((rounds) => rounds[i]);
        let mean = math.mean(roundResult);
        let stddev = math.std(roundResult);
        console.log("Round " + i + " results:");
        console.log(roundResult);
        console.log(`Mean: ${mean}\nStdDev: ${stddev}`);

        let data: any = {
          Date: new Date().toDateString(),
          Version: version,
          Name: name,
          Round: i,
          OpsSoFar: roundOps[i],
          Mean: mean,
          StdDev: stddev,
          Count: roundResult.length,
        };
        for (let i = 0; i < roundResult.length; i++) {
          data["Sample " + i] = roundResult[i];
        }
        for (let i = 0; i < roundResult.length; i++) {
          data["Base " + i] = baseValues[i];
        }
        data["StartingBaseline"] = startingBaseline;
        writer.write(data);
      }
      break;
  }
  writer.end();
  fs.appendFileSync(outFile, buffer.toString());

  // TODO: also output raw data in another file
}

export function setFolder(theFolder: string) {
  folder = theFolder;
}

let version = "";
export function setVersion(theVersion: string) {
  version = theVersion;
}

let warmupTrials = 0;
export function setWarmupTrials(trials: number) {
  warmupTrials = trials;
}
export function getWarmupTrials(): number {
  return warmupTrials;
}

let recordedTrials = 0;
export function setRecordedTrials(trials: number) {
  recordedTrials = trials;
}
export function getRecordedTrials(): number {
  return recordedTrials;
}

// Helper funcs

export async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

// memwatch.on("stats", (stats: memwatch.GcStats) => {
//   console.log("stats: " + stats.used_heap_size);
// });

export async function getMemoryUsed(): Promise<number> {
  // Force the event loop to turn over fully, so that
  // all pending "stats" events are dispatched (I'm guessing
  // during the IO events queue portion of the event loop).
  // Otherwise the first "stats" event we capture may be
  // for an old memory measurement.
  //
  // Basing this on the description of the event loop here:
  // https://miro.medium.com/max/2880/1*2yXbhvpf1kj5YT-m_fXgEQ.png
  // from the article:
  // https://blog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810
  //
  // Two sleep(0)'s works in my tests so far, while a single
  // sleep (even for a longer period, e.g., 5 ms) does not.
  // This suggests that setTimeout calls during the execution
  // of a previous setTimeout's function are queued for
  // the next big event loop iteration, instead of being
  // placed on the current setTimeout queue, although
  // I haven't read this officially.
  // It also worked when I tried a mix of a sleep(0) and
  // a Promise using setImmediate (either order).
  await sleep(0);
  await sleep(0);
  // @ts-ignore types forgot gc
  memwatch.gc();
  return new Promise<number>((resolve) => {
    // @ts-ignore types forgot once
    memwatch.once("stats", (stats: memwatch.GcStats) => {
      resolve(stats.used_heap_size);
    });
  });
}

let s = "";
for (var i = 32; i <= 126; i++) {
  s += String.fromCharCode(i);
}
export const CHARS = s;
export function randomChar(rng: seedrandom.prng) {
  let index = Math.floor(rng() * CHARS.length);
  return CHARS[index];
}

import path from "path";
import * as math from "mathjs";
import fs from "fs";
import csvWriter from "csv-write-stream";
import streams from "memory-streams";

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
  // Output to files
  let headers;
  if (frequency === "whole")
    headers = ["Date", "Name", "Mean", "StdDev", "Count"];
  else
    headers = ["Date", "Name", "Round", "OpsSoFar", "Mean", "StdDev", "Count"];
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

export function setFolder(newFolder: string) {
  folder = newFolder;
}

let isTestRun = false;
export function setIsTestRun() {
  isTestRun = true;
}
export function getIsTestRun() {
  return isTestRun;
}

// Helper funcs

export async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMemoryUsed(): Promise<number> {
  global.gc();
  await sleep(1000); // Sleep a bit to help the GC?
  return process.memoryUsage().heapUsed;
}

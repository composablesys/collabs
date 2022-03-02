import path from "path";
import * as math from "mathjs";
import fs from "fs";
import csvWriter from "csv-write-stream";
import streams from "memory-streams";

let folder = ".";

export function record(
  fileBase: string,
  implementationName: string,
  label: string, // E.g. "Send", round number
  values: number[],
  // If defined, these are subtracted from values in the average
  // (but the raw data is also recorded).
  bases?: number[]
) {
  // Skip if there are no values.
  if (values.length === 0) return;

  // Prep headers.
  const headers = [
    "Date",
    "Version",
    "Implementation",
    "Label",
    "Mean",
    "StdDev",
    "Count",
  ];
  for (let i = 0; i < values.length; i++) {
    headers.push("Sample " + i);
  }
  if (bases !== undefined) {
    for (let i = 0; i < values.length; i++) {
      headers.push("Base " + i);
    }
  }

  // Prep output file.
  const outFile = path.join(folder, fileBase + ".csv");
  const parent = path.dirname(outFile);
  const buffer = new streams.WritableStream();
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

  // Print final mean, stddev, data.
  const results: number[] = [];
  for (let i = 0; i < values.length; i++) {
    results[i] = bases !== undefined ? values[i] - bases[i] : values[i];
  }
  const mean = math.mean(results);
  const stddev = math.std(results);
  console.log("Results:");
  console.log(results);
  console.log(`Mean: ${mean}\nStdDev: ${stddev}`);

  // Output to file.
  const data: any = {
    Date: new Date().toDateString(),
    Version: version,
    Implementation: implementationName,
    Label: label,
    Mean: mean,
    StdDev: stddev,
    Count: results.length,
  };
  for (let i = 0; i < values.length; i++) {
    data["Sample " + i] = values[i];
  }
  if (bases !== undefined) {
    for (let i = 0; i < results.length; i++) {
      data["Base " + i] = bases[i];
    }
  }
  writer.write(data);
  writer.end();
  fs.appendFileSync(outFile, buffer.toString());
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

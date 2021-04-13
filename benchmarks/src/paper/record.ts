import path from "path";
import * as math from "mathjs";
import fs from "fs";
import csvWriter from "csv-write-stream";
import streams from "memory-streams";

let folder = ".";

export function record(fileBase: string, name: string, results: number[]) {
  // Print final mean, stddev, data
  let mean = math.mean(results);
  let stddev = math.std(results);
  console.log("Results:");
  console.log(results);
  console.log(`Mean: ${mean}\nStdDev: ${stddev}`);

  // Output to files
  let headers = ["Date", "Name", "Mean", "StdDev", "Count"];
  let outFile = path.join(folder, fileBase + ".csv");
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

  writer.write({
    Date: new Date().toDateString(),
    Name: name,
    Mean: mean,
    StdDev: stddev,
    Count: results.length,
  });
  writer.end();
  fs.appendFileSync(outFile, buffer.toString());

  // TODO: also output raw data in another file
}

export function setFolder(newFolder: string) {
  folder = newFolder;
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

import fs from "fs";
import { glob } from "glob";
import path from "path";
import framework from "./framework";

function printUsage() {
  console.log("Usage: npm start <outDir> <version>");
  process.exit(1);
}

if (process.argv.length != 4) printUsage();

let outDir = process.argv[2];
let version = process.argv[3];
fs.access(outDir, function (error) {
  if (error) {
    console.log("Failed to access outDir: ");
    console.log(error);
    printUsage();
  }
});

// Pass args to the framework, like global vars
framework.setup(outDir, version);
// Run every file in suites/, which uses framework
glob.sync("./build/src/suites/**/*.js").forEach(function (file) {
  require(path.resolve(file));
});

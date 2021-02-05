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
try {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.accessSync(outDir, fs.constants.W_OK);
} catch (err) {
  console.log("Failed to access outDir: ");
  console.log(err);
  printUsage();
}

// Pass args to the framework, like global vars
framework.setup(outDir, version);
// Run every file in suites/, which uses framework
glob.sync("./build/src/suites/**/*.js").forEach(function (file) {
  console.log(file);
  require(path.resolve(file));
});

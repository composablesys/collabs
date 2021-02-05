import fs from "fs";
import { glob } from "glob";
import path from "path";
import arg from "arg";
import framework from "./framework";

function printUsage(exitCode: number) {
  console.log(`Usage: npm start -- <outDir> <version> [options]
Options:
  -n, --no-write\t\tDon't write to files, but print what you would write
  -o, --only=REGEX\tOnly run tests with "suiteName/testName" matching REGEX
  -h, --help\t\tPrint this help content
`);
  process.exit(exitCode);
}

const args = arg({
  // Options
  "--no-write": Boolean,
  "--only": String,
  "--help": Boolean,
  // Aliases
  "-n": "--no-write",
  "-o": "--only",
  "-h": "--help",
});

if (args["--help"]) printUsage(0);

if (args._.length != 2) {
  console.log("Error: Wrong number of arguments");
  printUsage(1);
}

let outDir = args._[0];
let version = args._[1];
let noWrite = args["--no-write"] ? true : false;
let regex!: RegExp;
try {
  regex = new RegExp(args["--only"] ? "^" + args["--only"] + "$" : ".*");
} catch (err) {
  console.log("Error parsing REGEX passed to --only:");
  console.log(err);
  printUsage(2);
}

// Check outDir is accessible
if (!noWrite) {
  try {
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    fs.accessSync(outDir, fs.constants.W_OK);
  } catch (err) {
    console.log("Failed to access outDir: ");
    console.log(err);
    printUsage(3);
  }
}

// Pass args to the framework, like global vars
framework.setup(outDir, version, noWrite, regex);
// Run every file in suites/, which uses framework
glob.sync("./build/src/suites/**/*.js").forEach(function (file) {
  console.log("  " + file);
  require(path.resolve(file));
});

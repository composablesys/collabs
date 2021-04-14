import arg from "arg";
import automergePerf from "./automerge_perf/benchmark";
import todoList from "./todo_list/benchmark";
import { setFolder } from "./record";
import microCrdts from "./micro_crdts/benchmark";

(async function () {
  function printUsage(exitCode: number) {
    console.log(`Usage: npm start -- <out folder> <major test> <test args...>
Options:
  -h, --help\t\tPrint this help content
`);
    process.exit(exitCode);
  }

  const args = arg({
    // Options
    "--help": Boolean,
    // Aliases
    "-h": "--help",
  });

  if (args["--help"]) printUsage(0);

  if (args._.length < 2) {
    console.log("Error: Wrong number of arguments");
    printUsage(1);
  }

  setFolder(args._[0]);
  let majorTest = args._[1];
  let testArgs = args._.slice(2);

  switch (majorTest) {
    case "automerge_perf":
      await automergePerf(testArgs);
      break;
    case "todo_list":
      await todoList(testArgs);
      break;
    case "micro_crdts":
      await microCrdts(testArgs);
      break;
    default:
      console.log("Unrecognized major test: " + majorTest);
      printUsage(2);
  }
})();

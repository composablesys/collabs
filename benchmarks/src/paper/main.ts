import automergePerf from "./automerge_perf/benchmark";
import todoList from "./todo_list/benchmark";
import {
  setFolder,
  setRecordedTrials,
  setVersion,
  setWarmupTrials,
} from "./record";
import microCrdts from "./micro_collabs/benchmark";
import microAutomerge from "./micro_automerge/benchmark";
import microYjs from "./micro_yjs/benchmark";

(async function () {
  function printUsage(exitCode: number) {
    console.log(`Usage: npm start -- <out folder> <version> <warmup trials> <recorded trials> <major test> <test args...>
If <recorded trials> is 0, no output is recorded.
You can set both trial counts to 0 to do a test run (check that test names and args are valid without running the actual experiments).
`);
    process.exit(exitCode);
  }

  let args = process.argv.slice(2);
  setFolder(args[0]);
  setVersion(args[1]);
  setWarmupTrials(Number.parseInt(args[2]));
  setRecordedTrials(Number.parseInt(args[3]));
  let majorTest = args[4];
  let testArgs = args.slice(5);

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
    case "micro_automerge":
      await microAutomerge(testArgs);
      break;
    case "micro_yjs":
      await microYjs(testArgs);
      break;
    default:
      console.log("Unrecognized major test: " + majorTest);
      printUsage(2);
  }
})();

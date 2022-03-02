import {
  setFolder,
  setRecordedTrials,
  setVersion,
  setWarmupTrials,
} from "./record";
import text_trace from "./benchmarks/text_trace/benchmark";
import todo_list from "./benchmarks/todo_list/benchmark";

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
    case "text_trace":
      await text_trace(testArgs);
      break;
    case "todo_list":
      await todo_list(testArgs);
      break;
    // TODO:
    // case "micro_collabs":
    //   await microCollabs(testArgs);
    //   break;
    // case "micro_automerge":
    //   await microAutomerge(testArgs);
    //   break;
    // case "micro_yjs":
    //   await microYjs(testArgs);
    //   break;
    default:
      console.log("Unrecognized major test: " + majorTest);
      printUsage(2);
  }
})();

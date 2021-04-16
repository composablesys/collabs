import arg from "arg";
import automergePerf from "./automerge_perf/benchmark";
import todoList from "./todo_list/benchmark";
import { setFolder, setIsTestRun } from "./record";
import microCrdts from "./micro_crdts/benchmark";
import microAutomerge from "./micro_automerge/benchmark";

(async function () {
  function printUsage(exitCode: number) {
    console.log(`Usage: npm start -- <out folder | --testRun> <major test> <test args...>
`);
    process.exit(exitCode);
  }

  let args = process.argv.slice(2);
  if (args[0] === "--testRun") setIsTestRun();
  else setFolder(args[0]);
  let majorTest = args[1];
  let testArgs = args.slice(2);

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
    default:
      console.log("Unrecognized major test: " + majorTest);
      printUsage(2);
  }
})();

import {
  setFolder,
  setRecordedTrials,
  setVersion,
  setWarmupTrials,
} from "./record";
import { AutomergeMap } from "./replica-benchmark/implementations/automerge/map";
import { AutomergeVariable } from "./replica-benchmark/implementations/automerge/variable";
import { AutomergeText } from "./replica-benchmark/implementations/automerge/text";
import { AutomergeTodoList } from "./replica-benchmark/implementations/automerge/todo_list";
import { CollabsDeletingText } from "./replica-benchmark/implementations/collabs/deleting_text";
import { CollabsDeletingTodoList } from "./replica-benchmark/implementations/collabs/deleting_todo_list";
// import { CollabsJSONOptTodoList } from "./replica-benchmark/implementations/collabs/json_opt_todo_list";
import { CollabsJSONTextTodoList } from "./replica-benchmark/implementations/collabs/json_text_todo_list";
import { CollabsJSONTodoList } from "./replica-benchmark/implementations/collabs/json_todo_list";
import { CollabsMap } from "./replica-benchmark/implementations/collabs/map";
import { CollabsVariable } from "./replica-benchmark/implementations/collabs/variable";
import { CollabsRichText } from "./replica-benchmark/implementations/collabs/rich_text";
import { CollabsText } from "./replica-benchmark/implementations/collabs/text";
import { YjsMap } from "./replica-benchmark/implementations/yjs/map";
import { YjsVariable } from "./replica-benchmark/implementations/yjs/variable";
import { YjsText } from "./replica-benchmark/implementations/yjs/text";
import { YjsTodoList } from "./replica-benchmark/implementations/yjs/todo_list";
import {
  Implementation,
  ReplicaBenchmark,
  Trace,
} from "./replica-benchmark/replica_benchmark";
import { MicroMapRollingTrace } from "./replica-benchmark/traces/micro_map_rolling_trace";
import { MicroMapTrace } from "./replica-benchmark/traces/micro_map_trace";
import { MicroVariableTrace } from "./replica-benchmark/traces/micro_variable_trace";
import { MicroTextLtrTrace } from "./replica-benchmark/traces/micro_text_ltr_trace";
import { MicroTextRandomTrace } from "./replica-benchmark/traces/micro_text_random_trace";
import { RealTextTrace } from "./replica-benchmark/traces/real_text_trace";
import { TodoListTrace } from "./replica-benchmark/traces/todo_list_trace";
import { RealText100Trace } from "./replica-benchmark/traces/real_text_100_trace";
import { CollabsTextCausalityGuaranteed } from "./replica-benchmark/implementations/collabs/text_causality_guaranteed";

const traces: { [name: string]: Trace<unknown> } = {
  MicroMapRolling: new MicroMapRollingTrace(),
  MicroMap: new MicroMapTrace(),
  MicroVariable: new MicroVariableTrace(),
  MicroTextLtr: new MicroTextLtrTrace(),
  MicroTextRandom: new MicroTextRandomTrace(),
  RealText: new RealTextTrace(),
  RealText100: new RealText100Trace(),
  TodoList: new TodoListTrace(),
};

const implementations: { [name: string]: Implementation<unknown> } = {
  AutomergeMap: AutomergeMap,
  AutomergeVariable: AutomergeVariable,
  AutomergeText: AutomergeText,
  AutomergeTodoList: AutomergeTodoList,
  CollabsDeletingText: CollabsDeletingText,
  CollabsDeletingTodoList: CollabsDeletingTodoList,
  // CollabsJSONOptTodoList: CollabsJSONOptTodoList,
  CollabsJSONTextTodoList: CollabsJSONTextTodoList,
  CollabsJSONTodoList: CollabsJSONTodoList,
  CollabsMap: CollabsMap,
  CollabsVariable: CollabsVariable,
  CollabsRichText: CollabsRichText,
  CollabsText: CollabsText,
  CollabsTextCausalityGuaranteed: CollabsTextCausalityGuaranteed,
  YjsMap: YjsMap,
  YjsVariable: YjsVariable,
  YjsText: YjsText,
  YjsTodoList: YjsTodoList,
};

(async function () {
  function printUsage(exitCode: number) {
    console.log(`Usage: npm start -- <out folder> <version> <warmup trials> <recorded trials> <measurement> <trace> <implementation> <mode>
If <recorded trials> is 0, no output is recorded.
You can set both trial counts to 0 to do a test run (check that test names and args are valid without running the actual experiments).
`);
    process.exit(exitCode);
  }

  const args = process.argv.slice(2);
  if (args.length !== 8) {
    console.log("Wrong number of arguments");
    printUsage(100);
  }

  setFolder(args[0]);
  setVersion(args[1]);
  setWarmupTrials(Number.parseInt(args[2]));
  setRecordedTrials(Number.parseInt(args[3]));

  const traceName = args[5];
  const trace = traces[traceName];
  if (trace === undefined) {
    console.log("Unrecognized trace: " + args[5]);
    printUsage(5);
  }

  const implementationName = args[6];
  const implementation = implementations[implementationName];
  if (implementation === undefined) {
    console.log("Unrecognized implementation: " + args[6]);
    printUsage(6);
  }

  const replicaBenchmark = new ReplicaBenchmark<unknown>(
    trace,
    traceName,
    implementation,
    implementationName
  );

  const mode = <"single" | "multi">args[7];
  if (!(mode === "single" || mode === "multi")) {
    console.log('Invalid mode (must be "single" or "multi"): ' + mode);
    printUsage(7);
  }

  const measurement = args[4];
  switch (measurement) {
    case "sendTime":
      await replicaBenchmark.sendTime(mode);
      break;
    case "sendMemory":
      await replicaBenchmark.sendMemory(mode);
      break;
    case "sendNetwork":
      await replicaBenchmark.sendNetwork(mode);
      break;
    case "receiveTime":
      await replicaBenchmark.receiveTime(mode);
      break;
    case "receiveMemory":
      await replicaBenchmark.receiveMemory(mode);
      break;
    case "receiveSave":
      await replicaBenchmark.receiveSave(mode);
      break;
    default:
      console.log("Unrecognized measurement: " + measurement);
      printUsage(4);
  }
})();

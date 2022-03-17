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

const traces: { [name: string]: Trace<unknown> } = {
  MicroMapRolling: new MicroMapRollingTrace(),
  MicroMap: new MicroMapTrace(),
  MicroVariable: new MicroVariableTrace(),
  MicroTextLtr: new MicroTextLtrTrace(),
  MicroTextRandom: new MicroTextRandomTrace(),
  RealText: new RealTextTrace(),
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
  YjsMap: YjsMap,
  YjsVariable: YjsVariable,
  YjsText: YjsText,
  YjsTodoList: YjsTodoList,
};

(async function () {
  function printUsage(exitCode: number) {
    console.log(`Usage: npm start -- <out folder> <version> <warmup trials> <recorded trials> <trace> <implementation> <measurement>
If <recorded trials> is 0, no output is recorded.
You can set both trial counts to 0 to do a test run (check that test names and args are valid without running the actual experiments).
`);
    process.exit(exitCode);
  }

  const args = process.argv.slice(2);
  if (args.length !== 7) {
    console.log("Wrong number of arguments");
    printUsage(100);
  }

  setFolder(args[0]);
  setVersion(args[1]);
  setWarmupTrials(Number.parseInt(args[2]));
  setRecordedTrials(Number.parseInt(args[3]));

  const traceName = args[4];
  const trace = traces[traceName];
  if (trace === undefined) {
    console.log("Unrecognized trace: " + args[4]);
    printUsage(4);
  }

  const implementationName = args[5];
  const implementation = implementations[implementationName];
  if (implementation === undefined) {
    console.log("Unrecognized implementation: " + args[5]);
    printUsage(5);
  }

  const replicaBenchmark = new ReplicaBenchmark<unknown>(
    trace,
    traceName,
    implementation,
    implementationName
  );

  const measurement = args[6];
  switch (measurement) {
    case "sendTime":
      await replicaBenchmark.send("Time");
      break;
    case "sendMemory":
      await replicaBenchmark.send("Memory");
      break;
    case "sendNetwork":
      await replicaBenchmark.sendNetwork();
      break;
    case "receiveTime":
      await replicaBenchmark.receive("Time");
      break;
    case "receiveMemory":
      await replicaBenchmark.receive("Memory");
      break;
    case "save":
      await replicaBenchmark.save();
      break;
    default:
      if (measurement.startsWith("concurrent")) {
        const split = measurement.split(" ");
        if (split.length !== 5) {
          console.log("Wrong number of tokens in concurrentReceive arg");
          console.log(
            'concurrentReceive measurement format: single argument "concurrentReceive<Time | Memory> <coarse | fine> <numUsers> <concOpStart> <concOps>"'
          );
          printUsage(7);
        }

        const metric = <"Time" | "Memory">(
          split[0].substring("concurrentReceive".length)
        );
        if (!(metric === "Time" || metric === "Memory")) {
          console.log("Unrecognized concurrentReceive metric: " + split[1]);
          printUsage(8);
        }

        const concType = <"coarse" | "fine">split[1];
        if (!(concType === "coarse" || concType === "fine")) {
          console.log("Unrecognized concurrentReceive concType: " + split[1]);
          printUsage(9);
        }

        const numUsers = parseInt(split[2]);
        const concOpStart = parseInt(split[3]);
        const concOps = parseInt(split[4]);
        await replicaBenchmark.concurrentReceive(
          metric,
          concType,
          numUsers,
          concOpStart,
          concOps
        );
      } else {
        console.log("Unrecognized measurement: " + measurement);
        printUsage(6);
      }
  }
})();

import {
  setFolder,
  setRecordedTrials,
  setVersion,
  setWarmupTrials,
} from "./record";
import { AutomergeMap } from "./replica-benchmark/implementations/automerge/map";
import { AutomergeText } from "./replica-benchmark/implementations/automerge/text";
import { AutomergeTextWithCursor } from "./replica-benchmark/implementations/automerge/text_with_cursor";
import { AutomergeVariable } from "./replica-benchmark/implementations/automerge/variable";
import { CollabsMap } from "./replica-benchmark/implementations/collabs/map";
import { CollabsNestedNoop } from "./replica-benchmark/implementations/collabs/nested_noop";
import { CollabsNoop } from "./replica-benchmark/implementations/collabs/noop";
import { CollabsRichTextWithCursor } from "./replica-benchmark/implementations/collabs/rich_text_with_cursor";
import { CollabsText } from "./replica-benchmark/implementations/collabs/text";
import { CollabsTextWithCursor } from "./replica-benchmark/implementations/collabs/text_with_cursor";
import { CollabsTodoList } from "./replica-benchmark/implementations/collabs/todo_list";
import { CollabsVariable } from "./replica-benchmark/implementations/collabs/variable";
import { YjsMap } from "./replica-benchmark/implementations/yjs/map";
import { YjsText } from "./replica-benchmark/implementations/yjs/text";
import { YjsTextWithCursor } from "./replica-benchmark/implementations/yjs/text_with_cursor";
import { YjsTodoList } from "./replica-benchmark/implementations/yjs/todo_list";
import { YjsVariable } from "./replica-benchmark/implementations/yjs/variable";
import {
  Implementation,
  Mode,
  ReplicaBenchmark,
  Trace,
} from "./replica-benchmark/replica_benchmark";
import { MapRollingTrace } from "./replica-benchmark/traces/map_rolling_trace";
import { MapTrace } from "./replica-benchmark/traces/map_trace";
import { TextLtrTrace } from "./replica-benchmark/traces/text_ltr_trace";
import { TextRandomTrace } from "./replica-benchmark/traces/text_random_trace";
import { VariableTrace } from "./replica-benchmark/traces/variable_trace";
import { NoopTrace } from "./replica-benchmark/traces/noop_trace";
import { RealTextTrace } from "./replica-benchmark/traces/real_text_trace";
import { TodoListTrace } from "./replica-benchmark/traces/todo_list_trace";

const traces: { [name: string]: Trace<unknown> } = {
  MapRolling: new MapRollingTrace(),
  Map: new MapTrace(),
  Variable: new VariableTrace(),
  TextLtr: new TextLtrTrace(),
  TextRandom: new TextRandomTrace(),
  RealText: new RealTextTrace(),
  TodoList: new TodoListTrace(),
  Noop: new NoopTrace(),
};

const implementations: { [name: string]: Implementation<unknown> } = {
  AutomergeMap: AutomergeMap,
  AutomergeVariable: AutomergeVariable,
  AutomergeText: AutomergeText,
  AutomergeTextWithCursor: AutomergeTextWithCursor,
  // For Collabs, we have two versions of each benchmark:
  // a default version that enforces causal ordering, and a
  // CG ("causality guaranteed") version that does not, i.e., it
  // assumes the network guarantees causal ordering.
  CollabsTodoList: CollabsTodoList(false),
  CollabsNoVCTodoList: CollabsTodoList(true),
  CollabsMap: CollabsMap(false),
  CollabsNoVCMap: CollabsMap(true),
  CollabsVariable: CollabsVariable(false),
  CollabsNoVCVariable: CollabsVariable(true),
  CollabsRichTextWithCursor: CollabsRichTextWithCursor(false),
  CollabsNoVCRichTextWithCursor: CollabsRichTextWithCursor(true),
  CollabsText: CollabsText(false),
  CollabsNoVCText: CollabsText(true),
  CollabsTextWithCursor: CollabsTextWithCursor(false),
  CollabsNoVCTextWithCursor: CollabsTextWithCursor(true),
  CollabsNoop: CollabsNoop(false),
  CollabsNoVCNoop: CollabsNoop(true),
  CollabsNestedNoop: CollabsNestedNoop(false),
  CollabsNoVCNestedNoop: CollabsNestedNoop(true),
  YjsMap: YjsMap,
  YjsVariable: YjsVariable,
  YjsText: YjsText,
  YjsTextWithCursor: YjsTextWithCursor,
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

  const mode = <Mode>args[7];
  if (!(mode === "single" || mode === "rotate" || mode === "concurrent")) {
    console.log(
      "Invalid mode (expected: single | rotate | concurrent): " + mode
    );
    printUsage(7);
  }

  const measurement = args[4];
  switch (measurement) {
    case "sendTime":
      if (mode !== "single") {
        throw new Error('sendTime only supports "single" mode');
      }
      await replicaBenchmark.sendTimeSingle();
      break;
    case "sendMemory":
      if (mode !== "single") {
        throw new Error('sendTime only supports "single" mode');
      }
      await replicaBenchmark.sendMemorySingle();
      break;
    case "receiveNetwork": {
      const [msgs, finalState] = await replicaBenchmark.getSentMessages(mode);
      await replicaBenchmark.receiveNetwork(mode, msgs, finalState);
      break;
    }
    case "receiveTime": {
      const [msgs, finalState] = await replicaBenchmark.getSentMessages(mode);
      await replicaBenchmark.receiveTime(mode, msgs, finalState);
      break;
    }
    case "receiveMemory": {
      const [msgs, finalState] = await replicaBenchmark.getSentMessages(mode);
      await replicaBenchmark.receiveMemory(mode, msgs, finalState);
      break;
    }
    case "receiveSave": {
      const [msgs, finalState] = await replicaBenchmark.getSentMessages(mode);
      await replicaBenchmark.receiveSave(mode, msgs, finalState);
      break;
    }
    case "receiveAll": {
      // All receive benchmarks, with a single call to getSentMessages
      // to save time.
      const [msgs, finalState] = await replicaBenchmark.getSentMessages(mode);
      await replicaBenchmark.receiveNetwork(mode, msgs, finalState);
      await replicaBenchmark.receiveTime(mode, msgs, finalState);
      await replicaBenchmark.receiveMemory(mode, msgs, finalState);
      await replicaBenchmark.receiveSave(mode, msgs, finalState);
      break;
    }
    default:
      console.log("Unrecognized measurement: " + measurement);
      printUsage(4);
  }
})();

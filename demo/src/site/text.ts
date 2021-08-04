import {
  Runtime,
  DefaultCausalBroadcastNetwork,
  WebSocketNetwork,
} from "compoventuals-client";
import {
  YataDeleteEvent,
  YataFormatExistingEvent,
  YataInsertEvent,
  YataLinear,
} from "./yata";
import Quill, { DeltaOperation } from "quill";

const HOST = location.origin.replace(/^http/, "ws");

let client = new Runtime(
  new DefaultCausalBroadcastNetwork(
    new WebSocketNetwork(HOST, "variable_counter")
  ),
  { periodMs: 5000 }
);

let clientText = client.registerCrdt(
  "text",
  new YataLinear<string>("", ["\n"])
);

// const Quill: any = Q;
var quill = new Quill("#editor", {
  theme: "snow",
});
interface IDelta {
  ops: DeltaOperation[];
}

const getRelevantDeltaOperations = (
  delta: IDelta
): {
  idx: number;
  insert?: string;
  delete?: number;
  attributes?: Record<string, any>;
  retain?: number;
}[] => {
  const relevantOps = [];
  let idx = 0;
  for (let op of delta.ops) {
    if (!op.retain || op.attributes) {
      relevantOps.push({ idx, ...op });
    }
    idx += op.retain ?? op.delete ?? op.insert.length;
    // if (op.retain && !op.attributes) {
    //     idx += op.retain;
    // } else {
    //     relevantOps.push({idx, ...op});
    //     idx += op.retain ?? op.delete ?? op.insert.length;
    // }
  }
  return relevantOps;
};

quill.on("text-change", (delta, oldDelta, source) => {
  if (source === "user") {
    console.log(getRelevantDeltaOperations(delta));
    getRelevantDeltaOperations(delta).forEach((op) => {
      console.log("op:", op);
      // Insertion (always one character)
      if (op.insert) {
        for (let i = 0; i < op.insert.length; i++) {
          clientText.insertByIdx(
            client.replicaId,
            op.idx + i,
            op.insert[i],
            op.attributes
          );
        }
      }
      // Deletion (can be many characters)
      else if (op.delete) {
        console.log("deleting", op.delete, "characters");
        clientText.deleteByIdx(op.idx, op.delete);
      }
      // Formatting (can be many characters)
      else if (op.attributes && op.retain) {
        clientText.changeAttributeByIdx(op.idx, op.retain, op.attributes);
      }
    });
  }
});

let Delta = Quill.import("delta");

clientText.on(
  "Insert",
  ({ idx, timestamp, isLocal, newOp, uid }: YataInsertEvent<string>) => {
    if (!isLocal) {
      const formats: Record<string, any> = {};
      const it = newOp.attributes.entries();
      let result = it.next();
      while (!result.done) {
        formats[result.value[0] as string] = result.value[1];
        result = it.next();
      }
      quill.updateContents(
        new Delta().retain(idx).insert(newOp.content, formats)
      );
    }
  }
);

clientText.on(
  "Delete",
  ({ idx, uid, isLocal, timestamp }: YataDeleteEvent<string>) => {
    if (!isLocal) {
      quill.updateContents(new Delta().retain(idx).delete(1));
    }
  }
);

clientText.on(
  "FormatExisting",
  ({
    idx,
    uid,
    key,
    value,
    isLocal,
    timestamp,
  }: YataFormatExistingEvent<string>) => {
    quill.updateContents(new Delta().retain(idx).retain(1, { [key]: value }));
  }
);

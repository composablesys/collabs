import { ContainerSource } from "compoventuals-container";
import {
  YataDeleteEvent,
  YataFormatExistingEvent,
  YataInsertEvent,
  YataLinear,
} from "./yata";
import Quill, { DeltaOperation } from "quill";

/**
 * Quill breaks a bit when used inside a Shadow DOM
 * because it expects to find its components on the global
 * window/document.  See https://github.com/quilljs/quill/issues/2961
 * One of the users in that issue found a fix which we
 * reproduce in this function.  Note that they claim
 * it does not work in Safari.
 * Source: https://stackoverflow.com/a/67944380
 */
function fixQuillForShadowDom(quill: Quill, shadowRoot: ShadowRoot) {
  const normalizeNative = (nativeRange: any) => {
    // document.getSelection model has properties startContainer and endContainer
    // shadow.getSelection model has baseNode and focusNode
    // Unify formats to always look like document.getSelection

    if (nativeRange) {
      const range = nativeRange;

      if (range.baseNode) {
        range.startContainer = nativeRange.baseNode;
        range.endContainer = nativeRange.focusNode;
        range.startOffset = nativeRange.baseOffset;
        range.endOffset = nativeRange.focusOffset;

        if (range.endOffset < range.startOffset) {
          range.startContainer = nativeRange.focusNode;
          range.endContainer = nativeRange.baseNode;
          range.startOffset = nativeRange.focusOffset;
          range.endOffset = nativeRange.baseOffset;
        }
      }

      if (range.startContainer) {
        return {
          start: { node: range.startContainer, offset: range.startOffset },
          end: { node: range.endContainer, offset: range.endOffset },
          native: range,
        };
      }
    }

    return null;
  };

  // Hack Quill and replace document.getSelection with shadow.getSelection

  // @ts-ignore quill.selection not in types
  quill.selection.getNativeRange = () => {
    // TODO: nonstandard, not supported by Firefox or Safari.
    // document.getSelection() as an alternative doesn't work
    // in Firefox.
    const selection = shadowRoot.getSelection();
    const range = normalizeNative(selection);

    return range;
  };

  // Subscribe to selection change separately,
  // because emitter in Quill doesn't catch this event in Shadow DOM

  document.addEventListener("selectionchange", () => {
    // Update selection and some other properties

    // @ts-ignore quill.selection not in types
    quill.selection.update();
  });
}

const container: ContainerSource = {
  isContainerSource: true,
  attachNewContainer(document, runtime) {
    // HTML
    document.innerHTML = `
      <div style="background-color: #e06666ff; width: 100%; height: 100%;">
        <!-- Include stylesheet TODO-->
        <link
          href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
          rel="stylesheet"
        />

        <!-- Create the editor container -->
        <div style="display: block; height: 80vh; background-color: white">
          <div id="editor" style="font-size: 2vh; background-color: white"></div>
        </div>
        <div
          style="
            margin: 8vh 3vw 3vh;
            display: block;
            color: white;
            font-size: 4vh;
            font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
          "
        >
          Start typing in the text editor above!
        </div>

        <p id="text"></p>
      </div>
    `;

    let clientText = runtime.registerCrdt(
      "text",
      new YataLinear<string>("", ["\n"])
    );

    // Note that CSS selector strings don't work because Quill
    // runs them against the global document, not the shadow DOM.
    const editorElement = document.getElementById("editor")!;
    var quill = new Quill(editorElement, { theme: "snow" });
    fixQuillForShadowDom(quill, document);
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
                runtime.replicaId,
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
        quill.updateContents(
          new Delta().retain(idx).retain(1, { [key]: value })
        );
      }
    );
  },
};
export default container;

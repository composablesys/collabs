import { Runtime, DefaultCausalBroadcastNetwork, WebSocketNetwork } from 'compoventuals-client';
import {YataDeleteEvent, YataFormatExistingEvent, YataInsertEvent, YataLinear} from "./yata";
import * as Q from 'quill';
import Quill, {DeltaOperation} from "quill";

const HOST = location.origin.replace(/^http/, 'ws');

let client = new Runtime(
    new DefaultCausalBroadcastNetwork(
        new WebSocketNetwork(HOST, "variable_counter")
    )
    , {periodMs: 5000}
);

let clientText = client.registerCrdt("text", new YataLinear<string>(''));

// const Quill: any = Q;
var quill = new Quill('#editor', {
    theme: 'snow',
});
interface IDelta {
    ops: DeltaOperation[]
}

const getRelevantDeltaOperation = (delta: IDelta): {
    idx: number, insert?: string, delete?: number, attributes?: Record<string, any>, retain?: number
} => {
    let idx = 0;
    for (let op of delta.ops) {
        if (op.retain && !op.attributes) {
            idx += op.retain;
        } else {
            return {idx, ...op};
        }
    }
    return {idx: 0};
}

quill.on("text-change", (delta, oldDelta, source) => {
    if (source === "user") {
        const op = getRelevantDeltaOperation(delta);
        // Insertion (always one character)
        if (op.insert) {
            clientText.insertByIdx(
                client.replicaId, client.getReplicaUniqueNumber(), op.idx, op.insert, op.attributes);
        }
        // Deletion (can be many characters)
        else if (op.delete) {
            clientText.deleteByIdx(op.idx, op.delete);
        }
        // Formatting (can be many characters)
        else if (op.attributes && op.retain) {
            clientText.changeAttributeByIdx(op.idx, op.retain, op.attributes);
        }
    }
})

let Delta = Quill.import("delta");

clientText.on("Insert", ({idx, timestamp, isLocal, newOp, uid}: YataInsertEvent<string>) => {
    if (!isLocal) {
        const formats:Record<string, any> = {};
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
});

clientText.on("Delete", ({idx, uid, isLocal, timestamp}: YataDeleteEvent<string>) => {
    if (!isLocal) {
        quill.updateContents(
            new Delta().retain(idx).delete(1)
        )
    }
});

clientText.on("FormatExisting", ({idx, uid, key, value, isLocal, timestamp}: YataFormatExistingEvent<string>) => {
    quill.updateContents(
        new Delta().retain(idx).retain(1, {[key]: value})
    )
})

// const getIdx = (delta: IDelta): {idx: number, insert?: any, delete?: any, attributes?: Record<string, any>, retain?: any} => {
//     let idx = 0;
//     for (let op of delta.ops) {
//         if (op.retain && !op.attributes) {
//             idx += op.retain;
//         }
//         if (op.insert || op.delete || op.attributes) {
//             return {idx, ...op};
//         }
//     }
//     return {idx: 0};
// }
//
// let idLeftOfCursor = clientText.START;
//
// quill.on('text-change', function(delta, oldDelta, source) {
//     if (source === "user") {
//         console.log("TEXT CHANGE FROM USER")
//         const idxObj = getIdx(delta);
//         if (idxObj.insert) {
//             idLeftOfCursor = clientText.insertByIdx(client.replicaId, idxObj.idx, idxObj.insert.split(''), idxObj.attributes);
//             console.log("text-change: insert: idLeftOfCursor", [idLeftOfCursor], "idx:", clientText.getIdxOfId(idLeftOfCursor));
//         } else if (idxObj.delete) {
//             idLeftOfCursor = clientText.deleteByIdx(idxObj.idx, idxObj.delete);
//             console.log("text-change: delete: idLeftOfCursor", [idLeftOfCursor], "idx:", clientText.getIdxOfId(idLeftOfCursor));
//         } else if (idxObj.attributes) {
//             idLeftOfCursor = clientText.changeAttributeByIdx(idxObj.idx, idxObj.retain, idxObj.attributes);
//             console.log("text-change: attribute: idLeftOfCursor", [idLeftOfCursor], "idx:", clientText.getIdxOfId(idLeftOfCursor));
//         }
//
//     }
// });
//
// quill.on('selection-change', function(range, oldRange, source) {
//     console.log('selection-change from', source);
//     idLeftOfCursor = clientText.getIdAtIdx((range ? range.index : oldRange.index) - 1);
//     console.log("selection-change: idLeftOfCursor = ", [idLeftOfCursor], "idx = ", clientText.getIdxOfId(idLeftOfCursor));
//     if (source === 'user') {
//         // console.log("selection-change", range, oldRange, source);
//         // console.log("selection-change: idLeftOfCursor = ", [idLeftOfCursor], "idx = ", clientText.getIdxOfId(idLeftOfCursor));
//     }
// })
//
// clientText.opMap.on("Add", (_) => {
//     console.log("Add event!")
//     const rightId = _.value.rightId;
//     const leftId = _.value.leftId;
//     const id = clientText.opMap.uidOf(_.value);
//     clientText.op(rightId).leftId = id;
//     clientText.op(leftId).rightId = id;
// })
//
// clientText.on("Change", (e) => {
//     console.log("change event", e);
//     console.log("quill length", quill.getLength());
//     console.log("quill content", quill.getText());
//     const deleteLength = quill.getLength() - 1;
//     // const str = clientText.toArray().join('');
//     const textArr = clientText.toArray();
//     console.log("on Change client text to array", textArr);
//     console.log("on Change client text to id array", clientText.toIdArray());
//     for (let i = textArr.length - 1; i >= 0; i--) {
//         console.log(deleteLength);
//         quill.deleteText(0, Math.min(deleteLength, i + 1));
//         console.log("deleted", Math.min(deleteLength, i + 1), "characters");
//         quill.insertText(0, "a".repeat(i) + textArr[i].content, textArr[i].attributes);
//         console.log("inserted", "a".repeat(i) + textArr[i].content);
//     }
//     // textArr.forEach((elem, index) => {
//     //     console.log("foreach", index, elem.content, elem.attributes);
//     //     quill.insertText(index, elem.content, elem.attributes);
//     // });
//     // quill.insertText(0, str, "api");
//     console.log("idLeftOfCursor is", [idLeftOfCursor]);
//     console.log("(idx of idLeftOfCursor) + 1 is", clientText.getIdxOfId(idLeftOfCursor) + 1)
//     quill.setSelection({index: clientText.getIdxOfId(idLeftOfCursor) + 1, length: 0}, 'api');
//     // quill.deleteText(textArr.length, deleteLength);
//     console.log(quill.getContents());
//
// });
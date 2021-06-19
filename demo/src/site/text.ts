import { Runtime, DefaultCausalBroadcastNetwork, WebSocketNetwork } from 'compoventuals-client';
import {YataLinear} from "./yata";
import * as Q from 'quill';
import Quill, {DeltaOperation} from "quill";

const HOST = location.origin.replace(/^http/, 'ws');

let client = new Runtime(
    new DefaultCausalBroadcastNetwork(
        new WebSocketNetwork(HOST, "variable_counter")
    )
    // , {periodMs: 5000}
);

let clientText = client.registerCrdt("text", new YataLinear<string>(''));

// const Quill: any = Q;
var quill = new Quill('#editor', {
    theme: 'snow',
});
interface IDelta {
    ops: DeltaOperation[]
}

const getIdx = (delta: IDelta): {idx: number, insert?: any, delete?: any} => {
    let idx = 0;
    for (let op of delta.ops) {
        if (op.retain) {
            idx += op.retain;
        }
        if (op.insert || op.delete) {
            return {idx, ...op};
        }
    }
    return {idx: 0};
}

quill.on('text-change', function(delta, oldDelta, source) {
    if (source === "user") {
        const idxObj = getIdx(delta);
        if (idxObj.insert) {
            clientText.insertByIdx(client.replicaId, idxObj.idx, idxObj.insert);
        } else if (idxObj.delete) {
            clientText.deleteByIdx(idxObj.idx);
        }
    }
});

// let idRightOfCursor = clientText.END;

quill.on('selection-change', function(range, oldRange, source) {
    if (source === 'user') {
        // idRightOfCursor = clientText.getIdAtIdx(range.index);
    }
})

// document.getElementById("text_button")!.onclick = function () {
//     const idx = parseFloat(document.getElementById('text_index')!.nodeValue!);
//     const char = document.getElementById('text_character')!.nodeValue!;
//     clientText.insert(
//         client.getReplicaId(),
//         client.getReplicaUniqueNumber(),
//         clientText.toIdArray()[idx],
//         clientText.toIdArray()[idx + 1],
//         char
//     )
// };

// const updateText = () => {
//     console.log(clientText.toArray());
//     document.getElementById('text')!.innerHTML = clientText.toArray().join('');
// }

clientText.opMap.on("Add", (_) => {
    console.log("Add event!")
    const rightId = _.value.rightId;
    const leftId = _.value.leftId;
    const id = clientText.opMap.uidOf(_.value);
    clientText.op(rightId).leftId = id;
    clientText.op(leftId).rightId = id;
})

clientText.on("Change", (e) => {
    console.log("Change event!", e);
    const str = clientText.toArray().join('');
    quill.insertText(0, str, "api");
    quill.deleteText(str.length, quill.getLength() - 1);

    // const len = quill.getLength();
    // console.log("quill length is", len);
    // console.log("str length is", str.length);
    // console.log("About to set selection to correspond with id:", idRightOfCursor);
    // quill.setSelection({index: clientText.getIdxOfId(idRightOfCursor), length: 0});
    // quill.setSelection(range);


    // // quill.focus();
    // // quill.setSelection(0,1, "user");
    // console.log("cursor idx", clientText.getCursorIdx());
    // quill.setSelection({index: clientText.getCursorIdx(), length:0})
});
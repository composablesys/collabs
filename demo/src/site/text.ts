import { crdts, network } from 'compoventuals-client';
import {YataLinear} from "./yata";
import * as Q from 'quill';
import Quill, {DeltaOperation} from "quill";

const HOST = location.origin.replace(/^http/, 'ws');

let client = new crdts.CrdtRuntime(
    new network.DefaultCausalBroadcastNetwork(
        new network.WebSocketNetwork(HOST, "variable_counter")
    )
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
            clientText.insertByIdx(client.getReplicaId(), client.getReplicaUniqueNumber(), idxObj.idx, idxObj.insert);
        } else if (idxObj.delete) {
            clientText.deleteByIdx(idxObj.idx);
        }
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

const updateText = () => {
    console.log(clientText.toArray());
    document.getElementById('text')!.innerHTML = clientText.toArray().join('');
}

clientText.on("Change", (_) => {
    updateText();
    quill.setText(clientText.toArray().join(''));
    quill.focus();
    // quill.setSelection(0,1, "user");
    quill.setSelection({index: clientText.getCursorIdx(), length:0})
});
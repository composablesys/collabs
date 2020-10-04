"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Creating the grid */
const minesweeper_crdt_1 = require("./minesweeper_crdt");
const compoventuals_client_1 = require("compoventuals-client");
const uuid_1 = require("uuid");
function grid(game) {
    let board = document.getElementById("board");
    // @ts-ignore
    board.innerHTML = "";
    for (let i = 0; i < 16; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 16; j++) {
            let box = document.createElement("th");
            box.setAttribute("row", i.toString());
            box.setAttribute("col", j.toString());
            box.className = "cell";
            box.id = "row_" + i.toString() + "_" + j.toString();
            box.addEventListener("click", function () {
                game.leftClicked(i, j);
                grid(game);
            });
            // box.addEventListener("contextmenu", function (e) {
            //     e.preventDefault();
            //     game.rightClicked(i, j);
            //     grid(game);
            // });
            box.appendChild(document.createTextNode(game.display(i, j)));
            box.style.color = game.color(i, j);
            row.appendChild(box);
        }
        // @ts-ignore
        board.appendChild(row);
    }
}
let HOST = location.origin.replace(/^http/, 'ws');
const client_uuid = uuid_1.v4();
/**
 * Generate CRDTs' Runtime on each client and create CRDTs (e.g. CounterCrdt).
 */
let client = new compoventuals_client_1.network.CrdtNetworkRuntime(client_uuid, HOST);
let seed = '42';
let game = new minesweeper_crdt_1.MinesweeperCrdt("minesweeperId", client, 16, 16, 40, seed);
grid(game);
//# sourceMappingURL=minesweeper.js.map
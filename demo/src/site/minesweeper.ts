/* Creating the grid */
import {Minesweeper} from "./minesweeper_array";

function grid(game: Minesweeper) {
    let board = document.getElementById("board")
    // @ts-ignore
    board.innerHTML = ""

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
            box.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                game.rightClicked(i, j);
                grid(game);
            });
            box.appendChild(document.createTextNode(game.display(i, j)))
            box.style.color = game.color(i, j)
            row.appendChild(box);
        }

        // @ts-ignore
        board.appendChild(row);
    }
}

let game = new Minesweeper(16, 16, 40)

grid(game);


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinesweeperCrdt = void 0;
const compoventuals_client_1 = require("compoventuals-client");
const rand_seed_1 = __importDefault(require("rand-seed"));
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["BOOM"] = 0] = "BOOM";
    GameStatus[GameStatus["WON"] = 1] = "WON";
    GameStatus[GameStatus["CONT"] = 2] = "CONT";
})(GameStatus || (GameStatus = {}));
var TileStatus;
(function (TileStatus) {
    TileStatus[TileStatus["COVERED"] = 0] = "COVERED";
    TileStatus[TileStatus["REVEALED_EMPTY"] = -1] = "REVEALED_EMPTY";
    TileStatus[TileStatus["BOOM"] = -2] = "BOOM";
})(TileStatus || (TileStatus = {}));
class MinesweeperCrdt extends compoventuals_client_1.crdts.Crdt {
    constructor(id, runtime, width, height, numMines, seed) {
        let board = Array(width * height);
        super(id, new compoventuals_client_1.crdts.ArrayCrdtInternal(new compoventuals_client_1.crdts.MinesweeperInternal()), runtime, board);
        this.width = width;
        this.height = height;
        this.rand = new rand_seed_1.default(seed);
        this.mines = this.placeMines(width, height, numMines);
    }
    leftClicked(x, y) {
        if (this.isMine(x, y)) {
            this.setValue(x, y, TileStatus.BOOM);
            return GameStatus.BOOM;
        }
        if (this.isRevealed(x, y)) {
            return GameStatus.CONT;
        }
        this.reveal(x, y);
        return this.hasWon();
    }
    /**
     * A user wins when only mines are covered or flagged.
     */
    hasWon() {
        for (let i = 0; i < this.width * this.height; i++) {
            let value = this.get(i);
            if (value === TileStatus.COVERED && !this.mines.has(value)) {
                return GameStatus.CONT;
            }
        }
        return GameStatus.WON;
    }
    /**
     * Recursively traverses the board starting from (x, y) until there is
     * at least one neighbor mine.
     * It assumes that (x, y) is not a mine.
     */
    reveal(x, y) {
        let neighbors = this.resolveNeighbors(x, y);
        let neighboringMines = 0;
        for (let neighbor of neighbors) {
            let [x_neighbor, y_neighbor] = neighbor;
            if (this.isMine(x_neighbor, y_neighbor)) {
                neighboringMines += 1;
            }
        }
        // There is at least one mine in the surroundings
        if (neighboringMines > 0) {
            this.setValue(x, y, neighboringMines);
            return;
        }
        this.setValue(x, y, TileStatus.REVEALED_EMPTY);
        // Recursively call reveal on the non-revealed (or flagged) neighbors
        for (let neighbor of neighbors) {
            let [x_neighbor, y_neighbor] = neighbor;
            if (!this.isRevealed(x_neighbor, y_neighbor)) {
                this.reveal(x_neighbor, y_neighbor);
            }
        }
    }
    setValue(x, y, value) {
        let idx = this.getIndex(x, y);
        this.applyOp([idx, value]);
        return;
    }
    getValue(x, y) {
        let idx = this.getIndex(x, y);
        return this.get(idx);
    }
    get(idx) {
        return this.state[idx];
    }
    /**
     * For coordinates [x, y], it finds the corresponding index in the values array.
     * @param x
     * @param y
     * @private
     */
    getIndex(x, y) {
        if (!(Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x < this.width && y >= 0 && y < this.height)) {
            throw new Error("Out of bounds: [" + x + ", " + y + "]");
        }
        return x * this.width + y;
    }
    // <------- UTILITIES ------->
    /**
     * Returns true if the current cell has been revealed, false otherwise.
     * Revealed means either it has a number, or has been flipped.
     */
    isRevealed(x, y) {
        let value = this.getValue(x, y);
        return value === TileStatus.REVEALED_EMPTY || value > 0;
    }
    /**
     * Returns true if the current cell is a mine, false otherwise.
     */
    isMine(x, y) {
        let idx = this.getIndex(x, y);
        return this.mines.has(idx);
    }
    /**
     * Given a coordinate, it finds all of it's neighbors.
     * A neighbor is defined as the 8 surrounding cells (unless on the border,
     * which would be any surrounding cell not outside he board).
     * Source: https://stackoverflow.com/questions/652106/finding-neighbours-in-a-two-dimensional-array
     * PD.: Sorry for being lazy and looking this up.
     */
    resolveNeighbors(x, y) {
        let neighbors = [];
        for (let i = Math.max(0, x - 1); i <= Math.min(x + 1, this.width - 1); i++) {
            for (let j = Math.max(0, y - 1); j <= Math.min(y + 1, this.height - 1); j++) {
                if (x !== i || y !== j) {
                    neighbors.push([i, j]);
                }
            }
        }
        return neighbors;
    }
    /**
     * Resolves what to display on the board.
     * @param x the x coordinate.
     * @param y the y coordinate.
     */
    display(x, y) {
        if (this.getValue(x, y) > 0) {
            return this.getValue(x, y).toString();
        }
        if (this.isRevealed(x, y)) {
            return "R";
        }
        if (this.getValue(x, y) === TileStatus.COVERED) {
            return "";
        }
        // if it got here it is a mine
        return "X";
    }
    /**
     * Resolves what color should the tile be.
     * @param x the x coordinate.
     * @param y the y coordinate.
     */
    color(x, y) {
        let value = this.getValue(x, y);
        switch (value) {
            case 1:
                return "blue";
            case 2:
                return "green";
            case 3:
                return "red";
            case 4:
                return "purple";
            case 5:
                return "black";
            case 6:
                return "maroon";
            case 7:
                return "grey";
            case 8:
                return "turquoise";
            case TileStatus.REVEALED_EMPTY:
                return "Gainsboro";
            default:
                return "black";
        }
    }
    /**
     * Utility function to get a number in range [0, max)
     */
    getRandomInt(max) {
        return Math.floor(this.rand.next() * Math.floor(max));
    }
    /**
     * Randomly places the mines on the board.
     * TODO - revisit this, as it doesnt hold.
     */
    placeMines(width, height, numMines) {
        let indices = [...Array(width * height).keys()];
        let mines = Array(numMines);
        while (numMines > 0) {
            let minePos = this.getRandomInt(indices.length);
            mines[numMines - 1] = indices[minePos];
            indices.splice(minePos, 1);
            numMines--;
        }
        console.debug(mines.toString());
        return new Set(mines);
    }
}
exports.MinesweeperCrdt = MinesweeperCrdt;
//# sourceMappingURL=minesweeper_crdt.js.map
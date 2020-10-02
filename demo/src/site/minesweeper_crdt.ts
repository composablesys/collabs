import {crdts, network} from "compoventuals-client";
import Rand from 'rand-seed';

enum GameStatus {
    BOOM,
    WON,
    CONT
}

enum TileStatus {
    COVERED = 0,
    REVEALED_EMPTY = -1,
    BOOM = -2,
}

export class MinesweeperCrdt extends crdts.Crdt<number[]> {

    width: number;
    height: number;
    mines: Set<number>;
    rand: Rand;

    constructor(id: any, runtime: network.CrdtRuntime, width: number, height: number, numMines: number, seed: string) {
        let board: number[] = Array(width * height);
        super(
            id,
            new crdts.ArrayCrdtInternal(new crdts.MinesweeperInternal()),
            runtime,
            board
        );
        this.width = width;
        this.height = height;
        this.rand = new Rand(seed);
        this.mines = this.placeMines(width, height, numMines);
    }

    leftClicked(x: number, y: number): GameStatus {
        if (this.isMine(x, y)) {
            this.setValue(x, y, TileStatus.BOOM)
            return GameStatus.BOOM;
        }

        if (this.isRevealed(x, y)) {
            return GameStatus.CONT;
        }

        this.reveal(x, y);

        return this.hasWon()
    }

    /**
     * A user wins when only mines are covered or flagged.
     */
    private hasWon(): GameStatus {
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
    private reveal(x: number, y: number) {
        let neighbors: Array<[number, number]> = this.resolveNeighbors(x, y);
        let neighboringMines: number = 0;

        for (let neighbor of neighbors) {
            let [x_neighbor, y_neighbor]: [number, number] = neighbor;
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
            let [x_neighbor, y_neighbor]: [number, number] = neighbor;
            if (!this.isRevealed(x_neighbor, y_neighbor)) {
                this.reveal(x_neighbor, y_neighbor)
            }
        }
    }

    private setValue(x: number, y: number, value: number) {
        let idx: number = this.getIndex(x, y);
        this.applyOp([idx, value])
        return;
    }

    private getValue(x: number, y: number): number {
        let idx: number = this.getIndex(x, y);
        return this.get(idx)
    }

    private get(idx: number): number {
        return this.state[idx];
    }

    /**
     * For coordinates [x, y], it finds the corresponding index in the values array.
     * @param x
     * @param y
     * @private
     */
    private getIndex(x: number, y: number) {
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
    private isRevealed(x: number, y: number): boolean {
        let value = this.getValue(x, y)
        return value === TileStatus.REVEALED_EMPTY || value > 0;
    }

    /**
     * Returns true if the current cell is a mine, false otherwise.
     */
    private isMine(x: number, y: number): boolean {
        let idx = this.getIndex(x, y)
        return this.mines.has(idx);
    }

    /**
     * Given a coordinate, it finds all of it's neighbors.
     * A neighbor is defined as the 8 surrounding cells (unless on the border,
     * which would be any surrounding cell not outside he board).
     * Source: https://stackoverflow.com/questions/652106/finding-neighbours-in-a-two-dimensional-array
     * PD.: Sorry for being lazy and looking this up.
     */
    private resolveNeighbors(x: number, y: number): Array<[number, number]> {
        let neighbors: Array<[number, number]> = [];
        for (let i = Math.max(0, x - 1); i <= Math.min(x + 1, this.width - 1); i++) {
            for (let j = Math.max(0, y - 1); j <= Math.min(y + 1, this.height - 1); j++) {
                if (x !== i || y !== j) {
                    neighbors.push([i, j])
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
    display(x: number, y: number): string {
        if (this.getValue(x, y) > 0) {
            return this.getValue(x, y).toString();
        }

        if (this.isRevealed(x, y)) {
            return "R"
        }

        if (this.getValue(x, y) === TileStatus.COVERED) {
            return "";
        }

        // if it got here it is a mine
        return "X"
    }

    /**
     * Resolves what color should the tile be.
     * @param x the x coordinate.
     * @param y the y coordinate.
     */
    color(x: number, y: number): string {
        let value: number = this.getValue(x, y)

        switch (value) {
            case 1:
                return "blue"
            case 2:
                return "green"
            case 3:
                return "red"
            case 4:
                return "purple"
            case 5:
                return "black";
            case 6:
                return "maroon";
            case 7:
                return "grey";
            case 8:
                return "turquoise"
            case TileStatus.REVEALED_EMPTY:
                return "Gainsboro"
            default:
                return "black";
        }
    }

    /**
     * Utility function to get a number in range [0, max)
     */
    private getRandomInt(max: number) {
        return Math.floor(this.rand.next() * Math.floor(max));
    }

    /**
     * Randomly places the mines on the board.
     * TODO - revisit this, as it doesnt hold.
     */
    private placeMines(width: number, height: number, numMines: number): Set<number> {
        let indices = [...Array(width * height).keys()]
        let mines = Array(numMines);
        while (numMines > 0) {
            let minePos = this.getRandomInt(indices.length);
            mines[numMines - 1] = indices[minePos]
            indices.splice(minePos, 1);
            numMines--;
        }
        console.debug(mines.toString())
        return new Set(mines);
    }
}

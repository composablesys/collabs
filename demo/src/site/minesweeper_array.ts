enum GameStatus {
    BOOM,
    WON,
    CONT
}

enum TileStatus {
    COVERED = 0,
    FLAGGED = -1,
    REVEALED_EMPTY = -2,
    BOOM = -3,
}
// TODO - TO BE REMOVED, used it to test the logic!
export class Minesweeper {

    width: number;
    height: number;
    mines: Set<number>;
    board: Array<number>;

    constructor(width: number, height: number, numMines: number) {
        this.board = Array(width * height).fill(TileStatus.COVERED);
        this.width = width;
        this.height = height;
        this.mines = Minesweeper.placeMines(width, height, numMines);
    }

    private getIndex(x: number, y: number) {
        if (!(Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x < this.width && y >= 0 && y < this.height)) {
            throw new Error("Out of bounds: [" + x + ", " + y + "]");
        }
        return x * this.width + y;
    }

    leftClicked(x: number, y: number): GameStatus {
        if (this.isBomb(x, y)) {
            this.setValue(x, y, TileStatus.BOOM)
            return GameStatus.BOOM;
        }

        if (this.isRevealed(x, y) || this.isFlag(x, y)) {
            return GameStatus.CONT;
        }

        this.reveal(x, y);

        return this.hasWon()
    }

    rightClicked(x: number, y: number) {
        if (this.isRevealed(x, y)) {
            return; // no-op
        }

        if (this.isFlag(x, y)) {
            this.setValue(x, y, TileStatus.COVERED);
        } else {
            this.setValue(x, y, TileStatus.FLAGGED)
        }
    }

    private hasWon(): GameStatus {
        for (let i = 0; i < this.board.length; i++) {
            let value = this.board[i];
            if ((value === TileStatus.COVERED || value === TileStatus.FLAGGED) && !this.mines.has(value)) {
                return GameStatus.CONT;
            }
        }
        return GameStatus.WON;
    }

    private reveal(x: number, y: number) {
        let neighbors: Array<[number, number]> = this.resolveNeighbors(x, y);
        let neighboringBombs: number = 0;

        for (let neighbor of neighbors) {
            let [x_neighbor, y_neighbor]: [number, number] = neighbor;
            if (this.isBomb(x_neighbor, y_neighbor)) {
                neighboringBombs += 1;
            }
        }

        if (neighboringBombs > 0) {
            this.setValue(x, y, neighboringBombs);
            return;
        }

        this.setValue(x, y, TileStatus.REVEALED_EMPTY);

        for (let neighbor of neighbors) {
            let [x_neighbor, y_neighbor]: [number, number] = neighbor;
            if (!this.isRevealed(x_neighbor, y_neighbor) && !this.isFlag(x_neighbor, y_neighbor)) {
                this.reveal(x_neighbor, y_neighbor)
            }
        }
    }

    private resolveNeighbors(x: number, y: number): Array<[number, number]> {
        let neighbors: Array<[number, number]> = [];
        // source: https://stackoverflow.com/questions/652106/finding-neighbours-in-a-two-dimensional-array
        // sorry, i was too lazy.
        for (let i = Math.max(0, x - 1); i <= Math.min(x + 1, this.width - 1); i++) {
            for (let j = Math.max(0, y - 1); j <= Math.min(y + 1, this.height - 1); j++) {
                if (x !== i || y !== j) {
                    neighbors.push([i, j])
                }
            }
        }

        return neighbors;
    }

    private setValue(x: number, y: number, value: number) {
        let idx: number = this.getIndex(x, y);
        this.board[idx] = value;
    }

    private isFlag(x: number, y: number): boolean {
        let idx = this.getIndex(x, y)
        return this.board[idx] === TileStatus.FLAGGED;
    }

    private isRevealed(x: number, y: number): boolean {
        let idx = this.getIndex(x, y)
        return this.board[idx] === TileStatus.REVEALED_EMPTY || this.board[idx] > 0;
    }

    private isBomb(x: number, y: number): boolean {
        let idx = this.getIndex(x, y)
        return this.mines.has(idx);
    }

    private static getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    private static placeMines(width: number, height: number, numMines: number): Set<number> {
        let indices = [...Array(width * height).keys()]
        let mines = Array(numMines);
        while (numMines > 0) {
            let minePos = Minesweeper.getRandomInt(indices.length);
            mines[numMines - 1] = indices[minePos]
            indices.splice(minePos, 1);
            numMines--;
        }
        return new Set(mines);
    }

    display(x: number, y: number): string {
        if (this.isFlag(x, y)) {
            return "F";
        }

        if (this.board[this.getIndex(x, y)] > 0) {
            return this.board[this.getIndex(x, y)].toString();
        }

        if (this.isRevealed(x, y)) {
            return "R"
        }

        if (this.board[this.getIndex(x, y)] === 0) {
            return "";
        }

        // if it got here it is a bomb
        return "X"
    }

    color(x: number, y: number): string {
        let value: number = this.board[this.getIndex(x, y)]

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
            case TileStatus.FLAGGED:
                return "orange"
            default:
                return "black";
        }
    }
}
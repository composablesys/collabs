import {
  CBoolean,
  CObject,
  CollabID,
  CSet,
  CVar,
  InitToken,
} from "@collabs/collabs";
import { CContainer } from "@collabs/container";
import seedrandom from "seedrandom";

// Minesweeper Collab

interface GameSettings {
  readonly width: number;
  readonly height: number;
  readonly fractionMines: number;
}

enum FlagStatus {
  NONE,
  FLAG,
  QUESTION_FLAG,
}

enum TileStatus {
  BLANK,
  FLAG,
  QUESTION_FLAG,
  REVEALED_EMPTY,
  REVEALED_MINE,
}

class CTile extends CObject {
  private readonly revealed: CBoolean;
  private readonly flag: CVar<FlagStatus>;
  readonly isMine: boolean;
  number: number = 0;

  constructor(init: InitToken, isMine: boolean) {
    super(init);
    this.revealed = this.registerCollab(
      "revealed",
      (init) => new CBoolean(init)
    );
    this.flag = this.registerCollab(
      "flag",
      (init) => new CVar<FlagStatus>(init, FlagStatus.NONE)
    );
    this.isMine = isMine;
  }

  reveal() {
    this.revealed.value = true;
  }

  cycleFlag() {
    this.flag.value = (this.flag.value + 1) % 3;
  }

  isRevealed(): boolean {
    return this.revealed.value;
  }

  get status(): TileStatus {
    if (this.revealed.value) {
      return this.isMine ? TileStatus.REVEALED_MINE : TileStatus.REVEALED_EMPTY;
    } else {
      switch (this.flag.value) {
        case FlagStatus.NONE:
          return TileStatus.BLANK;
        case FlagStatus.FLAG:
          return TileStatus.FLAG;
        case FlagStatus.QUESTION_FLAG:
          return TileStatus.QUESTION_FLAG;
      }
    }
  }

  get letterCode(): string {
    switch (this.status) {
      case TileStatus.BLANK:
        return " ";
      case TileStatus.FLAG:
        return "⚑";
      case TileStatus.QUESTION_FLAG:
        return "?";
      case TileStatus.REVEALED_EMPTY:
        return this.number + "";
      case TileStatus.REVEALED_MINE:
        return "✹";
    }
  }
}

enum GameStatus {
  IN_PROGRESS,
  WON,
  LOST,
}

class CMinesweeper extends CObject {
  readonly tiles: CTile[][];
  readonly width: number;
  readonly height: number;

  constructor(
    init: InitToken,
    width: number,
    height: number,
    fractionMines: number,
    startX: number,
    startY: number,
    seed: string
  ) {
    super(init);

    this.width = width;
    this.height = height;

    // Adjust fractionMines to account for fact that start
    // won't be a mine
    const size = width * height;
    if (size > 1) fractionMines *= size / (size - 1);
    // Place mines and init tiles
    const rng = seedrandom(seed);
    this.tiles = new Array<CTile[]>(width);
    for (let x = 0; x < width; x++) {
      this.tiles[x] = new Array<CTile>(height);
      for (let y = 0; y < height; y++) {
        const isMine =
          x === startX && y === startY ? false : rng() < fractionMines;
        this.tiles[x][y] = this.registerCollab(
          x + ":" + y,
          (init) => new CTile(init, isMine)
        );
      }
    }
    // Compute neighbor numbers
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        this.tiles[x][y].number = 0;
        for (let neighbor of this.neighbors(x, y)) {
          if (this.tiles[neighbor[0]][neighbor[1]].isMine)
            this.tiles[x][y].number++;
        }
      }
    }
  }

  leftClick(x: number, y: number) {
    let tile = this.tiles[x][y];
    if (!tile.isRevealed()) {
      // Reveal it
      let status = tile.status;
      if (status === TileStatus.BLANK || status === TileStatus.QUESTION_FLAG) {
        if (tile.isMine) tile.reveal();
        else this.revealSafe(x, y);
      }
    } else if (tile.status === TileStatus.REVEALED_EMPTY) {
      // If all indicated mines are flagged, reveal all
      // non-flagged tiles
      let neighbors = this.neighbors(x, y);
      let flaggedCount = 0;
      for (let neighbor of neighbors) {
        let neighborTile = this.tiles[neighbor[0]][neighbor[1]];
        if (neighborTile.status === TileStatus.FLAG) flaggedCount++;
      }
      if (flaggedCount === tile.number) {
        // Reveal all non-revealed non-flagged neighbors,
        // as if clicked
        for (let neighbor of neighbors) {
          let neighborTile = this.tiles[neighbor[0]][neighbor[1]];
          if (neighborTile.status === TileStatus.BLANK)
            this.leftClick(neighbor[0], neighbor[1]);
        }
      }
    }
  }

  /**
   * Recursively traverses the board starting from (x, y) until there is
   * at least one neighbor mine.
   * It assumes that (x, y) is not a mine.
   */
  private revealSafe(x: number, y: number) {
    this.tiles[x][y].reveal();

    if (this.tiles[x][y].number === 0) {
      // Recursively call reveal on the non-revealed (or flagged) neighbors
      for (let neighbor of this.neighbors(x, y)) {
        let [x_neighbor, y_neighbor] = neighbor;
        if (!this.tiles[x_neighbor][y_neighbor].isRevealed()) {
          this.revealSafe(x_neighbor, y_neighbor);
        }
      }
    }
  }

  rightClick(x: number, y: number) {
    if (!this.tiles[x][y].isRevealed()) {
      this.tiles[x][y].cycleFlag();
    }
  }

  /**
   * A user wins when only mines are unrevealed,
   * and loses if any mines are revealed.
   */
  winStatus(): GameStatus {
    let allEmptyRevealed = true;
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let tile = this.tiles[x][y];
        if (tile.isMine && tile.isRevealed()) return GameStatus.LOST;
        if (!tile.isMine && !tile.isRevealed()) allEmptyRevealed = false;
      }
    }
    return allEmptyRevealed ? GameStatus.WON : GameStatus.IN_PROGRESS;
  }

  // <------- UTILITIES ------->

  /**
   * Given a coordinate, it finds all of its neighbors.
   * A neighbor is defined as the 8 surrounding cells (unless on the border,
   * which would be any surrounding cell not outside the board).
   * Source: https://stackoverflow.com/questions/652106/finding-neighbours-in-a-two-dimensional-array
   */
  private neighbors(x: number, y: number): Array<[number, number]> {
    let neighbors: Array<[number, number]> = [];
    for (
      let i = Math.max(0, x - 1);
      i <= Math.min(x + 1, this.width - 1);
      i++
    ) {
      for (
        let j = Math.max(0, y - 1);
        j <= Math.min(y + 1, this.height - 1);
        j++
      ) {
        if (x !== i || y !== j) {
          neighbors.push([i, j]);
        }
      }
    }

    return neighbors;
  }
}

(async function () {
  const board = document.getElementById("board");
  const winText = document.getElementById("winText")!;

  /* Creating the grid */
  // TODO: make refresh not destroy board each time?
  // TODO: if game over, say win/lose and display whole board
  function refreshDisplay() {
    // @ts-ignore
    board.innerHTML = "";
    let state =
      currentState.value === "settings"
        ? currentSettings.value
        : gameFactory.fromID(currentGame.value!)!;

    for (let y = 0; y < state.height; y++) {
      let row = document.createElement("tr");

      for (let x = 0; x < state.width; x++) {
        let box = document.createElement("th");
        box.setAttribute("row", y.toString());
        box.setAttribute("col", x.toString());
        box.className = "cell";
        box.id = "row_" + y.toString() + "_" + x.toString();
        if (currentState.value === "game") {
          let game = state as CMinesweeper;
          let tile = game.tiles[x][y];
          box.addEventListener("click", (event) => {
            if (event.button === 0) game.leftClick(x, y);
          });
          box.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            game.rightClick(x, y);
          });
          let letterCode = game.tiles[x][y].letterCode;
          if (letterCode === "0") letterCode = " ";
          box.appendChild(document.createTextNode(letterCode));
          // Set the text and background colors
          switch (tile.status) {
            case TileStatus.BLANK:
            case TileStatus.FLAG:
            case TileStatus.QUESTION_FLAG:
              box.style.color = "black";
              box.style.backgroundColor = "gray";
              break;
            case TileStatus.REVEALED_EMPTY:
              box.style.color = "black";
              switch (tile.number) {
                case 0:
                  box.style.backgroundColor = "Gainsboro";
                  break;
                case 1:
                  box.style.backgroundColor = "#b3e5fc";
                  break;
                case 2:
                  box.style.backgroundColor = "#c8e6c9";
                  break;
                case 3:
                  box.style.backgroundColor = "#f8bbd0";
                  break;
                case 4:
                  box.style.backgroundColor = "#e1bee7";
                  break;
                case 5:
                  box.style.backgroundColor = "#bcaaa4";
                  break;
                case 6:
                  box.style.backgroundColor = "#ffccbc";
                  break;
                case 7:
                  box.style.backgroundColor = "#fff9c4";
                  break;
                case 8:
                  box.style.backgroundColor = "#ffcdd2";
                  break;
              }
              break;
            case TileStatus.REVEALED_MINE:
              box.style.color = "red";
              box.style.backgroundColor = "Gainsboro";
          }
        } else {
          // It's GameSettings
          let settings = state as GameSettings;
          box.addEventListener("click", (event) => {
            if (event.button === 0) {
              const oldGames = currentGame.conflicts();
              // Start the game, with this tile safe
              const newGame = gameFactory.add(
                settings.width,
                settings.height,
                settings.fractionMines,
                x,
                y,
                Math.random() + ""
              );
              currentGame.value = gameFactory.idOf(newGame);
              currentState.value = "game";
              // Easy to forget: clean up old games.
              for (const oldGame of oldGames) {
                if (oldGame !== null) {
                  const game = gameFactory.fromID(oldGame);
                  if (game) gameFactory.delete(game);
                }
              }
              newGame.leftClick(x, y);
            }
          });
          box.appendChild(document.createTextNode(" "));
          box.style.backgroundColor = "gray";
        }
        row.appendChild(box);
      }

      // @ts-ignore
      board.appendChild(row);
    }

    if (state instanceof CMinesweeper) {
      let game = state as CMinesweeper;
      switch (game.winStatus()) {
        case GameStatus.WON:
          winText.innerHTML = "You won!";
          break;
        case GameStatus.LOST:
          winText.innerHTML = "You lost.";
          break;
        case GameStatus.IN_PROGRESS:
          winText.innerHTML = "";
      }
    } else {
      winText.innerHTML = "";
    }
  }

  let valid = true;
  function invalidate() {
    if (valid) {
      valid = false;
      setTimeout(() => {
        refreshDisplay();
        valid = true;
      }, 0);
    }
  }

  const widthInput = document.getElementById("width") as HTMLInputElement;
  const heightInput = document.getElementById("height") as HTMLInputElement;
  const percentMinesInput = document.getElementById(
    "percentMines"
  ) as HTMLInputElement;

  function settingsFromInput(): GameSettings {
    return {
      width: widthInput.valueAsNumber,
      height: heightInput.valueAsNumber,
      fractionMines: percentMinesInput.valueAsNumber / 100,
    };
  }

  const container = new CContainer();

  const gameFactory = container.registerCollab(
    "gameFactory",
    (init) =>
      new CSet(
        init,
        (
          valueInit: InitToken,
          width: number,
          height: number,
          fractionMines: number,
          startX: number,
          startY: number,
          seed: string
        ) =>
          new CMinesweeper(
            valueInit,
            width,
            height,
            fractionMines,
            startX,
            startY,
            seed
          )
      )
  );
  const currentGame = container.registerCollab(
    "currentGame",
    (init) => new CVar<CollabID<CMinesweeper> | null>(init, null)
  );
  const currentSettings = container.registerCollab(
    "currentSettings",
    (init) => new CVar(init, settingsFromInput())
  );
  const currentState = container.registerCollab(
    "currentState",
    (init) => new CVar<"game" | "settings">(init, "settings")
  );

  container.on("Change", invalidate);

  // Respond to user input.
  document.getElementById("newGame")!.onclick = function () {
    currentSettings.value = settingsFromInput();
    currentState.value = "settings";
  };
  // Other event listeners are added directly in refreshDisplay.

  await container.load();

  // Render the initial state.
  invalidate();

  // Ready.
  container.ready();
})();

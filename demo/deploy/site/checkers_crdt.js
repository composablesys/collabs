"use strict";
// Adapted from https://github.com/RyanBranco/Checkers/blob/master/script.js (i.e. used their game logic)
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckersCrdt = void 0;
const compoventuals_client_1 = require("compoventuals-client");
const cells = document.querySelectorAll("td");
let redsPieces = document.querySelectorAll(".red-piece");
let blacksPieces = document.querySelectorAll(".black-piece");
const redTurnText = document.querySelectorAll(".red-turn-text");
const blackTurntext = document.querySelectorAll(".black-turn-text");
const divider = document.querySelector("#divider");
const cboard = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
];
class CheckersCrdt extends compoventuals_client_1.crdts.Crdt {
    constructor(id, runtime) {
        super(id, new compoventuals_client_1.crdts.ArrayCrdtInternal(new compoventuals_client_1.crdts.CheckersInternal()), runtime, cboard);
        this.board = cboard;
        this.turn = 0;
        this.redScore = 12;
        this.blackScore = 12;
        this.playerPieces = redsPieces;
        this.selectedPiece = {
            pieceId: -1,
            indexOfBoardPiece: -1,
            isKing: false,
            seventhSpace: false,
            ninthSpace: false,
            fourteenthSpace: false,
            eighteenthSpace: false,
            minusSeventhSpace: false,
            minusNinthSpace: false,
            minusFourteenthSpace: false,
            minusEighteenthSpace: false
        };
    }
    // <------- EVENT LISTENERS ------->
    // begin the game!
    startGame() {
        console.log(cboard);
        console.log("Starting the Game!");
        this.givePiecesEventListeners();
        console.log("Listeners in Place");
    }
    // initialize event listeners on pieces
    givePiecesEventListeners() {
        if (this.turn == 0) {
            for (let i = 0; i < redsPieces.length; i++) {
                redsPieces[i].addEventListener("click", this.getPlayerPieces);
            }
        }
        else {
            for (let i = 0; i < blacksPieces.length; i++) {
                blacksPieces[i].addEventListener("click", this.getPlayerPieces);
            }
        }
    }
    // <------- GAME LOGIC ------->
    // parses pieceId's and returns the index of that piece's place on the board
    findPiece(pieceId) {
        let parsed = parseInt(pieceId);
        return this.board.indexOf(parsed);
    }
    ;
    // holds the length of the players piece count
    getPlayerPieces() {
        if (this.turn == 0) {
            this.playerPieces = redsPieces;
        }
        else {
            this.playerPieces = blacksPieces;
        }
        this.removeCellonclick();
        this.resetBorders();
    }
    // removes possible moves from old selected piece (* this is needed because the user might re-select a piece *)
    removeCellonclick() {
        for (let i = 0; i < cells.length; i++) {
            cells[i].removeAttribute("onclick");
        }
    }
    // resets borders to default
    resetBorders() {
        for (let i = 0; i < this.playerPieces.length; i++) {
            this.playerPieces[i].style.border = "1px solid white";
        }
        this.resetSelectedPieceProperties();
        this.getSelectedPiece();
    }
    // resets selected piece properties
    resetSelectedPieceProperties() {
        this.selectedPiece.pieceId = -1;
        this.selectedPiece.pieceId = -1;
        this.selectedPiece.isKing = false;
        this.selectedPiece.seventhSpace = false;
        this.selectedPiece.ninthSpace = false;
        this.selectedPiece.fourteenthSpace = false;
        this.selectedPiece.eighteenthSpace = false;
        this.selectedPiece.minusSeventhSpace = false;
        this.selectedPiece.minusNinthSpace = false;
        this.selectedPiece.minusFourteenthSpace = false;
        this.selectedPiece.minusEighteenthSpace = false;
    }
    // gets ID and index of the board cell its on
    getSelectedPiece() {
        const element = event.currentTarget;
        this.selectedPiece.pieceId = parseInt(element.id);
        this.selectedPiece.indexOfBoardPiece = this.findPiece(this.selectedPiece.pieceId);
        this.isPieceKing();
    }
    // checks if selected piece is a king
    isPieceKing() {
        if (document.getElementById(this.selectedPiece.pieceId).classList.contains("king")) {
            this.selectedPiece.isKing = true;
        }
        else {
            this.selectedPiece.isKing = false;
        }
        this.getAvailableSpaces();
    }
    // gets the moves that the selected piece can make
    getAvailableSpaces() {
        if (this.board[this.selectedPiece.indexOfBoardPiece + 7] === null &&
            cells[this.selectedPiece.indexOfBoardPiece + 7].classList.contains("noPieceHere") !== true) {
            this.selectedPiece.seventhSpace = true;
        }
        if (this.board[this.selectedPiece.indexOfBoardPiece + 9] === null &&
            cells[this.selectedPiece.indexOfBoardPiece + 9].classList.contains("noPieceHere") !== true) {
            this.selectedPiece.ninthSpace = true;
        }
        if (this.board[this.selectedPiece.indexOfBoardPiece - 7] === null &&
            cells[this.selectedPiece.indexOfBoardPiece - 7].classList.contains("noPieceHere") !== true) {
            this.selectedPiece.minusSeventhSpace = true;
        }
        if (this.board[this.selectedPiece.indexOfBoardPiece - 9] === null &&
            cells[this.selectedPiece.indexOfBoardPiece - 9].classList.contains("noPieceHere") !== true) {
            this.selectedPiece.minusNinthSpace = true;
        }
        this.checkAvailableJumpSpaces();
    }
    // gets the moves that the selected piece can jump
    checkAvailableJumpSpaces() {
        if (this.turn == 0) {
            if (this.board[this.selectedPiece.indexOfBoardPiece + 14] === null
                && cells[this.selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece + 7] >= 12) {
                this.selectedPiece.fourteenthSpace = true;
            }
            if (this.board[this.selectedPiece.indexOfBoardPiece + 18] === null
                && cells[this.selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece + 9] >= 12) {
                this.selectedPiece.eighteenthSpace = true;
            }
            if (this.board[this.selectedPiece.indexOfBoardPiece - 14] === null
                && cells[this.selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece - 7] >= 12) {
                this.selectedPiece.minusFourteenthSpace = true;
            }
            if (this.board[this.selectedPiece.indexOfBoardPiece - 18] === null
                && cells[this.selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece - 9] >= 12) {
                this.selectedPiece.minusEighteenthSpace = true;
            }
        }
        else {
            if (this.board[this.selectedPiece.indexOfBoardPiece + 14] === null
                && cells[this.selectedPiece.indexOfBoardPiece + 14].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece + 7] < 12 && this.board[this.selectedPiece.indexOfBoardPiece + 7] !== null) {
                this.selectedPiece.fourteenthSpace = true;
            }
            if (this.board[this.selectedPiece.indexOfBoardPiece + 18] === null
                && cells[this.selectedPiece.indexOfBoardPiece + 18].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece + 9] < 12 && this.board[this.selectedPiece.indexOfBoardPiece + 9] !== null) {
                this.selectedPiece.eighteenthSpace = true;
            }
            if (this.board[this.selectedPiece.indexOfBoardPiece - 14] === null && cells[this.selectedPiece.indexOfBoardPiece - 14].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece - 7] < 12
                && this.board[this.selectedPiece.indexOfBoardPiece - 7] !== null) {
                this.selectedPiece.minusFourteenthSpace = true;
            }
            if (this.board[this.selectedPiece.indexOfBoardPiece - 18] === null && cells[this.selectedPiece.indexOfBoardPiece - 18].classList.contains("noPieceHere") !== true
                && this.board[this.selectedPiece.indexOfBoardPiece - 9] < 12
                && this.board[this.selectedPiece.indexOfBoardPiece - 9] !== null) {
                this.selectedPiece.minusEighteenthSpace = true;
            }
        }
        this.checkPieceConditions();
    }
    // restricts movement if the piece is a king
    checkPieceConditions() {
        if (this.selectedPiece.isKing) {
            this.givePieceBorder();
        }
        else {
            if (this.turn == 0) {
                this.selectedPiece.minusSeventhSpace = false;
                this.selectedPiece.minusNinthSpace = false;
                this.selectedPiece.minusFourteenthSpace = false;
                this.selectedPiece.minusEighteenthSpace = false;
            }
            else {
                this.selectedPiece.seventhSpace = false;
                this.selectedPiece.ninthSpace = false;
                this.selectedPiece.fourteenthSpace = false;
                this.selectedPiece.eighteenthSpace = false;
            }
            this.givePieceBorder();
        }
    }
    // gives the piece a green highlight for the user (showing its movable)
    givePieceBorder() {
        if (this.selectedPiece.seventhSpace || this.selectedPiece.ninthSpace || this.selectedPiece.fourteenthSpace || this.selectedPiece.eighteenthSpace
            || this.selectedPiece.minusSeventhSpace || this.selectedPiece.minusNinthSpace || this.selectedPiece.minusFourteenthSpace || this.selectedPiece.minusEighteenthSpace) {
            document.getElementById(this.selectedPiece.pieceId).style.border = "3px solid green";
            this.giveCellsClick();
        }
        else {
            return;
        }
    }
    // gives the cells on the board a 'click' bassed on the possible moves
    giveCellsClick() {
        if (this.selectedPiece.seventhSpace) {
            cells[this.selectedPiece.indexOfBoardPiece + 7].setAttribute("onclick", "makeMove(7)");
        }
        if (this.selectedPiece.ninthSpace) {
            cells[this.selectedPiece.indexOfBoardPiece + 9].setAttribute("onclick", "makeMove(9)");
        }
        if (this.selectedPiece.fourteenthSpace) {
            cells[this.selectedPiece.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)");
        }
        if (this.selectedPiece.eighteenthSpace) {
            cells[this.selectedPiece.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");
        }
        if (this.selectedPiece.minusSeventhSpace) {
            cells[this.selectedPiece.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)");
        }
        if (this.selectedPiece.minusNinthSpace) {
            cells[this.selectedPiece.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)");
        }
        if (this.selectedPiece.minusFourteenthSpace) {
            cells[this.selectedPiece.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");
        }
        if (this.selectedPiece.minusEighteenthSpace) {
            cells[this.selectedPiece.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18)");
        }
    }
    // makes the move that was clicked
    makeMove(number) {
        document.getElementById(this.selectedPiece.pieceId).remove();
        cells[this.selectedPiece.indexOfBoardPiece].innerHTML = "";
        if (this.turn == 0) {
            if (this.selectedPiece.isKing) {
                cells[this.selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="red-piece king" id="${this.selectedPiece.pieceId}"></p>`;
                redsPieces = document.querySelectorAll("p");
            }
            else {
                cells[this.selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="red-piece" id="${this.selectedPiece.pieceId}"></p>`;
                redsPieces = document.querySelectorAll("p");
            }
        }
        else {
            if (this.selectedPiece.isKing) {
                cells[this.selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece king" id="${this.selectedPiece.pieceId}"></span>`;
                blacksPieces = document.querySelectorAll("span");
            }
            else {
                cells[this.selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece" id="${this.selectedPiece.pieceId}"></span>`;
                blacksPieces = document.querySelectorAll("span");
            }
        }
        let indexOfPiece = this.selectedPiece.indexOfBoardPiece;
        if (number === 14 || number === -14 || number === 18 || number === -18) {
            this.changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
        }
        else {
            this.changeData(indexOfPiece, indexOfPiece + number, 0);
        }
    }
    // Changes the board states data on the backend
    changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
        this.board[indexOfBoardPiece] = null;
        this.board[modifiedIndex] = parseInt(this.selectedPiece.pieceId);
        if (this.turn == 0 && this.selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
            document.getElementById(this.selectedPiece.pieceId).classList.add("king");
        }
        if (this.turn === 1 && this.selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
            document.getElementById(this.selectedPiece.pieceId).classList.add("king");
        }
        if (removePiece) {
            this.board[removePiece] = null;
            if (this.turn == 0 && this.selectedPiece.pieceId < 12) {
                cells[removePiece].innerHTML = "";
                this.blackScore--;
            }
            if (this.turn === 1 && this.selectedPiece.pieceId >= 12) {
                cells[removePiece].innerHTML = "";
                this.redScore--;
            }
        }
        this.resetSelectedPieceProperties();
        this.removeCellonclick();
        this.removeEventListeners();
    }
    // removes the 'onClick' event listeners for pieces
    removeEventListeners() {
        if (this.turn == 0) {
            for (let i = 0; i < redsPieces.length; i++) {
                redsPieces[i].removeEventListener("click", this.getPlayerPieces);
            }
        }
        else {
            for (let i = 0; i < blacksPieces.length; i++) {
                blacksPieces[i].removeEventListener("click", this.getPlayerPieces);
            }
        }
        this.checkForWin();
    }
    // Checks for a win
    checkForWin() {
        if (this.blackScore === 0) {
            divider.style.display = "none";
            for (let i = 0; i < redTurnText.length; i++) {
                redTurnText[i].style.color = "black";
                blackTurntext[i].style.display = "none";
                redTurnText[i].textContent = "RED WINS!";
            }
        }
        else if (this.redScore === 0) {
            divider.style.display = "none";
            for (let i = 0; i < blackTurntext.length; i++) {
                blackTurntext[i].style.color = "black";
                redTurnText[i].style.display = "none";
                blackTurntext[i].textContent = "BLACK WINS!";
            }
        }
        this.changePlayer();
    }
    // Switches players turn
    changePlayer() {
        if (this.turn == 0) {
            this.turn = 1;
            for (let i = 0; i < redTurnText.length; i++) {
                redTurnText[i].style.color = "lightGrey";
                blackTurntext[i].style.color = "black";
            }
        }
        else {
            this.turn = 0;
            for (let i = 0; i < blackTurntext.length; i++) {
                blackTurntext[i].style.color = "lightGrey";
                redTurnText[i].style.color = "black";
            }
        }
        this.givePiecesEventListeners();
    }
}
exports.CheckersCrdt = CheckersCrdt;
//# sourceMappingURL=checkers_crdt.js.map
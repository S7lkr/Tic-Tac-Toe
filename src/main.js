import * as dom from './dom.js';


// Game mode & Player
const modes = {
    'pvc': 'Player vs Computer',
    'pvp': 'Player vs Player',
    'cvc': 'Computer vs Computer',
}
let playerMark;
let gameMode;

// Winner cell indexes:
let cells = ['', '', '', '', '', '', '', '', ''];
let winnerCells = [];    // array -> any from winCombos

const winCombos = [
    [0, 1, 2],      // row 1
    [3, 4, 5],      // row 2
    [6, 7, 8],      // row 3
    [0, 3, 6],      // col 1
    [1, 4, 7],      // col 2
    [2, 5, 8],      // col 3
    [0, 4, 8],      // Left-Right diag.
    [2, 4, 6],      // Right-Left diag.
];

let round = 1;
let xScore = 0;
let oScore = 0;

let gameModeSelected = false;
let playerSelected = false;

let gameIsRunning = false;
let roundWon = false;
let gameOver = false;

initializeGame();

// ---------------------------- Functions -------------------------------


// Event listeners
function initializeGame() {
    dom.rulesButtonElement.addEventListener('click', showHideRules);
    dom.gameModeElements.forEach(el => el.addEventListener('change', gameModeSelector));
    dom.playerChoicesElement.forEach(el => el.addEventListener('change', playerSelector));
    dom.startButtonElement.addEventListener('click', launchGame);
    main();
    
}

function main() {
    gameIsRunning = true;
    dom.roundElement.textContent = `Round ${round}/5`;
    dom.xScoreElement.textContent = xScore;
    dom.oScoreElement.textContent = oScore;
    dom.playerMarkElement.textContent = playerMark;

    dom.cellElements.forEach(cellEl => cellEl.addEventListener('click', playerMove));
    dom.nextRoundButtonElement.addEventListener('click', nextRound);
    dom.restartButtonElement.addEventListener('click', restartGame);
    dom.mainMenuButtonElement.addEventListener('click', mainMenu);
    dom.nextRoundButtonElement.id = 'next';
}

function showHideRules () {
    if (dom.rulesTextElement.style.display === 'block') {
        dom.rulesTextElement.style.display = 'none';
        dom.rulesButtonElement.textContent = 'Show Rules'
    } else {
        dom.rulesTextElement.style.display = 'block';
        dom.rulesButtonElement.textContent = 'Hide Rules'
    }
}

// GAME MODE
function gameModeSelector(event) {
    gameModeSelected = true;
    dom.gameModeElement.textContent = modes[event.target.id];   // 'pvc', 'pvp' or 'cvc'
    gameMode = modes[gameModeElement.textContent];
}

// Player Choice
function playerSelector(event) {
    playerSelected = true;
    dom.playerMarkElement.textContent = event.target.value;     // X or O
    playerMark = dom.playerMarkElement.textContent;
}

function launchGame() {
    if (!gameModeSelected || !playerSelected) {
        return;
    }
    dom.mainMenuElement.style.display = 'none';
    dom.startButtonElement.className = 'hidden';
    dom.gameElement.style.display = 'flex';
}

function playerMove(event) {
    if (!gameIsRunning || roundWon || gameOver) {
        return;
    }
    
    const cell = event.target;          // the CELL which is 'clicked'
    if (cell.textContent === 'X' || cell.textContent === 'O') {
        cell.style.border = '4px solid red';
        cell.style.borderRadius = '0.1em';
        setTimeout(() => {
            cell.style.border = '2px solid black';
        }, 500);
        return;
    }
    cell.textContent = playerMark;      // fill cell's textContent with 'X' or 'O'
    cells[cell.id] = playerMark;      // fill Array cells with 'X' or 'O'

    winCheck();
    switchPlayerMark();

    // console.log(cells);
}

function winCheck() {
    const playedCells = cells.filter(el => el !== '').length;
    if (playedCells < 3) {     // at least 3 letters are needed in order 'checkWin' to be initiated
        return;
    }
    for (let i = 0; i < winCombos.length; i++) {
        let combination = winCombos[i];    // [0, 1, 2]
        let combo = [];

        combination.forEach(ind => combo.push(cells[ind]));
        const xCombo = '["X","X","X"]';
        const oCombo = '["O","O","O"]';

        if (JSON.stringify(combo) === xCombo || JSON.stringify(combo) === oCombo) {
            roundWon = true;
            winnerCells = combination;
            markWinCells(winnerCells);    // 2nd optional param (color='purple') by default
            break;
        }
    }
    // Round Won
    if (roundWon) {
        switch (playerMark) {
            case 'X': xScore += 1; dom.xScoreElement.textContent = xScore; break;   // winner is the current player
            case 'O': oScore += 1; dom.oScoreElement.textContent = oScore; break;
        }

        // Game over -> Win
        if (xScore === 3 || oScore === 3) {
            dom.messageElement.textContent = " is the Winner!!";
            gameOver = true;
            gameIsRunning = false;
            dom.nextRoundButtonElement.id = 'next-22';
        } else {
            dom.messageElement.textContent = " wins the round!";
        }
        return;
    }

    // Game over -> Draw
    if (playedCells === 9) {               // if round ended,
        if (round === 5) {                 // and is the last
            dom.messageElement.textContent = " is the Winner!";
            if (xScore > oScore) {
                dom.playerMarkElement.textContent = 'X';
                gameOver = true;
            } else if (oScore > xScore) {
                dom.playerMarkElement.textContent = 'O';
                gameOver = true;
            } else {
                dom.playerMarkElement.textContent = '';
                dom.messageElement.textContent = 'Game Over! Draw!';
            }
            dom.nextRoundButtonElement.className = 'hidden';
            gameIsRunning = false;
            return;
        }
        dom.playerMarkElement.textContent = '';
        dom.messageElement.textContent = 'Round Draw!';
        roundWon = true;
    }
}

function switchPlayerMark() {
    if (roundWon || gameOver || !gameIsRunning) {
        return;
    }
    playerMark = playerMark === 'X' ? 'O' : 'X';
    dom.playerMarkElement.textContent = playerMark;
}

function nextRound() {
    if (gameOver || !roundWon) {
        return;
    }
    cells = ['', '', '', '', '', '', '', '', ''];
    roundWon = false;
    round += 1;

    dom.playerMarkElement.textContent = playerMark;
    dom.messageElement.textContent = "'s turn!"
    dom.roundElement.textContent = `Round ${round}/5`;
    dom.cellElements.forEach(cell => cell.textContent = '');

    unMarkWinCells(winnerCells);
}

function restartGame() {
    dom.cellElements.forEach(cell => cell.textContent = '');
    cells = ['', '', '', '', '', '', '', '', ''];
    dom.playerMarkElement.textContent = playerMark;
    dom.messageElement.textContent = "'s turn!"
    gameIsRunning = true;
    roundWon = false;
    gameOver = false;
    dom.xScoreElement.textContent = xScore = 0;
    dom.oScoreElement.textContent = oScore = 0;
    round = 1;
    dom.roundElement.textContent = `Round ${round}/5`;
    dom.nextRoundButtonElement.className = '';
    unMarkWinCells(winnerCells);
}

function mainMenu() {
    dom.mainMenuElement.style.display = 'flex';
    dom.startButtonElement.className = '';
    dom.gameElement.style.display = 'none';
}

function cellPainter(c1, c2, c3, color) {
    dom.cellElements.item(c1).style.backgroundColor = color;
    dom.cellElements.item(c2).style.backgroundColor = color;
    dom.cellElements.item(c3).style.backgroundColor = color;
}

function markWinCells(winCells, color='orange') {
    const [cell1, cell2, cell3] = winCells;
    cellPainter(cell1, cell2, cell3, color);
}

function unMarkWinCells(winCells, color='antiquewhite') {
    const [cell1, cell2, cell3] = winCells;
    cellPainter(cell1, cell2, cell3, color);
}


// // TODO: Player vs Computer mode
// const switchMark = () => {
//     playerMark === 'X' ? playerMark = 'O' : playerMark = 'X';
// }


// // TODO: Player vs Computer mode
// function computerMove() {
//     let emptyCells = [];
//     for (let i = 0; i < cells.length; i++) {
//         if (cells[i] === '') {
//             emptyCells.push(i);
//         }
//     }
//     console.log(emptyCells);
    
//     const pcCell = Math.ceil(Math.random() * emptyCells.length - 1);
//     console.log(pcCell);
//     cells[pcCell] = playerTurn;
//     document.getElementById(pcCell).textContent = playerTurn;
//     switchMark();
//     console.log(cells);
// }
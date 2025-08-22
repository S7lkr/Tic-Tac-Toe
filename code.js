// Rules
const rulesTextElement = document.getElementById('rules-text');
const rulesButtonElement = document.getElementById('rules-btn');

// ---------- Intro/Menu Section -----------

// Main menu container
const mainMenuElement = document.getElementById('main-menu-container');

// Game Mode
const gameModeMenuElement = document.getElementById('game-mode');
const gameModeElements = document.querySelectorAll('input[name=game-mode]');

// Player Select
const playerSelectMenuElement = document.getElementById('player-selection');
const playerChoicesElement = document.querySelectorAll('input[name=player-choice]');

// Start Game
const startButtonElement = document.getElementById('start-btn-container');

// ----------- Game Section -----------

// Main elements
const gameElement = document.querySelector('div.tic-tac-toe');
const gameModeElement = document.querySelector('#game-mode-section p');
const roundElement = document.querySelector('div.round-status h3');
const cellElements = document.querySelectorAll('div.cell-container div');

// Turn status message
const playerMarkElement = document.getElementById('player');
const messageElement = document.querySelector('span#round-message');

// Buttons: Next, Restart, Main Menu
const nextRoundButtonElement = document.querySelector('.buttons button#next');
const restartButtonElement = document.querySelector('.buttons button#restart-btn');
const mainMenuButtonElement = document.getElementById('main-menu-btn');

// Score table
const xScoreElement = document.getElementById('playerX');
const oScoreElement = document.getElementById('playerO');


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

const modes = {
    'player-vs-computer': 'Player vs Computer',
    'player-vs-player': 'Player vs Player',
    'computer-vs-computer': 'Computer vs Computer',
}
let gameMode;
let playerMark;

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
    rulesButtonElement.addEventListener('click', showHideRules);
    gameModeElements.forEach(el => el.addEventListener('change', gameModeSelector));
    playerChoicesElement.forEach(el => el.addEventListener('change', playerSelector));
    startButtonElement.addEventListener('click', launchGame);
    main();
}

function main() {
    gameIsRunning = true;
    roundElement.textContent = `Round ${round}/5`;
    xScoreElement.textContent = xScore;
    oScoreElement.textContent = oScore;
    playerMarkElement.textContent = playerMark;

    cellElements.forEach(cellEl => cellEl.addEventListener('click', playerMove));
    nextRoundButtonElement.addEventListener('click', nextRound);
    restartButtonElement.addEventListener('click', restartGame);
    mainMenuButtonElement.addEventListener('click', mainMenu);
    nextRoundButtonElement.id = 'next';
}

function showHideRules () {
    if (rulesTextElement.style.display === 'block') {
        rulesTextElement.style.display = 'none';
        rulesButtonElement.textContent = 'Show Rules'
    } else {
        rulesTextElement.style.display = 'block';
        rulesButtonElement.textContent = 'Hide Rules'
    }
}

// GAME MODE
function gameModeSelector(event) {
    gameModeSelected = true;
    gameModeElement.textContent = modes[event.target.value];   // 'player-vs-computer' or 'player-vs-player'
    // gameMode = modes[gameModeElement.textContent];
}

// Player Choice
function playerSelector(event) {
    playerSelected = true;
    playerMarkElement.textContent = event.target.value;     // X or O
    playerMark = playerMarkElement.textContent;
}

function launchGame() {
    if (!gameModeSelected || !playerSelected) {
        return;
    }
    mainMenuElement.style.display = 'none';
    startButtonElement.className = 'hidden';
    gameElement.style.display = 'flex';
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

    console.log(cells);
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
            case 'X': xScore += 1; xScoreElement.textContent = xScore; break;   // winner is the current player
            case 'O': oScore += 1; oScoreElement.textContent = oScore; break;
        }

        // Game over -> Win
        if (xScore === 3 || oScore === 3) {
            messageElement.textContent = " is the Winner!!";
            gameOver = true;
            gameIsRunning = false;
            nextRoundButtonElement.id = 'next-22';
        } else {
            messageElement.textContent = " wins the round!";
        }
        return;
    }

    // Game over -> Draw
    if (playedCells === 9) {               // if round ended,
        if (round === 5) {                 // and is the last
            messageElement.textContent = " is the Winner!";
            if (xScore > oScore) {
                playerMarkElement.textContent = 'X';
                gameOver = true;
            } else if (oScore > xScore) {
                playerMarkElement.textContent = 'O';
                gameOver = true;
            } else {
                playerMarkElement.textContent = '';
                messageElement.textContent = 'Game Over! Draw!';
            }
            nextRoundButtonElement.className = 'hidden';
            gameIsRunning = false;
            return;
        }
        playerMarkElement.textContent = '';
        messageElement.textContent = 'Round Draw!';
        roundWon = true;
    }
}

function switchPlayerMark() {
    if (roundWon || gameOver || !gameIsRunning) {
        return;
    }
    playerMark = playerMark === 'X' ? 'O' : 'X';
    playerMarkElement.textContent = playerMark;
}

function nextRound() {
    if (gameOver || !roundWon) {
        return;
    }
    cells = ['', '', '', '', '', '', '', '', ''];
    roundWon = false;
    round += 1;

    playerMarkElement.textContent = playerMark;
    messageElement.textContent = "'s turn!"
    roundElement.textContent = `Round ${round}/5`;
    cellElements.forEach(cell => cell.textContent = '');

    unMarkWinCells(winnerCells);
}

function restartGame() {
    cellElements.forEach(cell => cell.textContent = '');
    cells = ['', '', '', '', '', '', '', '', ''];
    playerMarkElement.textContent = playerMark;
    messageElement.textContent = "'s turn!"
    gameIsRunning = true;
    roundWon = false;
    gameOver = false;
    xScoreElement.textContent = xScore = 0;
    oScoreElement.textContent = oScore = 0;
    round = 1;
    roundElement.textContent = `Round ${round}/5`;
    nextRoundButtonElement.className = '';
    unMarkWinCells(winnerCells);
}

function mainMenu() {
    mainMenuElement.style.display = 'flex';
    startButtonElement.className = '';
    gameElement.style.display = 'none';
}

function cellPainter(c1, c2, c3, color) {
    cellElements.item(c1).style.backgroundColor = color;
    cellElements.item(c2).style.backgroundColor = color;
    cellElements.item(c3).style.backgroundColor = color;
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
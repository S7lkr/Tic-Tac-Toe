const roundElement = document.querySelector('div.round-status h3');
const cellElements = document.querySelectorAll('div.cell-container div');
const messageElement = document.querySelector('div.info #message');
const infoPlayerElement = document.querySelector('div.info h1#player');

const nextRoundButtonElement = document.querySelector('.buttons button#next');
const restartButtonElement = document.querySelector('.buttons button#restart');

const xScoreElement = document.getElementById('playerX');
const oScoreElement = document.getElementById('playerO');

const winCombinations = [
    [0, 1, 2],      // row 1
    [3, 4, 5],      // row 2
    [6, 7, 8],      // row 3
    [0, 3, 6],      // col 1
    [1, 4, 7],      // col 2
    [2, 5, 8],      // col 3
    [0, 4, 8],      // LtoR dgnl
    [2, 4, 6],      // RtoL dgnl
];

let round = 1;
let xScore = 0;
let oScore = 0;
let playerTurn = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];

let gameIsRunning = false;
let roundWon = false;
let gameWon = false;

// Winner cell indexes:
let winnerCells;

setGameConfiguration();

function setGameConfiguration() {
    gameIsRunning = true;
    roundElement.textContent = `Round ${round}/5`;
    xScoreElement.textContent = 'X: 0';
    oScoreElement.textContent = 'O: 0';
    messageElement.textContent = 'Player Turn:';
    infoPlayerElement.textContent = playerTurn;
    cellElements.forEach(cellEl => cellEl.addEventListener('click', clickCell));
    nextRoundButtonElement.addEventListener('click', nextRound);
    restartButtonElement.addEventListener('click', restartGame);
    nextRoundButtonElement.id = 'next';
}
function clickCell(event) {
    if (!gameIsRunning || roundWon || gameWon) {
        return;
    }
    const cell = event.target;          // the CELL which is 'clicked'
    if (cell.textContent !== '') {
        cell.style.border = '4px solid red';
        cell.style.borderRadius = '0.1em';
        setTimeout(() => {
            cell.style.border = '2px solid black';
        }, 500);
        return;
    }
    cell.textContent = playerTurn;      // fill cell's textContent with 'X' or 'O'
    cells[cell.id] = playerTurn;      // fill Array 'cells' with 'X' or 'O'
    checkWinCondition();
    switchPlayer();
}
function checkWinCondition() {
    const playedCells = cells.filter(el => el !== '').length;
    if (playedCells < 3) {     // at least 3 letters are needed in order 'checkWIn' to be initiated
        return;
    }
    for (let i = 0; i < winCombinations.length; i++) {
        let combination = winCombinations[i];    // [0, 1, 2]
        let combo = [];

        combination.forEach(ind => combo.push(cells[ind]));
        const xCombo = '["X","X","X"]';
        const oCombo = '["O","O","O"]';

        if (JSON.stringify(combo) === xCombo || JSON.stringify(combo) === oCombo) {
            roundWon = true;
            winnerCells = combination;
            paintCells(winnerCells);    // 2nd optional param (color='purple') by default
            break;
        }
    }
    if (roundWon) {
        switch (playerTurn) {
            case 'X': xScore += 1; break;
            case 'O': oScore += 1; break;
        }
        xScoreElement.textContent = `X: ${xScore}`;
        oScoreElement.textContent = `O: ${oScore}`;
        if (xScore > 2 || oScore > 2) {
            messageElement.textContent = '';
            infoPlayerElement.textContent = `Winner is ${playerTurn}!`;
            gameWon = true;
            gameIsRunning = false;
            nextRoundButtonElement.id = 'next-22';
        } else {
            messageElement.textContent = 'Round won by:'
            infoPlayerElement.textContent = xScore > oScore
                ? 'X'
                : 'Y';
        }
        return;
    }
    if (playedCells === 9) {
        if (round > 4 && xScore === oScore) {
            messageElement.textContent = 'Game Over! Draw!';
            infoPlayerElement.textContent = '';
            gameWon = true;
            gameIsRunning = false;
            return;
        }
        messageElement.textContent = 'Round Draw! :)';
        infoPlayerElement.textContent = '';
        roundWon = true;
    }
}
function switchPlayer() {
    if (roundWon || gameWon || !gameIsRunning) {
        return;
    }
    playerTurn = playerTurn === 'X' ? 'O' : 'X';
    infoPlayerElement.textContent = playerTurn;
}
function nextRound() {
    if (gameWon || !roundWon) {
        return;
    }
    roundWon = false;
    round += 1;
    roundElement.textContent = `Round ${round}/5`;
    cellElements.forEach(cell => cell.textContent = '');
    cells = ['', '', '', '', '', '', '', '', ''];
    messageElement.textContent = 'Player Turn:';
    infoPlayerElement.textContent = playerTurn;
    clearPaintCells(winnerCells);
}
function restartGame() {
    cellElements.forEach(cell => cell.textContent = '');
    cells = ['', '', '', '', '', '', '', '', ''];
    playerTurn = 'X';
    messageElement.textContent = 'Player Turn:';
    infoPlayerElement.textContent = playerTurn;
    gameIsRunning = true;
    roundWon = false;
    gameWon = false;
    xScore = 0;
    oScore = 0;
    xScoreElement.textContent = 'X: 0';
    oScoreElement.textContent = 'O: 0';
    round = 1;
    roundElement.textContent = `Round ${round}/5`;
    clearPaintCells(winnerCells);
}
function paintCells(winCells, color='orange') {
    const [c1, c2, c3] = winCells;
    cellElements.item(c1).style.backgroundColor = color;
    cellElements.item(c2).style.backgroundColor = color;
    cellElements.item(c3).style.backgroundColor = color;
}
function clearPaintCells(winCells, color='antiquewhite') {
    const [c1, c2, c3] = winCells;
    cellElements.item(c1).style.backgroundColor = 'antiquewhite';
    cellElements.item(c2).style.backgroundColor = 'antiquewhite';
    cellElements.item(c3).style.backgroundColor = 'antiquewhite';
    winCells = null;
}
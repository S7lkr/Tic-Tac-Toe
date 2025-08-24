import * as dom from './dom.js';


// ----------------- Global values -----------------

// Game mode & Player
const modes = {
    'pvc': 'Player vs Computer',
    'pvp': 'Player vs Player',
    'cvc': 'Computer vs Computer',
}
let initialPlayerMark = '';
let currentPlayerMark = '';
let gameMode = '';

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

let pcWon = false;

main();

// ---------------------------- Functions -------------------------------

// Event listeners
function main() {
    // Set game options (initialize settings)
    dom.rulesButtonElement.addEventListener('click', showHideRules);
    dom.gameModeElements.forEach(el => el.addEventListener('change', gameModeSelector));
    dom.playerChoicesElement.forEach(el => el.addEventListener('change', playerSelector));
    dom.roundElement.textContent = `Round ${round}/5`;
    dom.xScoreElement.textContent = xScore;
    dom.oScoreElement.textContent = oScore;
        
    // Start game
    dom.startButtonElement.addEventListener('click', launchGame);
    gameIsRunning = true;

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

function showNextBtn(status=true) {
    status ? dom.nextRoundButtonElement.classList.remove('hidden') : dom.nextRoundButtonElement.classList.add('hidden');
}

// GAME MODE
function gameModeSelector(event) {
    gameModeSelected = true;
    // 'Player vs Player', 'Player vs Computer' or 'Computer vs Computer'
    dom.showGameModeElement.textContent = modes[event.target.id];
    dom.pHiddenElement.textContent = event.target.id;
    gameMode = dom.pHiddenElement.textContent;
}

// Player Choice
function playerSelector(event) {
    playerSelected = true;
    dom.playerMarkElement.textContent = event.target.value;     // X or O
    initialPlayerMark = dom.playerMarkElement.textContent;
    currentPlayerMark = dom.playerMarkElement.textContent;
}

function launchGame() {
    if (!gameModeSelected || !playerSelected) {
        return;
    }
    dom.mainMenuElement.style.display = 'none';
    dom.startButtonElement.className = 'hidden';
    dom.gameElement.style.display = 'flex';
    showNextBtn(false);
}

function cellEmpty(cell) {
    return cell.textContent === '';
}

function moveReject(cell) {
    cell.style.border = '4px solid red';
    cell.style.borderRadius = '0.1em';
    setTimeout(() => {
        cell.style.border = '2px solid black';
    }, 300);
}

function playerMove(event) {
    if (!gameIsRunning || roundWon || gameOver) {
        return;
    }
    const cell = event.target;          // the CELL which is 'clicked'
    if (!cellEmpty(cell)) {
        moveReject(cell);
        return;
    }
    cell.textContent = currentPlayerMark;      // fill cell's textContent with 'X' or 'O'
    cells[cell.id] = currentPlayerMark;      // fill Array cells with 'X' or 'O'

    winCheck();
    switchPlayerMark();

    if (gameMode === 'pvc') {
        computerMove();
    }  
}

function computerMove() {
    if (!gameIsRunning || roundWon || gameOver) {
        return;
    }
    let emptyCellIndexes = [];
    Array.from(dom.cellElements).forEach(cell => cell.textContent == '' ? emptyCellIndexes.push(Number(cell.id)) : null);

    // take one index of emptyCellIndexes (free cell to mark)
    let randomCellIndex = emptyCellIndexes[Math.floor(Math.random() * emptyCellIndexes.length)];
    // mark cell in array
    cells[randomCellIndex] = currentPlayerMark;

    dom.cellElements.forEach(cell => cell.removeEventListener('click', playerMove));

    setTimeout(() => {
        dom.cellElements.item(randomCellIndex).textContent = currentPlayerMark;             // pc marks cell in html
        winCheck();
        switchPlayerMark();
        dom.cellElements.forEach(cell => cell.addEventListener('click', playerMove));
    }, 500);
}

function winCheck() {
    const playedCells = cells.filter(el => el !== '').length;
    if (playedCells < 3) {     // at least 3 letters are needed in order 'winCheck' to be initiated
        return;
    }
    for (let i = 0; i < winCombos.length; i++) {
        let combination = winCombos[i];    // [0, 1, 2] or [3, 4, 5] or etc.
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
        // Check if Player or Computer won the round
        pcWon = initialPlayerMark != currentPlayerMark ? true : false;

        switch (currentPlayerMark) {
            case 'X': xScore += 1; dom.xScoreElement.textContent = xScore; break;   // winner is the current player
            case 'O': oScore += 1; dom.oScoreElement.textContent = oScore; break;
        }
        // Game over with WIN
        if (xScore === 3 || oScore === 3) {
            dom.messageElement.textContent = " is the Winner!!";
            gameOver = true;
            gameIsRunning = false;
            dom.nextRoundButtonElement.id = 'next-22';
        } else {
            dom.messageElement.textContent = " wins the round!";
            showNextBtn(true);
        }
        return;
    }
    // Game over with DRAW
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
            // dom.nextRoundButtonElement.className = 'hidden';
            gameIsRunning = false;
            return;
        }
        dom.playerMarkElement.textContent = '';
        dom.messageElement.textContent = 'Round Draw!';
        showNextBtn(true);
        roundWon = true;
    }
}

function switchPlayerMark() {
    if (roundWon || gameOver || !gameIsRunning) {
        return;
    }
    currentPlayerMark = currentPlayerMark === 'X' ? 'O' : 'X';
    dom.playerMarkElement.textContent = currentPlayerMark;
}

function nextRound() {
    if (gameOver || !roundWon) {
        return;
    }
    cells = ['', '', '', '', '', '', '', '', ''];
    dom.cellElements.forEach(cell => cell.textContent = '');
    round += 1;
    dom.roundElement.textContent = `Round ${round}/5`;
    showNextBtn(false);

    dom.playerMarkElement.textContent = currentPlayerMark;
    dom.messageElement.textContent = "'s turn!"
    roundWon = false;

    unMarkWinCells();
    if (pcWon) {
        pcWon = false;
        computerMove();
    }
}

function restartGame() {
    dom.cellElements.forEach(cell => cell.textContent = '');
    cells = ['', '', '', '', '', '', '', '', ''];
    dom.playerMarkElement.textContent = initialPlayerMark;
    currentPlayerMark = initialPlayerMark;
    dom.messageElement.textContent = "'s turn!"

    gameIsRunning = true;
    roundWon = false;
    gameOver = false;
    dom.xScoreElement.textContent = xScore = 0;
    dom.oScoreElement.textContent = oScore = 0;
    round = 1;
    dom.roundElement.textContent = `Round ${round}/5`;

    showNextBtn(false);
    unMarkWinCells();
}

function mainMenu() {
    restartGame();
    dom.roundElement.textContent = 'Round ' + round + '/5';
    dom.mainMenuElement.style.display = 'flex';
    dom.startButtonElement.className = '';
    dom.gameElement.style.display = 'none';
}

function markWinCells(winCells, color='orange') {
    const [c1, c2, c3] = winCells;
    dom.cellElements.item(c1).style.backgroundColor = color;
    dom.cellElements.item(c2).style.backgroundColor = color;
    dom.cellElements.item(c3).style.backgroundColor = color;
}

function unMarkWinCells(color='antiquewhite') {
    // const [cell1, cell2, cell3] = winCells;
    dom.cellElements.forEach(el => el.style.backgroundColor = color);
}

// function shuffleEmptyCells(array) {
//     let currentIndex = array.length;    
//     while (currentIndex != 0) {
//         let randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;
//         [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
//     }
//     return array;
// }
import { cellElements, playerMarkElement } from "../dom.js";
import { setState, getState } from "../state.js";
import { winCheck } from "./winValidators.js";
import { gameOverRoundWin } from "./winValidators.js";


const cellEmpty = (cell) => cell.textContent === '' || cell.textContent === 'x' || cell.textContent === 'o';

const moveReject = (cell) => {
    cell.style.border = '4px solid red';
    cell.style.borderRadius = '0.1em';

    setTimeout(() => {
        cell.style.border = '2px solid black';
    }, 300);
}

const switchPlayerMark = () => {    
    setState({ currentPlayerMark: getState().currentPlayerMark === 'X' ? 'O' : 'X' });
    playerMarkElement.textContent = getState().currentPlayerMark;
}

export function playerMove(event) {
    const {
        cells, gameMode,
        currentPlayerMark,
    } = getState();
    
    const playedCells = cells.filter(el => el !== '').length;
    if (gameOverRoundWin() || playedCells === 9) {
        return;
    }
    const cell = event.target;
    // check if cell occupied
    if (!cellEmpty(cell)) {
        moveReject(cell);
        return;
    }
    cell.textContent = cells[cell.id] = currentPlayerMark;      // fill ui cell & array cell

    winCheck();
    
    const { roundIsWon, roundIsDraw } = getState();
    if (!roundIsDraw && !roundIsWon) {
        switchPlayerMark();
    }    
    if (gameMode === 'pvc' && playedCells < 9) {
        computerMove();
    }  
}

export function computerMove(responseTime = 500) {
    const { currentPlayerMark, gameMode, cells } = getState();
    const playedCells = cells.filter(el => el !== '').length;
    if (gameOverRoundWin() || gameMode === 'pvp' || playedCells === 9) {
        return;
    }
    let emptyCellIndexes = [];
    Array.from(cellElements).forEach(cell => cell.textContent === '' ? emptyCellIndexes.push(Number(cell.id)) : null);

    // take one RANDOM index of emptyCellIndexes (free cell to mark)
    let randomCellIndex = emptyCellIndexes[Math.floor(Math.random() * emptyCellIndexes.length)];
    // mark cell in array
    cells[randomCellIndex] = currentPlayerMark;

    if (gameMode === 'pvc') {
        cellElements.forEach(cell => cell.removeEventListener('click', playerMove));
    } else if (gameMode === 'cvc') {
        responseTime = 1000;
    }
    setTimeout(() => {
        cellElements.item(randomCellIndex).textContent = currentPlayerMark;             // pc marks cell in html
        winCheck();
        const { pcWon, gameMode, roundIsWon, roundIsDraw } = getState();
        if (roundIsDraw || roundIsWon) return;
        if (!pcWon || (!roundIsWon && !roundIsDraw)) switchPlayerMark();
        if (gameMode === 'pvc') {
            cellElements.forEach(cell => cell.addEventListener('click', playerMove));
        }
        if (gameMode === 'cvc' && playedCells < 9) {
            computerMove();
        }
    }, responseTime);
}
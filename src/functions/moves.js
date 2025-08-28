import { cellElements, playerMarkElement } from "../dom.js";
import { setState, getState } from "../state.js";

import { cellEmpty, winCheck } from "./checkers.js";
import { moveReject } from "./effects.js";
import { gameRunWinOverCheck } from "./checkers.js";


const switchPlayerMark = () => {
    if (gameRunWinOverCheck()) {
        return;
    }
    setState({
        currentPlayerMark: getState().currentPlayerMark == 'X' ? 'O' : 'X',
    });    
    playerMarkElement.textContent = getState().currentPlayerMark;
}

export function playerMove(event) {
    const { cells, currentPlayerMark, gameMode } = getState();
    if (gameRunWinOverCheck()) {
        return;
    }
    const cell = event.target;          // the CELL which is 'clicked'
    if (!cellEmpty(cell)) {
        moveReject(cell);
        return;
    }
    cell.textContent = cells[cell.id] = currentPlayerMark;      // fill DOM Cell with 'X' or 'O'
    cells[cell.id] = currentPlayerMark;               // fill Array cells with 'X' or 'O'

    winCheck();
    switchPlayerMark();

    if (gameMode === 'pvc') {
        computerMove();
    }  
}

export function computerMove(responseTime = 500) {
    const { currentPlayerMark, gameMode, cells } = getState();
    if (gameMode == 'pvp') {
        return;
    }
    if (gameRunWinOverCheck()) {
        return;
    }
    let emptyCellIndexes = [];
    Array.from(cellElements).forEach(cell => cell.textContent == '' ? emptyCellIndexes.push(Number(cell.id)) : null);

    // take one RANDOM index of emptyCellIndexes (free cell to mark)
    let randomCellIndex = emptyCellIndexes[Math.floor(Math.random() * emptyCellIndexes.length)];
    // mark cell in array
    cells[randomCellIndex] = currentPlayerMark;

    if (gameMode == 'pvc') {
        cellElements.forEach(cell => cell.removeEventListener('click', playerMove));
    } else if (gameMode == 'cvc') {
        responseTime = 1000;
    }
    setTimeout(() => {
        cellElements.item(randomCellIndex).textContent = currentPlayerMark;             // pc marks cell in html
        winCheck();
        switchPlayerMark();
        if (gameMode == 'pvc') {
            cellElements.forEach(cell => cell.addEventListener('click', playerMove));
        }
        if (gameMode == 'cvc') {
            computerMove();
        }
    }, responseTime);
}
import { cellElements, playerMarkElement } from "../dom";
import { cells, roundWon, gameMode, gameOver, gameIsRunning, currentPlayerMark } from "../main.js";

import { cellEmpty, winCheck } from "./checkers.js";
import { moveReject } from "./effects.js";

export function switchPlayerMark() {
    if (roundWon || gameOver || !gameIsRunning) {
        return;
    }
    currentPlayerMark = currentPlayerMark === 'X' ? 'O' : 'X';
    playerMarkElement.textContent = currentPlayerMark;
}

export function playerMove(event) {
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

export function computerMove(responseTime = 500) {
    if (gameMode == 'pvp') {
        return;
    }
    if (!gameIsRunning || roundWon || gameOver) {
        return;
    }
    let emptyCellIndexes = [];
    Array.from(dom.cellElements).forEach(cell => cell.textContent == '' ? emptyCellIndexes.push(Number(cell.id)) : null);

    // take one RANDOM index of emptyCellIndexes (free cell to mark)
    let randomCellIndex = emptyCellIndexes[Math.floor(Math.random() * emptyCellIndexes.length)];
    // mark cell in array
    cells[randomCellIndex] = currentPlayerMark;

    if (gameMode == 'pvc') {
        cellElements.forEach(cell => cell.removeEventListener('click', playerMove));
    }

    if (gameMode == 'cvc') {
        responseTime = 1000;
    }
    setTimeout(() => {
        dom.cellElements.item(randomCellIndex).textContent = currentPlayerMark;             // pc marks cell in html
        func.winCheck();
        func.switchPlayerMark();
        if (gameMode == 'pvc') {
            dom.cellElements.forEach(cell => cell.addEventListener('click', playerMove));
        }
        if (gameMode == 'cvc') {
            computerMove();
        }
    }, responseTime);
}
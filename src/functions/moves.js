import { cellElements, playerMarkElement } from "../dom.js";
import { setState, getState } from "../state.js";

import { cellEmpty, winCheck } from "./checkers.js";
import { moveReject } from "./effects.js";
import { gameRunWinOverCheck } from "./checkers.js";


const switchPlayerMark = () => {
    const currPlMark = getState().currentPlayerMark;
    if (gameRunWinOverCheck()) {
        return;
    }
    setState({
        currentPlayerMark: currPlMark == 'X' ? 'O' : 'X',
    });    
    playerMarkElement.textContent = getState().currentPlayerMark;
}

export function playerMove(event) {
    const currPlMark = getState().currentPlayerMark;
    if (gameRunWinOverCheck()) {
        return;
    }
    const cell = event.target;          // the CELL which is 'clicked'
    if (!cellEmpty(cell)) {
        moveReject(cell);
        return;
    }
    cell.textContent = getState().cells[cell.id] = currPlMark;      // fill DOM Cell with 'X' or 'O'
    getState().cells[cell.id] = currPlMark;               // fill Array cells with 'X' or 'O'

    winCheck();
    switchPlayerMark();

    if (getState().gameMode === 'pvc') {
        computerMove();
    }  
}

export function computerMove(responseTime = 500) {
    const currPlMark = getState().currentPlayerMark;
    const gameM = getState().gameMode;
    if (gameM == 'pvp') {
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
    getState().cells[randomCellIndex] = currPlMark;

    if (gameM == 'pvc') {
        cellElements.forEach(cell => cell.removeEventListener('click', playerMove));
    } else if (gameM == 'cvc') {
        responseTime = 1000;
    }
    setTimeout(() => {
        cellElements.item(randomCellIndex).textContent = currPlMark;             // pc marks cell in html
        winCheck();
        switchPlayerMark();
        if (gameM == 'pvc') {
            cellElements.forEach(cell => cell.addEventListener('click', playerMove));
        }
        if (gameM == 'cvc') {
            computerMove();
        }
    }, responseTime);
}
import * as dom from '../dom.js';
import { getState, setState } from "../state.js";
import { markWinCells } from './markers.js';
import { showNextBtn } from './controllers.js';


export const gameOverRoundWin = () => {
    const { gameIsRunning: on, roundIsWon: win } = getState();
    return !on || win;
}

const lessThan3moves = (playedCells) => playedCells < 3;

const clearPlayerMark = () => dom.playerMarkElement.textContent = '';

// printer
export const report = (message, plMark='') => {
    dom.messageElement.textContent = message;
    dom.playerMarkElement.textContent = plMark;
}

const winDrawCheck = (cells, playedCells, winCombos) => {
    // 0 - 7
    for (let i = 0; i < winCombos.length; i++) {
        // ['X', 'X', 'X'] or ['O', 'O', 'O']
        let combo = [];
        const winLine = winCombos[i];    // [0, 1, 2] or [3, 4, 5] or ... [2, 4, 6];
        winLine.forEach(ind => combo.push(cells[ind]));     // ['O', 'X', 'O']
        const xWin = '["X","X","X"]';
        const oWin = '["O","O","O"]';

        if (JSON.stringify(combo) === xWin || JSON.stringify(combo) === oWin) {
            setState({ roundIsWon: true, winnerCells: winLine });
            markWinCells(getState().winnerCells);    // 2nd opt param (color='purple')
            return;
        };
    }
    if (playedCells === 9) {
        setState({ roundIsDraw: true });
    }
}

const scoreChanger = (currPlMark, xS, oS) => {
    switch (currPlMark) {     // winner is current player
    case 'X': setState({ xScore: xS + 1 });
        dom.xScoreElement.textContent = xS + 1;
        break;
    case 'O': setState({ oScore: oS + 1 });
        dom.oScoreElement.textContent = oS + 1;
        break;
    }
}

const roundDraw = (round, xS, oS, playedCells) => {  
    if (round === 5 && playedCells === 9) {
        if (xS === oS) {
            setState({ gameIsRunning: false });
            report('Game Over! Draw!');
        } else if (xS > oS) {
            report(' is the Winner', 'X');
        } else {
            report(' is the Winner!', 'O');
        }
        setState({ gameIsRunning: false });
        return;
    } else {
        report('Round Draw!');
        showNextBtn();
    }
    clearPlayerMark();

    return true;
}

const roundWon = (currentPlayerMark, xS, oS, round) => {
    scoreChanger(currentPlayerMark, xS, oS);
    // final round -> X or O wins
    if (round === 5) {
        const { oScore: o, xScore: x } = getState();
        // Game draw + empty cells
        if (x > o) {
            report(' is the Winner!!', 'X');
        } else if (x < o) {
            report(' is the Winner', 'O');
        } else {    // xScore = oScore
            report('Game over! Draw!');
        }
        setState({ gameIsRunning: false });
        return;
    }
    // game over -> win
    const { oScore: o, xScore: x } = getState();
    if (x === 3 || o === 3) {
        report(' is the Winner!!', currentPlayerMark);
        setState({ gameIsRunning: false });
        // dom.nextRoundButtonElement.id = 'next-22';
    } else {
        report(' wins the Round!', currentPlayerMark);
        showNextBtn(true);
    }
}

export function winCheck() {
    const {
        cells, winCombos, round,
        initialPlayerMark,
        currentPlayerMark,
        xScore: xS, oScore: oS,
    } = getState();

    const playedCells = cells.filter(el => el !== '').length;
    if (lessThan3moves(playedCells, cells, winCombos)) return;

    // Win/Draw check
    winDrawCheck(cells, playedCells, winCombos);    

    if (getState().roundIsDraw) {
        // Draw
        if (roundDraw(round, xS, oS, playedCells)) {
            return;
        }
    }
    if (getState().roundIsWon) {     
        // player or pc won the round
        setState({ pcWon: initialPlayerMark != currentPlayerMark ? true : false });
        // Win
        roundWon(currentPlayerMark, xS, oS, round);
    }
}
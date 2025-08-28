import * as dom from '../dom.js';

import { getState, setState } from "../state.js";
import { markWinCells } from './markers.js';
import { showNextBtn } from './controllers.js';


export function gameRunWinOverCheck() {
    const [run, won, over] = [getState().gameIsRunning, getState().roundWon, getState().gameOver]
    return !run || won || over;
}

export function cellEmpty(cell) {
    return cell.textContent == '' || cell.textContent == 'x' || cell.textContent == 'o';
}

export function winCheck() {
    const playedCells = getState().cells.filter(el => el !== '').length;
    if (playedCells < 3) {     // at least 3 letters are needed in order 'winCheck' to be initiated
        return;
    }
    for (let i = 0; i < getState().winCombos.length; i++) {
        let combination = getState().winCombos[i];    // [0, 1, 2] or [3, 4, 5] or etc.
        let combo = [];

        combination.forEach(ind => combo.push(getState().cells[ind]));
        const xCombo = '["X","X","X"]';
        const oCombo = '["O","O","O"]';

        if (JSON.stringify(combo) === xCombo || JSON.stringify(combo) === oCombo) {
            setState({
                roundWon: true,
                winnerCells: combination,
            });
            markWinCells(getState().winnerCells);    // 2nd optional param (color='purple') by default
            break;
        }
    }
    // Round Won
    if (getState().roundWon) {

        // Check if Player/Computer won the round
        setState({
            pcWon: getState().initialPlayerMark != getState().currentPlayerMark
                ? true
                : false,
        });
        switch (getState().currentPlayerMark) {     // winner is the current player
            case 'X': setState({
                    xScore: getState().xScore + 1,
                });
                dom.xScoreElement.textContent = getState().xScore;
                break;
            case 'O': setState({
                    oScore: getState().oScore + 1,
                });
                dom.oScoreElement.textContent = getState().oScore;
                break;
        }
        // Game over with WIN
        if (getState().xScore === 3 || getState().oScore === 3) {
            dom.messageElement.textContent = " is the Winner!!";
            setState({
                gameOver: true,
                gameIsRunning: false,
            });
            dom.nextRoundButtonElement.id = 'next-22';
        } else {
            dom.messageElement.textContent = " wins the round!";
            showNextBtn(true);
        }
        return;
    }
    // Game over with DRAW
    if (playedCells === 9) {               // if round ended,
        if (getState().round === 5) {                 // and is the last
            dom.messageElement.textContent = " is the Winner!";
            if (getState().xScore > getState().oScore) {
                dom.playerMarkElement.textContent = 'X';
                setState({
                    gameOver: true,
                });
            } else if (getState().oScore > getState().xScore) {
                dom.playerMarkElement.textContent = 'O';
                setState({
                    gameOver: true,
                });
            } else {
                dom.playerMarkElement.textContent = '';
                dom.messageElement.textContent = 'Game Over! Draw!';
            }
            // dom.nextRoundButtonElement.className = 'hidden';
            setState({
                gameIsRunning: false,
            });
            return;
        }
        dom.playerMarkElement.textContent = '';
        dom.messageElement.textContent = 'Round Draw!';
        showNextBtn(true);
        setState({
            roundWon: true,
        });
    }
}
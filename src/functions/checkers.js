import * as dom from '../dom.js';

import { getState, setState } from "../state.js";
import { markWinCells } from './markers.js';
import { showNextBtn } from './controllers.js';


export function gameRunWinOverCheck() {
    const { gameIsRunning, roundWon, gameOver } = getState();
    return !gameIsRunning || roundWon || gameOver;
}

export function cellEmpty(cell) {
    return cell.textContent == '' || cell.textContent == 'x' || cell.textContent == 'o';
}

const comboMatch = (cells, winCombos) => {
    for (let i = 0; i < winCombos.length; i++) {
        let combination = winCombos[i];    // [0, 1, 2] or [3, 4, 5] or etc.
        let combo = [];

        combination.forEach(ind => combo.push(cells[ind]));
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
}

const noCombos = (playedCells) => playedCells < 3;
//     return playedCells < 3    // at least 3 marks are needed for 'winCheck' to be initiated
// }

export function winCheck() {
    // get State vars, but not ALL -> SOME will be changed dynamically in state
    const {
        cells,
        winCombos,
        initialPlayerMark,
        currentPlayerMark,
        xScore,
        oScore,
        round,
    } = getState();
    const playedCells = cells.filter(el => el !== '').length;

    if (noCombos(playedCells, cells, winCombos)) return;
    comboMatch(cells, winCombos);       // someone has won

    // Round Won (by whom?)
    if (getState().roundWon) {

        // Check if Player/Computer won the round
        setState({
            pcWon: initialPlayerMark != currentPlayerMark
                ? true
                : false,
        });
        switch (currentPlayerMark) {     // winner is the current player
            case 'X': setState({
                xScore: xScore + 1,     // if X won +1
            });
                dom.xScoreElement.textContent = xScore + 1;
                break;
            case 'O': setState({
                oScore: oScore + 1,     // if O won +1
            });
                dom.oScoreElement.textContent = oScore + 1;
                break;
        }
        // Game over with Draw (final round + empty cells)
        if (round == 5 && getState().xScore == 2 && getState().oScore === 2) {
            setState({
                gameOver: true,
                gameIsRunning: false,
            });
            dom.playerMarkElement.textContent = '';
            dom.messageElement.textContent = 'Game Over! Draw!';
            return;
        }
        // Game over with WIN
        if (getState().xScore === 3 || getState().oScore === 3) {   // we get xScore/oScore dynamically
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
    // Game over with Draw (final round + no cells)
    const [xS, oS] = [getState().xScore, getState().oScore];
    if (playedCells === 9) {               // if no cells to play,
        if (round === 5) {                 // and last round
            dom.messageElement.textContent = " is the Winner!";
            if (xS > oS) {
                dom.playerMarkElement.textContent = 'X';
                setState({
                    gameOver: true,
                });
            } else if (oS > xS) {
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
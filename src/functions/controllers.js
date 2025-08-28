import * as dom from '../dom.js';
import { setState, getState } from "../state.js";

import { computerMove } from './moves.js';
import { unMarkWinCells } from './markers.js';


export function showHideRules () {
    if (dom.rulesTextElement.style.display === 'block') {
        dom.rulesTextElement.style.display = 'none';
        dom.rulesButtonElement.textContent = 'Show Rules'
    } else {
        dom.rulesTextElement.style.display = 'block';
        dom.rulesButtonElement.textContent = 'Hide Rules'
    }
}

export function showNextBtn(status=true) {
    status
    ? dom.nextRoundButtonElement.classList.remove('hidden')     // show
    : dom.nextRoundButtonElement.classList.add('hidden');       // hide
}

export function runGame() {
    setState({
        gameIsRunning: true,
    });
}

export function launchGame() {
    if (!getState().gameModeSelected || !getState().playerSelected) {
        return;
    }
    if (getState().gameMode == 'cvc') {
        computerMove();
    }
    dom.mainMenuElement.style.display = 'none';
    dom.startButtonElement.className = 'hidden';
    dom.gameElement.style.display = 'flex';

    showNextBtn(false);
}

export function stopGame() {
    setState({
        gameIsRunning: false,
    });
}

export function resetGame() {
    stopGame();
    dom.cellElements.forEach(cell => cell.textContent = '');
    setState({
        cells: ['', '', '', '', '', '', '', '', ''],
        currentPlayerMark: getState().initialPlayerMark,
        round: 1,
        roundWon: false,
        gameOver: false,
    });
    dom.playerMarkElement.textContent = getState().initialPlayerMark;
    dom.messageElement.textContent = "'s turn!"
    dom.xScoreElement.textContent = '0';
    dom.oScoreElement.textContent = '0';
    setState({
        xScore: 0,
        oScore: 0,
    });
    dom.roundElement.textContent = `Round ${getState().round}/5`;

    showNextBtn(false);
    unMarkWinCells();
    continueGame();

    if (getState().gameMode == 'cvc') {
        computerMove(1000);
    }
}

export function continueGame() {
    setState({
        gameIsRunning: true,
    });
}

export function mainMenu() {
    stopGame();

    // dom.mainMenuElement.style.display = 'flex';
    // dom.startButtonElement.className = '';
    // dom.gameElement.style.display = 'none';

    window.location.reload();
}

export function nextRound() {
    if (getState().gameOver || !getState().roundWon) {
        return;
    }
    setState({
        cells: ['', '', '', '', '', '', '', '', ''],
        round: getState().round + 1,
        roundWon: false,
    });
    dom.cellElements.forEach(cell => cell.textContent = '');
    dom.roundElement.textContent = `Round ${getState().round}/5`;
    showNextBtn(false);

    dom.playerMarkElement.textContent = getState().currentPlayerMark;
    dom.messageElement.textContent = "'s turn!"

    unMarkWinCells();
    if (getState().pcWon || getState().gameMode == 'cvc') {
        setState({
            pcWon: false,
        });
        computerMove();
    }
}
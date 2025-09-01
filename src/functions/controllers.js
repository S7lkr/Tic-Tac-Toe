import * as dom from '../dom.js';
import { setState, getState } from "../state.js";
import { computerMove } from './moves.js';
import { unMarkWinCells } from './markers.js';
import { report } from './winCheckers.js';


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
    const { initialPlayerMark } = getState();
    stopGame();
    setState({
        currentPlayerMark: initialPlayerMark,
        cells: Array(9).fill(''),
        round: 1,
        oScore: 0,
        xScore: 0,
        gameIsRunning: true,
        roundIsDraw: false,
        roundIsWon: false,
        pcWon: false,
    });
    report("'s turn!", initialPlayerMark);
    dom.cellElements.forEach(cell => cell.textContent = '');
    dom.roundElement.textContent = `Round ${getState().round}/5`;
    dom.xScoreElement.textContent = '0';
    dom.oScoreElement.textContent = '0';
    showNextBtn(false);
    unMarkWinCells();

    if (getState().gameMode == 'cvc') {
        computerMove(1000);
    }
}

export function mainMenu() {
    stopGame();

    // dom.mainMenuElement.style.display = 'flex';
    // dom.startButtonElement.className = '';
    // dom.gameElement.style.display = 'none';

    window.location.reload();
}

export function nextRound() {
    const { gameIsRunning, round, currentPlayerMark, gameMode, pcWon } = getState();
    if (!gameIsRunning) return;

    setState({
        cells: Array(9).fill(''),
        round: round + 1,
        roundIsWon: false,
        roundIsDraw: false,
        // pcWon: false,
    });
    dom.cellElements.forEach(cell => cell.textContent = '');
    dom.roundElement.textContent = `Round ${round + 1}/5`;
    showNextBtn(false);

    report("'s turn!", currentPlayerMark);

    unMarkWinCells();
    if (pcWon || gameMode === 'cvc') {
        computerMove();
    }
}
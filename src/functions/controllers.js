import { setState } from "../state";


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
    status ? dom.nextRoundButtonElement.classList.remove('hidden') : dom.nextRoundButtonElement.classList.add('hidden');
}

export function launchGame() {
    if (!gameModeSelected || !playerSelected) {
        return;
    }
    if (gameMode == 'cvc') {
        computerMove();
    }
    dom.mainMenuElement.style.display = 'none';
    dom.startButtonElement.className = 'hidden';
    dom.gameElement.style.display = 'flex';

    showNextBtn(false);
}

export function stopGame() {
    gameIsRunning = false;
}

export function resetGame() {
    stopGame();
    dom.cellElements.forEach(cell => cell.textContent = '');
    cells = ['', '', '', '', '', '', '', '', ''];
    dom.playerMarkElement.textContent = initialPlayerMark;
    currentPlayerMark = initialPlayerMark;
    dom.messageElement.textContent = "'s turn!"

    roundWon = false;
    gameOver = false;
    dom.xScoreElement.textContent = xScore = 0;
    dom.oScoreElement.textContent = oScore = 0;
    round = 1;
    dom.roundElement.textContent = `Round ${round}/5`;

    showNextBtn(false);
    unMarkWinCells();
    continueGame();

    if (gameMode == 'cvc') {
        computerMove(1000);
    }
}

export function continueGame() {
    gameIsRunning = true;
}

export function mainMenu() {
    stopGame();

    // dom.mainMenuElement.style.display = 'flex';
    // dom.startButtonElement.className = '';
    // dom.gameElement.style.display = 'none';

    window.location.reload();
}

export function nextRound() {
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
    if (pcWon || gameMode == 'cvc') {
        pcWon = false;
        computerMove();
    }
}
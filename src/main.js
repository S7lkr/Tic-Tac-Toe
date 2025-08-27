// DOM
import * as dom from './dom.js';

// functions
import { showHideRules } from '../src/functions/controllers.js';
import { gameModeSelector, playerSelector } from '../src/functions/selectors.js';
import { playerMove } from './functions/moves.js';
import { cellHover, cellUnHover } from './functions/effects.js';
import { nextRound, stopGame, resetGame, mainMenu } from '../src/functions/controllers.js';


main();

// ---------------------------- Functions -------------------------------

// Event listeners
function main() {
    // Set initial game configuration
    dom.roundElement.textContent = `Round ${round}/5`;
    dom.xScoreElement.textContent = xScore;
    dom.oScoreElement.textContent = oScore;

    // Initial (main menu) listeners
    dom.rulesButtonElement.addEventListener('click', showHideRules);
    dom.gameModeElements.forEach(el => el.addEventListener('change', gameModeSelector));
    dom.playerChoicesElement.forEach(el => el.addEventListener('change', playerSelector));

        
    // Start game listener
    dom.startButtonElement.addEventListener('click', launchGame);
    gameIsRunning = true;

    // Cell listeners
    dom.cellElements.forEach(cellEl => cellEl.addEventListener('click', playerMove));
    dom.cellElements.forEach(cellEl => cellEl.addEventListener('mouseover', cellHover));
    dom.cellElements.forEach(cellEl => cellEl.addEventListener('mouseout', cellUnHover));

    // Button listeners
    dom.nextRoundButtonElement.addEventListener('click', nextRound);
    dom.stopGameButtonElement.addEventListener('click', stopGame);
    dom.resetButtonElement.addEventListener('click', resetGame);
    dom.mainMenuButtonElement.addEventListener('click', mainMenu);
    dom.nextRoundButtonElement.id = 'next';
}
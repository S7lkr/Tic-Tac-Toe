// DOM
import * as dom from './dom.js';

// State
import { getState, setState } from './state.js';

// functions
import { gameModeSelector, playerSelector } from './functions/selectors.js';
import { playerMove } from './functions/moves.js';
import { cellHover, cellUnHover } from './functions/effects.js';
import { showHideRules, nextRound, stopGame, resetGame, mainMenu, launchGame } from './functions/controllers.js';


main();

// Event listeners
function main() {
    // Set initial game configuration
    dom.roundElement.textContent = `Round ${getState().round}/5`;
    dom.xScoreElement.textContent = getState().xScore;
    dom.oScoreElement.textContent = getState().oScore;

    // Initial (main menu) listeners
    dom.rulesButtonElement.addEventListener('click', showHideRules);
    dom.gameModeElements.forEach(el => el.addEventListener('change', gameModeSelector));
    dom.playerChoicesElement.forEach(el => el.addEventListener('change', playerSelector));
        
    // Start Button listener
    dom.startButtonElement.addEventListener('click', launchGame);
    setState({ gameIsRunning: true });

    // Cell listeners/effects
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
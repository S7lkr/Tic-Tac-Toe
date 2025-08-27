import { showModeElement, showPlayerElement, pHiddenElement, cellElements, playerMarkElement } from '../dom';

import { setState } from '../state';
import { playerMove } from './moves';


// GAME MODE
export function gameModeSelector(event) {
    // 'Player vs Player', 'Player vs Computer' or 'Computer vs Computer'
    showModeElement.textContent = vaR.modes[event.target.id];
    // pHiddenElement.textContent = event.target.id;
    const mode = event.target.value
    setState({
        gameMode: mode,
        gameModeSelected: true,
    });
    
    if (mode == 'cvc') {
        cellElements.forEach(cell => cell.removeEventListener('click', playerMove));
    }
}

// Player Choice
export function playerSelector(event) {
    // vaR.playerSelected = true;
    setState({
        playerSelected: true,
        initialPlayerMark: event.target.value,
        currentPlayerMark: event.target.value,
    });
    playerMarkElement.textContent = event.target.value;     // X or O
    // initialPlayerMark = playerMarkElement.textContent;
    showPlayerElement.textContent = 'Player:  ' + initialPlayerMark;
    // currentPlayerMark = playerMarkElement.textContent;
}
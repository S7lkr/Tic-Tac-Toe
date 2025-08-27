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
        gameMode: mode,         // 'pvp', 'pvc' or 'cvc'
        gameModeSelected: true,
    });
    
    if (mode == 'cvc') {
        cellElements.forEach(cell => cell.removeEventListener('click', playerMove));
    }
}

// Player Choice
export function playerSelector(event) {
    const symbol = event.target.value;
    setState({
        playerSelected: true,
        initialPlayerMark: symbol,
        currentPlayerMark: symbol,
    });
    playerMarkElement.textContent = symbol;     // X or O
    showPlayerElement.textContent = 'Player:  ' + symbol;
}
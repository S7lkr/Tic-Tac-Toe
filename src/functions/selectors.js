import { showModeElement, showPlayerElement, cellElements, playerMarkElement } from '../dom.js';

import { getState, setState } from '../state.js';
import { playerMove } from './moves.js';


// GAME MODE
export function gameModeSelector(event) {
    // 'Player vs Player', 'Player vs Computer' or 'Computer vs Computer'
    showModeElement.textContent = getState().modes[event.target.id];
    const mode = event.target.id;
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
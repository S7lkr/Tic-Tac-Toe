import { showModeElement, showPlayerElement, pHiddenElement, cellElements, playerMarkElement } from '../dom';
import { setState } from '../state';

// GAME MODE
export function gameModeSelector(event) {
    // 'Player vs Player', 'Player vs Computer' or 'Computer vs Computer'
    showModeElement.textContent = vaR.modes[event.target.id];
    pHiddenElement.textContent = event.target.id;
    setState({
        gameMode: pHiddenElement.textContent,
        gameModeSelected: true,
    });
    
    if (vaR.gameMode == 'cvc') {
        cellElements.forEach(cell => cell.removeEventListener('click', playerMove));
    }
}

// Player Choice
export function playerSelector(event) {
    vaR.playerSelected = true;
    playerMarkElement.textContent = event.target.value;     // X or O
    initialPlayerMark = playerMarkElement.textContent;
    showPlayerElement.textContent = 'Player:  ' + initialPlayerMark;
    currentPlayerMark = playerMarkElement.textContent;
}
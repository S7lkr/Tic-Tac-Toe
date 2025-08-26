export function cellEmpty(cell) {
    return cell.textContent == '' || cell.textContent == 'x' || cell.textContent == 'o';
}

export function winCheck() {
    const playedCells = cells.filter(el => el !== '').length;
    if (playedCells < 3) {     // at least 3 letters are needed in order 'winCheck' to be initiated
        return;
    }
    for (let i = 0; i < winCombos.length; i++) {
        let combination = winCombos[i];    // [0, 1, 2] or [3, 4, 5] or etc.
        let combo = [];

        combination.forEach(ind => combo.push(cells[ind]));
        const xCombo = '["X","X","X"]';
        const oCombo = '["O","O","O"]';

        if (JSON.stringify(combo) === xCombo || JSON.stringify(combo) === oCombo) {
            roundWon = true;
            winnerCells = combination;
            markWinCells(winnerCells);    // 2nd optional param (color='purple') by default
            break;
        }
    }
    // Round Won
    if (roundWon) {
        // Check if Player or Computer won the round
        pcWon = initialPlayerMark != currentPlayerMark ? true : false;

        switch (currentPlayerMark) {
            case 'X': xScore += 1; dom.xScoreElement.textContent = xScore; break;   // winner is the current player
            case 'O': oScore += 1; dom.oScoreElement.textContent = oScore; break;
        }
        // Game over with WIN
        if (xScore === 3 || oScore === 3) {
            dom.messageElement.textContent = " is the Winner!!";
            gameOver = true;
            gameIsRunning = false;
            dom.nextRoundButtonElement.id = 'next-22';
        } else {
            dom.messageElement.textContent = " wins the round!";
            showNextBtn(true);
        }
        return;
    }
    // Game over with DRAW
    if (playedCells === 9) {               // if round ended,
        if (round === 5) {                 // and is the last
            dom.messageElement.textContent = " is the Winner!";
            if (xScore > oScore) {
                dom.playerMarkElement.textContent = 'X';
                gameOver = true;
            } else if (oScore > xScore) {
                dom.playerMarkElement.textContent = 'O';
                gameOver = true;
            } else {
                dom.playerMarkElement.textContent = '';
                dom.messageElement.textContent = 'Game Over! Draw!';
            }
            // dom.nextRoundButtonElement.className = 'hidden';
            gameIsRunning = false;
            return;
        }
        dom.playerMarkElement.textContent = '';
        dom.messageElement.textContent = 'Round Draw!';
        showNextBtn(true);
        roundWon = true;
    }
}
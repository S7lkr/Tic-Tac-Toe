// ----------------- Global values -----------------


let state = {
    modes: {
        'pvc': 'Player vs Computer',
        'pvp': 'Player vs Player',
        'cvc': 'Computer vs Computer',
    },
    initialPlayerMark: '',
    currentPlayerMark: '',
    gameMode: '',

    // Winner cell indexes:
    cells: ['', '', '', '', '', '', '', '', ''],
    winnerCells: [],    // array -> any from winCombos
    winCombos: [
        [0, 1, 2],      // row 1
        [3, 4, 5],      // row 2
        [6, 7, 8],      // row 3
        [0, 3, 6],      // col 1
        [1, 4, 7],      // col 2
        [2, 5, 8],      // col 3
        [0, 4, 8],      // Left-Right diag.
        [2, 4, 6],      // Right-Left diag.
    ],
    round: 1,
    xScore: 0,
    oScore: 0,

    gameModeSelected: false,
    playerSelected: false,

    gameIsRunning: false,
    roundWon: false,
    gameOver: false,

    pcWon: false,
}

const listeners = [];

// state getter
export function getState() {
    return state;
}

// State setter -> called from outside, executed here -> modifying state (values)
export function setState(newState) {
    state = { ...state, ...newState };  // overwrite old state's key:value pair (change one/more values)
    listeners.forEach(lis => lis(state));
}

export function notify(listener) {
    listeners.push(listener);
}
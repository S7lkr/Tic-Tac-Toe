// 'State' -> all variables
let state = {
    modes: {
        'pvc': 'Player vs Computer',
        'pvp': 'Player vs Player',
        'cvc': 'Computer vs Computer',
    },
    initialPlayerMark: '',
    currentPlayerMark: '',
    gameMode: '',

    // track cell by index
    cells: Array(9).fill(''),
    winnerCells: [],    // array -> any from winCombos

    winCombos: [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],    // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],    // cols
        [0, 4, 8], [2, 4, 6],               // diagonals
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

export function getState() {
    return state;
}

// State Setter -> called from outside, executed here, modifying state
export function setState(newState) {
    state = { ...state, ...newState };      // overwrite old state's key:value pair (change one or more values)
}
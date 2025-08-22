// Rules
export const rulesTextElement = document.getElementById('rules-text');
export const rulesButtonElement = document.getElementById('rules-btn');

// ---------- Intro/Menu Section -----------

// Main menu container
export const mainMenuElement = document.getElementById('main-menu-container');

// Game Mode
export const gameModeMenuElement = document.getElementById('game-mode');
export const gameModeElements = document.querySelectorAll('input[name=game-mode]');

// Player Select
export const playerSelectMenuElement = document.getElementById('player-selection');
export const playerChoicesElement = document.querySelectorAll('input[name=player-choice]');

// Start Game
export const startButtonElement = document.getElementById('start-btn-container');

// ----------- Game Section -----------

// Main elements
export const gameElement = document.querySelector('div.tic-tac-toe');
export const gameModeElement = document.querySelector('#game-mode-section p');
export const roundElement = document.querySelector('div.round-status h3');
export const cellElements = document.querySelectorAll('div.cell-container div');

// Turn status message
export const playerMarkElement = document.getElementById('player');
export const messageElement = document.querySelector('span#round-message');

// Buttons: Next, Restart, Main Menu
export const nextRoundButtonElement = document.querySelector('.buttons button#next');
export const restartButtonElement = document.querySelector('.buttons button#restart-btn');
export const mainMenuButtonElement = document.getElementById('main-menu-btn');

// Score table
export const xScoreElement = document.getElementById('playerX');
export const oScoreElement = document.getElementById('playerO');
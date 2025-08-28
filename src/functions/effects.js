import { getState } from '../state.js';

export function cellHover(event) {
    if (event.target.textContent != '') {
        return;
    } else {
        event.target.textContent = getState().gameMode != 'pvc'
            ? getState().currentPlayerMark.toLowerCase()
            : getState().initialPlayerMark.toLocaleLowerCase();
        event.target.style.color = '#827f81ff';
    }
}

export function cellUnHover(event) {
    const cell = document.getElementById(event.target.id)
    cell.textContent = getState().cells[event.target.id];
    cell.style.color = 'black';
}

export function moveReject(cell) {
    cell.style.border = '4px solid red';
    cell.style.borderRadius = '0.1em';
    setTimeout(() => {
        cell.style.border = '2px solid black';
    }, 300);
}
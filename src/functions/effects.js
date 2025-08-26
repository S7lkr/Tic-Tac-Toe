import { cells } from "../main";

export function cellHover(event) {
    if (event.target.textContent != '') {
        return;
    } else {
        event.target.textContent = currentPlayerMark.toLowerCase();
        event.target.style.color = '#827f81ff';
    }
}

export function cellUnHover(event) {
    const cell = document.getElementById(event.target.id)
    cell.textContent = cells[event.target.id];
    cell.style.color = 'black';
}

export function moveReject(cell) {
    cell.style.border = '4px solid red';
    cell.style.borderRadius = '0.1em';
    setTimeout(() => {
        cell.style.border = '2px solid black';
    }, 300);
}
import { cellElements } from "../dom.js";

const painter = (cell, color) => {
    cellElements.item(cell).style.backgroundColor = color;
}

export function markWinCells(winCells, color='orange') {
    const [c1, c2, c3] = winCells;
    // cellElements.item(c1).style.backgroundColor = color;
    // cellElements.item(c2).style.backgroundColor = color;
    // cellElements.item(c3).style.backgroundColor = color;
    painter(c1, color);
    painter(c2, color);
    painter(c3, color);
}

export function unMarkWinCells(color='antiquewhite') {
    // const [cell1, cell2, cell3] = winCells;
    cellElements.forEach(el => el.style.backgroundColor = color);
}
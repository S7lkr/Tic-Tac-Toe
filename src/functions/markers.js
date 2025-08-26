import { cellElements } from "../dom";

export function markWinCells(winCells, color='orange') {
    const [c1, c2, c3] = winCells;
    cellElements.item(c1).style.backgroundColor = color;
    cellElements.item(c2).style.backgroundColor = color;
    cellElements.item(c3).style.backgroundColor = color;
}

export function unMarkWinCells(color='antiquewhite') {
    // const [cell1, cell2, cell3] = winCells;
    cellElements.forEach(el => el.style.backgroundColor = color);
}
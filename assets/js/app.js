import * as grid from "./grid.js";
console.clear();
window.requestAnimationFrame(update);

function start() {
    grid.createGrid();
}

start();
function update() {
    grid.updateGrid();

    window.requestAnimationFrame(update);
}

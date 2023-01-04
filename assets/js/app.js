import * as grid from "./grid.js";
import * as alien from "./alien.js";
import * as manager from "./game-manager.js";

console.clear();
window.requestAnimationFrame(update);

function start() {
    manager.initShip();
    manager.initAliens();
}

start();

function update() {
    grid.updateGrid();

    alien.updateAlien();
    manager.death();

    window.requestAnimationFrame(update); // Game loop
}

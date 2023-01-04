import * as grid from "./grid.js";
import * as alien from "./alien.js";
import * as manager from "./game-manager.js";
import * as bullet from "./missile.js"

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
    bullet.updateBullet();
    manager.death();

    window.requestAnimationFrame(update); // Game loop
}

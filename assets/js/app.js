import * as grid from "./grid.js";
import * as alien from "./alien.js";
import * as manager from "./game-manager.js";
import * as bullet from "./missile.js";

console.clear();

function start() {
    manager.initShip();
    manager.initAliens();
    manager.initScore();

    window.requestAnimationFrame(update);
}

let backgroundMusic = new Audio("../sounds/background-music.mp3");
backgroundMusic.play();

start();

function update() {
    grid.updateGrid();

    alien.updateAlien();
    bullet.updateBullet();
    manager.death();
    manager.win();
    window.requestAnimationFrame(update); // Game loop
}

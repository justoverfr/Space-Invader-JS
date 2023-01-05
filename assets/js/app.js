import * as grid from "./grid.js";
import * as alien from "./alien.js";
import * as manager from "./game-manager.js";
import * as bullet from "./missile.js";

console.clear();

const restartButton = document.querySelector("button");
restartButton.addEventListener("click", restart);

function start() {
    restartButton.setAttribute("disabled", "");
    manager.initShip();
    manager.initAliens();
    manager.initScore();

    manager.startGame();
    window.requestAnimationFrame(update);
}

let backgroundMusic = new Audio("../sounds/background-music.mp3");
backgroundMusic.play();

start();

function update() {
    grid.updateGrid();

    alien.updateAlien();
    bullet.updateBullet();
    manager.manageCollision();

    manager.win();
    console.log(manager.isPlaying);
    if (manager.isPlaying) {
        window.requestAnimationFrame(update); // Game loop
    } else {
        grid.updateGrid();
        restartButton.removeAttribute("disabled");
    }

    // manager.test();
}

function restart() {
    start();
}

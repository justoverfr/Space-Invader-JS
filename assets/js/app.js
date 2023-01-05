import * as grid from "./grid.js";
import * as alien from "./alien.js";
import * as manager from "./game-manager.js";
import * as bullet from "./missile.js";

console.clear();

const gameDisplay = document.querySelector("#game");
console.log(gameDisplay);

const startButton = document.querySelector("#start-button")
startButton.addEventListener("click", start);

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", restart);

function start() {
    gameDisplay.style.display = "block";
    startButton.setAttribute("disabled", "");
    restartButton.setAttribute("disabled", "");
    manager.initShip();
    manager.initAliens();
    manager.initScore();

    manager.startGame();
    window.requestAnimationFrame(update);
}

function update() {
    alien.updateAlien();
    bullet.updateBullet();
    manager.manageCollision();

    grid.updateGrid();
    if (manager.isPlaying) {
        window.requestAnimationFrame(update); // Game loop
    } else {
        restartButton.removeAttribute("disabled");
    }
}

function restart() {
    start();
}

import * as grid from "./grid.js";
import * as alien from "./alien.js";
import * as manager from "./game-manager.js";
import * as bullet from "./missile.js";
import * as ui from "./ui.js";

console.clear();

ui.startButton.addEventListener("click", start);

ui.restartButton.addEventListener("click", restart);

ui.highscoreDisplay.innerHTML =
    "Highscore : " + window.localStorage.getItem("highscore");

function start() {
    manager.initShip();
    manager.initAliens();
    manager.initScore();

    manager.initDisplay();

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
    }
}

function restart() {
    start();
}

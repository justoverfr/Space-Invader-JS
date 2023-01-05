import * as grid from "./grid.js";
import * as alien from "./alien.js";
import * as manager from "./game-manager.js";
import * as bullet from "./missile.js";
import * as ui from "./ui.js";

console.clear();

ui.startButton.addEventListener("click", start);

ui.restartButton.addEventListener("click", restart);

function start() {
    // gameDisplay.style.display = "block";
    // startButton.setAttribute("disabled", "");
    // restartButton.setAttribute("disabled", "");

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

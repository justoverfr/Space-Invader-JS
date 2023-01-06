import * as grid from "./grid.js";
import * as alien from "./alien.js";
import * as manager from "./game-manager.js";
import * as bullet from "./missile.js";
import * as ui from "./ui.js";

console.clear();

ui.highscoreDisplay.innerHTML =
    "Highscore : " + window.localStorage.getItem("highscore");

ui.startButton.addEventListener("click", startGame);

ui.restartButton.addEventListener("click", restart);

ui.continueButton.addEventListener("click", continueGame);

function start() {
    manager.initShip();
    manager.initAliens();

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

function startGame() {
    start();
    manager.resetScore();
    alien.resetSpeedAndShootFrequency();
}

function continueGame() {
    start();
    alien.increaseSpeed(5);

    if (alien.getShootFrequency() > 0.2) {
        alien.lowerShootFrequency(0.2);
    }
    bullet.nextAlienShoot = Date.now() + 2;
}

function restart() {
    start();
    manager.resetScore();
    alien.resetSpeedAndShootFrequency();
}

function quit() {
    ui.hide(ui.gameSection);
    ui.show(ui.mainMenuSection);
}

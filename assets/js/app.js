import * as grid from "./grid.js";
import * as alien from "./alien.js";
import * as manager from "./game-manager.js";
import * as bullet from "./missile.js";
import * as ui from "./ui.js";

console.clear();

ui.highscoreDisplay.innerHTML =
    "Highscore : " + window.localStorage.getItem("highscore");

ui.startButton.addEventListener("click", startGame);

ui.restartButton.addEventListener("click", startGame);

ui.continueButton.addEventListener("click", continueGame);

ui.quitButton.addEventListener("click", quit);

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
    // manager.resetScore();
    alien.resetSpeedAndShootFrequency();
    start();
}

function continueGame() {
    alien.increaseSpeed(5);

    if (alien.alienShootFrequency > 0.2) {
        alien.lowerShootFrequency(0.2);
    }
    bullet.setNextAlienShoot(Date.now() + 2);
    start();
}

// function restart() {
//     start();
//     manager.resetScore();
//     alien.resetSpeedAndShootFrequency();
// }

function quit() {
    ui.hide(ui.gameSection);
    ui.hide(ui.endGameSection);
    ui.show(ui.mainMenuSection);
}

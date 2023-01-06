import * as grid from "./grid.js";
import * as alien from "./alien.js";
import * as manager from "./game-manager.js";
import * as bullet from "./missile.js";
import * as ui from "./ui.js";

console.clear();

ui.highscoreDisplay.innerHTML =
    "Highscore : " + window.localStorage.getItem("highscore");

ui.startButton.addEventListener("click", startGame);

ui.restartButton.addEventListener("click", restartGame);

ui.continueButton.addEventListener("click", continueGame);

ui.quitButton.addEventListener("click", quit);

ui.difficultySelect.forEach((diffRadio) => {
    diffRadio.addEventListener("change", () => {
        manager.setDifficulty(diffRadio.value);
    });
});

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
    manager.resetScore();
    if (manager.difficulty == "easy") {
        alien.setDefaultSpeed(3);
        alien.setDefaultShootFrequency(1.5);
    } else if (manager.difficulty == "medium") {
        alien.setDefaultSpeed(5);
        alien.setDefaultShootFrequency(1);
    } else {
        alien.setDefaultSpeed(7);
        alien.setDefaultShootFrequency(0.5);
    }

    alien.resetSpeedAndShootFrequency();

    start();
}

function restartGame() {
    manager.resetScore();
    alien.resetSpeedAndShootFrequency();

    start();
}

function continueGame() {
    alien.increaseSpeed(5);

    if (alien.alienShootFrequency > 0.3) {
        alien.lowerShootFrequency(0.3);
        Math.max(alien.alienShootFrequency, 0.3);
    }
    start();
}

function quit() {
    ui.hide(ui.gameSection);
    ui.hide(ui.endGameSection);
    ui.show(ui.mainMenuSection);
}

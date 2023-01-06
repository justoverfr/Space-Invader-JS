import * as ship from "./ship.js";
import * as alien from "./alien.js";
import * as bullet from "./missile.js";
import * as ui from "./ui.js";
import * as sound from "./sound.js";
import { gridWidth, gridHeight } from "./grid.js";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
let score = 0;
export let highscore = window.localStorage.getItem("highscore");
if (highscore == null || highscore == undefined) {
    highscore = 0;
}
export let isPlaying;

export let difficulty = "medium";

/* -------------------------------------------------------------------------- */
/*                                   Program                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Initalisation ----------------------------- */

export function startGame() {
    bullet.bulletArray.splice(0, bullet.bulletArray.length);
    bullet.alienBulletArray.splice(0, bullet.alienBulletArray.length);
    isPlaying = true;

    bullet.setNextAlienShoot(Date.now() + 2);

    sound.backgroundMusic.play();
}

export function initDisplay() {
    ui.displayGame();
    ui.hide(ui.endGameSection);
    ui.hide(ui.mainMenuSection);
    ui.hide(ui.resultDisplay);

    ui.scoreDisplay.innerHTML = "Score : " + score;
}

export function resetScore() {
    score = 0;
}

export function initShip() {
    const shipX = Math.floor(gridWidth / 2);
    const shipY = gridHeight - 1;

    ship.setShipPosX(shipX);
    ship.setShipPosY(shipY);
}

export function initAliens() {
    alien.alienArray.splice(0, alien.alienArray.length);

    const maxAlienY = alien.alienYNum;
    const minAlienX =
        Math.floor(gridWidth / 2) - Math.floor(alien.alienXNum / 2);
    const maxAlienX = minAlienX + alien.alienXNum;

    for (let posY = 0; posY < maxAlienY; posY++) {
        for (let posX = minAlienX; posX < maxAlienX; posX++) {
            alien.alienArray.push([posX, posY]);
        }
    }
}

/* ---------------------------------- Score --------------------------------- */
export function addScore(value) {
    score += value;
    ui.scoreDisplay.innerHTML = "Score: " + score;
}

/* ---------------------------------- Loop ---------------------------------- */

export function manageCollision() {
    const bulletCollision = detectCollision(
        bullet.bulletArray,
        alien.alienArray
    );
    if (bulletCollision !== null) {
        deletePosition(alien.alienArray, bulletCollision);
        deletePosition(bullet.bulletArray, bulletCollision);
        addScore(1);

        sound.alienDeath.play();

        if (alien.alienArray.length == 0) {
            win();
        }
    }

    const shipPos = [[ship.shipPosX, ship.shipPosY]];
    const shipCollision = detectCollision(shipPos, alien.alienArray);
    const alienBulletCollision = detectCollision(
        shipPos,
        bullet.alienBulletArray
    );
    if (shipCollision !== null || alienBulletCollision !== null) {
        death();
    }

    const divList = document.querySelectorAll("div");

    divList.forEach((div) => {
        if (
            div.classList.contains("alien-bullet") &&
            div.classList.contains("vaisseau")
        ) {
            death();
        }
    });
}

function detectCollision(array1, array2) {
    let collisionPos;
    array1.forEach((pos1) => {
        const pos1X = pos1[0];
        const pos1Y = pos1[1];

        array2.forEach((pos2) => {
            const pos2X = pos2[0];
            const pos2Y = pos2[1];

            if (pos1X == pos2X && pos1Y == pos2Y) {
                collisionPos = pos1;
            }
        });
    });

    if (collisionPos != null) {
        return collisionPos;
    }
    return null;
}

function deletePosition(array, posToDel) {
    array.forEach((pos) => {
        if (JSON.stringify(pos) == JSON.stringify(posToDel)) {
            const posIndex = array.indexOf(pos);
            array.splice(posIndex, 1);
        }
    });
}

export function death() {
    ui.resultDisplay.innerHTML = "Game Over";
    ui.resultDisplay.style.color = "red";

    sound.deahtSound.play();

    ui.enableButton(ui.restartButton);
    ui.disableButton(ui.continueButton);
    endGame();
}

export function win() {
    ui.resultDisplay.innerHTML = "You Won";
    ui.resultDisplay.style.color = "green";

    sound.winSound.play();

    ui.enableButton(ui.continueButton);
    ui.disableButton(ui.restartButton);
    endGame();
}

function endGame() {
    isPlaying = false;
    ui.show(ui.endGameSection);
    ui.show(ui.resultDisplay);

    if (highscore == null || score > highscore) {
        highscore = score;
        window.localStorage.setItem("highscore", highscore);
        ui.highscoreDisplay.innerHTML = "Highscore : " + highscore;
    }

    sound.stopSound(sound.backgroundMusic);
}

export function setDifficulty(value) {
    difficulty = value;
    console.log(difficulty);
}

function keydown(event) {
    var key = event.keyCode;
    if ([81, 37, 68, 39, 90, 38, 83, 40].includes(key)) {
        ship.moveShip(key);
    }

    if (key == 32) {
        bullet.shoot();
    }
}

window.addEventListener("keydown", keydown, false);

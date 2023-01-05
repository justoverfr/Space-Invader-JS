import * as ship from "./ship.js";
import * as alien from "./alien.js";
import * as bullet from "./missile.js";
import { gridWidth, gridHeight } from "./grid.js";

/* -------------------------------------------------------------------------- */
/*                                    Music                                   */
/* -------------------------------------------------------------------------- */
var music1 = document.getElementById("audio");
function stop_music() {
    music1.pause();
}

var music_game_over = document.getElementById("audio-game-over");
function playMusicGameOver() {
    music_game_over.play();
}

var music_win = document.getElementById("win");
function playSiuu() {
    music_win.play();
}

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
let score;
const scoreDisplay = document.querySelector(".score");

export let isPlaying = true;

/* -------------------------------------------------------------------------- */
/*                                   Program                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Initalisation ----------------------------- */
export function startGame() {
    bullet.bulletArray.splice(0, bullet.bulletArray.length);
    isPlaying = true;
}

export function initScore() {
    score = 0;
    scoreDisplay.innerHTML = "Score: " + score;
}

export function initShip() {
    const shipX = Math.floor(gridWidth / 2);
    const shipY = gridHeight - 1;

    ship.setShipPosX(shipX);
    ship.setShipPosY(shipY);
}

export function initAliens() {
    alien.alienArray.splice(0, alien.alienArray.length);

    for (let posY = 0; posY < 3; posY++) {
        for (let posX = 4; posX < 19; posX++) {
            alien.alienArray.push([posX, posY]);
        }
    }
}

/* ---------------------------------- Score --------------------------------- */
export function addScore(value) {
    score += value;
    scoreDisplay.innerHTML = "Score: " + score;
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
    }

    const shipPos = [[ship.shipPosX, ship.shipPosY]];
    const shipCollision = detectCollision(shipPos, alien.alienArray);
    if (shipCollision !== null) {
        death();
    }
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
    scoreDisplay.innerHTML = "Game Over";
    stop_music();
    playMusicGameOver();
    isPlaying = false;
}

export function win() {
    if (alien.alienArray.length == 0) {
        let text = document.querySelector("h3");
        stop_music();
        playSiuu();
        text.innerHTML = "You Won";
        isPlaying = false;
    }
}

//-------------
export function test (){
    alien.alienArray.forEach(
        (alienPos) => {
            if (alienPos[1]== gridHeight - 1){
                death();
            }
        }
    )
}
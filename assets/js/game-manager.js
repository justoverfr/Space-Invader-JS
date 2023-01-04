import * as ship from "./ship.js";
import * as alien from "./alien.js";
import { gridWidth, gridHeight } from "./grid.js";

var music = document.getElementById("audio");
function stop_music() {
  music.pause();
}

export function initShip() {
    const shipX = Math.floor(gridWidth / 2);
    const shipY = gridHeight - 1;

    ship.setShipPosX(shipX);
    ship.setShipPosY(shipY);
}

export function initAliens() {
    for (let posY = 0; posY < 3; posY++) {
        for (let posX = 4; posX < 16; posX++) {
            alien.alienArray.push([posX, posY]);
        }
    }
}

export function death() {
    let divList = document.querySelectorAll("div");

    divList.forEach((div) => {
        if (
            div.classList.contains("tireur") &&
            div.classList.contains("alien")
        ) {
            let text = document.querySelector("h3");
            stop_music();
            text.innerHTML = "GameOver";
        }
    });
}



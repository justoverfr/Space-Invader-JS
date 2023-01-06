import { gridWidth, gridHeight } from "./grid.js";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
export let shipPosX;
export let shipPosY;

/* -------------------------------------------------------------------------- */
/*                                   Program                                  */
/* -------------------------------------------------------------------------- */
export function setShipPosX(posX) {
    shipPosX = posX;
}

export function setShipPosY(posY) {
    shipPosY = posY;
}

export function moveShip(key) {
    if ((key == "81" || key == "37") && shipPosX > 0) {
        shipPosX--;
    } else if ((key == "68" || key == "39") && shipPosX < gridWidth - 1) {
        shipPosX++;
    }

    if ((key == "90" || key == "38") && shipPosY > gridHeight - 3) {
        shipPosY--;
    } else if ((key == "83" || key == "40") && shipPosY < gridHeight - 1) {
        shipPosY++;
    }
}

function keydown(event) {
    var key = event.keyCode;
    moveShip(key);
}

function keyup(event) {
    var key = event.keyCode;
    moveShip(key);
}

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);

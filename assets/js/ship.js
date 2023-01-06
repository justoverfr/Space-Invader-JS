import { gridWidth, gridHeight } from "./grid.js";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
export let shipPosX;
export let shipPosY;

const speed = 100;
let nextMove = Date.now();

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
    if (Date.now() > nextMove) {
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

        nextMove = Date.now() + (1 / speed) * 1000;
    }
}

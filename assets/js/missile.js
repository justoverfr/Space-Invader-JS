import {shipPosX, shipPosY} from "./ship.js"

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
export const bulletArray = [];
const speed = 10;

let nextMove = Date.now();

/* -------------------------------------------------------------------------- */
/*                                   Program                                  */
/* -------------------------------------------------------------------------- */
export function updateBullet() {
    if (Date.now() > nextMove) {
        bulletArray.forEach((bulletPos) => {
            bulletPos[1]--;

            nextMove = Date.now() + (1 / speed) * 1000;

            if (bulletPos[1] < 0) {
                bulletArray.splice(bulletPos, 1);
            } 
        });
    }
}

function shoot(key) {
    if (key == "32") {
        bulletArray.push([shipPosX, shipPosY-1]);
    }
}

function keydown(event) {
    var key = event.keyCode;
    shoot(key);
}

function keyup(event) {
    var key = event.keyCode;
}

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);

import { shipPosX, shipPosY } from "./ship.js";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
export let bulletArray = [];
const speed = 10;

let nextMove = Date.now();
export let bulletPos;

let nextShoot = Date.now();
const shootRate = 0.5;

/* -------------------------------------------------------------------------- */
/*                                   Program                                  */
/* -------------------------------------------------------------------------- */
export function updateBullet() {
    if (Date.now() > nextMove) {
        moveBullet();
        nextMove = Date.now() + (1 / speed) * 1000;
    }
}

function moveBullet() {
    bulletArray.forEach((bulletPos) => {
        bulletPos[1]--;

        if (bulletPos[1] < 0) {
            bulletArray.splice(bulletArray.indexOf(bulletPos), 1);
        }
    });
}

function shoot(key) {
    if (key == "32") {
        bulletArray.push([shipPosX, shipPosY - 1]);
    }
}

function keydown(event) {
    var key = event.keyCode;

    if (Date.now() > nextShoot) {
        shoot(key);
        nextShoot = Date.now() + shootRate * 1000;
    }
}

function keyup(event) {
    var key = event.keyCode;
}

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);

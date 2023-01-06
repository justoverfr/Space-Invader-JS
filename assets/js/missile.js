import { gridHeight } from "./grid.js";
import { shipPosX, shipPosY } from "./ship.js";
import { alienArray, alienShootFrequency } from "./alien.js";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
export let bulletArray = [];
const speed = 20;

let nextShoot = Date.now();
const shootRate = 0.5;

export let alienBulletArray = [];

export let nextAlienShoot = Date.now() + 2;

let nextMove = Date.now();
/* -------------------------------------------------------------------------- */
/*                                   Program                                  */
/* -------------------------------------------------------------------------- */
export function updateBullet() {
    if (Date.now() > nextMove) {
        moveBullet(bulletArray, -1);
        moveBullet(alienBulletArray, 1);
        nextMove = Date.now() + (1 / speed) * 1000;
    }

    if (Date.now() > nextAlienShoot) {
        alienShoot();
        nextAlienShoot = Date.now() + alienShootFrequency * 1000;
    }
}

function alienShoot() {
    const alienBulletPos = initAlienBulletPos();
    console.log(alienBulletPos);

    alienBulletArray.push(alienBulletPos);
}

function initAlienBulletPos() {
    const lowestAlienY = alienArray[alienArray.length - 1][1];
    const AlienXOnLowestY = alienArray
        .filter((alien) => alien[1] == lowestAlienY)
        .map((alien) => alien[0]);

    const randomAlienX =
        AlienXOnLowestY[Math.floor(Math.random() * AlienXOnLowestY.length)];

    return [randomAlienX, lowestAlienY + 1];
}

function moveBullet(array, direction) {
    array.forEach((bulletPos) => {
        bulletPos[1] += direction;

        if (bulletPos[1] < 0 || bulletPos[1] > gridHeight - 1) {
            array.splice(array.indexOf(bulletPos), 1);
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

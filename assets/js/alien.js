import * as manager from "./game-manager.js";
import { gridHeight } from "./grid.js";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
export let alienArray = [];
const speed = 3;
let direction = 1;
let goingDown = false;
let leavingSide = false;

let nextMove = Date.now();
export let alienPos;

/* -------------------------------------------------------------------------- */
/*                                   Program                                  */
/* -------------------------------------------------------------------------- */
export function updateAlien() {
    setMoveDirection();

    if (Date.now() > nextMove) {
        moveAlien();
        nextMove = Date.now() + (1 / speed) * 1000;

        if (goingDown && !leavingSide) {
            goingDown = false;
            leavingSide = true;
        }
    }
}

function setMoveDirection() {
    let divList = document.querySelectorAll("div");

    divList.forEach((div) => {
        if (
            div.classList.contains("grid-side") &&
            div.classList.contains("alien") &&
            !leavingSide &&
            !goingDown
        ) {
            setDirectionDown(div);
        }
    });
}

function setDirectionDown(div) {
    if (div.classList.contains("grid-left")) {
        direction = 1;
    } else {
        direction = -1;
    }

    goingDown = true;
}

function moveAlien() {
    alienArray.forEach((alienPos) => {
        if (leavingSide || (!goingDown && !leavingSide)) {
            alienPos[0] += direction;
            leavingSide = false;
        } else if (goingDown && !leavingSide) {
            alienPos[1] += 1;
        }

        if (alienPos[1] == gridHeight - 1) {
            manager.death();
        }
    });
}

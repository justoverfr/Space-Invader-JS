import * as manager from "./game-manager.js";

/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
export let alienArray = [];
const speed = 30;
let direction = 1;

let nextMove = Date.now();
let newLine = false;
export let alienPos;

/* -------------------------------------------------------------------------- */
/*                                   Program                                  */
/* -------------------------------------------------------------------------- */
export function updateAlien() {
    if (Date.now() > nextMove) {
        alienArray.forEach((alienPos) => {
            alienPos[0] += direction;

            nextMove = Date.now() + (1 / speed) * 1000;
            manager.test();
        });
    }

    let divList = document.querySelectorAll("div");

    newLine = false;
    divList.forEach((div) => {
        if (
            div.classList.contains("grid-side") &&
            div.classList.contains("alien") &&
            !newLine
        ) {
            if (div.classList.contains("grid-left")) {
                direction = 1;
            } else {
                direction = -1;
            }

            alienArray.forEach((alien_) => {
                alien_[0] += direction;
                newLine = true;
                alien_[1]++;
            });
        }
    });
}

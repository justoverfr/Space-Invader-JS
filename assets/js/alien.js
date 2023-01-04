/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
export const alienArray = [];
const speed = 3;
let direction = 1;

let nextMove = Date.now();
let newLine = false;

/* -------------------------------------------------------------------------- */
/*                                   Program                                  */
/* -------------------------------------------------------------------------- */
export function updateAlien() {
    console.log(alienArray);

    if (Date.now() > nextMove) {
        alienArray.forEach((alien_) => {
            alien_[0] += direction;
            nextMove = Date.now() + (1 / speed) * 1000;
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

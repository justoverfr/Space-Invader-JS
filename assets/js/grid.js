import * as ship from "./ship.js";
import * as alien from "./alien.js";
import * as bullet from "./missile.js";

const grid = document.querySelector(".grille");
export const gridWidth = 20;
export const gridHeight = 20;

export function createGrid() {
    const stringAlienArray = alien.alienArray.map((alien) => {
        return JSON.stringify(alien);
    });

    const stringBulletArray = bullet.bulletArray.map((bullet) => {
        return JSON.stringify(bullet);
    });

    for (let posY = 0; posY < gridHeight; posY++) {
        for (let posX = 0; posX < gridWidth; posX++) {
            const gridCell = document.createElement("div");

            if (posX == 0 || posX == gridWidth - 1) {
                gridCell.classList.add("grid-side");

                if (posX == 0) {
                    gridCell.classList.add("grid-left");
                } else {
                    gridCell.classList.add("grid-right");
                }
            }

            if (posX == ship.shipPosX && posY == ship.shipPosY) {
                gridCell.classList.add("tireur");
            }

            if (stringAlienArray.includes(JSON.stringify([posX, posY]))) {
                gridCell.classList.add("alien");
            }

            if (stringBulletArray.includes(JSON.stringify([posX, posY]))) {
                gridCell.classList.add("laser");
            }

            grid.appendChild(gridCell);
        }
    }
}

export function updateGrid() {
    grid.innerHTML = "";

    createGrid();
}

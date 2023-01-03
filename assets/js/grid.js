import * as ship from "./ship.js";

const grid = document.querySelector(".grille");
const gridWidth = 20;
const gridHeight = 20;

export function createGrid() {
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

            if (posY == gridHeight - 1 && posX == ship.getShipPos()) {
                gridCell.classList.add("tireur");
            }
            if (posY < 3 && posX > 3 && posX < 16) {
                gridCell.classList.add("alien");
            }

            grid.appendChild(gridCell);
        }
    }
}

export function updateGrid() {
    grid.innerHTML = "";

    createGrid();
}

const grid = document.querySelector(".grille");
const gridWidth = 20;
const gridHeight = 20;

function createGrid() {
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

            if (posY == gridHeight - 1 && posX == Math.floor(gridWidth / 2)) {
                gridCell.classList.add("tireur");
            }

            grid.appendChild(gridCell);
        }
    }
}

createGrid();

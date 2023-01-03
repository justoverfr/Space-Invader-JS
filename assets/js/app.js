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
                // gridCell.classList.add("alien");
            }
            if (posY < 3) {
                gridCell.classList.add("alien");
            }

            grid.appendChild(gridCell);
        }
    }
}

function death() {
    let divList = document.querySelectorAll("div");

    divList.forEach(
        (div) => {
            if (div.classList.contains("tireur") && div.classList.contains("alien") ) {

                div.classList.add("game-over");
                let text = document.querySelector("h3");

                text.innerHTML = "Game Over"
            }
        }
    )
}

createGrid();
death();
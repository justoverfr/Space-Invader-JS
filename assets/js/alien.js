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
    /*met à jour la position de l'alien, choisis la direction de déplacement, 
    déplace alien uniquement si heure actuelle > heure du prochain mouvement*/
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
    /*prend tous les elements div du documents & regarde les div qui sont des aliens et sur le coté de la grille
    si c'est la cas on appelle la fonction "SetDirectionDown */
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
    /*choisi la postion en fonction de la div passé en paramètre, si la div a la classe "grid-left"la direction = 1 (droite)
    sinon la direction = -1 (gauche)*/ 
    if (div.classList.contains("grid-left")) {
        direction = 1;
    } else {
        direction = -1;
    }

    goingDown = true;
}

function moveAlien() {
    //parcours le tableau ("alienAray") & met a jour chaque position d'alien par rapport a la position actuelle
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


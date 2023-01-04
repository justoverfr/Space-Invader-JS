import { alienArray } from "./alien.js";
import { gridWidth } from "./grid.js";
import {shipPosX, shipPosY} from "./ship.js"
import {score, addScore} from "./game-manager.js";
/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
export const bulletArray = [];
const speed = 10;

let nextMove = Date.now();
export let bulletPos;

/* -------------------------------------------------------------------------- */
/*                                   Program                                  */
/* -------------------------------------------------------------------------- */
export function updateBullet() {
    
    if (Date.now() > nextMove) {
        bulletArray.forEach((bulletPos) => {
            bulletPos[1]--;
            
            nextMove = Date.now() + (1 / speed) * 1000;
            
            if (bulletPos[1] < 0) {
                bulletArray.splice(bulletPos, 1);
            } 
        });
    }
    
    const divList = document.querySelectorAll("div");
    let text = document.querySelector("h3")
    let divX = 0;
    let divY = 0;
    
    divList.forEach((div) => {
        if(div.classList.contains("bullet") && div.classList.contains("alien")){
            bulletArray.splice([divX, divY], 1);

            alienArray.splice([divX, divY], 1);
            
            addScore(1);
            text.innerHTML = "Score : " +  score;
        }

        divX++;
        if (divX >= gridWidth) {
            divX = 0;
            divY++;
        }
    });
}


function shoot(key) {
    if (key == "32") {
        bulletArray.push([shipPosX, shipPosY-1]);
    }
}

function keydown(event) {
    var key = event.keyCode;
    shoot(key);
}

function keyup(event) {
    var key = event.keyCode;
}

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);

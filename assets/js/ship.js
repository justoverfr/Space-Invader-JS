let shipPos = 10;

export function getShipPos() {
    return shipPos;
}

export function moveShip(key) {
    if (key == "81" || key == "37") {
        shipPos--;
    } else if (key == "68" || key == "39") {
        shipPos++;
    }
}

function keydown(event) {
    var key = event.keyCode;
    moveShip(key);
}
function keyup(event) {
    var key = event.keyCode;
    console.log(key);
    moveShip(key);
}

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);

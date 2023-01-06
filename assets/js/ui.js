export const gameDisplay = document.querySelector("#game");
export const scoreDisplay = document.querySelector(".score");
export const highscoreDisplay = document.querySelector(".highscore");
export const resultDisplay = document.querySelector(".result");

export const startButton = document.querySelector("#start-button");

export const restartButton = document.querySelector("#restart-button");

export function displayGame() {
    gameDisplay.style.display = "block";
}

export function disableAllButtons() {
    const buttonList = document.querySelectorAll("button");

    buttonList.forEach((button) => {
        disableButton(button);
    });
}

export function disableButton(button) {
    button.setAttribute("disabled", "");
}

export function enableButton(button) {
    button.removeAttribute("disabled");
}

export function hide(element) {
    element.style.display = "none";
}

export function show(element) {
    element.style.removeProperty("display");
}

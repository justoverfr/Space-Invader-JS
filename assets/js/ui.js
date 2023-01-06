export const gameSection = document.querySelector("#game");
export const endGameSection = document.querySelector("#end-game");
export const mainMenuSection = document.querySelector("#main-menu");

export const scoreDisplay = document.querySelector(".score");
export const highscoreDisplay = document.querySelector(".highscore");
export const resultDisplay = document.querySelector(".result");

export const startButton = document.querySelector("#start-button");
export const continueButton = document.querySelector("#continue-button");
export const restartButton = document.querySelector("#restart-button");
export const quitButton = document.querySelector("#quit-button");

export function displayGame() {
    gameSection.style.display = "block";
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

hide(gameSection);
hide(endGameSection);

export function show(element) {
    element.style.removeProperty("display");
}

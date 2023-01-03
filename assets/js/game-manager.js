function death() {
    let divList = document.querySelectorAll("div");

    divList.forEach((div) => {
        if (
            div.classList.contains("tireur") &&
            div.classList.contains("alien")
        ) {
            let text = document.querySelector("h3");

            text.innerHTML = "Game Over";
        }
    });
}

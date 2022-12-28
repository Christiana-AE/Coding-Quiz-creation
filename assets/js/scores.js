var clearScores = document.querySelector("#clear")

// Clearing high scores
function clearHighScores() {
    clearScores.textContent = 0;
}


clearScores.addEventListener("click", clearHighScores);

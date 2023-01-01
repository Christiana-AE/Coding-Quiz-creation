var clearScores = document.querySelector("#clear");
var userSavedHighScores = document.querySelector("#highscores");

// Create new listed element for ordered list
var scoreList = document.createElement("li");

scoreList.setAttribute("class", "topscores");
userSavedHighScores.appendChild(scoreList);


renderLastHighScore();


function renderLastHighScore() {
    var initials = window.localStorage.getItem("initials");
    var result = window.localStorage.getItem("result");

    scoreList.innerHTML = '<span>' + initials + " - " + result + '</span>';

    if (!initials || !result) {
        return;
    }
}

// Clearing high scores
function clearHighScores() {
    localStorage.clear();
    userSavedHighScores.classList.add('hide');
}

clearScores.addEventListener("click", clearHighScores);

var clearScores = document.querySelector("#clear");
var userSavedHighScores = document.querySelector("#highscores");

var scoreList = document.createElement("li");
userSavedHighScores.appendChild(scoreList);


renderLastHighScore();


function renderLastHighScore(){
    var initials = localStorage.getItem("initials");
    var userHighScore = localStorage.getItem("userHighScore");

    scoreList.innerHTML= '<span>'+ initials + " - " + userHighScore + '</span>';

    if(!initials || !userHighScore){
        return;
    }
    
}

// Clearing high scores
function clearHighScores() {
    initials = "";
    userHighScore = 0;
    userSavedHighScores.classList.add('hide');
}

clearScores.addEventListener("click", clearHighScores);

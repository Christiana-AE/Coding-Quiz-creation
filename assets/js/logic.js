// Linking HTML elements

var question = document.querySelector("#question-title");
var answer = document.querySelector(".choices");
var startButton = document.querySelector("#start");
var result = document.querySelector("#final-score");
var timerElement = document.querySelector("#time");
var feedback = document.querySelector(".feedback");
var submit = document.querySelector("#submit")
var clearScores = document.querySelector("#clear")
var questions_section = document.querySelector("#questions");
var start = document.querySelector(".start");
var endScreen = document.querySelector("#end-screen");
var timer;
var timerCount;
var maxQuestions = 10; // total number of questions
var maxOptions = 4; // total number of available options per questions 
var questionIndex = 0; // to keep track of what question we are showing 
var keepCountingTime = true; // to check if all questions are answered before timer ends


// Create ordered list for answer options
var listEl = document.createElement("ol");
var option1 = document.createElement("li");
var option2 = document.createElement("li");
var option3 = document.createElement("li");
var option4 = document.createElement("li");

answer.appendChild(listEl);

// Create buttons for options
option1.setAttribute("type", "button");
option2.setAttribute("type", "button");
option3.setAttribute("type", "button");
option4.setAttribute("type", "button");
listEl.setAttribute("class", ".selected");

listEl.appendChild(option1);
listEl.appendChild(option2);
listEl.appendChild(option3);
listEl.appendChild(option4);




// start timer at 60 secs
function startTimer() {
    timerCount = 60;
    timer = setInterval(function () {
        timerElement.textContent = timerCount;
        if (keepCountingTime === true) {
            timerCount--;
        }

        startButton.disabled = true;

        if (timerCount < 0) {
            clearInterval(timer);
            saveScore();

        }
    }, 1000);
}

// Start quiz once start button is clicked
function startQuiz() {
    start.classList.add('hide');
    questions_section.classList.remove('hide');
    displayQuestion();

};

function displayQuestion() {
    var que_tag = '<span>' + questions[questionIndex].quest + '</span>';

    // Multiple choice options for the questions
    option1.textContent = questions[questionIndex].ans[0];
    option2.textContent = questions[questionIndex].ans[1];
    option3.textContent = questions[questionIndex].ans[2];
    option4.textContent = questions[questionIndex].ans[3];

    question.innerHTML = que_tag;
}

// Check if submitted answer is correct or not 

function checkAnswer() {
    for (var i = 0; i < maxOptions; i++) {
        listEl.children[i].addEventListener("click", function (e) {
            var submitted = e.target.textContent;
            if (submitted === questions[questionIndex - 1].isCorrect) {
                feedback.textContent = "Correct!"
            }
            else {
                feedback.textContent = "Wrong!";

            }
        })
    }

    if (questionIndex < maxQuestions) {
        displayQuestion();
    }
    questionIndex = questionIndex + 1;

    if (feedback.textContent === "Wrong!") {
        timerCount = timerCount - 10;
    }
    if (questionIndex === maxQuestions) {
        saveScore();
    }
}


// Display result and save score
function saveScore() {
    if (timerCount < 0) {
        result.textContent = 0
    } else {
        result.textContent = timerCount;
    }
    questions_section.classList.add('hide')
    endScreen.classList.remove('hide');
    timerElement.classList.add('hide');
    keepCountingTime = false;
}

// Clearing high scores
function clearHighScores() {
    clearScores.textContent = 0;
}


// Adding event listener to start button to call startQuiz function 

startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", startQuiz);
answer.addEventListener("click", checkAnswer);
submit.addEventListener("click", saveScore);
clearScores.addEventListener("click", clearHighScores);


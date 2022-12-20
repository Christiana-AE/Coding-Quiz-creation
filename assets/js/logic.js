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
var timer;
var timerCount;
var maxQuestions = 10;
var maxOptions = 4;
var questionIndex = 0; // to keep track of what question we ae showing 


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
        timerCount--;
        startButton.disabled = true;

        if (timerCount === -1) {
            clearInterval(timer);
        }
    }, 1000);
}

// Start quiz once start button is clicked
function startQuiz() {

    start.classList.add('hide');
    questions_section.classList.remove('hide');
    displayQuestion();

};

function displayQuestion(){
    var que_tag = '<span>' + questions[questionIndex].quest + '</span>';
    //   var option_tag = '<div class="option"><span>' + option1 + '</span></div>'
    //   //  + '<div class="option"><span>' + option2 + '</span></div>'
    //    // + '<div class="option"><span>' + option3 + '</span></div>'
    //     + '<div class="option"><span>' + option4 + '</span></div>'


    // Multiple choice options for the questions
    option1.textContent = questions[questionIndex].ans[0];
    option2.textContent = questions[questionIndex].ans[1];
    option3.textContent = questions[questionIndex].ans[2];
    option4.textContent = questions[questionIndex].ans[3];


    question.innerHTML = que_tag;
    //    answer.innerHTML = option_tag;
   // checkAnswer(); //
}

// Check if submitted answer is correct or not 

function checkAnswer() {
    for (var i = 0; i < maxOptions; i++) {
       listEl.children[i].addEventListener("click", function (e) {
        console.log(e.target);
        var submitted = e.target.textContent;
            if (submitted === questions[questionIndex].isCorrect) {
                feedback.textContent = "Correct!"
            }
            else {
                feedback.textContent = "Wrong!";
                timerCount - 10;
            }
            maxQuestions - 1;
        })
    }
}


// When you enter initials and submit, it should save value 
function saveScore() {
    if (timerCount === 0 || maxQuestions === 0) {
        result = timerCount
    }
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
//clearScores.addEventListener("click", clearHighScores);


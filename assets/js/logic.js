// Linking HTML elements

var question = document.querySelector("#question-title");
var answer = document.querySelector(".choices");
var startButton = document.querySelector("#start");
var result = document.querySelector("#final-score");
var timerElement = document.querySelector("#time");
var feedback = document.querySelector(".feedback");
var submitInitials = document.querySelector("#submit")
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
var responseButton1 = document.createElement("button");
var responseButton2 = document.createElement("button");
var responseButton3 = document.createElement("button");
var responseButton4 = document.createElement("button");


// Append the different options to their respective buttons 

responseButton1.appendChild(option1);
responseButton2.appendChild(option2);
responseButton3.appendChild(option3);
responseButton4.appendChild(option4);


// Append the reponse buttons to the parent ordered list element
listEl.appendChild(responseButton1);
listEl.appendChild(responseButton2);
listEl.appendChild(responseButton3);
listEl.appendChild(responseButton4);



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
            
            // display score if player runs out of time
            displayScore();

        }
    }, 1000);
}

// Start quiz once start button is clicked
function startQuiz() {
    start.classList.add('hide');
    questions_section.classList.remove('hide');
    displayQuestion();

};

// Function to display the quiz questions
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

    // to move quiz to the next question
    if (questionIndex < maxQuestions) {
        displayQuestion();
    }
    questionIndex = questionIndex + 1;

    if (feedback.textContent === "Wrong!") {
        timerCount = timerCount - 10;
    }
    if (questionIndex === maxQuestions) {
        // display score if user finishes the quiz before timer runs out
        displayScore();
    }
}


// Display quiz result when timer expires or if user completes quiz
function displayScore() {
    if (timerCount < 0) {
        result.textContent = 0
    } else {
        result.textContent = timerCount;
    }
    questions_section.classList.add('hide')
    endScreen.classList.remove('hide');
    keepCountingTime = false; // so that timer can stop

}

// Saving user initials 
function saveScore(){
    location.href = "./highscores.html"
    
}



// Adding event listener to start button to call startQuiz function 

startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", startQuiz);
answer.addEventListener("click", checkAnswer);
submitInitials.addEventListener("click", saveScore);


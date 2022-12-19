// Linking HTML elements

var question = document.querySelector("#question-title");
var answer = document.querySelectorAll(".choices");
var startButton = document.querySelector("#start");
var result = document.querySelector("#final-score");
var timerElement = document.querySelector("#time");
var feedback = document.querySelector(".feedback");
var submit = document.querySelector("#submit")
var clearScores = document.querySelector("#clear")
var timer;
var timerCount;
var maxQuestions = 10;
var maxOptions = 4;


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



// Multiple choice options for the questions
option1.textContent = questions[0].ans[0];
option2.textContent = questions[1].ans[1];
option3.textContent = questions[2].ans[2];
option4.textContent = questions[3].ans[3];

// start timer at 60 secs
function startTimer(){
    timerCount = 60;
    timer = setInterval(function(){
       timerElement.textContent = timerCount;
        timerCount--;
       startButton.disabled = true;
       startQuiz();
        
        if (timerCount === -1){
            clearInterval(timer);
        }
    }, 1000);
}

// Start quiz once start button is clicked
function startQuiz(){

  for (var index = 0; index < maxQuestions; index++){
    var que_tag = '<span>' + questions[index].quest + '</span>';
    var option_tag = '<div class="option"><span>' + option1 + '</span></div>'
    + '<div class="option"><span>' + option2 + '</span></div>' 
    + '<div class="option"><span>' + option3 + '</span></div>'
    + '<div class="option"><span>' + option4 + '</span></div>'

    question.innerHTML = que_tag;
    answer.innerHTML = option_tag;
    checkAnswer();
  }  
};


// Check if submitted answer is correct or not 

function checkAnswer(){
    var submitted = "";
    for(var i = 0; i < maxOptions; i++){
            answer[i].addEventListener("click", function(e){
                submitted = e.target.value;
                if (submitted === questions[i].isCorrect){
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
function saveScore(){
    if(timerCount === 0 || maxQuestions === 0){
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
clearScores.addEventListener("click", clearHighScores);


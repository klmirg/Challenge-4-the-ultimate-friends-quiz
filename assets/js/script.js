var questions = [
  {
    title: "How many years did Friends air for?",
    choices:["7 years", "10 years", "3 years", "12 years"],
    answer: "10 years",
  },
  {
    title: "How many times did Ross get married?",
    choices: ["3", "0", "1", "2"],
    answer: "3",
  },
  {
    title: "How many times did Ross get married?",
    choices: ["3", "0", "1", "2"],
    answer: "3",
  },
  {
    title: "How many times did Ross get married?",
    choices: ["3", "0", "1", "2"],
    answer: "3",
  },
  {
    title: "How many times did Ross get married?",
    choices: ["3", "0", "1", "2"],
    answer: "3",
  },

]

var questionDiv = document.getElementById("questions");
var choicesElement = document.getElementById("choices");
var timerElement = document.getElementById("time")
// referencing startBtn by id on html
var startBtn = document.getElementById("startBtn");
startBtn.onclick = startQuiz;

var currentQuestionIndex = 0;
var time = 60;
var timerId;
var correct = 0;


function startQuiz(){
  var startScreenDiv = document.getElementById("startScreen");
  startScreenDiv.setAttribute("class", "hide")

  questionDiv.removeAttribute("class");

  timerId = setInterval(startTimer, 1000)

  displayQuestion()
}

  function startTimer(){
    time--;
    timerElement.textContent = time;

    if(time === 0){
      endQuiz();
    }
  }

  function displayQuestion(){
    var currentQuestion = questions[currentQuestionIndex];

    var questionTitle = document.getElementById("questionTitle");
    questionTitle.textContent = currentQuestion.title;

    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i){

      var choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("class", "choice");
      choiceBtn.setAttribute("value", choice);

      choiceBtn.textContent = i + 1 + ". " + choice;

      choiceBtn.onclick = handleClick;
      choicesElement.append(choiceBtn);
    })   
  }

  function handleClick(){

    if(this.value !== questions[currentQuestionIndex].answer ){
      time -= 10;
    } else {
      correct++;
    }

    if(time < 0){
      time = 0;
    }

    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length){
      endQuiz();
    } else {
      displayQuestion();
    }
  }

  function endQuiz(){

    clearInterval(timerId);

    var endScreen = document.getElementById("endScreen");
    endScreen.removeAttribute("class");

    questionDiv.setAttribute("class", "hide");

    var score = correct / questions.length;
    var userScore = score.toFixed(2);
    var finalScore = userScore.split("0.")

    console.log("userScore", finalScore[1] + "%")

    var finalScoreElement = document.getElementById("finalScore");
    finalScoreElement.textContent = finalScore[1] + "%";

  }

  // fire off new function (savehighscore) when the submit button is clicked
  // get the value of the user initials input (id="initials") ".value"
  // make an object "newScore" and have the first key be the user initials and the second key be the userScore
  // JSON.stringify and enter user initials along with user score into localstorage
  // also included with thte onclick function have it bring you to a highscores.html or do the setAttribute class to hide for everything else and show the highscore div
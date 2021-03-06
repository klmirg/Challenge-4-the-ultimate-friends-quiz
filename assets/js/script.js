// The array of questions for the quiz
var questions = [
  {
    title: "How many years did Friends air for?",
    choices:["Seven years", "Ten years", "Three years", "Twelve years"],
    answer: "Ten years",
  },
  {
    title: "How many times did Ross get married?",
    choices: ["Three", "Zero", "One", "Two"],
    answer: "Three",
  },
  {
    title: "What is the name of Ross' first wife?",
    choices: ["Emily", "Carol", "Susan", "Rachel"],
    answer: "Carol",
  },
  {
    title: "What famous line was Joey known for?",
    choices: ["We were on a break!", "Oh. My. God.", "Pivot!", "How you doin'!"],
    answer: "How you doin'!",
  },
  {
    title: "What was the name of the coffee shop that they frequented?",
    choices: ["Central Park Coffee", "Perk Cafe", "Central Perk", "None of the Above"],
    answer: "Central Perk",
  },
  {
    title: "Which character has a twin?",
    choices: ["Rachel", "Phoebe", "Joey", "Janice"],
    answer: "Phoebe",
  },
  {
    title: "Who was Monica's first kiss?",
    choices: ["Ross", "Chandler", "Joey", "Pete"],
    answer: "Ross",
  },
  {
    title: "What is Phoebe's sisters name?",
    choices: ["Jill", "Amy", "Ariel", "Ursula"],
    answer: "Ursula",
  },
  {
    title: "What is the name of the dancer that moved in with Joey?",
    choices: ["Janice", "Janine", "Bonnie", "Erica"],
    answer: "Janine",
  },
  {
    title: "What is Joey's favorite food?",
    choices: ["Pizza", "Sandwiches", "Spaghetti", "Burgers"],
    answer: "Sandwiches",
  },
  {
    title: "Who was the first person to find out Monica and Chandler are dating?",
    choices: ["Phoebe", "Ross", "Rachel", "Joey"],
    answer: "Joey",
  },
  {
    title: "What location was never featured on the show?",
    choices: ["London", "Barbados", "Paris", "New York"],
    answer: "Paris",
  },
  {
    title: "Who walked Phoebe down the aisle at her and Mike's wedding?",
    choices: ["Ross", "Chandler", "Joey", "Her dad"],
    answer: "Chandler",
  },
  {
    title: "Which actor did NOT appear on the show?",
    choices: ["Paul Rudd", "Bruce Willis", "Hank Azaria", "Mark Ruffalo"],
    answer: "Mark Ruffalo",
  },
  {
    title: "What is Chandler's middle name?",
    choices: ["Marcel", "Bing", "Muriel", "Chandler didn't have a middle name."],
    answer: "Muriel",
  },
  {
    title: "Who says the last line of the series?",
    choices: ["Chandler", "Joey", "Rachel", "Monica"],
    answer: "Chandler"
  }
]


var questionDiv = document.getElementById("questions");
var choicesElement = document.getElementById("choices");
var timerElement = document.getElementById("time");
var submitInitialsBtn = document.getElementById("submitInitials");
// referencing startBtn by id on html
var startBtn = document.getElementById("startBtn");
startBtn.onclick = startQuiz;

// Setting up the variables
var currentQuestionIndex = 0;
var time = 60;
var timerId;
var correct = 0;
var initials = "";
var finalScore = "";

// The start quiz function
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

  // This function gets the questions to display
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
    // This if statement is saying if you answer incorrectly, it is taking 10 seconds off your time
    if(this.value !== questions[currentQuestionIndex].answer ){
      time -= 10;
    } else {
      correct++;
    }

    if(time < 0){
      endQuiz();
    }

    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length){
      endQuiz();
    } else {
      displayQuestion();
    }
  }

  // This is the function to end the quiz
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

    var submitInitials = document.getElementById("submitInitials");
    submitInitials.onclick = saveHighScore;

  }


// This is the function to save the high scores
  var saveHighScore = function () {
   
    var initials = submitInitials

    if (initials !== "") {
      var highscores = 
      JSON.parse(window.localStorage.getItem("highscores")) || [];
      

      var newScore = {
        initials: initials,
        score: finalScore
      };
      

      highscores.push(newScore);
      window.localStorage.setItem("highscores", 
      JSON.stringify(highscores));

      
    }
  };

  

  submitInitialsBtn.onclick = saveHighScore;
    
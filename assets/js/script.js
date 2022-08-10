// Create variables/arrays that contain the questions, choices, and answers from the mock up provided. 
var questions = [
    {
        question: "The biggest WAB in our group chat is:",
        choices: ["1. Nadir", "2. Fadel", "3. Ali", "4. Steve"],
        answer: "2. Fadel"
    },
    {
        question: "Fadel's primary job functions at GM include:",
        choices: ["1. Quality control assurance and line production", "2. Director of the Accounting and Fiance Department", "3. 'Assistant' to the Regional Manager", "4. Full job details are not known, but he spends quite a bit of time under his boss's deck and has knee pads in his briefcase"],
        answer: "4. Full job details are not known, but he spends quite a bit of time under his boss's deck and has knee pads in his briefcase"
    },
    {
        question: "Fadel would consider himself to be a member of the _______ political party.",
        choices: ["1. Democratic", "2. Republican", "3. Trump's nut sack admiration committee", "4. Liberal left-wing brainwashed cult"],
        answer: "3. Trump's nut sack admiration committee"
    },
    {
        question: "When Fadel has a complaint with a purchase transaction, he takes the following action(s):",
        choices: ["1. Turns into a Brandon (male version of a Karen) and requests to speak with the manager", "2. Goes on the company's website to file a formal complaint", "3. Doesn't leave the store until he receives a store credit to be 'compenstated' for the inconvenience", "4. All of the above"],
        answer: "4. All of the above"
    },
    {
        question: "Fadel's biggest secret that he doesn't want anyone to know about is:",
        choices: ["1. He'secretly in love with Joe Biden and 'Sleepy Joe' is actually a nick name Fadel has for him when he dreams about being in the bedroom with him", "2. He sleeps with a doll made out of Trump's hair", "3. He's actual a Jew disguised as a Muslim", "4. He loves trolling to get a reaction out of us"],
        answer: "1. He'secretly in love with Joe Biden and 'Sleepy Joe' is actually a nick name Fadel has for him when he dreams about being in the bedroom with him"
    },
];

//Additional Variables: 
var currentScore = 0; 
var questionNumber = 0;

// Variables with query selection to reference HTML file: 
var timeLeft = document.querySelector("#time-left");
var startGame = document.querySelector("#start-button");
var quizQuestion = document.querySelector("#quiz-question");
var card = document.querySelector("#card");

// Variables for quiz functions: 
var startingTime = 75;
var timer = 0;
var wrongAnswer = 10;

// Varabile for creating an element not currently in existing HTML. 
var createList = document.createElement("ul");

// Timer function to display on screen and count down. 
startGame.addEventListener("click", function() {
    if (timer === 0) {
        timer = setInterval(function() {
            startingTime--;
            timeLeft.textContent = "Seconds Left: " + startingTime;

            if (startingTime <= 0) {
                clearInterval(timer);
                gameOver();
                timeLeft.textContent = "Time Over!"
            }
        }, 1000);
    }
    render(questionNumber);
});

// Function for questions, answers and choices: 
function render(questionNumber) {
    createList.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
        var displayQuestion = questions[questionNumber].question;
        var displayChoices = questions[questionNumber].choices;
        quizQuestion.textContent = displayQuestion;
    }

    displayChoices.forEach(function (newEl) {
        var li = document.createElement("li");
        li.textContent = newEl;
        quizQuestion.appendChild(createList);
        createList.appendChild(li);
        li.addEventListener("click", (compareAnswer));
    })
}

// Function that confirms if the correct answer was selected. Message will state if correct or incorrect 
// and provide the right answer. Once all questions are answered the total is tallied and displayed. 
function compareAnswer(event) {
    var selection = event.target; 
    
    if (selection.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (selection.textContent == questions[questionNumber].answer) {
            currentScore++;
            createDiv.textContent = questions[questionNumber].answer + " is correct!";

        } else {
            startingTime = startingTime - wrongAnswer;
            createDiv.textContent = "That is incorrect, the answer is: " + questions[questionNumber].answer;
        }
    }
    questionNumber++;

    if (questionNumber >= questions.length) {
        createDiv.textContent = "Game Over! You correctly answered " + currentScore + "/" + questions.length + " questions";
        gameOver();
        
    } else {
        render(questionNumber);
    }
    quizQuestion.appendChild(createDiv);
}


// Game over function that clears content and allows to start over. 
function gameOver() {
    quizQuestion.innerHTML = "";
    timeLeft.innerHTML = "";
    var timeRemaining = 0;

    var createHeading = document.createElement("h1");
    createHeading.setAttribute("id", "create-heading");
    createHeading.textContent = "Quiz Completed!";

    quizQuestion.appendChild(createHeading);

    // Displays final score information and time left. 
    var createParagraph = document.createElement("p");
    createParagraph.setAttribute("id", "create-paragraph");

    quizQuestion.appendChild(createParagraph);

    if (startingTime >= 0) {
        timeRemaining = startingTime;
        clearInterval(timer);
    }

    createParagraph.textContent = "Final Score: " + timeRemaining;

    //Variables for labeling, set attributes, and submitting for initials.    
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "create-label");
    createLabel.textContent = "Enter your initials: ";

    quizQuestion.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("id", "initials");
    createInput.setAttribute("type", "text");
    createInput.textContent = "";

    quizQuestion.appendChild(createInput);

    var createSubmitButton = document.createElement("button");
    createSubmitButton.setAttribute("id", "submit-button");
    createSubmitButton.setAttribute("type", "submit");
    createSubmitButton.textContent = "Submit";

    quizQuestion.appendChild(createSubmitButton);

    // Added the event listener to record/respond to the submit button click.
    createSubmitButton.addEventListener("click", function() {
        var initials = createInput.value;
        if(initials === null) {
            console.log("No initials entered"); 
        } else {
                var endScore = {
                initials: initials,
                score: timeRemaining
            }
            
    // Used to pull and "destringify" scores from local storage.  
            var allScores = localStorage.getItem("allScores");
            if(allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
    // Pushes scores to local storage and "stringifies" them.  
            allScores.push(endScore);
            
            var newAllScores = JSON.stringify(allScores);
            localStorage.setItem("allScores", newAllScores);

    // Gets you to the high score board. 
            window.location.replace("./highscores.html");
        }
    });
}

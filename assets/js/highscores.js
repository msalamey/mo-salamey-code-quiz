// Variables for high scores. 
var scores = document.querySelector("#scores");
var clearScores = document.querySelector("#clear-scores");
var backButton = document.querySelector("#back-button");

// Fuction to clear high scores in local storage. 
clearScores.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

// Used to "get" and "destringify" scores from local storage. 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

// Iterates/"for loop" as long as all scores are not 0/null. Creates list with initials and scores.  
if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " - " + allScores[i].score;
        scores.appendChild(createLi);
    }
}

// Event lister to go back to the quiz. 
backButton.addEventListener("click", function() {
    window.location.replace("./index.html");
});
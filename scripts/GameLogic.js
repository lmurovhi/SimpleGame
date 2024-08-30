 //Creating a constant score object to keep track of the score
 const score ={
    wins: 0,
    losses: 0,
    ties: 0
};

//Preparing Display Settings
//Locating and linking the paragraphs
let theResultDisplay = document.querySelector(".jsResult");
let theMovesDisplay = document.querySelector(".jsMoves");
let theScoreDisplay = document.querySelector(".jsScore");

//Listening to the storage event
window.addEventListener("storage", fetchExistingScore(),true);

//Function 1: Playing the game and generating computer move
function generateComputerMove(userMove){

    //Using the random() function to generate a value between 0 and 1
    //and storing it in a constant
    const randomNumber = Math.random();

    //Creating the computer move variable
    let computerMove = '';

    //Checking the random value based on the assumption of dividing
    //the range 0 to 1 into thirds
    if(randomNumber >= 0 && randomNumber < 1/3){
        computerMove = "Rock";
    } else if(randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = "Paper";
    }else if(randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = "Scissors";
    }

    //Displaying the computer move
    console.log(computerMove);

    //Calling another function to comppare the move
    compareChoices(userMove, computerMove);
}

//Function 2: Comparing the user and computer moves
function compareChoices(userChoice, computerChoice){

    //Creating a result varaible
    let theResult = '';

    //Comparing the choices
    if(userChoice === computerChoice){
        theResult = "Tie.";
    }else if(userChoice === "Paper" && computerChoice == "Rock"){
        theResult = "You win.";
    }else if(userChoice === "Paper" && computerChoice == "Scissors"){
        theResult = "You lose.";
    }else if(userChoice === "Rock" && computerChoice == "Paper"){
        theResult = "You lose.";
    }else if(userChoice === "Rock" && computerChoice == "Scissors"){
        theResult = "You win.";
    }else if(userChoice === "Scissors" && computerChoice == "Rock"){
        theResult = "You lose.";
    }else if(userChoice === "Scissors" && computerChoice == "Paper"){
        theResult = "You win.";
    }

    //Calling the score update function
    let theScore = updateScore(theResult);

    //Displaying the final result
    //alert(`You picked: ${userChoice}. Coumpter picked: ${computerChoice}. ${theResult}.\n${theScore}`);
    displayResults(theResult, userChoice, computerChoice, theScore);
}

//Function 3: Updating the game score
function updateScore(aResult){

    //Checking the result
    if(aResult === "You win."){
        score.wins += 1;
    }else if(aResult === "You lose."){
        score.losses += 1;
    }else if(aResult === "Tie."){
        score.ties += 1;
    }

    //Storing the updated scores in the local storage
    //Local storage works with text only[Use JSON.stringfy() to convert the object into text]
    localStorage.setItem('score', JSON.stringify(score));

    //Storing the current score
    let currentScore = `Wins: ${score.wins} - Losses: ${score.losses} - Ties: ${score.ties}`;

    //Returning the current score
    return currentScore;
}

//Function 4: Resetting the current score
function resetScore(){

    //Resetting the score object
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    //Deleting the stored score from the localStorage
    localStorage.removeItem('score');

    //Storing the current score
    let currentScore = `Wins: ${score.wins} - Losses: ${score.losses} - Ties: ${score.ties}`

    //Notifying the user upon reset completion
   // alert(`The score has been successfully reset.\n${currentScore}`);
   displayResults(undefined, undefined, undefined, currentScore);

}

//Function 5: Updating the score object using the localStorage object
function fetchExistingScore(){

    // Getting data from the localStorage and converting the data back to javaScript object
    let newScore = JSON.parse(localStorage.getItem('score'));

    //Checking is the newScore is empty
    if(newScore === null){
        alert("There is no saved score")
    }else{
        alert("Saved score available..");
        //Updating the score object
        score.wins = newScore.wins;
        score.losses = newScore.losses;
        score.ties = newScore.ties;
    }
}

//Function 6: Displaying the game ststus
function displayResults(aResult='New Game', userVal='No Moves', computerVal='No Moves', scoreVal){
    theResultDisplay.innerHTML = aResult;
    theMovesDisplay.innerHTML = `you:
<img src="./images/${userVal}Final.png" class="moveIcon">
<img src="./images/${computerVal}Final.png" class="moveIcon">
Computer`;
    theScoreDisplay.innerHTML = `${scoreVal}`;
}
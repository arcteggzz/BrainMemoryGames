//A. GET THE VARIABLES NEEDED
//start button
const startButton = document.querySelector("button");
//all boxes on screen
const boxes = Array.from(document.querySelectorAll(".box"));
//computer move array
const computerMoves = [];
//state of Game
let gameIsActive = false;
//state of user clicks
let isCorrect = false;
//set move counter
let moveCounter = 0;
let playerTurn = false;
//select the h1
const h1Text = document.querySelector("h1");

//1. User starts the game
startButton.addEventListener("click", startGame);

//6. user clicks a square to register his move
boxes.forEach((box) => {
  box.addEventListener("click", playRound);
});

function playRound() {
  if (gameIsActive) {
    //get players move (do all 3 things)
    //a. get human move
    let humanMove = this.dataset.key;
    //b. flash move
    flashBox(humanMove, true);
    //c. play audio
    playAudio(humanMove);
    //check if move is correct
    isCorrect = checker(computerMoves[moveCounter], humanMove);
    //increment moveCounter
    moveCounter++;
    if (isCorrect) {
      //inidicate game state on screen
      // console.log("correct");
      //update game state variables
      gameIsActive = true;
      if (moveCounter == computerMoves.length) {
        //indicate that you have completed this round
        // console.log("right");
        //update the level on screen
        h1Text.textContent = `Level ${moveCounter}`;
        //generate computer next move
        generateComputerNextMove();
        console.log(computerMoves);
        //reset move Counter
        moveCounter = 0;
      }
    } else {
      //inidicate game state on screen
      // console.log("wrong");
      //play fail audio
      const funSong = 7;
      playAudio(funSong);
      //display fail screen
      // document.body.removeProperty("background-image");
      document.body.classList.add("correct");
      //reset all game state variables
      gameIsActive = false;
      isCorrect = false;
      moveCounter = 0;
      //delete all elements of the computer move array
      computerMoves.length = 0;
    }
  }
}

function startGame() {
  gameIsActive = true;
  h1Text.textContent = `Level ${0}`;
  document.body.classList.remove("correct");
  //2. generate computer's first move
  //function below does three things.
  //get computer move number, show move and play audio
  generateComputerNextMove();
  // console.log(computerMoves);
  // console.log(playerTurn);
}

function generateComputerNextMove() {
  //get computer move number
  let computerNewMove = getComputerMove();
  //2a. update computer move array
  computerMoves.push(computerNewMove);
  setTimeout(() => {
    //3. flash to incdicate human move
    flashBox(computerNewMove, false);
    //4. play audio
    playAudio(computerNewMove);
  }, 1250);
}

function getComputerMove() {
  const computerMove = getRandomInt(1, 7);
  return computerMove;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function flashBox(number, humanMove) {
  newBox = document.querySelector(`.box[data-key="${number}"]`);
  if (humanMove) {
    newBox.classList.add("clicked");
  } else {
    newBox.classList.add("highlighted");
  }
}

function playAudio(number) {
  correctAudio = document.querySelector(`.audio[data-key="${number}"]`);
  if (!correctAudio) return;
  correctAudio.currentTime = 0;
  correctAudio.play();
}

function checker(numA, numB) {
  if (numA == numB) {
    return true;
  } else {
    return false;
  }
}

boxes.forEach((box) =>
  box.addEventListener("transitionend", (e) => {
    e.target.classList.remove("clicked");
    e.target.classList.remove("highlighted");
  })
);

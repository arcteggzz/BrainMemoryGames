const boxes = Array.from(document.querySelectorAll(".box"))
boxes.forEach((box => 
    box.addEventListener("transitionend", (e) => e.target.classList.remove("clicked") )))

// logic
let gameIsActive = false
let isCorrect = false
const computerMoves = []
const startButton = document.querySelector("button")
startButton.addEventListener("click", startGame)

function startGame(){
    gameIsActive = true
    isCorrect = true
    while (isCorrect && gameIsActive) {
        playAnotherRound()
    }
    return
}

async function playAnotherRound(){
    // get computer move and use it to update the computerMoves array
    // a. get computer move
    let computerNewMove = generateNextComputerMove()
    // b. flash computer move
    flashBox(computerNewMove)
    // c. play audio
    playAudio(computerNewMove)
    // d. update computerMove array
    computerMoves.push(computerNewMove)
    console.log(computerMoves)

    let i = 0
    while (i < computerMoves.length && isCorrect && gameIsActive){
        // get first human move
        //a. get human move
        let humanMove = await getHumanMove()
        console.log(humanMove)
        //b. flash to incdicate human move
        flashBox(humanMove)
        //c. play audio 
        playAudio(humanMove)
        //d. check if it tallys with computer move
        isCorrect = checker(computerMoves[i], humanMove)
        //e. increment i
        (isCorrect) ? i++ : gameover()
    }
    //indicate that you passed the level
    console.log("passed")
}

function generateNextComputerMove(){
    const computerMove = getRandomInt(1, 7)
    return computerMove
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function flashBox (number){
    newBox = document.querySelector(`.box[data-key="${number}"]`)
    newBox.classList.add("clicked")
}

function playAudio(number){
    correctAudio = document.querySelector(`.audio[data-key="${number}"]`)
    if(!correctAudio) return
    correctAudio.currentTime = 0
    correctAudio.play()
}

async function getHumanMove(){
    return boxes.forEach((box) => 
        box.addEventListener("click", () => this.dataset.key))
}

function checker(numA, numB) {
    numA === numB ? 1 : -1
}

function gameover () {
    isCorrect = false
    gameIsActive = false
}
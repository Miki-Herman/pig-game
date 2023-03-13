'use strict';

// important elemtents 
const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const dice = document.querySelector(".dice");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");
const btnNewEl = document.querySelector(".btn--new");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnColse = document.querySelector(".close-modal");
const btnOpen = document.querySelector(".show-modal");

// functions

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // handling the ui changes
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}
let scores, currentScore, activePlayer, playing;

// initial values
const init = function(){
    score0.textContent= 0;
    score1.textContent= 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;

    dice.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    
    // score + active player
    playing = true;
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
};

init();

// rolling the dice
btnRollEl.addEventListener("click", () =>{
    if (playing){
        // 1. generate random dice roll
        const diceNum = Math.trunc(Math.random()*6) + 1; 
    
        // 2. display dice roll
        dice.classList.remove("hidden");
        // 2.1 displaying dice roll animation
        dice.src = `dice-gif.gif`
        
        setTimeout(() =>{
            // 2.2 displaying the dice after animation
            dice.src = `dice-${diceNum}.png`;
            // 3. check if it's a 1
            if (diceNum !== 1) {
                // 3.1.1 (no) => add dice roll to current score
                currentScore += diceNum;
                // 3.1.2 display new score
                document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            }
        
            else {
                // 3.2   (yes) => switch player
                switchPlayer();
            };

        }, 1000)
    

    }
    
});

btnHoldEl.addEventListener("click",() => {
    if (playing){
        // 1. add current score to total score
        scores[activePlayer] += currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // 2. check if score >= 100 
    
        if (scores[activePlayer] >= 100){
            // 2.1 (yes) => current player wins
            // COMPLETE THIS STUFF + ADD MODAL WINDOW WHEN YOU WIN + COMPLETE THE NEW BUTTON EVENT
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            dice.classList.add("hidden");
        }
    
        else{
            // 2.2 (no) => switch player
            switchPlayer();
        };   
    };

});

btnNewEl.addEventListener("click", init);


// handling the rules button
const closeModal = function() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden")
};

const openModal = function() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

btnOpen.addEventListener("click", openModal);
btnColse.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);


document.addEventListener("keyup",(e) => {
    if (e.key=== "Escape" && !modal.classList.contains("hidden")){
        closeModal();
    };
});

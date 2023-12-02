
let obstacle = document.getElementById("obstacle"); // Get the obstacle
let player = document.getElementById("player"); // Get the player character

let sec; // Declare sec
let obstaclePosition; // Declare obstacle position 
let playerPosition; // Declare player position
let obstacleMoveInterval;

document.addEventListener("DOMContentLoaded", loadGame); // Wait for the DOM to fully load before executing the code (Adapted from the walkthrough project)
window.addEventListener("click", playerJump); // Function, move character up in y if position is zero (Jump)
setInterval(updateScore, 250); // Call the updateScore function every quarter of a second

function loadGame() {
    sec = 0;
    obstaclePosition = 2200; // Starting position of the obstacle
    playerPosition = 0; // Starting position of the player character
    obstacleMoveInterval = setInterval(updateObstaclePosition, 10); // Adapted from java2s.com setInterval() move element chapter
}

    /*
    * Resets obstacle position to the right 
    * to the right if a certain point is reached
    */
function updateObstaclePosition() {
    obstaclePosition -= 5;

    // Update the obstacles right position
    obstacle.style.left = obstaclePosition + "px";

    // Resetting the obstacle back to the right
    if (obstaclePosition <= -150) {
        obstaclePosition = 2200;
    }
}

function playerJump(){
        if (playerPosition === 0){
            playerPosition = 200;
            player.style.bottom = playerPosition + "px";}

            setTimeout(function() {
                playerPosition = 0;
                player.style.bottom = playerPosition + "px";
            }, 750);
};

// if val is greater than 9 return val, else with string "0" infront of val
function timer(val) {
    if (val > 9) {
        return val;
    } else{
        return "0" + val;
    }
};

// Score
function updateScore() {
    document.getElementById("score").innerHTML = "Current Score: " + timer(sec);
    sec++;
}
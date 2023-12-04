
let obstacle = document.getElementById("obstacle"); // Get the obstacle
let player = document.getElementById("player"); // Get the player character
let closeModalButton = document.getElementById("closeModal");
let modal = document.getElementById("modal-box");
let overlay = document.getElementById("overlay");

let sec; // Declare sec
let obstaclePosition; // Declare obstacle position 
let playerPosition; // Declare player position
let obstacleMoveInterval;
let playerTop;
let obstacleLeft;
let scoreUpdateInterval;
let isModalOpen = false;

document.addEventListener("DOMContentLoaded", loadGame); // Wait for the DOM to fully load before executing the code (Adapted from the walkthrough project)
closeModalButton.addEventListener("click", closeModal);
window.addEventListener("click", playerJump); // Function, move character up in y if position is zero (Jump)
window.addEventListener("keydown", checkUpKey);
setInterval(updateScore, 250); // Call the updateScore function every quarter of a second
setInterval(checkCollision, 10); // Check if player and obstacle touch every 10ms

function loadGame() {
    showModal();

    sec = 0;
    obstaclePosition = 1350; // Starting position of the obstacle
    playerPosition = 0; // Starting position of the player character
    obstacleMoveInterval = setInterval(updateObstaclePosition, 10); // Adapted from java2s.com setInterval() move element chapter
    scoreUpdateInterval = setInterval(updateScore, 250);
}

function showModal(){
    modal.style.display = "block";
    overlay.style.display ="block";
    isModalOpen = true;
}

function closeModal(){
    modal.style.display = "none";
    overlay.style.display = "none";
    isModalOpen = false;
}

    /*
    * Resets obstacle position to the right 
    * if a certain point is reached
    */
function updateObstaclePosition() {
    if (!isModalOpen){
    obstaclePosition -= 5;
    obstacle.style.left = obstaclePosition + "px"; // Update the obstacles right position

    // Resetting the obstacle back to the right
    if (obstaclePosition <= -150) {
        obstaclePosition = 1350;
}

    // Make the obstacle gradually disappear at x+5
    if (obstaclePosition <= 5){
        obstacle.style.opacity = "0";
    } else {
        obstacle.style.opacity = "1";
        }
    }
}

function playerJump(){
    if (!isModalOpen){

        if (playerPosition === 0){
            playerPosition = 200;
            player.style.bottom = playerPosition + "px";}

            setTimeout(function() {
                playerPosition = 0;
                player.style.bottom = playerPosition + "px";
            }, 750);
    }
}

function checkUpKey(event){
    if (event.key === "ArrowUp"){
        playerJump();
    }
}

// if val is greater than 9 return val, else with string "0" infront of val
function timer(val) {
    if (val > 9) {
        return val;
    } else{
        return "0" + val;
    }
}

// Score
function updateScore() {
    if (!isModalOpen){
    document.getElementById("score").innerHTML = "Current Score: " + timer(sec);
    ++sec;
    }
}

// Collision detection
function checkCollision(){
    if (!isModalOpen){

    playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    

    if(obstacleLeft < 209 && obstacleLeft > 0 && playerTop >= 210){

        clearInterval(obstacleMoveInterval); // Stop the obstacle from moving
        clearInterval(scoreUpdateInterval);
        alert("Game over, your final score is: " + timer(--sec));
        }
    }
}
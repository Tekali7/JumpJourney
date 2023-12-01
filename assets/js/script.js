
let sec = 0; // Set sec to 0
let obstacle = document.getElementById("obstacle"); // Get the obstacle
let player = document.getElementById("player"); // Get the player character 
let obstaclePosition = 2200; // Starting position of the obstacle
let playerPosition = 0; // Starting position of the player character

document.addEventListener("DOMContentLoaded", function () { // Wait for the DOM to fully load before executing the code (Adapted from the walkthrough project)

    // if val is greater than 9 return val, else with string "0" infront of val
    function timer(val) {
    if (val > 9) {
        return val;
    } else{
        return "0" + val;
    }
    }

    // Timer 
    function updateScore() {
    document.getElementById("score").innerHTML = "Current Score: " + timer(sec);
    sec++;
    }

    // Call the updateScore function every second
setInterval(updateScore, 250);

    // Learned from java2s setInterval() Move element
    let obstacleMoveInterval = setInterval(updateObstaclePosition, 10); 

    /*WRITE DOCSTRING HEREEEEEEEEEEEEEEEEEEEEE*/

    function updateObstaclePosition() {
        obstaclePosition -= 5;

        // Update the obstacles right position
        obstacle.style.left = obstaclePosition + "px";

        // Resetting the obstacle back to the right
        if (obstaclePosition <= -150) {
            obstaclePosition = 2200;
        }
    }

    // Function, move character up in y if position is zero (Jump)
    window.addEventListener("click", playerJump);

    function playerJump(){
        if (playerPosition === 0){
            playerPosition = 200;
            player.style.bottom = playerPosition + "px";}

            setTimeout(function() {
                playerPosition = 0;
                player.style.bottom = playerPosition + "px";
            }, 750);
        }
    });
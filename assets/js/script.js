// Wait for the DOM to fully load before executing the code (Adapted from the walkthrough project)
document.addEventListener("DOMContentLoaded", function () {

// Set sec to 0
let sec = 0;

    // if val is greater than 9 return val, else with string "0"
    function timer(val) {
    if (val > 9) {
        return val;
    } else{
        return "0" + val;
    }
    }

    // Divide sec by 0 
    function updateScore() {
    document.getElementById("score").innerHTML = "Current Score: " + timer(sec % 60);
    sec++;
    }

setInterval(updateScore, 1000);

    // Get the obstacle
    let obstacle = document.getElementById("obstacle");

    // Starting position of the obstacle
    let obstaclePosition = 2200;

    // Learned from java2s setInterval() Move element
    let obstacleMoveInterval = setInterval(function () {
        obstaclePosition -= 5;

        // Update the obstacles right position
        obstacle.style.left = obstaclePosition + "px";

        // Resetting the obstacle back to the right
        if (obstaclePosition <= -150) {
            obstaclePosition = 2200;
        }
    }, 10);

    // Get the player character
    let player = document.getElementById("player");

    // Starting position of the player character
    let playerPosition = 0;

    // Function, move character up in y if position is zero
    window.addEventListener("click", function() {
        if(playerPosition === 0){
            playerPosition = 200;
            player.style.bottom = playerPosition + "px";

            setTimeout(function() {
                playerPosition = 0;
                player.style.bottom = playerPosition + "px";
            }, 700);
        }
    });
});
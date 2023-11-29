// Wait for the DOM to fully load before executing the code (Adapted from the walkthrough project)
document.addEventListener("DOMContentLoaded", function () {

    // Get the obstacle
    let obstacle = document.getElementById("obstacle");

    // Starting position of the obstacle
    let obstaclePosition = 2200;

    // Learned from java2s setInterval() Move element
    let obstacleMoveInterval = setInterval(function () {
        obstaclePosition -= 3;

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
            playerPosition = 50;
            player.style.bottom = playerPosition + "px";
        }
    });
});
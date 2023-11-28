document.addEventListener("DOMContentLoaded", function () {
    // Wait for the DOM to be fully loaded before executing the code

    // Select the obstacle element
    let obstacle = document.getElementById("obstacle");

    // Set the initial position of the obstacle
    let obstaclePosition = 2200; // You can adjust the starting position as needed

    // Set the interval to move the obstacle
    let obstacleMoveInterval = setInterval(function () {
        // Update the obstacle position
        obstaclePosition -= 3; // Adjust the speed by changing this value

        // Update the obstacle's right position
        obstacle.style.left = obstaclePosition + "px";

        // Check if the obstacle has reached the left edge of the game area
        if (obstaclePosition <= -150) {
            // Reset the obstacle position to the right edge
            obstaclePosition = 2200; // You can adjust the starting position as needed
        }
    }, 10); // Adjust the interval as needed (milliseconds)
});
// Getting the HTML elements for the game components
let obstacle = document.getElementById("obstacle");
let player = document.getElementById("player");
let closeModalButton = document.getElementById("closeModal");
let modal = document.getElementById("modal-box");
let overlay = document.getElementById("overlay");

// Game state variables
let sec;
let obstaclePosition;
let playerPosition;
let obstacleMoveInterval;
let playerTop;
let obstacleLeft;
let scoreUpdateInterval;

let isModalOpen = false;
let updateScoreFlag = true;

document.addEventListener("DOMContentLoaded", loadGame);
closeModalButton.addEventListener("click", closeModal);
window.addEventListener("click", playerJump);
window.addEventListener("keydown", checkUpKey);
setInterval(updateScore, 250);
let collisionCheckInterval = setInterval(checkCollision, 10);

/** 
 * Initialize the game once the DOM 
 * has fully loaded.
*/
function loadGame() {
    showModal();

    sec = 0;
    obstaclePosition = 1350;
    playerPosition = 0;
    obstacleMoveInterval = setInterval(updateObstaclePosition, 10);
    scoreUpdateInterval = setInterval(updateScore, 250);
}

/** 
 * Shows the instruction modal.
*/
function showModal() {
    modal.style.display = "block";
    overlay.style.display = "block";
    isModalOpen = true;
}

/** 
 * Closes the instruction modal.
*/
function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
    isModalOpen = false;
}

/** 
 * Updates the position of the obstacle
 * back to the right side.
*/
function updateObstaclePosition() {
    if (!isModalOpen) {
        obstaclePosition -= 5;
        obstacle.style.left = obstaclePosition + "px";

        if (obstaclePosition <= -150) {
            obstaclePosition = 1350;
        }

        if (obstaclePosition <= 5) {
            obstacle.style.opacity = "0";
        } else {
            obstacle.style.opacity = "1";
        }
    }
}

/** 
 * Makes the player character "jump" by
 * moving it up in y.
*/
function playerJump() {
    if (!isModalOpen) {
        if (playerPosition === 0) {
            playerPosition = 200;
            player.style.bottom = playerPosition + "px";

            document.getElementById("jumpSound").play();
        }

        setTimeout(function () {
            playerPosition = 0;
            player.style.bottom = playerPosition + "px";
        }, 750);
    }
}

/** 
 * Checks if the "ArrowUp" key is being pressed.
 * If so, the playerJump function gets triggered.
*/
function checkUpKey(event) {
    if (event.key === "ArrowUp") {
        playerJump();
    }
}

/** 
 * Puts a "0" infront of the score if the value is 
 * less than 9.
*/
function timer(val) {
    if (val > 9) {
        return val;
    } else {
        return "0" + val;
    }
}

/** 
 * Counts the game score.
*/
function updateScore() {
    if (!isModalOpen && updateScoreFlag) {
        document.getElementById("score").innerHTML = "Current Score: " + timer(sec);
        ++sec;
    }
}

let collisionDetected = false;

/** 
 * Checks if the player and the obstacle collide.
*/
function checkCollision() {
    if (!isModalOpen) {
        playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
        obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

        if (obstacleLeft < 209 && obstacleLeft > 0 && playerTop >= 210) {
            if (!collisionDetected) {
                collisionDetected = true;

                clearInterval(obstacleMoveInterval);
                clearInterval(scoreUpdateInterval);
                clearInterval(collisionCheckInterval);

                document.getElementById("collisionSound").play();

                // Set updateScoreFlag to false to stop score updates
                updateScoreFlag = false;

                setTimeout(() => {
                    Swal.fire({
                        title: 'Game Over',
                        text: 'Your final score is: ' + timer(--sec),
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload(); // Reload the page when "Try Again" is clicked
                        }
                    });
                }, 200);
                
            }
        } else {
            collisionDetected = false;
        }
    }
}

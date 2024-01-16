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
let gameArea = document.getElementById("game-area")

let isModalOpen = false;
let isGameOver = false;
let updateScoreFlag = true;

// Learned from the walkthrough project
document.addEventListener("DOMContentLoaded", loadGame);
closeModalButton.addEventListener("click", closeModal);
gameArea.addEventListener("click", playerJump);
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
  // Some of this code was learned from java2s.com
  obstacleMoveInterval = setInterval(updateObstaclePosition, 10);
  scoreUpdateInterval = setInterval(updateScore, 250);
}

/**
 * Shows the instruction modal.
 */
function showModal() { //Learned from w3Schools
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


const obstacleResetPosition = 1350;

/**
 * Updates the position of the obstacle
 * back to the right side.
 */
function updateObstaclePosition() {
  if (!isModalOpen) {
    obstaclePosition -= 5;
    obstacle.style.left = obstaclePosition + "px";

    if (obstaclePosition <= -150) {
      obstaclePosition = obstacleResetPosition;
    }

    if (obstaclePosition <= 5) {
      obstacle.style.opacity = "0";
    } else {
      obstacle.style.opacity = "1";
    }

    // Check if the score is greater than or equal to 190
    if (sec >= 192) {
      // Stop the obstacle movement
      clearInterval(obstacleMoveInterval);
    }
  }
}

/**
 * Makes the player character "jump" by
 * moving it up in y.
 */
function playerJump() {
    if (!isModalOpen && !isGameOver) {
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

let hasWon = false;

/**
 * Counts the game score.
 */
function updateScore() {
    if (!isModalOpen && updateScoreFlag && !hasWon) {
        sec++;
        document.getElementById("score").innerHTML = "Current Score: " + timer(sec);

        if (sec >= 200) {
            // Stop the game
            clearInterval(obstacleMoveInterval);
            clearInterval(scoreUpdateInterval);
            clearInterval(collisionCheckInterval);

            hasWon = true;

            document.getElementById("completionSound").play();

            // Show winning SweetAlert
            Swal.fire({
                title: "Congratulations!",
                text: "You completed the journey!",
                icon: "success",
                confirmButtonText: "Play Again",
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
        }
    }
}

let collisionDetected = false;

/**
 * Checks if the player and the obstacle collide.
 */
function checkCollision() {
  if (!isModalOpen) {
      const playerRect = player.getBoundingClientRect();
      const obstacleRect = obstacle.getBoundingClientRect();
      // Check for collision if the "rectangles" overlap
      if (
          playerRect.left < obstacleRect.right &&
          playerRect.right > obstacleRect.left &&
          playerRect.top < obstacleRect.bottom &&
          playerRect.bottom > obstacleRect.top
      ) {
          if (!collisionDetected) {
              collisionDetected = true;

              clearInterval(obstacleMoveInterval);
              clearInterval(scoreUpdateInterval);
              clearInterval(collisionCheckInterval);

              document.getElementById("collisionSound").play();

              updateScoreFlag = false;

              isGameOver = true;

              setTimeout(() => {
                  Swal.fire({
                      title: "Game Over",
                      text: "Your final score is: " + timer(--sec),
                      icon: "error",
                      confirmButtonText: "Try Again",
                  }).then((result) => {
                      if (result.isConfirmed) {
                          location.reload();
                      }
                  });
              }, 200);
          }
      } else {
          collisionDetected = false;
      }
  }
}
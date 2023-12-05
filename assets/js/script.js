let obstacle = document.getElementById("obstacle");
let player = document.getElementById("player");
let closeModalButton = document.getElementById("closeModal");
let modal = document.getElementById("modal-box");
let overlay = document.getElementById("overlay");

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

function loadGame() {
    showModal();

    sec = 0;
    obstaclePosition = 1350;
    playerPosition = 0;
    obstacleMoveInterval = setInterval(updateObstaclePosition, 10);
    scoreUpdateInterval = setInterval(updateScore, 250);
}

function showModal() {
    modal.style.display = "block";
    overlay.style.display = "block";
    isModalOpen = true;
}

function closeModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
    isModalOpen = false;
}

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

function checkUpKey(event) {
    if (event.key === "ArrowUp") {
        playerJump();
    }
}

function timer(val) {
    if (val > 9) {
        return val;
    } else {
        return "0" + val;
    }
}

function updateScore() {
    if (!isModalOpen && updateScoreFlag) {
        document.getElementById("score").innerHTML = "Current Score: " + timer(sec);
        ++sec;
    }
}

let collisionDetected = false;

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

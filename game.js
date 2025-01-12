const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player properties
const player = {
    x: 100,
    y: 500,
    width: 40,
    height: 60,
    speed: 5,
    isJumping: false,
    jumpSpeed: 10,
    gravity: 1,
    velocityY: 0
};

// Level properties
let currentLevel = 0;
const levels = [];

// Initialize levels
for (let i = 0; i < 12; i++) {
    levels.push({
        number: i + 1,
        platformY: 400 - (i * 10), // Different heights for platforms
        platformWidth: 200 + (i * 10) // Different widths for platforms
    });
}

// Move the player
function movePlayer(key) {
    switch (key) {
        case 'ArrowRight':
            player.x += player.speed;
            break;
        case 'ArrowLeft':
            player.x -= player.speed;
            break;
        case 'ArrowUp':
            jump();
            break;
        case 'Enter':
            if (currentLevel < levels.length - 1) {
                currentLevel++;
            }
            break;
    }

    // Prevent player from going off screen
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// Jump logic
function jump() {
    if (!player.isJumping) {
        player.isJumping = true;
        player.velocityY = -player.jumpSpeed;
    }
}

// Update player position
function updatePlayer() {
    if (player.isJumping) {
        player.y += player.velocityY;
        player.velocityY += player.gravity; // Apply gravity

        // Reset jump when player hits the ground
        if (player.y >= 500) {
            player.y = 500;
            player.isJumping = false;
            player.velocityY = 0;
        }
    }
}

// Draw the player
function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw the current level
function drawLevel() {
    const level = levels[currentLevel];
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 540, canvas.width, 60); // Draw ground

    ctx.fillStyle = 'brown';
    ctx.fillRect(100, level.platformY, level.platformWidth, 20); // Draw platform

    // Draw level number
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText(`Level: ${level.number}`, 350, 300);
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    updatePlayer();
    drawLevel();
    drawPlayer();
    requestAnimationFrame(gameLoop); // Loop the game
}

// Listen for key presses
document.addEventListener('keydown', (event) => {
    movePlayer(event.key);
});

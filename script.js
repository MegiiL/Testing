import { render } from './draw.js';
import { update } from './logic.js';

let gameStarted = false;  // Flag to control when the game starts
let paused = false;  // Flag to control the paused state
// Pause button
const pauseButton = document.getElementById('pauseButton');

// Keyboard controls
const keys = {
    right: false,
    left: false
};

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
        case 'ArrowRight':
            keys.right = true;
            break;
        case 'a':
        case 'ArrowLeft':
            keys.left = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
        case 'ArrowRight':
            keys.right = false;
            break;
        case 'a':
        case 'ArrowLeft':
            keys.left = false;
            break;
    }
});

// Touch controls for mobile
canvas.addEventListener('touchstart', handleTouchStart, false);
canvas.addEventListener('touchmove', handleTouchMove, false);

let touchX = null;

// Handle touch start
function handleTouchStart(event) {
    const touch = event.touches[0];
    touchX = touch.clientX;
}

// Handle touch movement
function handleTouchMove(event) {
    const touch = event.touches[0];
    const deltaX = touch.clientX - touchX;
    touchX = touch.clientX;

    // Move the user paddle based on the touch movement
    user.x += deltaX;
    if (user.x < 0) {
        user.x = 0;
    } else if (user.x + user.width > canvas.width) {
        user.x = canvas.width - user.width;
    }
}


function resizeCanvas() {
    const maxWidth = 600; // Maximum width of canvas
    const width = Math.min(window.innerWidth, maxWidth); // Set width to either screen size or max width
    const height = width * (600 / 400); // Maintain 3:2 aspect ratio
    canvas.width = width;
    canvas.height = height; 
    resetBall(); // Reset ball position after resize

    // Adjust positions of paddles, ball, and net based on the new size
    user.y = canvas.height - 20; // Update user paddle position
    com.y = 10; // Update computer paddle position
    net.y = canvas.height / 2 - 1; // Update net position
    net.width= canvas.width;
}


window.addEventListener('resize', resizeCanvas);
resizeCanvas();  // Initial resize

// Show the game over screen
function showGameOverScreen() {
    gameStarted = false;
    const resultMessage = document.getElementById('resultMessage');
    document.getElementById('gameOverScreen').style.display = 'flex';  // Show the game over screen
}

// Game loop
function gameLoop() {
    if (gameStarted && !paused) {
        render();
        update();
        requestAnimationFrame(gameLoop);
    }
}

// Start the game loop when "Play" button is clicked
document.getElementById('playButton').addEventListener('click', function() {
    document.getElementById('welcomeScreen').style.display = 'none';
    pauseButton.style.display = 'block'; // Show the pause button

    gameStarted = true;
    paused = false;  // Ensure the game is not paused initially
    requestAnimationFrame(gameLoop);
});

// Replay the game when the "Replay" button is clicked
document.getElementById('replayButton').addEventListener('click', function() {
    document.getElementById('gameOverScreen').style.display = 'none';
    resetGame();
    gameStarted = true;
    paused = false;
    requestAnimationFrame(gameLoop);
});

// Pause Button Event Listener
pauseButton.addEventListener('click', function() {
    paused = !paused;  // Toggle pause state
    
    if (paused) {
        pauseButton.textContent = '▷';  // Change button text to 'Resume'
    } else {
        pauseButton.textContent = '||';  // Change button text to 'Pause'
        requestAnimationFrame(gameLoop);  // Restart the game loop
    }
});

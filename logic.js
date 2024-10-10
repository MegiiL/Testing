import { canvas, user, com, ball } from './elements.js';
import { render } from './draw.js';

// Update user paddle position
function updatePaddle() {
    if (keys.right) {
        user.x += 10;
        if (user.x + user.width > canvas.width) {
            user.x = canvas.width - user.width;
        }
    }
    if (keys.left) {
        user.x -= 10;
        if (user.x < 0) {
            user.x = 0;
        }
    }
}

// Collision detection
function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

// Reset ball
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = ball.speed;  //* (Math.random() > 0.5 ? 1 : -1); // Random initial direction
    ball.velocityY = ball.speed;
}


// Reset game
function resetGame() {
    user.score = 0;
    com.score = 0;
    user.hearts = 3;
    com.speed = 0.08;
    com.previousSpeed = 0.08;
    ball.speed = 5;
    ball.velocityX = ball.speed;
    ball.velocityY = ball.speed;
    resetBall();
}

// Update game logic
function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (Math.random() < 0.60) {
        com.previousSpeed = com.speed;
        com.speed = 0.05;  // Temporarily slow down the paddle
    }
    
    // Move the computer paddle
    com.x += (ball.x - (com.x + com.width / 2)) * com.speed;

    // Keep the computer paddle within the canvas boundaries
    if (com.x < 0) {
        com.x = 0;
    } else if (com.x + com.width > canvas.width) {
        com.x = canvas.width - com.width;
    }
    if (com.speed === 0.05) { // If the speed was slowed down, restore the previous speed
        com.speed = com.previousSpeed;
    }

    updatePaddle();

    if (ball.y - ball.radius < 0) { // User scores
        com.previousSpeed += 0.02; // Increment stored speed
        com.speed = com.previousSpeed; // Apply the incremented speed
        user.score++;
        ball.speed += 0.5; // Increase speed by 0.5 in round 2
        ball.velocityX = ball.speed * (ball.velocityX > 0 ? 1 : -1); // Maintain direction
        ball.velocityY = -ball.speed; // Reflect ball upwards
        resetBall();
    } else if (ball.y + ball.radius > canvas.height) { // Computer scores
        com.score++;
        user.hearts--;
        if (com.score === 3 || user.hearts <= 0) {
            showGameOverScreen(); // Show the game over screen if the computer wins or user loses all hearts
        } else {
            resetBall();
        }
    }

    const player = (ball.y + ball.radius > canvas.height / 2) ? user : com;
    if (collision(ball, player)) {
        ball.velocityY = -ball.velocityY;
    }

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.velocityX = -ball.velocityX;
    }

 
}

export { updatePaddle, collision, resetBall, resetGame, update };

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Get the width and height of the canvas
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Set the canvas for high DPI displays
function setCanvasSize() {
    const pixelRatio = window.devicePixelRatio || 1; // Get the device pixel ratio
    canvas.width = canvasWidth * pixelRatio; // Set the canvas width
    canvas.height = canvasHeight * pixelRatio; // Set the canvas height
    context.scale(pixelRatio, pixelRatio); // Scale the context to match the pixel ratio
}

// Call this function to set the canvas size
setCanvasSize();

let gameStarted = false;  // Flag to control when the game starts

// User paddle
const user = {
    x: canvasWidth / 2 - 40, // Centering paddle with 80 width
    y: canvasHeight - 5, // Closer to the bottom edge of the canvas
    width: 80,  // Updated width
    height: 3,  // Updated height
    color: "WHITE",
    score: 0,
    hearts: 3,
};

// Computer paddle
const com = {
    x: canvasWidth / 2 - 40, // Centering paddle with 80 width
    y: 2, // Closer to the top edge of the canvas
    width: 80,  // Updated width
    height: 3,  // Updated height
    color: "WHITE",
    score: 0,
    speed: 0.08,
    previousSpeed: 0.08,
};

// Net
const net = {
    x: 0,
    y: canvasHeight / 2 - 1,
    width: canvasWidth,
    height: 2,
    color: "WHITE",
};

// Ball
const ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: 4, // Ball size set to 4 pixels
    color: "WHITE",
    speed: 4,
    velocityX: 4,
    velocityY: 4,
};

// Draw rectangle (paddles, net)
function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

// Draw circle (ball)
function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// Draw heart shape
function drawHeart(x, y, size, color) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x, y);
    context.bezierCurveTo(x - size / 2, y - size / 2, x - size / 2, y + size / 2, x, y + size / 2);
    context.bezierCurveTo(x + size / 2, y + size / 2, x + size / 2, y - size / 2, x, y);
    context.closePath();
    context.fill();
}

// Draw the net horizontally
function drawNet() {
    drawRect(net.x, net.y, net.width, net.height, net.color);
}

// Draw the score
function drawText(text, x, y, color, fontSize = "12px") { // Default font size updated to 12px
    context.fillStyle = color;
    context.font = `${fontSize} Arial`; // Allow dynamic font size
    context.fillText(text, x, y);
}

// Draw the hearts
function drawHearts() {
    const startX = 15;  // Positioned more to the left
    const startY = canvasHeight - 30;  // Lower position closer to the bottom
    const heartSize = 10;  // Heart size

    for (let i = 0; i < user.hearts; i++) {
        drawHeart(startX + i * 12, startY, heartSize, "red");  // Spacing between hearts (12 pixels)
    }
}

// Render the game elements
function render() {
    drawRect(0, 0, canvasWidth, canvasHeight, "BLACK");
    drawNet();
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color); // Ball size 4 pixels
    drawText(user.score, canvasWidth - 40, canvasHeight - 50, "WHITE", "12px"); // Score font size 12 pixels, moved to the right
    drawText(com.score, canvasWidth - 40, 50, "WHITE", "12px"); // Score font size 12 pixels, moved to the right
    drawHearts();
}

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
    } else if (user.x + user.width > canvasWidth) {
        user.x = canvasWidth - user.width;
    }
}

// Update user paddle position
function updatePaddle() {
    if (keys.right) {
        user.x += 10;
        if (user.x + user.width > canvasWidth) {
            user.x = canvasWidth - user.width;
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
    ball.x = canvasWidth / 2;
    ball.y = canvasHeight / 2;
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
    ball.speed = 4;
    ball.velocityX = ball.speed;
    ball.velocityY = ball.speed;
    resetBall();
}


// Game loop
function gameLoop() {
    if (gameStarted) {
        render();
        update();
        requestAnimationFrame(gameLoop);
    }
}

// Start the game loop when "Play" button is clicked
document.getElementById('playButton').addEventListener('click', function() {
    document.getElementById('welcomeScreen').style.display = 'none';
  

    gameStarted = true;
    requestAnimationFrame(gameLoop);
});



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
    } else if (com.x + com.width > canvasWidth) {
        com.x = canvasWidth - com.width;
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
    } else if (ball.y + ball.radius > canvasHeight) { // Computer scores
        com.score++;
        user.hearts--;
        if (com.score === 3 || user.hearts <= 0) {
            showGameOverScreen(); // Show the game over screen if the computer wins or user loses all hearts
        } else {
            resetBall();
        }
    }

    const player = (ball.y + ball.radius > canvasHeight / 2) ? user : com;
    if (collision(ball, player)) {
        ball.velocityY = -ball.velocityY;
    }

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvasWidth) {
        ball.velocityX = -ball.velocityX;
    }

 
}


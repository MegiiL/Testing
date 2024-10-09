const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');
// Get the width and height of the canvas
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let gameStarted = false;  // Flag to control when the game starts

// User paddle
const user = {
    x: canvasWidth / 2 - 50,
    y: canvasHeight - 10,
    width: 100,
    height: 5,
    color: "WHITE",
    score: 0,
    hearts: 3,
};

// Computer paddle
const com = {
    x: canvasWidth / 2 - 50,
    y: 5,
    width: 100,
    height: 5,
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

// Smaller ball
const ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    radius: 6,  // Smaller ball
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

// Draw the score, smaller font and positioned more to the right
function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "20px Arial";  // Smaller font size
    context.fillText(text, x, y);
}


// Draw the hearts
// Draw the hearts, smaller size and positioned lower
function drawHearts() {
    const startX = 20;  // Positioned closer to the left
    const startY = canvasHeight - 40;  // Lower position
    const heartSize = 8;  // Smaller size

    for (let i = 0; i < user.hearts; i++) {
        drawHeart(startX + i * 25, startY, heartSize, "red");  // Reduced spacing between hearts
    }
}


// Render function updated with smaller elements
function render() {
    drawRect(0, 0, canvasWidth, canvasHeight, "BLACK");
    drawNet();
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    
    // User score, smaller and moved further right
    drawText(user.score, canvasWidth - 60, canvasHeight - 40, "WHITE");
    
    // Computer score, smaller and further right
    drawText(com.score, canvasWidth - 60, 40, "WHITE");
    
    drawHearts();
}

// Game loop
function gameLoop() {
    if (gameStarted) {
        render();
        requestAnimationFrame(gameLoop);
    }
}

// Start the game loop when "Play" button is clicked
document.getElementById('playButton').addEventListener('click', function() {
    document.getElementById('welcomeScreen').style.display = 'none';
    gameStarted = true;
    requestAnimationFrame(gameLoop);
});

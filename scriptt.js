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

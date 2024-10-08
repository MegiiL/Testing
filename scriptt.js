const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');
let gameStarted = false;  // Flag to control when the game starts

// User paddle
const user = {
    x: canvas.width / 2 - 25; // Center user paddle
    y: canvas.height - 5,
    width: 50,
    height: 2,
    color: "WHITE",
    score: 0,
    hearts: 3,
};

// Computer paddle
const com = {
    x:  canvas.width / 2 - 25; // Center user paddle
    y: 2.5,
    width: 50,
    height: 2,
    color: "WHITE",
    score: 0,
    speed: 0.08,
    previousSpeed: 0.08,
};

// Net
const net = {
    x: 0,
    y: canvas.height / 2 - 1,
    width: canvas.width,
    height: 2,
    color: "WHITE",
};

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
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
function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "15px Arial";
    context.fillText(text, x, y);
}

// Draw the hearts
function drawHearts() {
    const startX = 30;
    const startY = canvas.height - 60;
    const heartSize = 20;

    for (let i = 0; i < user.hearts; i++) {
        drawHeart(startX + i * 30, startY, heartSize, "red");
    }
}

// Render the game elements
function render() {
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    drawNet();
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    drawText(user.score, canvas.width - 90, canvas.height/2 - 50, "WHITE");
    drawText(com.score, canvas.width - 90, 50, "WHITE");
    drawHearts();
}

// Game loop
function gameLoop() {
    if (gameStarted ) {
        render();
    }
}

// Start the game loop when "Play" button is clicked
document.getElementById('playButton').addEventListener('click', function() {
    document.getElementById('welcomeScreen').style.display = 'none';

    gameStarted = true;
    requestAnimationFrame(gameLoop);
});

import { canvas, context, user, com, ball, net } from './elements.js';

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
    context.font = "45px Arial";
    context.fillText(text, x, y);
}

// Draw the hearts
function drawHearts() {
    const startX = 30;
    const startY = canvas.height - 150;
    const heartSize = 30;

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
    drawText(user.score, canvas.width - 70, canvas.height - 150, "WHITE");
    drawText(com.score, canvas.width - 70, 150, "WHITE");
    drawHearts();
}

export { render };

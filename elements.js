const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// User paddle
const user = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    width: 100,
    height: 10,
    color: "WHITE",
    score: 0,
    hearts: 3,
};

// Computer paddle
const com = {
    x: canvas.width / 2 - 50,
    y: 10,
    width: 100,
    height: 10,
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
    speed: 5,
    velocityX: 5,
    velocityY: 5,
};

export { canvas, context, user, com, net, ball };

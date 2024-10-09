const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Get the width and height of the canvas
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Print them out
console.log('Canvas width:', canvasWidth);
console.log('Canvas height:', canvasHeight);

// Start the game loop when "Play" button is clicked
document.getElementById('playButton').addEventListener('click', function() {
    document.getElementById('welcomeScreen').style.display = 'none';

});

// Pong like game, in Javascript
const root = document.getElementById('root');

const field = document.createElement('div');
field.className = 'field';
root.appendChild(field);

const pad = document.createElement('div');
pad.className = 'pad';
field.appendChild(pad);

const ball = document.createElement('div');
ball.className = 'ball';
field.appendChild(ball);

const fieldWidth = 600;
const fieldHeight = 450;
const padWidth = 100;
const padHeight = 20;
const padBotPos = 40;
const ballSize = 20;

ball.style.width = ballSize + 'px';
ball.style.height = ballSize + 'px';

field.style.width = fieldWidth + 'px';
field.style.height = fieldHeight + 'px';

pad.style.width = padWidth + 'px';
pad.style.height = padHeight + 'px';
pad.style.bottom = padBotPos + 'px';
pad.style.left = (fieldWidth - padWidth) / 2 + 'px';

const fieldRect = field.getBoundingClientRect();
const ballRect = ball.getBoundingClientRect();

const minLeftPos = fieldRect.left + 10;
const maxRightPos = fieldRect.right - 10;

document.body.onmousemove = (e) => {
  if (e.clientX >= minLeftPos && e.clientX + padWidth <= maxRightPos) {
    pad.style.left = e.clientX - fieldRect.left + 'px';
  } else if (e.clientX <= minLeftPos) {
    pad.style.left = minLeftPos - fieldRect.left + 'px';
  } else if (e.clientX + padWidth >= maxRightPos) {
    pad.style.left = maxRightPos - fieldRect.left - padWidth + 'px';
  }
}

// animate the ball
/*
let ballPos = 0;
const speed = 2;
const maxBallPos = fieldRect.width - ballSize - 1 - speed;
ball.style.left = ballPos;

const int = setInterval(() => {
  if (ballPos < maxBallPos) {
    ballPos += speed;
    ball.style.left = ballPos + 'px';
  }
}, 1000/60);
*/

// let start at 0,0 (x,y)
let ballX = 0, ballY = 0;
// boundaries
let minX = 0, minY = 0, maxX = fieldWidth, maxY = fieldHeight;
// speed
let speedX = 2, speedY = 2;
// direction
let dirX = +1, dirY = +1;

// let's move it!
const move = () => {
  if (speedX > 0) {
    if (ballRect.right + speedX > fieldRect.right) speedX *= -1;
  } else {
    if (ballRect.left + speedX < 0) speedX *= -1;
  }

  if (speedY > 0) {
    if (ballRect.bottom + speedY > fieldRect.bottom) speedY *= -1;
  } else {
    if (ballRect.top + speedY < 0) speedY *= -1;
  }
  
  ballX += speedX;
  ballY += speedY;

  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';
}

const int = setInterval(move, 1000/30);

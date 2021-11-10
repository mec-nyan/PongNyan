// Pong like game, in Javascript
const root = document.getElementById('root');

const field = document.createElement('div');
field.className = 'field';
root.appendChild(field);

const info = document.createElement('span');
info.innerText = 'info';
info.className = 'info';
root.appendChild(info);

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
let padX = 0;
let padY = fieldHeight - (padBotPos + padHeight);

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
    padX = e.clientX - fieldRect.left;
  } else if (e.clientX <= minLeftPos) {
    padX = minLeftPos - fieldRect.left;
  } else if (e.clientX + padWidth >= maxRightPos) {
    padX = maxRightPos - fieldRect.left - padWidth;
  }
  pad.style.left = padX + 'px';
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
  ballX += speedX * dirX;
  ballY += speedY * dirY;

  if (ballX <= 0 || ballX + ballSize >= fieldWidth) dirX *= -1;
  if (ballY <= 0 || ballY + ballSize >= fieldHeight) dirY *= -1;

  // check collision with our pad
  if (ballX >= padX && ballX + ballSize <= padX + padWidth) {
    if (ballY + ballSize === padY) {
      dirY *= -1;
    }
  }
  
  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';

  info.innerText = `x: ${ballX}px\ny: ${ballY}px`;
}

const int = setInterval(move, 1000/60);

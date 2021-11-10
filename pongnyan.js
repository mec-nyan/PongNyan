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

const minLeftPos = 10;
const maxRightPos = (fieldWidth - 10) - padWidth;

let ballX = (fieldWidth - ballSize) / 2;
let ballY = padY - ballSize;
ball.style.top = ballY + 'px';
ball.style.left = ballX + 'px';
let isBallMoving = false;

document.body.onmousemove = (e) => {
  padX = e.clientX;
  if (padX < minLeftPos) padX = minLeftPos;
  if (padX > maxRightPos) padX = maxRightPos;
  pad.style.left = padX + 'px';

  if (!isBallMoving) {
    ballX = padX + (padWidth - ballSize) / 2;
    ball.style.left = ballX + 'px';
  }
}


// boundaries
let minX = 0, minY = 0, maxX = fieldWidth, maxY = fieldHeight;
// speed
let speedX = 2, speedY = 2;
// direction
let dirX = +1, dirY = +1;


const move = () => {
  ballX += speedX * dirX;
  ballY += speedY * dirY;

  if (ballX <= 0 || ballX + ballSize >= fieldWidth) dirX *= -1;
  if (ballY <= 0 || ballY + ballSize >= fieldHeight) dirY *= -1;

  // check collision with our pad
  if (ballX >= padX && ballX + ballSize <= padX + padWidth) {
    if (ballY + ballSize + speedY >= padY) {
      dirY *= -1;
      ++count;
    }
  }
  
  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';

  info.innerText = `x: ${ballX}px\ny: ${ballY}px`;
}



// Pong like game, in Javascript
const root = document.getElementById('root');

const info = document.createElement('span');
info.innerText = 'info';
info.className = 'info';
root.appendChild(info);


// Basic rect properties
class Rect {
  constructor(width, height, left, top) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.right = left + width;
    this.top = top;
    this.bottom = top + height;
  }

  getRect() {
    return [this.left, this.top, this.width, this.height];
  }
}

// A 'rect' within the DOM
class Visual extends Rect {
  constructor(width, height, left, top, className, positionAbsolute=false) {
    super(width, height, left, top);
    this.positionAbsolute = positionAbsolute;
    this.visual = document.createElement('div');
    this.setUp(className);
  }

  setUp(className) {
    this.visual.className = className;
    this.visual.style.width = this.width + 'px';
    this.visual.style.height = this.height + 'px';
    if (this.positionAbsolute) {
      this.visual.style.left = this.left + 'px';
      this.visual.style.top = this.top + 'px';
    }
  }

  move(x) {
    this.left = x;
    this.visual.style.left = this.left + 'px';
  }
}

// The ball overloads the move() method
class Ball extends Visual {
  constructor(width, height, left, top, name) {
    super(width, height, left, top, name);
  }

  move(x, y) {
    this.left = x;
    this.top = y;
    this.visual.style.left = this.left;
    this.visual.style.top = this.top;
  }
}


// let's build the field/board
const fieldWidth = 600;
const fieldHeight = 450;

const field = new Visual(fieldWidth, fieldHeight, null, null, 'field', false);
root.appendChild(field.visual);

// Add a pad
const padWidth = 100;
const padHeight = 20;
const padBotPos = 40;

let padX = (fieldWidth - padWidth) / 2;
let padY = fieldHeight - (padBotPos + padHeight);

const pad = new Visual(padWidth, padHeight, padX, padY, 'pad', true);
field.visual.appendChild(pad.visual);

const ballSize = 20;
const minLeftPos = 0;
const maxRightPos = fieldWidth - padWidth;

let ballX = (fieldWidth - ballSize) / 2;
let ballY = padY - ballSize;
let isBallMoving = false;

const ball = new Ball(ballSize, ballSize, ballX, ballY, 'ball', true);
field.visual.appendChild(ball);



document.body.onmousemove = (e) => {
  padX = e.clientX;
  if (padX < minLeftPos) padX = minLeftPos;
  if (padX > maxRightPos) padX = maxRightPos;
  pad.move(padX);

  if (!isBallMoving) {
    ballX = padX + (padWidth - ballSize) / 2;
    ball.style.left = ballX + 'px';
  }
}

document.body.onmousedown = () => isBallMoving = true;

// boundaries
let minX = 0, minY = 0, maxX = fieldWidth, maxY = fieldHeight;
// speed
let speedX = 4, speedY = 4;
// direction
let dirX = +1, dirY = -1;


const move = () => {
  let newX, newY;
  let ballLeft, ballRight, ballTop, ballBottom;
  let wallLeft, wallRight, wallTop, wallBottom;
  let padLeft, padRight, padTop, padBottom;

  if (isBallMoving) {
    // check collision with our pad and walls
    ballLeft = ballX;
    ballRight = ballX + ballSize;
    ballTop = ballY;
    ballBottom = ballY + ballSize;

    wallLeft = 0;
    wallRight = fieldWidth;
    wallTop = 0;
    wallBottom = fieldHeight;

    padTop = padY;
    padBottom = padTop + padHeight;
    padLeft = padX;
    padRight = padLeft + padWidth;

    newX = ballX + (speedX * dirX);
    newY = ballY + (speedY * dirY);

    // wall collision
    if (newX <= wallLeft || newX >= wallRight) dirX *= -1;
    if (newY <= wallTop || newY >= wallBottom) dirY *= -1;

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    info.innerText = `x: ${ballX}px\ny: ${ballY}px`;
  }
}


setInterval(move, 1000/60);

// Pong like game, in Javascript
const root = document.getElementById('root');

const info = document.createElement('span');
info.innerText = 'info';
info.className = 'info';
root.appendChild(info);


// Basic rect properties
class Rect {
  constructor(width, height, left, top) {
    this.initialState = [ width, height, left, top ];
    this.width = width;
    this.height = height;
    this.left = left;
    this.right = left + width;
    this.top = top;
    this.bottom = top + height;
    // corners
    this.topleft = [ this.top, this.left ];
    this.topright = [ this.top, this.right ];
    this.bottomleft = [ this.bottom, this.left ];
    this.bottomright = [ this.bottom, this.right ];
  }

  getRect() {
    return [this.left, this.top, this.right, this.bottom];
  }

  getNewPos(x, y) {
    return { left: x, top: y, right: x + this.width, bottom: y + this.height };
  }

  setLeft(left) { 
    this.left = left;
    this.right = left + this.width;
  }

  setRight(right) { 
    this.left = right - this.width;
    this.right = right;
  }

  setTop(top) { 
    this.top = top;
    this.bottom = top + this.height;
  }

  setBottom(bottom) { 
    this.top = bottom - this.height;
    this.bottom = bottom;
  }

  updatePos() { }

  reset() {
    [ this.width, this.height, this.left, this.top ] = this.initialState;
  }

  collides(rect) {
    // check for collision between two rects

    // corner collision
    if (this.topleft == rect.bottomright 
        || this.topright == rect.bottomleft
        || this.bottomleft == rect.topright
        || this.bottomright == rect.topleft) {
      return 'corner';
    }

    if (this.left < rect.right && this.right > rect.left) {
      if (this.bottom >= rect.top && this.top < rect.top) return 'bottom';
      if (this.top <= rect.bottom && this.bottom > rect.bottom) return 'top';
    }

    if (this.bottom > rect.top && this.top < rect.bottom) {
      if (this.right > rect.left && this.left < rect.left) return 'right';
      if (this.left < rect.right && this.right > rect.right) return 'left';
    }
    return 'none';
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

  moveX(x) {
    this.setLeft(x);
    this.visual.style.left = this.left + 'px';
  }

  moveY(y) {
    this.setTop(y);
    this.visual.style.top = this.top + 'px';
  }

  moveXY(x, y) {
    this.moveX(x);
    this.moveY(y);
  }

  updatePos() {
    this.visual.style.left = this.left + 'px';
    this.visual.style.top = this.top + 'px';
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

const ball = new Visual(ballSize, ballSize, ballX, ballY, 'ball', true);
field.visual.appendChild(ball.visual);



document.body.onmousemove = (e) => {
  padX = e.clientX;
  if (padX < minLeftPos) padX = minLeftPos;
  if (padX > maxRightPos) padX = maxRightPos;
  pad.moveX(padX);

  if (!isBallMoving) {
    ballX = padX + (padWidth - ballSize) / 2;
    ball.moveX(ballX);
  }
}

document.body.onmousedown = () => isBallMoving = true;

// speed
let speedX = 4, speedY = 4;
// direction
let dirX = +1, dirY = -1;

const restart = () => {
  isBallMoving = false;
  dirY = -1;
  ball.reset();
  ball.updatePos();
  pad.reset();
  pad.updatePos();
}

const move = () => {

  if (isBallMoving) {
    ballX += speedX * dirX;
    ballY += speedY * dirY;

    ball.setLeft(ballX);
    ball.setTop(ballY);

    if (ball.left < 0) ball.setLeft(0);
    if (ball.right > field.width) ball.setRight(field.width);
    if (ball.top < 0) ball.setTop(0);
    if (ball.bottom > field.height) ball.setBottom(field.height);

    ball.updatePos();

    // check collision with our pad and walls
    if (ball.left <= 0 || ball.right >= field.width) dirX *= -1;
    if (ball.top <= 0) dirY *= -1;
    // if the ball hits the bottom, reset
    if (ball.bottom >= field.height) restart();

    // ball and pad collision
    let collision = ball.collides(pad);
    switch (collision) {
      case 'bottom':
      case 'top':
        dirY *= -1;
        break;
      case 'left':
      case 'right':
        dirX *= -1;
        break;
      case 'corner':
        dirX *= -1;
        dirY *= -1;
        break;
      default:
        break;
    }

    info.innerText = `x: ${ballX}px\ny: ${ballY}px`;
  }
}


setInterval(move, 1000/60);

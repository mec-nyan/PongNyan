import Visual from './visual';
import levels from './levels';
import './pongnyan.css';
import './pad.css';
import './ball.css';
import './brick.css';
import './field.css';


// Pong like game, in Javascript
const root = document.getElementById('root');

const info = document.createElement('span');
info.innerText = 'info';
info.className = 'info';
root.appendChild(info);

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

const pad = new Visual(padWidth - 2, padHeight - 2, padX, padY, 'pad', true);
field.visual.appendChild(pad.visual);

const ballSize = 20;
const minLeftPos = 0;
const maxRightPos = fieldWidth - padWidth;

let ballX = (fieldWidth - ballSize) / 2;
let ballY = padY - ballSize;
let isBallMoving = false;

const ball = new Visual(ballSize - 2, ballSize - 2, ballX, ballY, 'ball', true);
field.visual.appendChild(ball.visual);

const movePadAndBall = x => {
  padX = x;
  if (padX < minLeftPos) padX = minLeftPos;
  if (padX > maxRightPos) padX = maxRightPos;
  pad.moveX(padX);

  if (!isBallMoving) {
    ballX = padX + (padWidth - ballSize) / 2;
    ball.moveX(ballX);
  }
}

/*
document.body.onmousemove = (e) => {
  movePadAndBall(e.clientX);
}
*/

document.body.onmousedown = () => isBallMoving = true;

let goLeft = false;
let goRight = false;

document.body.onkeydown = e => {
  switch (e.code) {
    case 'KeyH':
    case 'KeyA':
      goLeft = true;
      break;
    case 'KeyL':
    case 'KeyD':
      goRight = true;
      break;
    case 'KeyJ':
    case 'KeyW':
    case 'Space':
      isBallMoving = true;
      break;
    default:
      break;
  }
}

document.body.onkeyup = e => {
  switch (e.code) {
    case 'KeyH':
    case 'KeyA':
      goLeft = false;
      break;
    case 'KeyL':
    case 'KeyD':
      goRight = false;
      break;
    default:
      break;
  }
}

// pad speed
let padSpeed = 8;
// speed
let speedX = 4, speedY = 4;
// direction
let dirX = +1, dirY = -1;

const restart = () => {
  isBallMoving = false;
  ball.reset();
  ball.updatePos();
  pad.reset();
  pad.updatePos();
  ballX = ball.left;
  ballY = ball.top;
}

let level = 1;
let bricks = levels.level1;
for (let b of bricks) field.visual.appendChild(b.visual);

const move = () => {

  if (goLeft) {
    let x = pad.left - padSpeed;
    movePadAndBall(x);
  }

  if (goRight) {
    let x = pad.left + padSpeed;
    movePadAndBall(x);
  }

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
    if (bricks.length === 0) {
      restart();
      ++level;
      if (level <= 4) {
        bricks = levels[`level${level}`];
        for (let b of bricks) field.visual.appendChild(b.visual);
      }
    }

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
      default:
        break;
    }

    for (let i = 0; i < bricks.length; ++i) {
      let brickCollision = ball.collides(bricks[i]);
      if (brickCollision === 'top' || brickCollision === 'bottom') {
        dirY *= -1;
        bricks[i].visual.className = 'invisible';
        bricks.splice(i, 1);
        break;
      }
      if (brickCollision === 'left' || brickCollision === 'right') {
        dirX *= -1;
        bricks[i].visual.className = 'invisible';
        bricks.splice(i, 1);
        break;
      }
    }

    info.innerText = `x: ${ballX}px\ny: ${ballY}px`;
  }
}


setInterval(move, 1000/60);

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

// animate ball


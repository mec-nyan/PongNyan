// Pong like game, in Javascript
const root = document.getElementById('root');

const field = document.createElement('div');
field.className = 'field';
root.appendChild(field);

const pad = document.createElement('div');
pad.className = 'pad';
field.appendChild(pad);
/*
const pad = document.getElementById('padRight');

document.body.onmousemove = (e) => {
  if (e.clientY >= 50 && e.clientY <= 400) {
    pad.style.top = `${e.clientY}px`;
  }
}
*/

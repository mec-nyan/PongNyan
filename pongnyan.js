
const pad = document.getElementById('padRight');

document.body.onmousemove = (e) => {
  if (e.clientY >= 50 && e.clientY <= 400) {
    pad.style.top = `${e.clientY}px`;
  }
}



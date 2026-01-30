let mouse = {
  x: 0,
  y: 0,
};

let keys = {
  u: false,
  d: false,
  l: false,
  r: false,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
    case "ArrowUp":
      keys.u = true;
      break;
    case "KeyS":
    case "ArrowDown":
      keys.d = true;
      break;
    case "KeyA":
    case "ArrowLeft":
      keys.l = true;
      break;
    case "KeyD":
    case "ArrowRight":
      keys.r = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.code) {
    case "KeyW":
    case "ArrowUp":
      keys.u = false;
      break;
    case "KeyS":
    case "ArrowDown":
      keys.d = false;
      break;
    case "KeyA":
    case "ArrowLeft":
      keys.l = false;
      break;
    case "KeyD":
    case "ArrowRight":
      keys.r = false;
      break;
  }
});
let u = 1; //make unit globally accessable

class global_props {
  constructor() {
    //static values
    this.el = document.getElementById("canvas");

    //dynamic values
    this.w, this.h;

    //bind to keep context
    this.resize_canvas = this.resize_canvas.bind(this);
    this.get_ctx = this.get_ctx.bind(this);
  }
  resize_canvas() {
    //u = Math.floor((window.innerWidth / 16 + window.innerHeight / 9) / 2);
    u = Math.min(window.innerWidth / 16, window.innerHeight / 9) * 0.99; //*0.99 to prevent slider
    this.w = u * 16;
    this.h = u * 9;
    this.el.width = this.w;
    this.el.height = this.h;
  }
  get_ctx() {
    return this.el.getContext("2d");
  }
}

const pigeon = new global_props();
pigeon.resize_canvas();
window.addEventListener("resize", pigeon.resize_canvas);

class Canvas {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
  }
  clear(x = 0, y = 0, w = this.canvas.width, h = this.canvas.height) {
    this.ctx.clearRect(x, y, w, h);
  }
  save() {
    this.ctx.save();
  }
  restore() {
    this.ctx.restore();
  }
  begin() {
    this.ctx.beginPath();
  }
  fillRect(x, y, w, h) {
    this.ctx.fillRect(x, y, w, h);
  }
  fill() {
    this.ctx.fill();
  }
  fillText(text, x, y, size) {
    this.ctx.font = `${size * u}px serif`;
    this.ctx.fillText(text, x, y);
  }
  strokeRect(x, y, w, h) {
    this.ctx.strokeRect(x, y, w, h);
  }
  stroke() {
    this.ctx.stroke();
  }
  strokeText(text, x, y, size) {
    this.ctx.font = `${size * u}px serif`;
    this.ctx.strokeText(text, x, y);
  }
  moveTo(x, y) {
    this.ctx.moveTo(x, y);
  }
  lineTo(x, y) {
    this.ctx.lineTo(x, y);
  }
  arc(x, y, radius, startAngle, endAngle, counterClockwise = false) {
    this.ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
  }
  setTransform(a, b, c, d, e, f) {
    this.ctx.setTransform(a, b, c, d, e, f);
  }
  set_property(property, value) {
    this.ctx[property] = value;
  }
  get_property(property) {
    return this.ctx[property];
  }
}

const c = new Canvas(pigeon.el, pigeon.get_ctx());

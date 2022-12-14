let img;

function preload() {
  img = loadImage("assets/avocado.png");
}

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);
}

function draw() {
  image(img, 0, 0);
}
// window.open("filepath", "target");
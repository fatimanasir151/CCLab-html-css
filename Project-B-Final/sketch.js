function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");

  let gridSize = 5;
  for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {
      noStroke();
      fill(random(199, 0, 57));
      rect(x, y, gridSize, gridSize);
    }
  }
}

function draw() {
  //
}
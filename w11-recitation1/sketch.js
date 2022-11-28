let a = 0;
let x, y;
let xSpd, ySpd;
let circleWhite;
let circleWhiteSpd;

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(0);
  x = width / 2;
  y = height / 2;
  xSpd = random(-3, 3);
  ySpd = random(-3, 3);

  circleWhite = 0;
  circleWhiteSpd = 1;

}

function draw() {
  push();
  x = x + random(-3, 3);
  y = y + random(-3, 3);

  if (x < 0 || x > width) {
    xSpd = xSpd * -1; // xSpd *= -1;
  }
  if (y < 0 || y > height) {
    ySpd = ySpd * -1;
  }

  circleWhite += circleWhiteSpd;
  if (circleWhite > 255) {
    circleWhiteSpd *= -1;
  } else if (circleWhite < 0) {
    circleWhiteSpd *= -1;
  }

  fill(circleWhite);
  noStroke();
  circle(x, y, 40);
  pop();

  push();
  noStroke();

  let freq = frameCount * 0.03;
  let amp = 150;
  let cosVal = cos(freq) * amp;
  let sinVal = sin(freq) * amp;

  x = width / 2;
  y = height / 2 + sinVal;
  fill(255, 255, 0);

  x = width / 2 + cosVal;
  y = height / 2;
  fill(0, 0, 255);

  x = width / 2 + cosVal;
  y = height / 2 + sinVal;
  fill(255); // white
  circle(x, y, 30);
  pop();

  push();
  a += 60.1;

  angle = radians(a); // freq: pos, time
  radDist = 150;
  cosVal = cos(angle) * radDist;
  sinVal = sin(angle) * radDist;

  x, y;
  x = width / 2 + cosVal;
  y = height / 2 + sinVal;
  //fill(255); // white
  //circle(x, y, 30);
  stroke(255, 100);
  line(width / 2, height / 2, x, y);
  pop();

  // endGif(450);   // stop recording the GIF after 450 frames
}
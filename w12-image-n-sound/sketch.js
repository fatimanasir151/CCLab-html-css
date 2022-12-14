let img;
let sound;
// let amp;

function preload() {
  // img = loadImage("cclab-assets/images/colorful.jpg");
  img = loadImage("cclab-assets/images/sprite.png");
  sound = loadSound("cclab-assets/sounds/beat.mp3");
}

function setup() {
  let canvas = createCanvas(500, 281);
  canvas.parent("canvasContainer");
  background(0);

  // amp = new p5.Amplitude();

  // img = loadImage("cclab-assets/images/colorful.jpg");
  // console.log(img.width);
  // console.log(img.height);
}

function mousePressed() {
  sound.play();
  sound.setRate(2.0);
}

function draw() {
  // background(220);
  blendMode(ADD);
  imageMode(CENTER);
  image(img, mouseX, mouseY, 30, 30);
  // console.log(img.width);
  //
  tint(120, 80, 10, 50);
  // image(img, 0, 0);
  // filter(THRESHOLD, 0.5);
  // filter(BLUR, 6);
  // let level = amplitude.getLevel(); //0 to 1
  // let dia = map(level, 0, 1, 50, 500);

  // noStroke();
  // fill(0, 255, 255);
  // circle(width / 2, height / 2, dia);

}
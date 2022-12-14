let imgCat;
let imgMinecraft;
let imgBone;
let imgCatfood;
let imgAvocado;
let imgCherry;
let imgGrapes;
let imgWater;
let sound;

let cat;
let items = [];
let particles = [];

let clickCount;

function preload() {
  imgCat = loadImage("assets/cat.png");
  imgMinecraft = loadImage("assets/minecraft.jpg");
  imgBone = loadImage("assets/bone.png");
  imgCatfood = loadImage("assets/catfood.png");
  imgAvocado = loadImage("assets/avocado.png");
  imgCherry = loadImage("assets/cherry.png");
  imgGrapes = loadImage("assets/grapes.png");
  imgWater = loadImage("assets/water.png");
  sndMeow = loadSound("assets/okmeow.mp3");
  sndMeowpain = loadSound("assets/painmeow.mp3");
  sndMeowpurr = loadSound("assets/purrmeow.mp3");
  sndMeowsad = loadSound("assets/sadmeow.mp3");
  sndMeowangry = loadSound("assets/angrymeow.mp3");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");

  items.push(new Item(140, 470, imgCatfood, sndMeowpurr));
  items.push(new Item(460, 425, imgBone, sndMeowpain));
  items.push(new Item(310, 257, imgWater, sndMeowsad));
  items.push(new Item(140, 360, imgAvocado, sndMeow));
  items.push(new Item(140, 165, imgCherry, sndMeowangry));
  items.push(new Item(460, 175, imgGrapes, sndMeow));

  cat = new FatimaCat(width / 2, 480);

  for (let i = 0; i < 500; i++) {
    particles[i] = new Particle(width / 2, 620);
  }
  clickCount = 0;
}

function draw() {
  background(255);

  // bg img
  image(imgMinecraft, 0, 0, 1450, 900);

  cat.move();
  cat.restrict();
  cat.display();

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i]; // each object
    p.move();

    if (clickCount === 15) {
      p.explode();
      console.log("15times!");
    }
    p.display();
  }

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    item.checkMouse();
    item.checkCollision(cat);
    item.display();
  }
}

class Particle {
  constructor(x, y) {
    // properties (variables)
    this.x = x;
    this.y = 830;
    this.xSpd = 0; //random(-3, -0.5);
    this.ySpd = 0;
    this.dia = random(3, 10);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }
  // methods (functions)
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  explode() {
    this.xSpd = random(-10, 10);
    this.ySpd = random(-10, 10);
  }
  display() {
    push();
    noStroke();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.dia);
    circle(this.x, this.y, this.dia * 0.6);
    circle(this.x, this.y, this.dia * 0.3);
    pop();
  }
}

function mousePressed() {
  // clickCount++;
  //console.log(clickCount);
  // if (clickCount === 30) {
  // }

  if (mouseIsPressed) {
    clickCount += 1;
    // console.log(clickCount);
  }
}

class Item {
  constructor(x, y, img, snd) {
    this.img = img;
    this.snd = snd;
    this.x = x;
    this.y = y;
    this.initX = x;
    this.initY = y;
    this.rad = 35;
    this.adj = 2.0;
    this.color = 0; // grayscale
    this.active = false;
  }
  checkMouse() {
    let distance = dist(this.x, this.y, mouseX, mouseY);
    if (distance < this.rad) {
      // in
      this.color = 100;
      this.adj = 2.2;
      if (mouseIsPressed) {
        this.color = 200;
        this.adj = 1.8;
        // dragable
        this.x = mouseX;
        this.y = mouseY;
      }
    } else {
      // out
      this.color = 0;
      this.adj = 2.0;
      this.x = this.initX;
      this.y = this.initY;
    }
  }
  checkCollision(target) {
    let distance = dist(this.x, this.y, target.x, target.y);
    if (distance < this.rad + this.rad) {
      // collided!
      //this.snd.setVolume(0.1);
      if (this.snd.isPlaying() == false) {
        this.snd.play();
      }
    }
  }
  display() {
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.rad * this.adj, this.rad * this.adj);

    noFill();
    stroke(this.color);
    //ellipse(this.x, this.y, this.rad * 2, this.rad * 2);
    pop();
  }
}

class FatimaCat {
  constructor(x, y) {
    // properties
    this.x = x;
    this.y = y;
    this.xSpd = random(-0.5, 0.5);
    this.ySpd = 0;
    this.rad = 70;
    this.r = 220;
    this.g = 220;
    this.b = 220;
    //this.rotSpd = (-0.02, 0.02);
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(frameCount * this.rotSpd);


    imageMode(CENTER); // 50, 190
    image(imgCat, 10, 179, 300, 320);

    //fill(this.r, this.g, this.b);
    noFill();
    stroke(0, 255, 0);
    //circle(0, 225, this.rad * 3);
    pop();
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  restrict() {
    if (this.x < 0) {
      this.x = 0;
      this.xSpd = this.xSpd * -0.5;
    } else if (this.x > width) {
      this.x = width;
      this.xSpd = this.xSpd * -0.5;
    }
  }
}


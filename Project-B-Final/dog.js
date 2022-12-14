let imgDog;
let imgPenthouse;
let imgBone;
let imgBall;
let imgDogfood;
let imgLeash;
let sound;

let dog;
let items = [];

function preload() {
  imgDog = loadImage("assetsdog/dog.png");
  imgPenthouse = loadImage("assetsdog/penthouse.jpg");
  imgBone = loadImage("assetsdog/bone.png");
  imgBall = loadImage("assetsdog/ball.png");
  imgDogfood = loadImage("assetsdog/dogfood.png");
  imgLeash = loadImage("assetsdog/leash.png");
  sndDogbark = loadSound("assetsdog/dogsbarking.mp3");
  sndDogsing = loadSound("assetsdog/dogsinging.mp3");
  sndDoglittlebark = loadSound("assetsdog/littlebark.mp3");
  sndDogold = loadSound("assetsdog/olddog.mp3");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");

  items.push(new Item(130, 10, imgBone, sndDoglittlebark));
  items.push(new Item(580, 460, imgBall, sndDogold));
  items.push(new Item(1424, 459, imgDogfood, sndDogsing));
  items.push(new Item(1040, 330, imgLeash, sndDogbark));

  dog = new FatimaDog(width / 2, 480);

}

function draw() {
  background(255);

  // bg img
  image(imgPenthouse, 0, 0, 1480, 825);

  dog.move();
  dog.restrict();
  dog.display();

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    item.checkMouse();
    item.checkCollision(dog);
    item.display();
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

class FatimaDog {
  constructor(x, y) {
    // properties
    this.x = x;
    this.y = y + 190;
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
    image(imgDog, -5, 15, 200, 320);

    //fill(this.r, this.g, this.b);
    noFill();
    noStroke();
    circle(0, 0, this.rad * 2);
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


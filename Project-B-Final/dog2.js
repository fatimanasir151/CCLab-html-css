let imgDog;
let imgBeach;
let imgHotdog;
let imgDogfood;
let imgFrisbee;
let sound;

let dog;
let items = [];

function preload() {
  imgDog = loadImage("assetsdog2/dog2.png");
  imgBeach = loadImage("assetsdog2/beach.jpg");
  imgHotdog = loadImage("assetsdog2/hotdog.png");
  imgDogfood = loadImage("assetsdog2/dogfood.png");
  imgFrisbee = loadImage("assetsdog2/frisbee.png");
  sndChihuahuamad = loadSound("assetsdog2/chihuahuamad.mp3");
  sndChihuahuaplaying = loadSound("assetsdog2/chihuahuaplaying.mp3");
  sndChihuahuaslurp = loadSound("assetsdog2/chihuahuaslurp.mp3");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvasContainer");

  items.push(new Item(420, 500, imgHotdog, sndChihuahuamad));
  items.push(new Item(300, 500, imgDogfood, sndChihuahuaslurp));
  items.push(new Item(180, 500, imgFrisbee, sndChihuahuaplaying));

  dog = new FatimaDog(width / 2, 480);

}

function draw() {
  background(255);

  // bg img
  image(imgBeach, 0, 0, 1450, 825);

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
    image(imgDog, 0, 250, 650, 400);

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


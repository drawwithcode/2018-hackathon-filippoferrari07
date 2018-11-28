var mySong;
var myImage;
var myCrystal;

var myMeth;

function preload() {
  mySong = loadSound('assets/BreakingBad.mp3');
  myImage = loadImage('assets/Wallpaper.jpg');
  myCrystal = loadImage('assets/Crystal.png')

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);
  image(myImage, width / 2, height / 2, myImage.width / 3 * 2, myImage.height / 3 * 2);

  //analyzer
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

}

function draw() {

  //volume map
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height / 2);

  push();
  noFill();
  translate(width/2,height/2);
  rotate(volume);
  push();
  stroke(lerpColor(color(255, 199, 0), color(35, 165, 224), frameCount/360))
  ellipse(0,0 , volume*4);
  pop();
  stroke(lerpColor(color(255), color(80), frameCount/360));
  polygon(0, 0, volume*4, 3);
  pop();

  //play button
  var distance = dist(width / 2, height / 2, mouseX, mouseY);
  if (distance < 25 && mouseIsPressed == false) {
    if (mySong.isPlaying() == false) {
      mySong.play();
      push();
      noStroke();
      fill(191, 226, 242);
      ellipse(width / 2, height / 2, 70);
      pop();
      push();
      fill(70);
      polygon(width / 2, height / 2, 20, 3);
      pop();
    }
  } else {
    push();
    noStroke();
    fill(191, 226, 242);
    ellipse(width / 2, height / 2, 70);
    pop();
    push();
    noStroke();
    rectMode(CENTER);
    fill(70);
    rect(width / 2 - 10, height / 2, 10, 40);
    rect(width / 2 + 10, height / 2, 10, 40);
    pop();
    mySong.pause();
  }

  //Meth generator
  if (mouseIsPressed == true && distance > 25) {
    myMeth = new Meth(random(0, width), random(0, height));
    myMeth.display();
  }

}

function Meth(_x, _y) {

  this.x = _x;
  this.y = _y;

  this.speed = 1;

  this.move = function() {
    this.x = random();
    this.y = random();
  }

  this.display = function() {
    image(myCrystal, this.x, this.y, myCrystal.width/3, myCrystal.height/3);
  }
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

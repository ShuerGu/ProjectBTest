let t;
let mySuitcase;
let deg = 1;
let trees = [];
let numTrees = 8;
let sceneIndex = 0;
let suitcases = [false, false, false, false, false];
let plusPos = [
  [290, 140],
  [150, 260],
  [150, 400],
  [290, 260],
  [290, 400],
];
let img1;
let img2;
let mouseClickedA = false;
let mouseClickedB = false;
let sourceText =
  "Hi! Welcome aboard! I'm your conductor. On my right, here is a luggage left by people from 2024 on purpose. Feel free to open it and also make your own ones for those in the future.";
let idx = 0;
let emojiOptions = [
  "🪥", "👓", "☂️", "🥐", "🛼", "🏀", "🍾",  "🚲", "📷", "📆", "📰", "📝", "🛍️", "🧸", "💊", "🧴", "🚬", "💳", "📱", "🔑",
];
let emojis = [];
let numEmojis = 20;
let startGenerating = false;
let sourceText2 = "This is a suitcase left by a traveller from April, 2024";
let idx2 = 0;

// let full = [[false, false, false, false, false],[],[], [], [], []]
let full1 = false;
let full2 = false;
let full3 = false;
let full4 = false;
let full5 = false;

function preload() {
  img1 = loadImage("conductor.png");
  img2 = loadImage("plus.png");
  // startSound = loadSound("train.mp3");
}

function setup() {
  let canvas = createCanvas(700, 500);
  canvas.parent("canvasContainer");

  while (emojis.length < numEmojis) {
    let x = random(80, width - 80);
    let y = random(130, height - 80)
    if(x > 130 && x < width-130 && y > 150 && y < height-100){
      continue
    }
    if (emojis.length == 0) {
      emojis.push(new emoji(x, y));
      continue;
    }

    let overlap = false;

    for (let i = 0; i < emojis.length; i++) {
      if (emojis[i].overlapsWithMe(x, y) == true) {
        overlap = true;
      }


      if (i == emojis.length - 1) {
        if (overlap == false) {
          emojis.push(new emoji(x, y));
        }
      }
    }
  }
}

function draw() {
  // startSound.play();


  if (sceneIndex == 0) {
    background(141, 182, 247);
    t = new train(width / 2, height / 2);

    noStroke();
    fill(239, 242, 218);

    for (let i = 0; i < numTrees; i++) {
      trees.push(new tree(random(width), random(height)));
      trees[i].update();
      trees[i].display();
    }

    t.update();
    t.display();
  }

  if (sceneIndex == 1) {
    background(161, 102, 47);

    stroke(0, 80);
    strokeWeight(2);
    line(100, 0, 100, height - 80);
    line(0, height, 100, height - 80);
    line(100, height - 80, width, height - 80);

    stroke(0);
    strokeWeight(6);
    line(100, 50, 100, height - 80);
    line(100, 50, 400, 50);
    line(100, 160, 400, 160);
    line(100, 290, 400, 290);
    line(400, 50, 400, height - 80);
    line(100, height - 80, 400, height - 80);
    line(100, 50, 50, 90);
    line(100, 160, 50, 200);
    line(100, 290, 50, 330);
    line(100, height - 80, 50, height - 40);
    line(50, 90, 50, height - 40);
    line(50, height - 40, 350, height - 40);
    line(350, height - 40, 400, height - 80);
    line(50, 90, 350, 90);
    line(50, 200, 350, 200);
    line(50, 330, 350, 330);
    line(350, 90, 400, 50);
    line(350, 200, 400, 160);
    line(350, 330, 400, 290);
    line(350, height - 40, 50, height - 40);
    line(350, 90, 350, height - 40);

    mySuitcase = new suitcase(0, 0);
    mySuitcase.update();
    mySuitcase.display();

    noStroke();
    fill(255);
    triangle(510, 140, 560, 80, 580, 120);
    ellipse(600, 100, 180, 150);

    strokeWeight(1);
    fill(0);
    let stringPart = sourceText.substring(0, idx);
    textSize(12);
    textWrap(CHAR);
    textAlign(LEFT, CENTER);
    text(stringPart, 530, 0, 150, 200);
    idx++;

    if (mouseClickedA == false) {
      buttonBox(100, 150);
    } else {
      open(100, 150);
    }

    if (mouseClickedB == false) {
      buttonBox(150, 150);
    } else {
      open(150, 150);
    }

    if (mouseClickedA == true && mouseClickedB == true) {
      sceneIndex = 3;
      mouseClickedA = false;
      mouseClickedB = false;
    }

    imageMode(CENTER);
    image(img1, 500, 300, 400, 400);

    
    // image(img2, 290, 140, 100, 100);
    // image(img2, 150, 260, 100, 100);
    // image(img2, 150, 400, 100, 100);
    // image(img2, 290, 260, 100, 100);
    // image(img2, 290, 400, 100, 100);

  
    for (let i = 0; i < suitcases.length; i++) {
      if (suitcases[i].length > 0) {
        suitcases[i].update();
        suitcases[i].display();
        // suitcases.push(new suitcase(random(width), random(height)));
      } else {
        imageMode(CENTER);
        image(img2, plusPos[i][0], plusPos[i][1], 100, 100);
      }
    }

    textFont("Times New Roman");
    fill(0);
    textSize(8);
    text("April, 2024", 85, 185);
  }

  if (sceneIndex == 2) {
    background(255, 235, 205);

    stroke(0);
    strokeWeight(3);
    fill(161, 102, 47);
    quad(50, 100, 650, 100, 750, 450, -50, 450);
    quad(150, 200, 550, 200, 600, 400, 100, 400);
    quad(0, 0, width, 0, 650, 100, 50, 100);
    line(50, 100, 150, 200);
    line(650, 100, 550, 200);
    line(750, 450, 600, 400);
    line(-50, 450, 100, 400);

    buttonBack(50, 40);
    buttonBack(160, 40);
    textSize(16);
    text("BACK", 65, 65);
    text("DONE", 175, 65);
    
    
    if (emojis.length > 0) {
      for (let i = 0; i < numEmojis; i++) {
        emojis[i].update();
        emojis[i].display();
      }
    }


    fill(255, 60);
    rect(180, 180, 80, 80);
    rect(300, 180, 80, 80);
    rect(420, 180, 80, 80);
    rect(230, 300, 80, 80);
    rect(370, 300, 80, 80);
  }

  if (sceneIndex == 3) {
    background(255, 235, 205);

    stroke(0);
    strokeWeight(3);
    fill(161, 102, 47);
    quad(50, 100, 650, 100, 750, 450, -50, 450);
    quad(150, 200, 550, 200, 600, 400, 100, 400);
    quad(0, 0, width, 0, 650, 100, 50, 100);
    line(50, 100, 150, 200);
    line(650, 100, 550, 200);
    line(750, 450, 600, 400);
    line(-50, 450, 100, 400);

    buttonBack(50, 40);
    textSize(16);
    text("BACK", 65, 60);

    fill(255, 60);
    rect(180, 180, 80, 80);
    rect(300, 180, 80, 80);
    rect(420, 180, 80, 80);
    rect(230, 300, 80, 80);
    rect(370, 300, 80, 80);

    textSize(40);
    text("🧢", 200, 235);
    text("🩹", 320, 235);
    text("💄", 440, 235);
    text("💴", 250, 350);
    text("🧴", 390, 350);

    strokeWeight(1);
    fill(0);
    let stringPart = sourceText2.substring(0, idx2);
    textSize(12);
    textAlign(LEFT, CENTER);
    text(stringPart, 350, 75);
    idx2++;
  }
}


function buttonBack(x, y) {
  push();
  translate(x, y);
  scale(1.5);
  stroke("red");
  rect(0, 0, 50, 25);
  pop();
}


class emoji {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.follow = false;
    this.ranIdx = int(random(0, emojiOptions.length));
    this.emojiImg = emojiOptions[this.ranIdx];
    this.pickedEmoji = emojiOptions.splice(this.ranIdx, 1);
    
  }
  update() {
    this.checkDrag();
    
    if (this.follow == true) {
      this.x = mouseX;
      this.y = mouseY;
    }
    if (full1 == false && this.x > 180 && this.x < 260 && this.y > 180 && this.y < 260){
      this.x = 220;
      this.y = 220;
      full1 = true;
      
    }else if(full2 == false && this.x > 300 && this.x < 380 && this.y > 180 && this.y < 260){
      this.x = 340;
      this.y = 220;
      full2 = true;
    }else if(full3 == false && this.x > 420 && this.x < 500 && this.y > 180 && this.y < 260){
      this.x = 460;
      this.y = 220;
      full3 = true;
    }else if(full4 == false && this.x > 230 && this.x < 310 && this.y > 300 && this.y < 380){
      this.x = 270;
      this.y = 340;
      full4 = true;
    }else if(full5 == false && this.x > 370 && this.x < 440 && this.y > 300 && this.y < 380){
      this.x = 410;
      this.y = 340;
      full5 = true;
    }
    
  }
  display() {
    push();
    translate(this.x, this.y);
    textSize(30);
    text(this.emojiImg, -15, 0);
    // noFill();
    // circle(0, 0, 40)
    pop();
  }
  checkDrag() {
    if (dist(mouseX, mouseY, this.x, this.y) < 10) {
      this.follow = true;
    } else {
      this.follow = false;
    }
  }
  overlapsWithMe(other_x, other_y){
    let distance = dist(other_x, other_y, this.x, this.y);
    if (distance < 40) {
      return true
    } else {
      return false
    }
  }
}
function mouseDragged() {
  if (sceneIndex == 2) {
    if (emojis.length > 0) {
      for (let i = 0; i < emojis.length; i++) {
        emojis[i].checkDrag();
      }
    }
  }

  
}
// function mouseReleased() {

// }



class suitcase{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
  }
  update(){
    // this.tellButtons();
  }
  display(){
    push();
    strokeWeight(1);
    fill(181, 155, 124);
    rect(80, 130, 110, 60);
    quad(80, 130, 100, 110, 205, 110, 190, 130);
    quad(205, 110, 190, 130, 190, 190, 205, 165);
    line(80, 160, 190, 160);
    line(190, 160, 205, 140);
    pop();
  }
  // tellButtons(){
  //   if (mouseClickedA == false) {
  //     buttonBox(100, 150);
  //   } else {
  //     open(100, 150);
  //   }

  //   if (mouseClickedB == false) {
  //     buttonBox(150, 150);
  //   } else {
  //     open(150, 150);
  //   }
  // }
}

class train {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.noiseVal = 0;
    this.mouseClicked = false;
  }
  update() {
    deg += 5;
    this.y = map(noise(this.noiseVal), 0, 1, height / 2 - 10, height / 2 + 10);
    this.noiseVal += 0.08
  }
  display() {
    push();
    translate(this.x, this.y);

    strokeWeight(1);
    stroke(0);
    //chain
    fill("grey");
    rect(-100, 30, 50, 10);
    rect(50, 30, 50, 10);
    //train
    fill("grey");
    rect(170, -40, 20, 50);
    fill(117, 52, 34);
    rect(-200, -50, 110, 100);
    rect(-50, -50, 110, 100);
    rect(100, -20, 110, 70);

    wheel(-170, 60);
    wheel(-120, 60);
    wheel(-20, 60);
    wheel(30, 60);
    wheel(130, 60);
    wheel(180, 60);

    //window
    noStroke();
    fill(212, 208, 200);
    rect(180, -10, 31, 35);
    stroke(0);
    rect(-130, -17, 30, 30);
    rect(-35, -17, 30, 30);
    rect(15, -17, 30, 30);

    //door
    stroke(0);
    fill(97, 70, 13);
    rect(-180, -10, 30, 50);
    stroke("red")
    fill("white");
    circle(-170, 15, 5);

    //track
    stroke(0);
    strokeWeight(4);
    line(-width, 75, width, 75);
    //conductor
    textSize(35);
    text("👮‍♀️", 180, 21);

    pop();
  }
}

function wheel(x, y) {
  push();
  translate(x, y);
  rotate(radians(deg));
  fill("grey");
  strokeWeight(3);
  circle(0, 0, 30);
  line(-15, 0, 15, 0);
  line(0, -15, 0, 15);
  circle(0, 0, 10);
  strokeWeight(6);
  point(0, 0);
  pop();
}

class tree {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.ontheCanvas = true;
  }
  update() {
    this.x -= 2;
    if (this.x < -15) {
      this.x = width + 15;
      this.y = random(height);
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(54, 39, 39);
    rect(-5, 0, 10, 40);
    fill("green");
    ellipse(0, 0, 30, 40);
    pop();
  }
}
function buttonBox(x, y) {
  push();
  translate(x, y);

  fill(0);
  rect(0, 0, 10, 20);

  pop();
}

function open(x, y) {
  push();
  translate(x, y);

  fill(0);
  quad(0, 0, 10, 0, 0, -10, -10, -10);

  pop();
}

function mousePressed() {
  if (sceneIndex == 0){
    if(dist(mouseX, mouseY, width / 2 - 170, height / 2 + 15) < 15) {
    sceneIndex = 1;
    console.log(sceneIndex);
    }
  }else if (sceneIndex == 1){
    if(dist(mouseX, mouseY, 290, 140) < 10 || dist(mouseX, mouseY, 150, 260) < 10 || dist(mouseX, mouseY, 150, 400) < 10 || dist(mouseX, mouseY, 290, 260) < 10 || dist(mouseX, mouseY, 290, 400) < 10) {
    sceneIndex = 2;
    console.log(sceneIndex);
    
    }
  }else if (sceneIndex == 2 || sceneIndex == 3){
    if(dist(mouseX, mouseY, 50, 40) < 50) {
    sceneIndex = 1;
    console.log(sceneIndex);
    }
  }

  if (dist(mouseX, mouseY, 100, 150) < 20) {
    mouseClickedA = true;
  }
  if (dist(mouseX, mouseY, 150, 150) < 20) {
    mouseClickedB = true;
  }
  if (dist(mouseX, mouseY, 175, 65) < 50) {
    // emojis[i].splice(1, emojis.length - 5);

    // 如果在suitcase1，change full[0]
    // for(let i = 0; i < 5; i++){
    //   full[0][i]=false;
    // }
    // full1 = true;
    // full2 = false;
    // full3 = false;
    // full4 = false;
    // full5 = false;
    for (let j = 0; j < emojis.length; j++) {
      if(x > 130 && x < width-130 && y > 150 && y < height-100){
        continue;
      }
      emojis.splice(j, 1); 
      j--;
    }
    saveCanvas(canvas, "mysuitcase", "jpg");
    for (let i = 0; i < suitcases.length; i++) {
      if (suitcases[i] == false) {
        suitcases[i] = true;
        return;
      }
    }
  }
}

function keyPressed() {
  // if (key == "s") {
  //   startGenerating = true;
  // }
}

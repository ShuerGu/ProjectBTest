let t;
// let firstSuitcase;
let deg = 1;
let trees = [];
let numTrees = 8;
let sceneIndex = 0;
let clickIndex;
let savedObj = [[], [], [], [], []];
let savedCanvases = [];
let saveCount = 0;
let lastClickedSuitcaseIndex = 0;

let suitcaseObjects = [];
let currentDate = "";

let suitcases = [false, false, false, false, false];
let plusPos = [
  [290, 160], // first suitcase
  [140, 280], // second suitcase
  [290, 280],
  [140, 420],
  [290, 420],
];
let img1;
let img2;
let mouseClickedA = false;
let mouseClickedB = false;
let full1 = false;
let full2 = false;
let full3 = false;
let full4 = false;
let full5 = false;

let sourceText =
  "Hi! Welcome aboard! I'm your conductor. On my right, here is a suitcase left by people from 2024 on purpose. Feel free to open it and also make your own ones for those in the future.";
let idx = 0;
let originalEmojiOptions = [
  "🪥",
  "👓",
  "☂️",
  "🥐",
  "🛼",
  "🏀",
  "🍾",
  "🚲",
  "📷",
  "📆",
  "📰",
  "📝",
  "🛍️",
  "🧸",
  "💊",
  "🧴",
  "🚬",
  "💳",
  "📱",
  "🔑",
  "🧤",
  "🩱",
  "👕",
  "👗",
  "🩴",
  "👟",
  "🌂",
  "🧣",
  "🎧",
  "💻",
  "💵",
  "🪒"
];

let emojiOptions = [];

function refillEmojiOptions(){
  for(let i = 0; i < originalEmojiOptions.length; i++){
    emojiOptions.push(originalEmojiOptions[i])
  }
}
refillEmojiOptions();


let emojis = [];
let numEmojis = 20;
let startGenerating = false;
let sourceText2 = "This is a suitcase left by a traveller from April, 2024";
let idx2 = 0;
let date = new Date();
let firstEmojis = [];

function preload() {
  img1 = loadImage("conductor.png");
  img2 = loadImage("plus.png");
  //   startSound = loadSound("train.mp3");
}

function setup() {
  let canvas = createCanvas(700, 500);
  canvas.parent("canvasContainer");
  
  let firstSuitcase = new Suitcase(135, 160, 0);
  firstSuitcase.date = "27-3-2024"
  firstSuitcase.finished = true;
  firstSuitcase.savedEmojis = ["🧢","🩹","💄", "💴", "🪪"];
  for(let i = 0; i < firstSuitcase.savedEmojis.length; i++){
    let x;
    if(i >=3){
      x= i * 130 - 120
    }else{
      x=220 + i * 120
    }
    let y;
    if(i >= 3){

      y = 345;
    }else{
      y = 225;
    }
    firstEmojis[i] = new emoji(x, y);
    firstEmojis[i].emojiImg = firstSuitcase.savedEmojis[i];
  }
  suitcaseObjects.push(firstSuitcase)
  randomizeEmojis();
  

  for(let i = 0; i < plusPos.length;i++){
    suitcaseObjects.push(new Suitcase(plusPos[i][0], plusPos[i][1], i+1))
    
  }
  
}

function draw() {
  imageMode(CENTER);
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

    drawShelf();
    drawMan();
    
  } else if (sceneIndex == 2) {
    background(161, 102, 47);

    drawBg();
    if (emojis.length > 0) {
      for (let i = 0; i < emojis.length; i++) {
        emojis[i].update(emojis[i]);
        emojis[i].display();
      }
    }
    
    drawEmojiArea();
  } else if (sceneIndex == 3) {
  
    background(161, 102, 47);
    drawBg();
    drawEmojiArea();

    // draw whatever suitcase was clicked objects
    // in suitcase with lastClickedSuitcaseIndex
    if(!lastClickedSuitcaseIndex == 0){
      let emojistodisplay = suitcaseObjects[lastClickedSuitcaseIndex].savedEmojis
      
      for(let i = 0; i <emojistodisplay.length; i++){
        
        
        emojistodisplay[i].display();
      }
  
    }else{
      for(let i = 0; i <firstEmojis.length; i++){
        firstEmojis[i].display();
      }
    }
    if(lastClickedSuitcaseIndex == 0){
    strokeWeight(1);
    fill(0);
    let stringPart = sourceText2.substring(0, idx2);
    textSize(12);
    textAlign(LEFT, CENTER);
    text(stringPart, 350, 75);
    idx2++;
    }
  }
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
    // this.checkDrag();
    if (this.follow == true) {
      this.x = mouseX;
      this.y = mouseY;
    }

    
  }
  display() {
    push();
    translate(this.x, this.y);
    textSize(30);
    text(this.emojiImg, -15, 0);
    pop();
  }
  checkDrag() {
    if (dist(mouseX, mouseY, this.x, this.y) < 10) {
      this.follow = true;
    } else {
      this.follow = false;
    }
  }
  overlapsWithMe(other_x, other_y) {
    let distance = dist(other_x, other_y, this.x, this.y);
    if (distance < 40) {
      return true;
    } else {
      return false;
    }
  }
}

class Suitcase {
  constructor(startX, startY, idxS) {
    this.x = startX;
    this.y = startY;
    this.mouseClickedA = false;
    this.mouseClickedB = false;
    this.finished = false;
    this.date = "";
    this.savedEmojis = [];
    this.idxInSuitcaseArray = idxS;
  }
  update() {
    
  
  }
  showPlusSign(){
    push();
    translate(this.x, this.y);
    image(img2, 0,0, 100, 100);
    pop();
  }
  displayExterior() {
    push();
    rectMode(CENTER);
    translate(this.x, this.y);
    strokeWeight(1);
    stroke(0);
    fill(181, 155, 124);
    rect(0, 0, 110, 60);
    quad(-55, -30, -35, -50, 70, -50, 55, -30);
    quad(70, -50, 55, -30, 55, 30, 70, 5);
    line(-55, 0, 55, 0);
    line(55, 0, 70, -20);
    this.openSuitcase();
    

    noStroke();
    fill(0)
    textFont("Times New Roman");
   
    text(this.date, -46, 23);


    pop();
  }


  openSuitcase() {
    if (mouseIsPressed) {
      if (dist(mouseX, mouseY, this.x-27, this.y-3) < 20) {
        this.mouseClickedA = true;
      }
      if (dist(mouseX, mouseY, this.x+23, this.y-3) < 20) {
        this.mouseClickedB = true;
      }
    }
    
    if (this.mouseClickedA == false) {
      buttonBox(-27, -3);
    } else {
      open(-27, -3);
    }
    if (this.mouseClickedB == false) {
      buttonBox(23, -3);
    } else {
      open(23, -3);
    }
    if (this.mouseClickedA == true && this.mouseClickedB == true) {
      
      sceneIndex = 3;
      lastClickedSuitcaseIndex = this.idxInSuitcaseArray;
      console.log("last updated suitcaseIndex:",lastClickedSuitcaseIndex);
      
      this.mouseClickedA = false;
      this.mouseClickedB = false;
    }
  }
}

function checkIfEnter() {
  for (let i = 0; i < plusPos.length; i++) {
    if (dist(mouseX, mouseY, plusPos[i][0], plusPos[i][1]) < 10) {
      generateNew();
      lastClickedSuitcaseIndex = suitcaseObjects[i+1].idxInSuitcaseArray;
      sceneIndex = 2;
      clickIndex = i+1;
    }
  }
}

function mousePressed() {
  if (sceneIndex == 0) {
    if (dist(mouseX, mouseY, width / 2 - 170, height / 2 + 15) < 15) {
      sceneIndex = 1;
      console.log(sceneIndex);
    }
  } else if (sceneIndex == 1) {
    checkIfEnter();
  } else if (sceneIndex == 2 || sceneIndex == 3) {
    if (dist(mouseX, mouseY, 50, 40) < 50) {
      sceneIndex = 1;
      console.log(sceneIndex);
    }
  }

  if (sceneIndex == 2) {
      for (let i = 0; i < emojis.length; i++) {
        emojis[i].checkDrag();
      }

      if (dist(mouseX, mouseY, 175, 65) < 50) { // DONE

        console.log(clickIndex);

        suitcaseObjects[clickIndex].finished = true;
        let day = date.getDate(); 
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        suitcaseObjects[clickIndex].date = `${day}-${month}-${year}`;


  


    
          for (let i = 0; i < emojis.length ; i++) {
          if (
            !(
              (emojis[i].x > 420 &&
                emojis[i].x < 500 &&
                emojis[i].y > 180 &&
                emojis[i].y < 260) ||
              (emojis[i].x > 180 &&
                emojis[i].x < 260 &&
                emojis[i].y > 180 &&
                emojis[i].y < 260) ||
              (emojis[i].x > 300 &&
                emojis[i].x < 380 &&
                emojis[i].y > 180 &&
                emojis[i].y < 260) ||
              (emojis[i].x > 230 &&
                emojis[i].x < 310 &&
                emojis[i].y > 300 &&
                emojis[i].y < 380) ||
              (emojis[i].x > 370 &&
                emojis[i].x < 440 &&
                emojis[i].y > 300 &&
                emojis[i].y < 380)
            )
          ) {
            
            emojis.splice(i, 1);
            i--;
            
          } else {
    
            suitcaseObjects[lastClickedSuitcaseIndex].savedEmojis.push(emojis[i])
            console.log(suitcaseObjects[lastClickedSuitcaseIndex]);
            
          }
        }
        // if(saveCount < 5){
        //   // saveCanvas("mysuitcase_" + saveCount, "jpg");
        //   // savedCanvases.push(loadImage("mysuitcase_" + saveCount + ".jpg"))
        //   // saveCount ++;
        // }
        
      
    
        // // );
    
        // let day = date.getDate(); 
        // let month = date.getMonth() + 1;
        // let year = date.getFullYear();
        // currentDate = `${day}-${month}-${year}`;
        // textFont("Times New Roman");
        // fill(0);
        // textSize(8);
        // text(currentDate, suitcases[1].x -42, suitcases[1].y +30);
    
        // // if(suitcases[i].mouseClickedA == true && suitcases[i].mouseClickedB == true)
        // //   for (let j = 1; j < savedCanvases.length; j++) {
        // //     image(savedCanvases[j], 0, 0);
        // //   }
      }
    
  }
  

  
}


function mouseReleased(){
  if (sceneIndex == 2) {
    for (let i = 0; i < emojis.length; i++) {
      emojis[i].follow = false;
    }
  
}
}

function generateNew() {
  
  emojis = [];
  refillEmojiOptions();
  randomizeEmojis();
}

function randomizeEmojis() {
  while (emojis.length < numEmojis) {
    let x = random(80, width - 80);
    let y = random(130, height - 80);
    if (x > 130 && x < width - 130 && y > 150 && y < height - 100) {
      continue;
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

function drawFirstSuitcaseObj() {
  textSize(40);
  text("🧢", 200, 235);
  text("🩹", 320, 235);
  text("💄", 440, 235);
  text("💴", 250, 350);
  text("🧴", 390, 350);
}

function drawEmojiArea() {
  fill(255, 60);
  rect(180, 180, 80, 80);
  rect(300, 180, 80, 80);
  rect(420, 180, 80, 80);
  rect(230, 300, 80, 80);
  rect(370, 300, 80, 80);
}


function buttonBack(x, y) {
  push();
  translate(x, y);
  scale(1.5);
  stroke("red");
  rect(0, 0, 50, 25);
  pop();
}
function drawShelf() {
  // strokeWeight(2);
  // line(100, 0, 100, height - 80);
  // line(0, height, 100, height - 80);
  // line(100, height - 80, width, height - 80);
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

  for (let i = 0; i < suitcaseObjects.length; i++) {
    if(suitcaseObjects[i].finished == true){
      suitcaseObjects[i].displayExterior();
    }else{
      suitcaseObjects[i].showPlusSign();
      
    }
    
  } 
  
  // push();
  // noStroke();
  // fill(0);
  // // text(currentDate, suitcaseObjects[clickIndex].x -45, suitcaseObjects[clickIndex].y +25);
  // console.log(currentDate)
  // pop();

  // for (let i = 0; i < suitcases.length; i++) {
  //   if (suitcases[i]) {
  //     suitcases[i].displayExterior();
  //   } else {
  //     image(img2, plusPos[i][0], plusPos[i][1], 100, 100);
  //   }
  // }
  
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
}

function drawMan() {
  noStroke();
  fill(255);
  triangle(510, 140, 560, 80, 580, 120);
  ellipse(600, 97, 190, 150);

  strokeWeight(1);
  fill(0);
  let stringPart = sourceText.substring(0, idx);
  textSize(12);
  textWrap(CHAR);
  textAlign(LEFT, CENTER);
  text(stringPart, 530, 0, 150, 200);
  idx++;
  image(img1, 500, 300, 400, 400);
}

class train {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.mouseClicked = false;
  }
  update() {
    deg += 5;
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
    fill("white");
    circle(-170, 15, 5);

    //track
    strokeWeight(4);
    line(-width, 75, width, 75);
    //conductor
    textSize(35);
    text("👮🏻‍♂️", 180, 21);

    pop();
  }
}
function drawBg() {
  stroke(0);
  strokeWeight(3);
  fill(181, 155, 124);
  quad(50, 100, 650, 100, 750, 450, -50, 450);
  quad(150, 200, 550, 200, 600, 400, 100, 400);
  quad(0, 0, width, 0, 650, 100, 50, 100);
  line(50, 100, 150, 200);
  line(650, 100, 550, 200);
  line(750, 450, 600, 400);
  line(-50, 450, 100, 400);

  textSize(16);
  if (sceneIndex == 3) {
    buttonBack(50, 40);
    text("BACK", 65, 60);
  } else {
    buttonBack(50, 40);
    buttonBack(160, 40);
    text("BACK", 65, 65);
    text("DONE", 175, 65);
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

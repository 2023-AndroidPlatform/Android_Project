let mainMode = true;
let mode = 0;
let if_effect = 36;
let sounds = [];
let musicData = [];
let iconImage = [];
let resetButton;

function preload() {
  soundFormats("mp3", "ogg");
  for (var i = 0; i < 36; i++) {
    if (i < 36) sounds[i] = loadSound(`sound/piano${i}.mp3`);
    else sounds[i] = loadSound(`sound/effect${i}.mp3`);
  }
  // 불러오는 파일명 수정 필요
  // for (var j = 0; j < 36; j++){
  //   iconImage[j] = loadImage(`이미지폴더명/이미지이름${j}.확장자`)
  // }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  fill(255);
  stroke(220);
  strokeWeight(windowWidth / 300);
  for (var i = 0; i < 21; i++) {
    rect(i * width / 21, height - height / 3, width / 21, height / 3, 0, 0, 10, 10);
  }
  fill(0);
  for (var i = 0; i < 6; i++) {
    if (i % 4 != 2) {
      rect(width / 42 + i * width / 21, height - height / 3, width / 21, height / 6, 0, 0, 10, 10);
      rect(width / 42 + i * width / 21 + width / 3, height - height / 3, width / 21, height / 6, 0, 0, 10, 10);
      rect(width / 42 + i * width / 21 + (width / 3)*2, height - height / 3, width / 21, height / 6, 0, 0, 10, 10);
    }
  }
  reset();
  resetButton = createButton("RESET");
  resetButton.position(width*0.89, height*0.58);
  resetButton.mousePressed(reset);
}

function draw() {
  // 이미지파일로 변경
  for (var i = 0; i < musicData.length; i++){
    fill(0);
    ellipse(width*0.1 + i*(width*0.065), height*0.285, width*0.03, width*0.03);
  }
}

function changeMode_piano() {
  if (mouseY > windowHeight - height / 6) {
    for (var i = 0; i < 21; i++) {
      if (mouseX > i * width / 21 && mouseX < (i + 1) * width / 21) mode = i;
    }
  }
  if (mouseY < windowHeight - height / 6) {
    if (mouseX < width / 42) mode = 0;
    if (mouseX > width / 42 && mouseX < (width / 42) * 3) mode = 21;
    if (mouseX > (width / 42) * 3 && mouseX < (width / 42) * 5) mode = 22;
    if (mouseX > (width / 42) * 5 && mouseX < (width / 42) * 6) mode = 2;
    if (mouseX > (width / 42) * 6 && mouseX < (width / 42) * 7) mode = 3;
    if (mouseX > (width / 42) * 7 && mouseX < (width / 42) * 9) mode = 23;
    if (mouseX > (width / 42) * 9 && mouseX < (width / 42) * 11) mode = 24;
    if (mouseX > (width / 42) * 11 && mouseX < (width / 42) * 13) mode = 25;
    if (mouseX > (width / 42) * 13 && mouseX < (width / 42) * 14) mode = 6;
    if (mouseX > (width / 42) * 14 && mouseX < (width / 42) * 15) mode = 7;
    if (mouseX > (width / 42) * 15 && mouseX < (width / 42) * 17) mode = 26;
    if (mouseX > (width / 42) * 17 && mouseX < (width / 42) * 19) mode = 27;
    if (mouseX > (width / 42) * 19 && mouseX < (width / 42) * 20) mode = 9;
    if (mouseX > (width / 42) * 20 && mouseX < (width / 42) * 21) mode = 10;
    if (mouseX > (width / 42) * 21 && mouseX < (width / 42) * 23) mode = 28;
    if (mouseX > (width / 42) * 23 && mouseX < (width / 42) * 25) mode = 29;
    if (mouseX > (width / 42) * 25 && mouseX < (width / 42) * 27) mode = 30;
    if (mouseX > (width / 42) * 27 && mouseX < (width / 42) * 28) mode = 13;
    if (mouseX > (width / 42) * 28 && mouseX < (width / 42) * 29) mode = 14;
    if (mouseX > (width / 42) * 29 && mouseX < (width / 42) * 31) mode = 31;
    if (mouseX > (width / 42) * 31 && mouseX < (width / 42) * 33) mode = 32;
    if (mouseX > (width / 42) * 33 && mouseX < (width / 42) * 34) mode = 16;
    if (mouseX > (width / 42) * 34 && mouseX < (width / 42) * 35) mode = 17;
    if (mouseX > (width / 42) * 35 && mouseX < (width / 42) * 37) mode = 33;
    if (mouseX > (width / 42) * 37 && mouseX < (width / 42) * 39) mode = 34;
    if (mouseX > (width / 42) * 39 && mouseX < (width / 42) * 41) mode = 35;
    if (mouseX > (width / 42) * 41 && mouseX < (width / 42) * 42) mode = 20;
  }
}

function changeMode_soundEffect(){
  if (mouseY > windowHeight - height / 6) {
    for (var i = 0; i < 21; i++) {
      if (mouseX > i * width / 21 && mouseX < (i + 1) * width / 21) mode = i+if_effect;
    }
  }
  if (mouseY < windowHeight - height / 6) {
    if (mouseX < width / 42) mode = if_effect;
    if (mouseX > (width / 42) * 5 && mouseX < (width / 42) * 6) mode = 2+if_effect;
    if (mouseX > (width / 42) * 6 && mouseX < (width / 42) * 7) mode = 3+if_effect;
    if (mouseX > (width / 42) * 13 && mouseX < (width / 42) * 14) mode = 6+if_effect;
    if (mouseX > (width / 42) * 14 && mouseX < (width / 42) * 15) mode = 7+if_effect;
    if (mouseX > (width / 42) * 19 && mouseX < (width / 42) * 20) mode = 9+if_effect;
    if (mouseX > (width / 42) * 20 && mouseX < (width / 42) * 21) mode = 10+if_effect;
    if (mouseX > (width / 42) * 27 && mouseX < (width / 42) * 28) mode = 13+if_effect;
    if (mouseX > (width / 42) * 28 && mouseX < (width / 42) * 29) mode = 14+if_effect;
    if (mouseX > (width / 42) * 33 && mouseX < (width / 42) * 34) mode = 16+if_effect;
    if (mouseX > (width / 42) * 34 && mouseX < (width / 42) * 35) mode = 17+if_effect;
    if (mouseX > (width / 42) * 41 && mouseX < (width / 42) * 42) mode = 20+if_effect;
  }
}

function soundPlay() {
  if (mouseX < windowWidth && mouseY > windowHeight - height / 3 && mouseY < windowHeight) {
    if (mainMode == true) changeMode_piano();
    else changeMode_soundEffect();
    sounds[mode].play();
    sounds[mode].amp(1);
    if (musicData.length < 12){
      musicData.push(mode);
      console.log(musicData);
    }
  }
}

function mousePressed() {
  soundPlay();
}

function mouseReleased() {
  sounds[mode].amp(0, 1);
}

function reset(){
  noStroke()
  fill(210);
  rect(width *0.05+3, height/5+5, width * 0.82, height/6, 40);
  fill(230);
  rect(width *0.05, height/5, width * 0.82, height/6, 40);
  musicData.splice(0,musicData.length);
}
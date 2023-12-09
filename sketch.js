let mainMode = true;
let mode = 0;
let if_effect = 36;
let sounds = [];
let musicData = [];
let musicDataTime = [];
let iconImage = [];
let resetButton;
let testIcon;
let volumeSlider, bpmSlider;
let musicPlayButton;
let recorder, soundFile;
let delay = 0;

function preload() {
  soundFormats("mp3", "ogg");
  for (var i = 0; i < 57; i++) {
    if (i < 36) sounds[i] = loadSound(`sound/piano${i}.mp3`);
    else sounds[i] = loadSound(`sound/effect${i-if_effect}.mp3`);
  }
  // for (var j = 0; j < 21; j++){
  //   iconImage[j] = loadImage(`icons/icon${j}.png`);
  // }
  // testIcon = loadImage('icons/G.png');
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

  volumeSlider = createSlider(0,1,1,0.1);
  volumeSlider.position(width*0.9, 10);
  volumeSlider.size(width*0.08);

  bpmSlider = createSlider(0.4,0.8,0.6,0.2);
  bpmSlider.position(width*0.9, 30);
  bpmSlider.size(width*0.08);

  // test
  musicPlayButton = createButton("PLAY");
  musicPlayButton.position(0,0);
  musicPlayButton.mousePressed(musicPlay);
}

function draw() {
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
    console.log("지금 누른 번호는 "+mode);
    sounds[mode].play();
    sounds[mode].amp(volumeSlider.value());
    if (musicData.length < 12){
      musicData.push(mode);
      musicDataTime.push(bpmSlider.value());
      console.log("쌓인 데이터 "+musicData);
      console.log("데이터 재생 시간 "+musicDataTime);
      musicDataIcon();
    }
  }
}

function mousePressed() {
  soundPlay();
}

function mouseReleased() {
  sounds[mode].amp(0, bpmSlider.value());
  sounds[mode].stop(bpmSlider.value());
}

function reset(){
  noStroke()
  fill(210);
  rect(width *0.05+3, height/5+5, width * 0.82, height/6, 40);
  fill(230);
  rect(width *0.05, height/5, width * 0.82, height/6, 40);
  musicData.splice(0,musicData.length);
  musicDataTime.splice(0,musicDataTime.length);
}

function musicDataIcon(){
  // if (mainMode == true){
  //   image(testIcon, width*0.08 + (musicData.length-1)*(width*0.065), height*0.25, width*0.04, width*0.04);
  // }else{
  //   image(iconImage[mode-if_effect], width*0.08 + (musicData.length-1)*(width*0.065), height*0.25, width*0.04, width*0.04)
  // }
}

function musicPlay(){
  delay = 0;
  recorder = new p5.SoundRecorder();
  // 여기에 아무것도 안넣어서 오류뜸
  recorder.setInput();

  soundFile = new p5.SoundFile();

  recorder.record(soundFile);
  
  for (let i = 0; i < musicData.length; i++){
    sounds[musicData[i]].amp(volumeSlider.value());
    sounds[musicData[i]].play(delay);
    sounds[musicData[i]].stop(delay+musicDataTime[i]);
    console.log("play stop"+musicData[i]);
    delay = delay + musicDataTime[i];
  }

  recorder.stop();
}
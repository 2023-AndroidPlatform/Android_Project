let mainMode = true;
let mode = 0;
let pianoButton, effectButton, resetButton, musicPlayButton, downloadButton;
let if_effect = 36;
let sounds = [];
let musicData = [];
let musicDataTime = [];
let musicDataIconImg = [];
let keyboardImg = [];
let volumeImg, bpmImg;
let octaveImg = [];
let volumeSlider, bpmSlider;
let recorder, soundFile;
let delay = 0;
let playing = false;
let change = true;

function preload() {
  soundFormats("mp3", "ogg");
  for (var i = 0; i < 57; i++) {
    if (i < 36) sounds[i] = loadSound(`sound/piano${i}.mp3`);
    else sounds[i] = loadSound(`sound/effect${i - if_effect}.mp3`);

  }
  // musicData 아이콘
  for (var i = 0; i < 57; i++) {
    musicDataIconImg[i] = loadImage(`icons/icon${i}.png`);
  }
  // piano 위에 넣을 아이콘 - effect
  for (var i = 0; i < 21; i++) {
    keyboardImg[i] = loadImage(`pianoImg/img${i}.png`);
  }
  // piano 위에 넣을 아이콘 - 옥타브
  for (var i = 0; i < 3; i++) {
    octaveImg[i] = loadImage(`pianoImg/green${i}.png`);
  }
  // volume
  volumeImg = loadImage("buttons/volume.png");
  // bpm
  bpmImg = loadImage("buttons/bpm.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  drawPiano();
  f_keyboardImg();
  reset();

  resetButton = createImg("buttons/reset.png", "");
  resetButton.size(width * 0.1, height * 0.06);
  resetButton.position(width * 0.87, height * 0.58);
  resetButton.mousePressed(reset);

  image(volumeImg, width * 0.88, 20, width * 0.015, width * 0.015);
  volumeSlider = createSlider(0, 1, 1, 0.1);
  volumeSlider.position(width * 0.9, 20);
  volumeSlider.size(width * 0.08);

  image(bpmImg, width * 0.88, 60, width * 0.015, width * 0.015);
  bpmSlider = createSlider(0.4, 0.8, 0.6, 0.2);
  bpmSlider.position(width * 0.9, 60);
  bpmSlider.size(width * 0.08);

  musicPlayButton = createImg("buttons/play.png", "");
  musicPlayButton.size(width * 0.05, width * 0.05);
  musicPlayButton.position(width * 0.91, height * 0.24);
  musicPlayButton.mousePressed(function () {
    if (musicData.length > 0) musicPlay();
  });

  pianoButton = createImg("buttons/piano1.png", "");
  pianoButton.size(width * 0.1, height * 0.065);
  pianoButton.position(width * 0.03, height * 0.57);
  pianoButton.mousePressed(function () {
    soundPlay((mainMode = true));
    buttonChange((change = true));
    f_keyboardImg();
  });
  effectButton = createImg("buttons/effect0.png", "");
  effectButton.size(width * 0.18, height * 0.065);
  effectButton.position(width * 0.15, height * 0.57);
  effectButton.mousePressed(function () {
    soundPlay((mainMode = false));
    buttonChange((change = false));
    f_keyboardImg();
  });

  downloadButton = createImg("buttons/download.png", "");
  downloadButton.size(width * 0.15, height * 0.06);
  downloadButton.position(width * 0.058, height * 0.1);
  downloadButton.mousePressed(download);
}

function draw() {}

function drawPiano() {
  fill(255);
  stroke(220);
  strokeWeight(windowWidth / 300);
  for (var i = 0; i < 21; i++) {
    rect(
      (i * width) / 21,
      height - height / 3,
      width / 21,
      height / 3,
      0,
      0,
      10,
      10
    );
    rect(
      (i * width) / 21,
      height - height / 3,
      width / 21,
      height / 3,
      0,
      0,
      10,
      10
    );
  }
  fill(0);
  for (var i = 0; i < 6; i++) {
    if (i % 4 != 2) {
      rect(
        width / 42 + (i * width) / 21,
        height - height / 3,
        width / 21,
        height / 6,
        0,
        0,
        10,
        10
      );
      rect(
        width / 42 + (i * width) / 21 + width / 3,
        height - height / 3,
        width / 21,
        height / 6,
        0,
        0,
        10,
        10
      );
      rect(
        width / 42 + (i * width) / 21 + (width / 3) * 2,
        height - height / 3,
        width / 21,
        height / 6,
        0,
        0,
        10,
        10
      );
      rect(
        width / 42 + (i * width) / 21,
        height - height / 3,
        width / 21,
        height / 6,
        0,
        0,
        10,
        10
      );
      rect(
        width / 42 + (i * width) / 21 + width / 3,
        height - height / 3,
        width / 21,
        height / 6,
        0,
        0,
        10,
        10
      );
      rect(
        width / 42 + (i * width) / 21 + (width / 3) * 2,
        height - height / 3,
        width / 21,
        height / 6,
        0,
        0,
        10,
        10
      );
    }
  }
}

function changeMode_piano() {
  if (mouseY > windowHeight - height / 6) {
    for (var i = 0; i < 21; i++) {
      if (mouseX > (i * width) / 21 && mouseX < ((i + 1) * width) / 21)
        mode = i;
      if (mouseX > (i * width) / 21 && mouseX < ((i + 1) * width) / 21)
        mode = i;
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

function changeMode_soundEffect() {
  if (mouseY > windowHeight - height / 6) {
    for (var i = 0; i < 21; i++) {
      if (mouseX > (i * width) / 21 && mouseX < ((i + 1) * width) / 21)
        mode = i + if_effect;
      if (mouseX > (i * width) / 21 && mouseX < ((i + 1) * width) / 21)
        mode = i + if_effect;
    }
  }
  if (mouseY < windowHeight - height / 6) {
    if (mouseX < width / 42) mode = if_effect;
    if (mouseX > (width / 42) * 5 && mouseX < (width / 42) * 6)
      mode = 2 + if_effect;
    if (mouseX > (width / 42) * 6 && mouseX < (width / 42) * 7)
      mode = 3 + if_effect;
    if (mouseX > (width / 42) * 13 && mouseX < (width / 42) * 14)
      mode = 6 + if_effect;
    if (mouseX > (width / 42) * 14 && mouseX < (width / 42) * 15)
      mode = 7 + if_effect;
    if (mouseX > (width / 42) * 19 && mouseX < (width / 42) * 20)
      mode = 9 + if_effect;
    if (mouseX > (width / 42) * 20 && mouseX < (width / 42) * 21)
      mode = 10 + if_effect;
    if (mouseX > (width / 42) * 27 && mouseX < (width / 42) * 28)
      mode = 13 + if_effect;
    if (mouseX > (width / 42) * 28 && mouseX < (width / 42) * 29)
      mode = 14 + if_effect;
    if (mouseX > (width / 42) * 33 && mouseX < (width / 42) * 34)
      mode = 16 + if_effect;
    if (mouseX > (width / 42) * 34 && mouseX < (width / 42) * 35)
      mode = 17 + if_effect;
    if (mouseX > (width / 42) * 41 && mouseX < (width / 42) * 42)
      mode = 20 + if_effect;
    if (mouseX > (width / 42) * 5 && mouseX < (width / 42) * 6)
      mode = 2 + if_effect;
    if (mouseX > (width / 42) * 6 && mouseX < (width / 42) * 7)
      mode = 3 + if_effect;
    if (mouseX > (width / 42) * 13 && mouseX < (width / 42) * 14)
      mode = 6 + if_effect;
    if (mouseX > (width / 42) * 14 && mouseX < (width / 42) * 15)
      mode = 7 + if_effect;
    if (mouseX > (width / 42) * 19 && mouseX < (width / 42) * 20)
      mode = 9 + if_effect;
    if (mouseX > (width / 42) * 20 && mouseX < (width / 42) * 21)
      mode = 10 + if_effect;
    if (mouseX > (width / 42) * 27 && mouseX < (width / 42) * 28)
      mode = 13 + if_effect;
    if (mouseX > (width / 42) * 28 && mouseX < (width / 42) * 29)
      mode = 14 + if_effect;
    if (mouseX > (width / 42) * 33 && mouseX < (width / 42) * 34)
      mode = 16 + if_effect;
    if (mouseX > (width / 42) * 34 && mouseX < (width / 42) * 35)
      mode = 17 + if_effect;
    if (mouseX > (width / 42) * 41 && mouseX < (width / 42) * 42)
      mode = 20 + if_effect;
  }
}

function soundPlay() {
  if (
    mouseX < windowWidth &&
    mouseY > windowHeight - height / 3 &&
    mouseY < windowHeight
  )
    if (
      mouseX < windowWidth &&
      mouseY > windowHeight - height / 3 &&
      mouseY < windowHeight
    ) {
      if (mainMode == true) changeMode_piano();
      else changeMode_soundEffect();
      sounds[mode].play();
      sounds[mode].amp(volumeSlider.value());
      if (musicData.length < 12) {
        musicData.push(mode);
        musicDataTime.push(bpmSlider.value());
        f_musicDataIconImg();
        console.log(musicData);
        console.log(musicDataTime);
      }
    }
}

function mousePressed() {
  soundPlay();
}

function mouseReleased() {
  if (mode < 57){
    sounds[mode].amp(0, bpmSlider.value());
    sounds[mode].stop(bpmSlider.value());
  }
}

function reset() {
  noStroke();
  fill(210);
  rect(width * 0.05 + 3, height / 5 + 5, width * 0.82, height / 6, 40);
  fill(230);
  rect(width * 0.05, height / 5, width * 0.82, height / 6, 40);
  musicData.splice(0, musicData.length);
  musicDataTime.splice(0, musicDataTime.length);
}

function download() {
  soundFile.play();
  saveSound(soundFile, 'mySound');
}

function f_musicDataIconImg() {
  if (mainMode == true) {
    image(
      musicDataIconImg[mode],
      width * 0.08 + (musicData.length - 1) * (width * 0.065),
      height * 0.24,
      width * 0.05,
      width * 0.05
    );
  } else {
    image(
      musicDataIconImg[mode],
      width * 0.08 + (musicData.length - 1) * (width * 0.065),
      height * 0.24,
      width * 0.05,
      width * 0.05
    );
  }
}

function playButtonChange() {
  if (playing == true) {
    musicPlayButton.attribute("src", "buttons/stop.png");
  } else {
    musicPlayButton.attribute("src", "buttons/play.png");
  }
}

function musicPlay() {
  mode = 100;
  if (playing == false) {
    playing = true;
    playButtonChange();
    delay = 0;

    recorder = new p5.SoundRecorder();
    recorder.setInput();
    soundFile = new p5.SoundFile();
    recorder.record(soundFile);

    for (let i = 0; i < musicData.length; i++) {
      sounds[musicData[i]].amp(volumeSlider.value());
      sounds[musicData[i]].play(delay);
      sounds[musicData[i]].stop(delay + musicDataTime[i]);
      delay = delay + musicDataTime[i];
    }

    // recorder.stop();
    // if (음악 재생이 끝났다면){
    //   playing = false;
    //   playButtonChange();
    // }
  } else {
    playing = false;
    playButtonChange();
    recorder.stop();
    for (let i = 0; i < musicData.length; i++) {
      sounds[musicData[i]].stop();
    }
  }
}

function buttonChange() {
  drawPiano();
  if (change == true) {
    pianoButton.attribute("src", "buttons/piano1.png");
    effectButton.attribute("src", "buttons/effect0.png");
  } else {
    pianoButton.attribute("src", "buttons/piano0.png");
    effectButton.attribute("src", "buttons/effect1.png");
  }
}

function f_keyboardImg() {
  if (change == true) {
    for (var i = 0; i < octaveImg.length; i++) {
      image(
        octaveImg[i],
        i * (width / octaveImg.length) + 7,
        height - height / 8,
        width / 26,
        height / 14
      );
    }
  } else {
    for (var i = 0; i < keyboardImg.length; i++) {
      image(
        keyboardImg[i],
        i * (width / keyboardImg.length) + 7,
        height - height / 8,
        width / 28,
        height / 15
      );
    }
  }
}

// http://bilimneguzellan.net/en/purrier-series-meow-and-making-images-speak/
// https://stackoverflow.com/questions/5300938/calculating-the-position-of-points-in-a-circle

let PI = 3.1418
let radians = 0
let circle_x = 200
let circle_y = 200
let waves = []
let eyes_below = []
let eyes_upper = []
let Hz = 1
let Fs = 60 //sample rate
let radian_step = 2*PI/(Fs/Hz)
let Hz_acc = 0
let L = 2*PI

let previous_sin = 0
let previous_cos = 0

function setup(){
  createCanvas(800,500)
  sliderN = createSlider(1, 30, 3);
  sliderHz = createSlider(.3, 2, .3,.1);
}

function draw(){
  background(0);
  fill(0,0,0,0);
  c_x = circle_x
  c_y = circle_y
  for(let i=0;i<sliderN.value();i++){
    let n = i * 2 + 1;
    prev_x = c_x
    prev_y = c_y
    radius = 75 * (4 / (n * PI));
    c_x += radius * cos(n * radians);
    c_y += radius * sin(n * radians);
    
    stroke(120);
    circle(prev_x,prev_y,radius*2);
    stroke(255);
    circle(c_x,c_y,10);
    line(prev_x,prev_y,c_x,c_y);
    
    prev_x = c_x
    prev_y = c_y
  }

  waves.unshift(c_y);
  beginShape();
  fill(255);
  for(let i=0;i<waves.length;i++){
    vertex(i + 400, waves[i]);
  }
  endShape()

  if(previous_cos * cos(radians) < 0 && sin(radians) > 0){
    eyes_below.unshift(420)
  }
  if(previous_sin * sin(radians) < 0 && cos(radians) > 0){
    eyes_upper.unshift(450)
  }
  previous_sin = sin(radians)
  previous_cos = cos(radians)
  for(let i=0; i < eyes_below.length; i++){
    stroke(0)
    fill(0)
    circle(eyes_below[i], 230, 10)
    circle(eyes_below[i]-35, 230, 10)
    eyes_below[i] += 1
  }
  for(let i=0; i < eyes_upper.length; i++){
    stroke(0)
    fill(0)
    circle(eyes_upper[i], 180, 10)
    circle(eyes_upper[i]-35, 180, 10)
    eyes_upper[i] += 1
  }
  stroke(255)
  line(c_x, c_y, 400, waves[0]);

  fill(255);
  text('Fourier Series N = '+sliderN.value(), 10, 30);

  Hz = sliderHz.value()
  text('Hz = ' + Hz, 10, 60);
  radian_step = 2*PI/(Fs/Hz)

  radians += radian_step;
}

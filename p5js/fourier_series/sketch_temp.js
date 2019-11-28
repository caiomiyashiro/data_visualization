var buffer;
var result;
var table_rows;
var table;
var index=0;
const N_COMP = 500
let X = []
let signal = []

function preload() {
  table = loadTable('data.csv', 'csv');
}

function setup(){
  createCanvas(2000,1500)

  table_rows = table.getRowCount();
  for(let i=0; i<table_rows; i++){
    let real = table.getNum(i,0)
    let img = table.getNum(i,1)
    
    let freq = i
    let radius = sqrt(real*real + img*img)
    let phase = atan2(img,real)
    
    X[i] = {freq, radius, phase}
  }
  console.log(X)
    
}

function draw(){
  background(0)
  translate(500,300)
  let x = 0;
  let y = 0;
  for(let i = 0; i < N_COMP; i++){
    let prevx = x;
    let prevy = y;

    x += X[i].radius/2 * cos(X[i].freq * index + X[i].phase)
    y += X[i].radius/2 * sin(X[i].freq * index + X[i].phase)

    stroke(255,100);
    noFill();
    ellipse(prevx, prevy, X[i].radius);

    stroke(255);
    line(prevx, prevy, x, y);
  }
  signal.unshift({x, y});
  beginShape();
  for(let i=0;i<signal.length;i++){
    vertex(signal[i].x, signal[i].y);
  }
  endShape()

  const dt = 0.1
  index += dt
}
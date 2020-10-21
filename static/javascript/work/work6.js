let angle = 0;
let w = 125;
let cols;
let rows;
let curves = [];

function setup() {
  var canvas = createCanvas(2000, 1000);
  canvas.parent('canvasContainer1');
  // translate(width/2, height/2)

  cols = width / w - 1;
  rows = height / w - 1;


  for (let j = 0; j < rows; j++) {
    curves[j] = [];

    for (let i = 0; i < cols; i++) {
      curves[j][i] = new Curve();
      //클래스 불러오기
    }
  }
  
  noLoop();
}

function draw() {
  background(255);

  //원의 좌표와 반경 설정 
  let d = w - 0.2 * w;
  let r = d / 2;

  fill(0, 123, 255);
  noStroke();
  ellipse(50, 50, 80, 80);

  //세로선 그리기 
  noFill();
  stroke(0);
  for (let i = 0; i < cols; i++) {
    let cx = w + i * w + w / 2;
    let cy = w / 2;
    strokeWeight(1);
    stroke(0, 123, 255, 150);
    ellipse(cx, cy, d, d);
    let x = r * cos(angle * (i + 1) - HALF_PI);
    let y = r * sin(angle * (i + 1) - HALF_PI);
    strokeWeight(6);
    stroke(0, 123, 255);
    point(cx + x, cy + y);

    stroke(0, 123, 255, 150);
    strokeWeight(1);
    line(cx + x, 0, cx + x, height);

    for (let j = 0; j < rows; j++) {
      curves[j][i].setX(cx + x);
      //class Curve의 setX 함수 실행 
    }
  }

  //가로선 그리기
  noFill();
  stroke(0);
  for (let j = 0; j < rows; j++) {
    let cx = w / 2;
    let cy = w + j * w + w / 2;
    strokeWeight(1);
    stroke(0, 123, 255, 150);
    ellipse(cx, cy, d, d);
    let x = r * cos(angle * (j + 1) - HALF_PI);
    let y = r * sin(angle * (j + 1) - HALF_PI);
    strokeWeight(6);
    stroke(0, 123, 255);
    point(cx + x, cy + y);
    stroke(0, 123, 255, 150);
    strokeWeight(1);
    line(0, cy + y, width, cy + y);

    for (let i = 0; i < cols; i++) {
      curves[j][i].setY(cy + y);
      //class Curve의 setY 함수 실행 
    }
  }

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      curves[j][i].addPoint();
      curves[j][i].show();
    }
  }

  angle -= 0.0025;

  if (angle < -TWO_PI) {
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        curves[j][i].reset();
      }
    }

    angle = 0;
    noLoop();
  }
}

function mouseMoved() {
  redraw();
}
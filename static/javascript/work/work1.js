
// center point
var centerX = 0.0, centerY = 0.0;

var radius = 600, rotAngle = -90;
var accelX = 0.0, accelY = 0.0;
var deltaX = 0.0, deltaY = 0.0;
var springing = 0.0009, damping = 0.98;

//corner nodes
var nodes = 5;

//zero fill arrays
var nodeStartX1 = [];
var nodeStartY1 = [];
var nodeX1 = [];
var nodeY1 = [];

var nodeStartX2 = [];
var nodeStartY2 = [];
var nodeX2 = [];
var nodeY2 = [];

var nodeStartX3 = [];
var nodeStartY3 = [];
var nodeX3 = [];
var nodeY3 = [];

var angle = [];
var frequency = [];

// soft-body dynamics
var organicConstant = 1.0;


function setup() {
  var W = windowWidth;
  var H = windowHeight;
  var canvas = createCanvas(windowWidth, windowWidth/2);
  canvas.parent('canvasContainer1');

  //center shape in window
  centerX = width/2;
  centerY = height/2;

  //initialize arrays to 0
  for (var i=0; i<nodes; i++){
    nodeStartX1[i] = 0;
    nodeStartY1[i] = 0;
    nodeY1[i] = 0;
    nodeY1[i] = 0;

    nodeStartX2[i] = 0;
    nodeStartY2[i] = 0;
    nodeY2[i] = 0;
    nodeY2[i] = 0;   

    nodeStartX3[i] = 0;
    nodeStartY3[i] = 0;
    nodeY3[i] = 0;
    nodeY3[i] = 0;   
    angle[i] = 0;
  }

  // iniitalize frequencies for corner nodes
  for (var i=0; i<nodes; i++){
    frequency[i] = random(4, 12);
  }

  noStroke();
  frameRate(60);
}

function draw() {
  clear();
  background(255);
  //fade background
  fill(0, 0);
  rect(0,0,width, height);
  drawShape();
  moveShape();
}

function drawShape() {
  //  calculate node  starting locations

  p1 = map(mouseX, 0, width, -100, -200);
  p2 = map(mouseY, 0, height, 100, 200);

  for (var i=0; i<nodes; i++){
    nodeStartX1[i] = centerX+cos(radians(rotAngle))*radius;
    nodeStartY1[i] = centerY+sin(radians(rotAngle))*radius;
    nodeStartX2[i] = p1+centerX+cos(radians(rotAngle))*(radius/2);
    nodeStartY2[i] = p1+centerY+sin(radians(rotAngle))*(radius/2);
    nodeStartX3[i] = p2+centerX+sin(radians(rotAngle))*(radius/2.5);
    nodeStartY3[i] = p2+centerY+cos(radians(rotAngle))*(radius/2.5);
    rotAngle += 360.0/nodes;
  }

  // draw polygon1
  curveTightness(organicConstant);
  var x = map(mouseX, 0, width, 70, 150);
  fill(0,x,255);

  beginShape();
  for (var i=0; i<nodes; i++){
    curveVertex(nodeX1[i], nodeY1[i]);
  }
  for (var i=0; i<nodes-1; i++){
    curveVertex(nodeX1[i], nodeY1[i]);
  }
  endShape(CLOSE);
  // 2
  curveTightness(organicConstant);
  var y = map(mouseX, 0, width, 80, 110);
  fill(255, y, 71);

  beginShape()
  for (var i=0; i<nodes; i++){
    curveVertex(nodeX2[i], nodeY2[i]);
  }
  for (var i=0; i<nodes-1; i++){
    curveVertex(nodeX2[i], nodeY2[i]);
  }
  endShape(CLOSE);
  // 3
  curveTightness(organicConstant);
  var z = map(mouseX, 0, width, 120, 160);
  fill(255, y, 0);

  beginShape()
  for (var i=0; i<nodes; i++){
    curveVertex(nodeX3[i], nodeY3[i]);
  }
  for (var i=0; i<nodes-1; i++){
    curveVertex(nodeX3[i], nodeY3[i]);
  }
  endShape(CLOSE);
}

function moveShape() {
  //move center point
  deltaX = mouseX-centerX;
  deltaY = mouseY-centerY;

  // create springing effect
  deltaX *= springing;
  deltaY *= springing;
  accelX += deltaX;
  accelY += deltaY;

  // move predator's center
  centerX += accelX;
  centerY += accelY;

  // slow down springing
  accelX *= damping;
  accelY *= damping;

  // change curve tightness
  organicConstant = 1-((abs(accelX)+abs(accelY))*0.1);

  //move nodes
  for (var i=0; i<nodes; i++){
    nodeX1[i] = nodeStartX1[i]+sin(radians(angle[i]))*(accelX*2);
    nodeY1[i] = nodeStartY1[i]+sin(radians(angle[i]))*(accelY*2);
    nodeX2[i] = nodeStartX2[i]+sin(radians(angle[i]))*(accelX*2);
    nodeY2[i] = nodeStartY2[i]+sin(radians(angle[i]))*(accelY*2);
    nodeX3[i] = nodeStartX3[i]+sin(radians(angle[i]))*(accelX*2);
    nodeY3[i] = nodeStartY3[i]+sin(radians(angle[i]))*(accelY*2);
    angle[i] += frequency[i];
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowWidth);
}



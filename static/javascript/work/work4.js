var oldAngle=-100, oldDist, pas;
var n=10;
var see=false;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvasContainer1');
  //smooth();
  pas=TWO_PI/60; 
  background(255);
  strokeWeight(2);
  //stroke(random(0,255),random(0,255),random(0,255),100);
}

function draw() {
  stroke(0,random(100,150),255, 145);
  if (mouseIsPressed) { 
    var an=atan2(mouseY-height/3, mouseX-width/3); 
    var d=dist(mouseX, mouseY, width/2, height/2); 
    if (oldAngle != -100) {
       translate(width/2, height/2);
      for (var a=0; a<TWO_PI; a+=pas) {
        line(sin(oldAngle+a)*oldDist, cos(oldAngle+a)*oldDist, sin(an+a)*d, cos(an+a)*d);
      }
    }
    oldAngle = an;
    oldDist=d; 
 } else {
  oldAngle=-100;
 }
}

function mouseMoved() { 
  oldAngle=atan2(mouseY-height/2, mouseX-width/2); 
  oldDist=dist(mouseX, mouseY, width/2, height/2);
}

function keyReleased() {
  if (key=='+') {
    n++;
  } else if (key=='-') {
    n--;
  } else if (keyCode==10) { 
    background(255);
  }
    n=constrain(n, 1, 200);
    pas=TWO_PI/n;
}
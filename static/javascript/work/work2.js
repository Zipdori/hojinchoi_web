var n = 1;
var c = 13;
var i = 0;

function setup(){
  // createCanvas(1000, 1000);

  var canvas = createCanvas(windowWidth, windowWidth/2);
  canvas.parent('canvasContainer1');

	angleMode(DEGREES);
	colorMode(RGB);
	background(255);
	
}

function draw(){

	// fill(255);
	// noStroke();
	// ellipse(width/2, height/2, 50, 50);

	var a = n * 137.3;
	// var a = n * z;
	var r = c * sqrt(n);

	var x = r * cos(a) + width/2;
  var y = r * sin(a) + height/2;	
  
  if (i<10){
    var z = 0;
  } else {
    var z = map(mouseX, 0, width, 1, 10);
  }
	fill( 0, (a-r)%123, 255, (a-r)%255);

	noStroke();
  ellipse(x, y, z, z);
  
  n++;
  i++;
}
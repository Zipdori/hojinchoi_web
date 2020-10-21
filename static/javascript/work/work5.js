var t = 0; //시간값을 설정 

function setup() {
  var canvas = createCanvas(windowWidth, windowWidth/2);
  canvas.parent('canvasContainer1');
  
  noStroke();
}

function draw() {
  alpha = map(mouseX, 0, width, 50, 150);
  background(255, 100); // translucent background (creates trails)

  // make a x and y grid of ellipses
  for (var x = 0; x <= width; x += 40) {
    for (var y = 0; y <= height; y += 40) {
      // starting point of each circle depends on mouse position
      var xAngle = map(mouseX, 0, width, -3 * PI, 3 * PI);
      var yAngle = map(mouseY, 0, height, -3 * PI, 3 * PI);
      // and also varies based on the particle's location
      var angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      var myX = x + 30 * sin(2 * PI * t + angle);
      var myY = y + 30 * cos(2 * PI * t + angle);

      if (mouseX < width/4 || mouseX > 3*width/4){
        fill(0, 123, 255);
        ellipse(myX, myY, 4);
      } else {
        fill(255, 99, 71);
        ellipse(myX, myY, 4);
      }
      // fill(0, 123, 255);
      // ellipse(myX, myY, 4); // draw particle
      // fill(255, 99, 71);
      // ellipse(myX, myY, 4);
    }
  }

  t = t + 0.005; // update time
}

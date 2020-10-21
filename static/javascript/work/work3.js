var bg;

const COL = createCols("https://coolors.co/007bff-ff6347-2894ff-ff8e6e-77c7ff-ffa482");

function setup() {
  var canvas = createCanvas(windowWidth, windowWidth/2);
  canvas.parent('canvasContainer1');
  
  frameRate(60);
  background(255);
  // 새로운 캔버스를 만들어낸다고 생각하면 됨. width, height만큼의 새로운 제 2의 캔버스.
  bg = createGraphics(width, width/2);
  // 캔버스 내에서 투명도를 주기 위해 임의의 레이어를 계속 쌓는 과정
  bg.background(255,40);
  bg.noStroke();
  for (var i = 0; i < 300000; i++) {
    var x = random(width);
    var y = random(height);
    // let s = noise(x*0.01, y*0.01)*2;
    // bg.fill(240, 50);
    // bg.rect(x, y, s, s);
  } 
  // 30만번동안 계속 랜덤한 x, y좌표 생성 
}

function draw() {
	randomSeed(50);
	noStroke();
	for(var i = 0; i < 30; i++){
    fill(COL[int(random(COL.length))]);
    // Array의 길이를 랜덤값으로 받아 난수 생성, 이를 정수형으로 받고, Col에 있는 랜덤 요소를 꺼냄 ~ 랜덤한 색채값 
    var s = random(10,50)* (random(1,2)+( sin(frameCount/100+random(50))+1 )*0.5);
    // 랜덤 10-50 사이 곱하기, 60프레임을 나눈 값에 정수를 랜덤으로 더한 뒤, 이를 삼각함수 사인으로 변환, 일정 주기를 따름.
    // 원의 크기로 됨 
    var x = (random(width)+frameCount*random(1,5))%(width + s) -s;
    // 주기에 따라 랜덤한 값을 갖는 이들 요소가 좌표가 되어, 사인함수의 틀을 따라가며 위치에 있어 랜덤성을 가짐 
		var y = (random(height)+sin(frameCount/random(40, 60))*height*random(0.2,1) + height)%(height+s)-s;
		ellipse(x, y, s, s);
	}
  image(bg,0,0);
  //0, 0 좌표에 배경을 그린다.
}

function createCols(_url)
{
  var index = _url.lastIndexOf('/');
  var pallate = _url.slice(index + 1);
  var arr = pallate.split('-');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}
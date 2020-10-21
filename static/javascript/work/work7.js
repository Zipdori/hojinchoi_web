let MAX_INIT_SIZE,MAX_ANGLE_STEP, SIZE_MULT, MIN_SIZE;
let initSize, initAngle, initColIndex;
let url = "https://coolors.co/007bff-ff6347-2894ff-ff8e6e-77c7ff-ffa482";
let cols;

function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	noStroke();
	cols = createCols(url);
	//init param
	MAX_INIT_SIZE = max(width,height)*1.5;
	MAX_ANGLE_STEP = PI/20;
	SIZE_MULT = 0.85;
	MIN_SIZE = 2;
	initSize = MAX_INIT_SIZE;
	initAngle = 0;
	initColIndex = 0;
}

function draw() {
	background(100);
	
	let count = sin(frameCount/150);
	let angleStep =MAX_ANGLE_STEP * count;
	let colIndex = initColIndex;
	let size = initSize;
	let angle = initAngle;
	
	while(size > 2)
	{
		push();
			translate(width/2,height/2);
			rotate(angle);
			fill(cols[colIndex % cols.length]);

			rect(0,0,size,size, size*0.4);
		pop();
		
		angle += angleStep * map(size, MIN_SIZE, MAX_INIT_SIZE, 1, 0, false);
		//angleStep은 count(프레임카운트에 따라 변화됨)에 따라 변화되므로, 이는 매핑 함수를 통해 반환된
		//1과 0 사이에 곱해져 angle이 출력됨
		//이 angle은 rotate 함수의 파라미터가 되어서 while 반복문 내에서 지속적으로 반복됨.
		size*= SIZE_MULT;
		//SIZE_MULT는 1 미만의 값이므로, 점차 줄어든다.
		//따라서 그려진 사각형 역시 크기가 줄어들 것이다.
		//따라서 반복문에서 size가 2가 되기 전까지 이 도형이 계속 반복되며, rotate가 됨.
		
		colIndex ++;
		//색깔이 한 차례씩 바뀜. 인덱스를 1씩 증가. 
	}
	
	initSize -= MAX_INIT_SIZE*0.002*(1 +abs(count));
	initAngle += angleStep*0.25;
	//while반복문이 끝난 뒤에는, initAngle(초기 각도값)을 변화시킴
	
	if(initSize < MAX_INIT_SIZE*SIZE_MULT)
	{
		initSize/=SIZE_MULT;
		initColIndex = (initColIndex + cols.length -1)%cols.length;
		//회전이 끝난 뒤에는, 역순으로 다시 회전하는 과정.
	}
}


function createCols(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}



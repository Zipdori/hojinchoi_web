class Curve {
    //자바스크립트에서 클래스를 정의할때, 초기 설정을 constructor로 설정.
    constructor() {
      this.path = [];
      this.current = createVector();
    }
  
    setX(x) {
      this.current.x = x;
      //vector값 생성, 즉 x좌표의 정포를 여기에 담아내는 것
    }
  
    setY(y) {
      this.current.y = y;
      //y좌표를 담아낸다.
    }

    //setX, setY는 current라는 벡터에 
    //x, y 좌표를 담아내는 것임.
  
    addPoint() {
      this.path.push(this.current);
      //path라는 ArrayList에, [x,y]
      //즉 path = [ [x1, y1], [x2, y2], [x3, y3] ... ]
    }
  
    reset() {
      this.path = [];
      //path에 담긴 벡터 정보를 초기화한다.
    }
  
    show() {
      stroke(0, 123, 255, 150);
      strokeWeight(1);
      noFill();
        //곡선 그리기
      beginShape();
      for (let i = 0; i < this.path.length; i++) {
        const v = this.path[i];
        vertex(v.x, v.y);
      }
      endShape();
  
      strokeWeight(6);
      point(this.current.x, this.current.y);
      this.current = createVector();
    }
  }
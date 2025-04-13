class Circle {
    constructor(radius) {
        this._radius = radius;//내부에 있는 변수를 _로 사용하는 경향잇음 
    }

    //객체 안의 변수에는 접근이 안되니까 setter/getter를 통해서 내부 변수에 접근한다

    get diameter() {
        return this._radius*2;
    }
    set diameter(diameter) {
        this._radius = diameter/2;
    }
}

const myCircle = new Circle(5);
console.log(myCircle.diameter)

myCircle.diameter = 14;
console.log(myCircle._radius) // 내부변수에 직접 접근 하는건 좋은 방식이아님, 
                              // radius에 diameter가 잘 저장 되어있는지 확인
console.log(myCircle.diameter)

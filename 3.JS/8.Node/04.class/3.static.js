class Mathops{
    static add(a,b) {
        return a+ b;
    }
    static sub(a,b) {
        return a-b;
    }
}

//const myMathops = new Mathops();
//객체를 이렇게 찍어내지 않고 수학연산을 위한 객체를 만든거라 공통 함수 제공이 목적임

const sum = Mathops.add(2,3);
console.log(sum);
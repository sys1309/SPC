class Car {
    //let make = ''; 
    //let model = ''; 

    constructor(make, model) { //일종의 초기화 함수
        this.make = make; //객체의 내부 변수(속성=property)에 저장
        this.model = model;
    };
    drive(){
        return `${this.make} ${this.model} is driving...`
    }
    dooropen(){
        return `${this.make} ${this.model} is opening...`
    }

    doorclose(){
        return `${this.make} ${this.model} is closing...`
    }
}

const myCar = new Car('현대', 'k5');
console.log(myCar.drive());
const mynewCar = new Car('테슬라', '모델5');


console.log(typeof myCar);
console.log(myCar instanceof Error); //false
console.log(myCar instanceof Car); // true

console.log(myCar)

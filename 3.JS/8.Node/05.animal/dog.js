const Animal = require('./Animal');

class Dog extends Animal{// 이걸 상속(inheritance)라고 부름
    makeSound(){ //함수의 오버라이딩
                 //부모 함수를 그대로 쓸수도 있고, 재정의 할수도 있음
        return '멍멍';
    }
}

module.exports = Dog;
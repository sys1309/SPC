class Animal{
    constructor(name) {
        this.name = name;
    }

    makeSound() {
        return '아무소리냄';
    }
}

class Dog extends Animal{// 이걸 상속(inheritance)라고 부름
    makeSound(){ //함수의 오버라이딩
                 //부모 함수를 그대로 쓸수도 있고, 재정의 할수도 있음
        return '멍멍';
    }
}

class Cat extends Animal{
    makeSound() {
        return `${this.name} 야옹`
    }
}
const aAnimal = new Animal('dolly')
const aSound = aAnimal.makeSound();
console.log(aSound);

const aDog = new Dog('charlie');
const aDogSound = aDog.makeSound();
console.log(aDogSound);

const bDog = new Dog('brown');
const bDogSound = bDog.makeSound();
console.log(bDogSound);

const aCat = new Cat('kitty');
const aCatSound = aCat.makeSound();
console.log(aCatSound);
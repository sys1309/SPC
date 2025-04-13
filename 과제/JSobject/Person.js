class Person {
    constructor(name){
        this.name = name
    }
    greeting(){
        return `안녕하세요, 저는 ${this.name} 입니다.`
    }
    }

module.exports = Person;

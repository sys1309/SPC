class Person {
    constructor(name){ //필수값으로 넣어야하는 것 필수인자 
        this.name = name
    }
    greeting(){
        return `안녕하세요, 저는 ${this.name} 입니다.`
    }
    }

module.exports = Person;



// class Person2 {
//     let name = ""
//     greeting(){
//         return `안녕하세요, 저는 ${this.name} 입니다.`
//     }
//     }

// const john = new Person2();
// john.name = 'John';
// john.greeting();

// const smith = new Person2();
// smith.name = 'smith';
// smith.greeting();
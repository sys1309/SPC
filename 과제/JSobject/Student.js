const Person = require('./Person')

class Student extends Person{
    constructor(name, major){
        super(name)
        this.major = major;
    }
    greeting(){
        return `${super.greeting()} 전공은 ${this.major} 입니다.`
    }
}

module.exports = Student;


// class Student2 extends Person{
//     this.major = major;
//     this.name = this.name;
//     greeting(){
//         return `${super.greeting()} 전공은 ${this.major} 입니다.`
//     }
// }

// const student1 = new Student2();
// student1.name = 'ysseo'
// student1.major = 'engineering'
// student1.greeting()
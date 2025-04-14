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

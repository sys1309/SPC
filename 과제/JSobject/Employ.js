const Person = require('./Person');

class Employ extends Person{
    constructor(name, position) {
        super(name);
        this.position = position;
    }

    greeting() {
        return `${super.greeting()} 직급은 ${this.position} 입니다.`
    }
}


module.exports = Employ;

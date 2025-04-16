const Animal = require('./Animal')

class Cat extends Animal{
    makeSound() {
        return `${this.name} 야옹`
    }
}

module.exports = Cat;
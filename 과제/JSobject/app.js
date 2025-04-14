const Employ = require('./Employ');
const Student = require('./Student');
const Person = require('./Person');

const employ1 = new Employ('버거킹', '왕')
console.log(employ1.greeting())

const student1 = new Student("맥도날드", "햄버거")
console.log(student1.greeting());


const person1 = new Person('프랭크')
console.log(person1.greeting())



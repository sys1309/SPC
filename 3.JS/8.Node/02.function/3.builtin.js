const stringNumber = "42";

console.log(stringNumber + 2);

const number = parseInt(stringNumber)

console.log(number + 2);

console.log(typeof stringNumber)
console.log(typeof number)

//참고
const number2 = Number(stringNumber);
console.log(number2)
console.log(typeof number2)

const user = {
    name:'jon',
    age: '30',
}
console.log(typeof user)

//다시 빌트인함수 
//setTimeout(function, delay(ms))
setTimeout(() => {
    console.log('1초 후에 출력됨');
}, 1000);

console.log('끝');

const timerID = setTimeout(() => {
    console.log('3초후에 출력됨');
}, 3000);

// setTimeout(() => {
//     console.log('3초 후에 출력됨');
// }, 3000);

console.log('진짜 끝');
clearTimeout(timerID); //3초 후에는 안나옴 

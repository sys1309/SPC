let sum = 0;
for (let i = 0; i <10 ; i++){
    sum +=0.1
}
console.log(sum);

function sum_guess_num(number) {
    return (number * (number +1))/2;
}

console.log('가우스 공식을 활용한 합산:', sum_guess_num(10))
console.log('가우스 공식을 활용한 합산:', sum_guess_num(100))
console.log('가우스 공식을 활용한 합산:', sum_guess_num(1000))
console.log('가우스 공식을 활용한 합산:', sum_guess_num(10000))
console.log('가우스 공식을 활용한 합산:', sum_guess_num(100000))
const readline = require('readline');

const rl = readline.createInterface({
    input:process.stdin,
    output: process.stdout
});

function userKeyboardInputHandler(input){
    console.log('입력한 단은:', input);

    const num = parseInt(input);
    if (!isNall(num) && num > 0 && num <10){
        for(let i =1; i <= 9 ; i++) {
            console.log(`${input}*${i} = ${input*i}`)
        }
    }else {
        console.log('1부터 9까지의 숫자만 입력하시오.')
    }

    rl.close()
}

rl.question('구구단의 단을 입력히시오:', userKeyboardInputHandler)


// rl.question('구구단의 단을 입력히시오:', (input)=>{
//     console.log('입력한 단은:', input);

//     rl.close() // 입력받은 이후에 입력 인터페이스 종료 
// });

console.log('입력후');
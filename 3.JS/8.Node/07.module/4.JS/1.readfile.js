const fs = require('fs');

// fs.readFile('example.txt', (err,data))

// function myCallbackFunction(err,data){
//     if (err) {
//         console.error('에러가 있음',err);
//     } else {
//         console.log('에러가 없음');
//     }
// }

// fs.readFile('example.txt', 'utf-8', myCallbackFunction);


// fs.readFile('example.txt', 'utf-8', function(err, data){
//     if (err) {
//         console.error('에러가 있음',err);
//     } else {
//         console.log('에러가 없음');
//     }
// });

console.log('파일 읽기 전')

const data = fs.readFileSync('example.txt', 'utf-8');//wrapper함수? 동기적으로 실행할 수 있게하는 거 
console.log('대이터는',data);

fs.readFile('example.txt', 'utf-8', (err, data)=>  { //이 함수는 비동기로 나중에 처리됨 callback 함수로 통해서 호출됨?
    if (err) {
        console.error('에러가 있음',err);
    } else {
        console.log('에러가 없음');
    }
});

console.log('파일 읽은 후')




const = require('fs');

console.log('파일 읽기 전')
const data = "내가 파일에 쓰고 싶은 내용"

fs.writeFile('example.txt', data,(encoding:'utf-8', flag:'a'),(err)=>  { 
    if (err) {
        console.error('에러가 있음',err);
    } else {
        console.log('에러가 없음');
    }
});

console.log('파일 읽은 후')
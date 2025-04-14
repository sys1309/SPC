const = require('fs');

console.log('파일 읽기 전')
const data = "내가 파일에 쓰고 싶은 내용"

fs.writeFileSync('example.txt', data, (encoding:'utf-8')) 


console.log('파일 읽은 후')
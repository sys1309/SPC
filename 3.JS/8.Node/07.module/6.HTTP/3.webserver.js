//미션. 파일을 읽어서 그 내용을 전달하는 서버 만들기
//1. index.html 파일을 찾아서 변수에 담아두고
//2. req가 있을때 그 변수의 내용을 전달한다 


//1.모듈 불러오기
const fs = require('fs');
const http = require('http');


//2. 파일읽기
const data = fs.readFileSync('index.html', 'utf-8');
//실제로는 예외처리 해줘야함 (오류처리)


const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end(data)
})

server.listen(3000, ()=>{
    console.log('서버가 3000번 포트를 잘 리슨하고 잇씁니다. 지금부터 사용자의 요청을 기다리겠습니다')
});

const fs = require('fs');
const http = require('http');

const data = fs.readFileSync('index.html', 'utf-8');

const server = http.createServer((req, res) => {
    // console.log(req);
    res.writeHead(200);
    res.end(data)
})

server.listen(3000, ()=>{
    console.log('서버가 3000번 포트를 잘 리슨하고 잇씁니다. 지금부터 사용자의 요청을 기다리겠습니다')
});
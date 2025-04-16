const http = require('http');

const server = http.createServer();

server.on('request:', () => {
    console.log('요청이 왔음')
})

server.on('connection',(res,resp)=>{
    console.log('연결이 되었음');
    res.writeHead(200
        
    );
    res.dend('Hello')
});

server.on('close',()=>{
    console.log('연결이 종료 되었음')
});

// server.listen(3000);// 소켓? 서버실행 서버대기 

server.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중!');
  });
  
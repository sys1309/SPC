const http = require('http')

const server = http.createServer((req,res) => {
    console.log(req.url, res.headersSent.cookie);
    res.writeHead(200,{'Set-Cookie':'mycookietest'});
    res.end('쿠키받아가세요?')
});

server.listen(3000, ()=>{
    console.log('서버레디');
});
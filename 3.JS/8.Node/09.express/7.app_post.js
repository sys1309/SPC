const express = require('express')

const app = express();
const port = 3000;
const users = {};
// const bodyParser = require('body-parser'); // 옛날 버전 

// app.use(bodyParser.json());// 옛날 버전 
app.use(express.json()); // json 데이터 파싱을 위한 미들웨어 
                         // 이 함수가 사용자 요청해서 온 json을 res.body에 담아줌 

app.get('/',(req,res)=>{
    res.send('헬로우 EXP')
});
app.get('/user',(req,res)=>{
    res.send(users);
})
app.post('/user',(req,res)=>{
    console.log('사용자 생성 요청');
    const id = Date.now();
    users(req.body.name) = req.body.name;
    res.send('성공')
});

app.listen(port, ()=>{
    console.log(`서버포트가 ${port}에서 실행중`);
});
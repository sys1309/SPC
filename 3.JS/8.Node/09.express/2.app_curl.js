const express = require('express')

const app = express();
const port = 3000;

app.get('/', (req,res)=>{
    res.send('헬로우')
});

app.post('/', (req,res)=>{
    res.send('post메세지 잘 받았음')
});

app.delete('/', (req,res)=>{
    res.send('delete 잘 받았음')
});

app.put('/user', (req,res)=>{
    res.send('put 잘 받았음')
});

app.get('/user', (req,res)=>{
    res.send('사용자 정보조회')
});

app.post('/', (req,res)=>{
    res.send('사용자 정보 생성')
});

app.delete('/user', (req,res)=>{
    res.send('사용자 정보 삭제')
});


app.listen(port, () => {
    console.log(`서버 레디 on ${port}`) 
});
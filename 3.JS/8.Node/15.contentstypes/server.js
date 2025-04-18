const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static('public'));

//미들웨어 통해서 사용자의 입력값의 특정 데이터를 잘 파싱해서 
app.use(express.json()) 
app.use(express.urlencoded())
app.use(express.text())

app.post('/sumbit-json', (req,res)=> {
    const jsonData = res.body;
    console.log(jsonData);
    //res.send('응');
    res.status(201).end();//응답값의 헤더에 201로 셋팅하고 body의 내용은 아무것도 안보냄 
});

app.post('/sumbit-form', (req,res) => {
    const jsonData = req.body;
    console.log(jsonData);

    res.send(jsonData)
})

app.post('/sumbit-text', (req,res) => {
    const textData = req.body;
    console.log(textData);

    res.send(textData)
})

app.listen(port, () => {
    console.log('server ready')
});
const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res)=> {
    res.send('은행방문 & 접수완료')
});

app.get('/readcookie', (req,res) =>{
    const yourcookie = req.cookies;
    console.log('가져온 쿠키는:',yourcookie);
    res.send(`니가 가져온 쿠키는:', ${JSON.stringify(yourcookie)}`)
})

app.listen(port, ()=>{
    console.log('레디')
})
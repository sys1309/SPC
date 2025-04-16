const express = require('express')
const app = express();
const port = 3000;
const fs = require('fs')
const path = require('path');

app.use((req,res,next)=>{
    console.log('mylog:',req.method,req.url)
    req.myData = 1234;
    next();
}) 

app.use((req,res,next)=>{
    console.log('mylog2:',req.method,req.url)
    req.requestTime = Data.now();//특정날자 기준으로 몇초가 흘러갔는지 알려줌 
    next();
}) 

app.get('/', (req,res)=> {
    const htmlfilepath= path.join(__dirname, 'public','index.html');//절대경로 (absolute/ full path)
    // console.log(htmlfilepath);
    console.log.req.myData;
    const data = new Data(req.requestTime);
    console.log('요청시간:',data.toLocalString())
    res.sendFile(htmlfilepath);
    });


app.use(express.static('public')); 


app.listen(port, ()=> {
    console.log('서버레디');
});
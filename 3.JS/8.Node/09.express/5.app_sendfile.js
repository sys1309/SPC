const express = require('express')
const app = express();
const port = 3000;
const fs = require('fs')
const path = require('path');

app.use(express.static('public')); 

function myMiddleware(req, res, next) {
    console.log('mylog:',req.method,req.url)
    next();

}

app.use(myMiddleware);

app.get('/', (req,res)=> {
    const htmlfilepath= path.join(__dirname, 'public','index.html');//절대경로 (absolute/ full path)
    // console.log(htmlfilepath);
    res.sendFile(htmlfilepath);
    });

app.listen(port, ()=> {
    console.log('서버레디');
});
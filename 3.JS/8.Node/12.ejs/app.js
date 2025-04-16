const express = require('express');
// const nunjuck = requrie('nujuck')
const app = express();
const path = require('path');
const port = 3000;

//express가 기본으로 지원하는 라이브러리 
app.set('view engine','ejs')

app.get('/',(req,res)=> {
    // res.sendFile(path.join(__dirname,'index.html'))
    res.render('index',{title:'나의 타이틀', message:'ejs 학습중입니다.'})
});

app.listen(port, () =>{
    console.log('서버 레디')
});
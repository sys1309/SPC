const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const users = {};
let nextId = 1;

//app.use(express.urlencoded({extended:true}))
app.use(express.json()); //payload를 

app.get('/',(req,res)=>{

})

//사용자 조회 라우트
app.get('/users',(req,res)=>{
    console.log('사용자 조회')
    // const name = req.query.name;
    // users = users[name];
    res.send(users) //text html character-8 문자열 이게 기본값
    //res.json(users)
});

//사용자 생성
app.post('/users',(req,res)=>{
    console.log('사용자 생성',req.body)

    const name = req.body.name;

    users[nextId++] = name; //나의 key도 이름, value도 이름

    res.send(`생성 되었습니다.`);
});

//사용자 수정
app.put('/users/:id',(req,res)=>{
    console.log('사용자 수정')
    const id = req.params.id;

    const[id] = req.body.name;
    // const {name, age, job} = req.body;

    // if (!users[name]) {
    //     //return res.status(404).send(`사용자 ${name}을 찾을 수 없습니다.`);
    //     users[name] = {};
    // }

    // if (age) users[name].age =age;
    // if (job) users[name].job =job;
    
    res.send(`사용자 정보 수정 완료`)
});

//사용자 삭제
app.delete('/users/:id',(req,res)=>{
    console.log('사용자 삭제', req.params.id);

    const id = req.params.id;

    delete users[id]

    res.send('사용자 삭제 완료')
});

app.listen(port, ()=>{
    console.log(`서버레디 on ${port}`);
});
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const users = {};
let nextId = 1;

//app.use(express.urlencoded({extended:true}))

app.use(express.json()); //payload를 

app.get('/',(req,res)=>{
    console.log('메인홈');
    res.sendFile(path.join(__dirname, 'public','users.html'));

});

app.use(express.static('public'));

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

    try{

    const name = req.body.name;

    users[nextId++] = name; //나의 key도 이름, value도 이름

    //res.send(`생성 되었습니다.`);
    res.status(204).send();
    } catch(error) {
        res.status(500).send('서버 내부 오류 발생')
    }
});

//사용자 수정
app.put('/users/:id',(req,res)=>{
    
    try{
    console.log('사용자 수정')
    const id = req.params.id;

    const name = req.body.name;
    
    res.send('사용자 정보 수정 완료');
    } catch(error) {
        res.status(500).send('서버 내부 오류 발생');
    }
});

//사용자 삭제
app.delete('/users/:id',(req,res)=>{
    console.log('사용자 삭제', req.params.id);

    try{
    const id = req.params.id;

    if(!users[id]) {
        return res.status(404).send(`해당 사용자(ID${id}는 존재하지 않습니다)`)
    }

    delete users[id]

    res.status(204).send('사용자 삭제 완료');
    } catch(error) {
        res.status(500).send('서버 내부 오류 발생');
    }
});

app.listen(port, ()=>{
    console.log(`서버레디 on ${port}`);
});
// 2. users.db에 접속해서 index.html 전달
// login에 post로 요청시 db에 접속해서 해당 username, password가 있는지 확인 
// 맞으면 로그인 성공 전달
const express = require('express');
const sqlite = require('sqlite3');
const path = require('path');

const app = express();
const db = new sqlite.Database('users.db') // db 파일이 같은 경로에 있어야함 
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.post('/login',(req, res) => {
    const {username, password} = req.body;
    const user1 = db.prepare('select * from user where id = ? and password = ?', [username, password], (err, row) => {
        if (row) res.send(`<h2>로그인 성공 ${user1.id}</h2>`);
        else res.send('<h2>로그인 실패</h2>');
    });
});

app.listen(port, ()=> {
    console.log(`서버가 준비됨 ${port}`);
});
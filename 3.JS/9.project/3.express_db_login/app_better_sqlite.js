const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');
const bodyParser = require('body-parser');

const app = express();
const db = new Database('users.db') // db 파일이 같은 경로에 있어야함 
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'public','index.html'));
});

app.post('/login',(req, res) => {
    const {username, password} = req.body;
    const user1 = db.prepare('select * from user where id = ? and password = ?').get(username, password);

    if (user1) {
        res.send(`<h2>로그인 성공 ${user1.id}</h2>`)
    } else {
        res.send('<h2>로그인 실패</h2>')
    }
});

app.listen(port, ()=> {
    console.log(`서버가 준비됨 ${port}`);
});
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const path = require('path')

const app = express();
const port = 3000;

const users = [
    {id: 1, username:'user1', password:'password1'},
    {id: 2, username:'user2', password:'password2'}
]

app.use(express.urlencoded());
app.use(morgan('dev'));
app.use(session({
    secret: 'adbc1234',
    resave: false,
    saveUninitialized: true
}))

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/user', (req,res)=> {
    const user = req.session.user;
    // const {username, password} = req.body;
    if (user) {
        const {username, password} = req.session.user;
        res.send(`당신은 ${username}입니다., 비밀번호는 ${password}입니다.`)
    } else {
        res.send(`로그인 하시오`)
    }
});

app.get('/logout', (req,res)=>{
    req.session.destroy(err => {
        if (err) {
            return res.send('로그아웃 실패')
        }
        res.send('로그아웃 성공')
    });
});


app.post('/login', (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);

    const user = users.find(u => u.username === username && u.password === password);
    // let user = null;
    // for (let i = 0; i < users.length; i++) {
    //     console.log(users[i], username, password, users[i]===username, users[i]===password);
    //     if (users[i].username === username && users[i].password === password) {
    //         user = users[i];
    //         break;
    //     }
    // }
    console.log('유저:', user);
    if (user) {
        req.session.user = {username:user.username, password:user.password}
        res.json(`<h2>로그인성공 ${user.username}</h2>`)
    } else {
        res.status(401).json({message: '<h2>로그인 실패 </h2>'})
    }
});

app.listen(port,()=>{
    console.log('서버레디')
});
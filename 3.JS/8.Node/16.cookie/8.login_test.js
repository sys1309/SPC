const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const path = require('path')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')

const app = express();
const port = 3000;

const db = new sqlite3.Database('users.db');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(morgan('dev'));
app.use(session({
    secret: 'adbc1234',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/products', (req,res)=> {
    res.sendFile(path.join(__dirname, 'public', 'product.html'));
});

app.get('/cart', (req,res)=> {
    res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

app.get('/user', (req,res)=> {
    const user = req.session.user;
    
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


app.post('/login', async(req, res) => {
    const {username, password} = req.body;
    console.log(username, password);

    // const user = users.find(u => u.username === username && u.password === password);
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);

    //나의 계정을 가져와서 bcrypt.compare로 해시를 비교한다.
    db.get('select * from users where username=?', [username], async(err, row) => {
        if (row) {
            const isMatch = await bcrypt.compare(password, row.password);
            if (isMatch) {
                req.session.user = {username:row.username, password:row.password}
                res.json({message:`안녕하세요 ${row.username}님`})
            } else {
               res.status(401).json({message:'로그인 실패'});
            }

    }});
});

app.get('/product', (req,res) => {
    const {id, name, price} = req.body;
    console.log(product, name, price);

    db.get('select * from product')
})

app.get('/cart', (req,res) => {
    const yoursession = req.session;
    console.log(yoursession); 

    const {username, ticket, cart} = req.session;

    if (username){
        res.send(`당신의 이름은 ${username}, ${cart}가 담겨있네요`)
    } else {
        res.send('사용자 정보가 없습니다. 로그인하세요')
    }
})


app.listen(port,()=>{
    console.log('서버레디')
});
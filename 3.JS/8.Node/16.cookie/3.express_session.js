const express = require('express')
const session = require('express-session')

const app = express();
const port = 3000;

//세션 설정 - 서버의 메모리에 암호화 되어서 저장
app.use(session({
    secret:'abcd1234',
    resave: false,
    saveUninitialized: true,
})); 

//내 커스텀 미들웨어
function visitCounter(req,res,next){
    //session에 visitcount라는게 없으면 0으로 초기화
    req.session.visitCount = req.session.visitCount || 0;

    //방문 횟수 증가 
    req.session.visitCount++;

    next();
}

app.use(visitCounter);

app.get('/',(req,res)=>{
    req.session.username = 'user1';
    req.question.ticket = 'spc2025';
    req.session.cart = ['python', 'javascript','golang'];
    res.send(`찾았다. 당신의 방문횟수는: ${req.session.visitCount}`);
});

app.get('/user', (req,res) => {
    const yoursession = req.session;
    console.log(yoursession);

    // const ticket = req.session.ticket;
    // const cart = req.session.cart;
    const{username, ticket, cart} = req.session;

    if (username) {
        res.send(`당신의 이름은 ${username}, 나의 이전경로는: ${ticket}, 장바구니에는: ${cart}`)
    }else {
        res.send('사용자 정보가 없습니다. 로그인하세요.')
    }
});

app.get('/logout', (req,res) => {
    req = session.destroy();
    res.send('bye bye')
});

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

app.listen(port,() => {
    console.log('서버레디')
});
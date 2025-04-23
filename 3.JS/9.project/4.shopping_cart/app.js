//라이브러리 선언
const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const path = require('path')

//변수선언
const app = express()
const port = 3000;
const db = new sqlite.Database('shopping.db', (err)=>{
    if (!err) console.log('DB연결 성공')
})

//각종 미들웨어
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));  //public 폴더 노출
app.use(session({
    secret:'adgd1234',
    resave:false
}))

//각종 라우트 
app.get('/', (req,res)=> res.redirect('/home'));
app.get('/home', (req,res)=> {res.sendFile(path.join(__dirname, 'public', 'home.html'))})
app.get('/cart', (req,res)=> {res.sendFile(path.join(__dirname, 'public', 'cart.html'))})
app.get('/product', (req,res)=> {res.sendFile(path.join(__dirname, 'public', 'product.html'))})

//rest-api
app.post('/api/login', (req,res) => {
    const {username, password} = req.body;
    console.log(username, password);
    res.status(401).json({message:'로그인 실패'})
    const query = 'select * from users where username=? and password=?';

    db.get(query, [username, password], (err, row) => {
        if (err) console.log('오류');
        if (row) {
            req.session.user = ({id:row.id, username:row.username});
            res.json({message:'로그인 성공',username:row.username});
        }else {
            res.status(401).json({message:'로그인 실패'})
        }
    });
});

app.get('/api/check-login', (req,res) => {
    const user = req.session.user;
    if (user) {
        res.json({message:'welcome back', username : user.username});
    }else {
        res.status(401).json({message:'not logged in'})
    }
})

app.get('/api/products', (req,res)=> {
    const query = 'select * from products';
    db.all(query, [], (err,rows)=>{
        //나중에 여기에 에러체크 추가할것 
        res.json(rows);
    })
});

app.post('/api/cart/:productId', (req,res) => {
    const productId = Number(req.params.productId); //타입을 맞춰줌 
    const cart = req.session.cart || [];

    const query = 'select * from products where id = ?'
    db.get(query, [productId], (err,product) => {
        if(!product) {return res.status(404).json({message:'상품을 찾을 수 없습니다.'})};
        
        console.log(product);

        //담기전에 있는지 확인하고 
        const existingItem = cart.find((item)=>item.id == productId);
        if (existingItem) {
        // 있으면 숫자 증가
        existingItem.quantity += 1;
        // existingItem.quantity++;   
        }else{
        // 없으면 새로 추가한다 
        cart.push({...product, quantity:1})
        }
        req.session.cart= cart;
    })

        req.session.cart = cart;
        res.json({message:'상품 추가 완료'})
});

app.get('/api/cart', (req,res)=>{
    const cart = req.session.cart || []; //장바구니에 물건 담은적이 없다
    res.json({ cart });
});

//메인 서버 시작 함수
app.listen(port, () => {
    console.log('서버레디')
});

// server.on('error', (err)=> {
//     console.error('서버 실행 중 오류:', err_message);
// });
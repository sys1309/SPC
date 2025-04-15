const express = require('express')

const app = express();
const port = 3000;

app.get('/', (req,res)=>{
    res.send('헬로우 메인페이지')
});

app.get('/users/id', (req,res)=>{
    const id = req.params.id; //유저기반 
    res.send(`사용자 정보,ID:, ${req.params.id}`) 
});

app.get('/users/id', (req,res)=>{
    const id = req.params.id; //유저기반 
    res.send(`사용자 정보 프로필 상세메세지,ID:, ${req.params.id}`) 
});

//searchkeyword=programingcategory=javascript
//태그에서 curl "localhost"
//브라우저 https://localhost:3000
app.get('/search', (req,res) => {
    const keyword = req.query.keyword; //특정 파라미터
    const category = req.query.category;

    res.send('키워드:',keyword, '카테고리:', category)
});

app.listen(port, () => {
    console.log(`서버 레디 on ${port}`) 
});
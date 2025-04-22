const express = require('express');

const app = express();
const port = 3000;
    //라우트를 만드는 과정 
    //사용자는 나의 앱이 루트디렉트리에 get으로 요청을 할 수있다.
app.get('/user',(req, res) => {
    //기본 헤더와 바디가 잘 만들어진다

    res.send('HEllo user');
});

app.listen(port, ()=> {
    console.log(`서버가 준비됨 ${port}`);
});
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const todoroutes = require('./routes/todoroutes')
const chatbot = require('./public/js/chatbot')

const app = express();
const port = 3000;

//미들웨어
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

//라우터 연결
app.use(todoroutes);
app.use(chatbot);

app.listen(port, () =>{
    console.log(`server is running on http://localhost:${port}`);
});
const express= require('express')
const app = express();
const router = express().Router();

const port = 3000;

app.get('/user/profile', (req,res) => {
    res.send('사용자>프로필');
})

app.get('/user/settings', (req,res) => {
    res.send('사용자>설정');
})


const express= require('express')
const router = express.Router()

const app = express();

const port = 3000;

app.use(morgan('dev'));

app.get('/product/list', (req,res) => {
    res.send('상품>목록');
})

app.get('/product/detail', (req,res) => {
    res.send('상품>개발상품');
})

app.get('/product/:id/details', (req,res) => {
    res.send('상품>개발상품>디테일');
})

module.exports = router;
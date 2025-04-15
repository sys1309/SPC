const express= require('express')
const morgan= require('morgan')

const userRouter = require('./router/userRoute');
const productRouter = require('./router/productRoute')
const mainRouter = require('./rounter/mainRoute')

const app = express();

const port = 3000;

app.use(morgan('dev'));
app.use('/user', userRouter)
app.use('/product', productRouter)

app.get('/', (req,res) => {
    res.send('메인');
})

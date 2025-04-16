const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

// function myData(_,myData(_,i)){
//     return `item ${i+1}`
// }
//const data = Array.from({length:200});

const data = Array.from({length:200}, (_,i) => `item ${i+1}`);

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/get-items',(req,res)=>{
    //미션2 원하는 개수만큼 가져오려면 어떻게 할지?
    //입력파라미터를 어떻게 정해야할지 
    //어떻게 나눌지?? 쿼리파라미터로 start와 end를 나눠서 담아줌 예시 20 , 10
    //미션 2-1 그래서 이 많은걸 어떻게 나눌건지?
    //미션 2-2 이걸 구현 
    // const start = req.query.start;
    // const end = req.query.end;
    const {start,end} = req.query;

    // const userItems = [];
    // for (let i = start; i < end; i++){
    //     userItems.push(data[i])
    // }
    // console.log(userItems);

    const userItems = data.slice(start,end);

    res.json(userItems);
});

app.listen(port, ()=>{
    console.log('서버 레디')
})

console.log(data);
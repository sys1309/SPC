const express = require('express')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const sqlite = require('sqlite3')

const app = express();
const port = 3000;
const db = new sqlite.Database('memo.db', (err) => {
    if(err) console.log('DB연결 실패')
})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname,'static')));
app.use(session({
    secret:'adbc1234',
    resave: false //세션 데이터가 바뀌어도 저장 ? 
}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'memo.html'))
})


app.post('/api/memo', (req, res)=>{
    const {title, content} = req.body;
    console.log(title, content)

    const sql = 'insert into memo (title, content) values (?, ?)';

    db.run(sql, [title,content], function(err) {
        if (err) {
            console.error('메모저장 실패:', err.message);
            return res.status(500).json({success:false, message:'db저장 실패'})
        }
        console.log('메모저장됨:', {title, content});
    });

    const newMemo = {title, content};
    // console.log('server answermemo', newMemo)

    res.status(200).json(newMemo)
})

app.get('/api/memo', (req,res) => {
    const sql = `select * from memo`;

    db.all(sql, [], (err, rows) => {
        if(err){
            console.error('메모 조회 실패:', err.message);
            return res.status(500).json({success:false});
        }
        res.json(rows);
    })
})

app.delete('/api/memo/delete', (req,res) => {
    const{title, content} = req.body;
    const sql = 'delete from memo where title=? and content=?';
    db.run(sql, [title, content], function(err) {
        if (err) return res.status(500).json({success:false});
        res.json({success:true});
    });
});

app.put('/api/memo/update',(req,res)=>{
    const {oldTitle, oldContent, newTitle, newContent} = req.body;
    const sql = 'update memo set title=?, content=? where title=? || content=?';
    
    db.run(sql, [newTitle, newContent, oldTitle, oldContent], function(err) {
        if(err) {return res.status(500).json({success:false})
        }
       
        res.json({ title:newTitle, content: newContent });
    })
});


app.listen(port, () => {
    console.log('서버레디')
})
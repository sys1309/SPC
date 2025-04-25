const express = require('express')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const sqlite = require('sqlite3')
const multer = require('multer')
// const cors = require('cors');

// const upload = multer({dest: path.join(__dirname, 'uploads')});
const app = express();
const port = 3000;
const db = new sqlite.Database('memo_pic.db', (err) => {
    if(err) console.log('DB연결 실패')
})

// app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret:'adbc1234',
    resave: false //세션 데이터가 바뀌어도 저장 ? 
}))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'memo_pic.html'))
})


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);      // 예: .jpg, .png
    const filename = `${Date.now()}${ext}`;           // 예: 1713798782001.jpg
    cb(null, filename);
  }
});

const upload = multer({ storage });

app.post('/api/memo_pic', upload.single('pic'), (req, res)=>{
    const {title, content} = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    // console.log(title, content)

    const sql = 'insert into memo_pic (title, content, img_path) values (?, ?, ?)';

    db.run(sql, [title,content,imagePath], function(err) {
        if (err) {
            console.error('메모저장 실패:', err.message);
            return res.status(500).json({success:false, message:'db저장 실패'})
        }
        console.log('메모저장됨:', {title, content, imagePath});
    });

    const newMemo = {title, content, img_path: imagePath};
    // console.log('server answermemo', newMemo)

    res.status(200).json(newMemo)
})

app.get('/api/memo_pic', (req,res) => {
    const sql = 'select * from memo_pic';

    db.all(sql, [], (err, row) => {
        // if(err){
        //     console.error('메모 조회 실패:', err.message);
        //     return res.status(500).json({success:false});
        // }
        res.json(row);
    })
})

app.delete('/api/memo_pic/delete', (req,res) => {
    const{title, content} = req.body;
    const sql = 'delete from memo_pic where title=? and content=?';
    db.run(sql, [title, content], function(err) {
        if (err) return res.status(500).json({success:false});
        res.json({success:true});
    });
});

app.put('/api/memo_pic/update',(req,res)=>{
    const {oldTitle, oldContent, newTitle, newContent} = req.body;
    const sql = 'update memo_pic set title=?, content=? where title=? || content=?';
    
    db.run(sql, [newTitle, newContent, oldTitle, oldContent], function(err) {
        if(err) {return res.status(500).json({success:false})
        }
       
        res.json({ title:newTitle, content: newContent });
    })
});


app.listen(port, () => {
    console.log('서버레디')
})
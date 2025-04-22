const sqlite = require('better-sqlite3');

const db = sqlite('test.db');

//1. 테이블 생성
db.exec(`CREATE TABLE IF NOT EXISTS greetings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT
)`);

//2. 데이터 삽입 
const insert = db.prepare('insert into greetings (message) values (?)');
insert.run('hello, betterSQLite3');

//3. 데이터 조회
const select = db.prepare('SELECT * FROM greetings')
const greetings = select.all()

greetings.forEach((row) => {
    console.log(`인사${row.id}: ${row.message}`)
})


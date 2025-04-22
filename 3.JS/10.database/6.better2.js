const sqlite = require('better-sqlite3');

const db = sqlite('text.db')

//1. 테이블 생성
db.exec(`CREATE TABLE IF NOT EXISTS users (
    id integer primary key autoincrement,
    username text,
    email text)`);

//2. 사용자 조회
const allusers = db.prepare('SELECT * FROM users');
const allusers_result = allusers.all();
console.log('조회된 사용자:', allusers_result);

//3. 신규 사용자 만들기
const newuser = {
    username: 'user1',
    email: 'user@example.com'
}

const insert = db.prepare('insert into users (username, email) values (?,?)');
insert.run(newuser.username, newuser.email);

//4. 특정 사용자만 조회
const userId = 1;
const user = db.prepare('SELECT * FROM users WHERE id = ?');
const auser = user.get(userId);

console.log('검색된 사용자:', auser)

//5. 사용자 정보 갱신
const updateUser = { //해당 사용자의 원하는 필드만 변경 가능 꼭다 아니여도 됨 
    id:1,
    username: 'user001',
    email : 'user001@example.com'
};

const update = db.prepare('update users set username=?, email=? WHERE id=?');
update.run(updateUser.username, updateUser.email, updateUser.id);
console.log('사용자 정보 갱신 완료');

//6. 사용자 삭제
const deleteUser={
    id: 2,
}

const deleteQ = db.prepare('delete from users where id=?')
deleteQ.run(deleteUser.id);
console.log('삭제완료');

//db환경 종료
db.close();
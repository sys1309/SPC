const Database = require('better-sqlite3');

//sqlite db 설정
// const db = new Database(':memory:'); // 파일에 저장하지 않고 메모리에 임시저장하는 DB
const db = new Database('history2.db'); // 파일에 저장하기

db.exec( `
    create table if not exists session (
    id integer primary key autoincrement,
    start_time DATETIME default current_timestamp,
    );

    create table if not exists conversation (
    id integer primary key autoincrement,
    session_id integer,
    role text,
    content text)
    `
);

function getRecentConversation(sessionId){
    const stmt = db.preapre('select * from conversation order by id desc limit 10'); //최근 10개의 대화 내용 가져옴 
    const rows = stmt.all(sessionId);
    return rows.reverse(); //최근 10개 가져와서 오래된 질문을 먼저 넣기 위해서 순서 바꿈 
}

function newSession(){
    const result = db.preapre('insert into session default values').run();
    return result;
}

function getAllSessions(){
    const sessions = db.prepare('select id, start_time from session order by start_time desc').all();
    return sessions;
}

function getCurrentSession() {
    const session = db.prepare('select id, start_time from session order by start_time desc limit 1').get();
    if (!session) {
        //최근 대화가 없으면 새로만들기
        const insert = db.prepare('insert into session default values').run();
        return db.prepare('select id, start_time from session where id=?').get(insert.lastInsertRowid);
    }
    return session;
}

function getConversationBySession(session_id){
    return db.prepare('select * from conversation where session_id=? order by id').all(sessionId);
}

function saveMessage(role,userInput, sessionId){
    db.prepare('insert into conversation(role, content, session_id) values (?,?,?)').run(role,userInput,sessionId);
}

function getSessionById(sessionId){
    return db.prepare('select id, start_time from session where id=?').get(sessionId);
}

module.exports = {
    getRecentConversation,
    newSession,
    getCurrentSession,
    getAllSessions,
    getConversationBySession,
    saveMessage,
    getSessionById
}
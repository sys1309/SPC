//1. [Client] -> [Routes] (여기에서 직접 DB CRUD)
//2. [Client] -> [Routes] -> [Controllers]
//3. [Client] -> [Routes] -> [Controllers] -> [Models]
//4. [Client] -> [Routes] -> [Controllers] -> [Services] -> [Models]
//이전까지는 2번 이었고 이파일에서 sql구문을 직접 호출했고, 지금은 3번으로 진행중.. 그래서 sql 구문을 model 파일에서 호출함.. 

const db = require('../models/database')

function getAllTodos(req,res){
    const rows = db.prepare('select * from todos').all();
    console.log(rows);
    const todos = rows.map(row=> ({
        id:row.id,
        text:row.text,
        completed:row.completed
    }))

    res.json(todos)
}

function addTodo(req,res){
    const { text } = req.body;

    const stmt = db.prepare('insert into todos(text) values(?)');
    const info = stmt.run(text)
    
    res.json({'message':'ok'})
}

function toggleTodo(req,res){
    const id = req.params.id;

    //현재 상태 가져오기
    const row= db.prepare('select * from todos where id=?').get(id);
    const newState = row.completed ? 0 : 1;

    //반전해서 저장하기
    const stmt = 'update todos set completed=? where id=?'
    db.prepare(stmt).run(newState,id);

    res.json({'message':'ok'})
}

function deleteTodo(req,res){
    const id = req.params.id;

    db.prepare('delete from todos where id=?').run(id);
    res.json({'message':'ok'})
}

module.exports={
    getAllTodos,
    addTodo,
    toggleTodo,
    deleteTodo
};
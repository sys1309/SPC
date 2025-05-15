const db = require('./database');

function getAllTodos(){
    const rows = db.prepare('select * from todos').all();
    //필요시 rows를 내가 원하는 json으로 재변환
    return rows;
}

function addTodo(text){
    return db.prepare('insert into todos (text) values(?)').run(text);
}

function updateTodoState(id, completed){
    return db.prepare('update todos set completed=? where id=?').run(completed,id)
}

function deleteTodoById(id){
    return db.prepare('delete todos ')
}

module.experts = {
    getAllTodos,
    addTodo,
    updateTodoState,
    deleteTodoById
}
const todoModel = require('../models/todoModels')
const Database = require('better-sqlite3');
const db = new Database('./todos.db')

const query=`
    create table if not exists todos(
    id integer primary key autoincrement,
    text text not null,
    completed integer default 0
    )
`

db.prepare(query).run();

module.exports=db;
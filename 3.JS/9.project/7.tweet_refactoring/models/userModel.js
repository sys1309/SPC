function createUser(username, email, password, callback){
    const query = 'insert into user (username, email, password) values (?, ?, ?)'
    db.run(query)
}
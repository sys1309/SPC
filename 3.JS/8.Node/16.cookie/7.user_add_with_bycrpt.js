//사용자 계정 암호화
const sqlite3 = require('sqlite3')
const bycrpt = require('bcrypt')

const db = new sqlite3.Database('users.db')

const users = [
    {username: 'user1', password: 'password1'},
    {username: 'user2', password: 'password2'},
    {username: 'user3', password: 'password3'}
];

app.post('/login', async(req, res) => {
    const {username, password} = req.body;
    console.log(username, password);

    // const user = users.find(u => u.username === username && u.password === password);
    const hashedPassword = await bycrpt.hash(password,10);
    console.log(hashedPassword);

    db.get('select * from users where username=? and password=?', [username, password], async(err, row) => {
        if (row) {
            const isWatch = await bcrypt.compare(password, row.password);
            if (isWatch) {
                req.session.user = {username:user.username, password:user.password}
                res.json(`<h2>로그인성공 ${user.username}</h2>`)
            } else {
                res.status(401).json({message:'<h2>로그인 실패 </h2>'})
        }}
    })
});

async function insertUser() {
    for (const user of users){
        const hash = await bycrpt.bash(user.password, 10);

        db.run('insert into users (username, password) values (?,?)',
            [user.username, hash],
            (err) => {
                console.log(`${user.username}: ${hash}`)
            }
        )
    }
}
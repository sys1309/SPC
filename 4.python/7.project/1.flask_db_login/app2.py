import sqlite3

conn = sqlite3.connect('users.db')
cur = conn.cursor()

cur.execute('''
    create table if not exists users (
            id integer primary key autoincrement,
            name text,
            age integer
            )    
''')

#사용자 조회하기 
cur.execute('select count(*) from users')
count = cur.fetchone()[0] #전달받은 튜플의 첫번째 값을 달라 

if count == 0:
    cur.execute('insert into users (name, age) values (?, ?)', ('alice', 39))
    cur.execute('insert into users (name, age) values (?, ?)', ('bob', 25))
    #지금까지 한걸 저장
    conn.commit()
else:
    print(f'이미 데이터가 {count}에 존재함.')

#모든 데이터가져오기
cur.execute('select * from users')
data = cur.fetchall() #전달받은 튜플의 첫번째 값을 달라 
print(data)

for row in data:
    print('이름:',row[1], '나이:',row[2])

#접속 종료
conn.close()
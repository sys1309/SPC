from flask import Flask, render_template, request, send_from_directory
import sqlite3

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/login', methods = ['POST'])
def login():
    username = request.form['username'] #사용자 입력값 받아와서 변수에 저장 
    password = request.form['password']

    conn = sqlite3.connect('users.db')
    cur = conn.cursor() #multi thread 문제를 해결하기 위해 함수안에서 작성  

    cur.execute('select * from users where id = ? and password= ?', (username,password))
    user = cur.fetchone()[0]
    if user:
        return '로그인 성공'
    else:
        return '로그인 실패'

    conn.close()

if __name__ == '__main__':
    app.run(debug= True)
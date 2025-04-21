from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello flask'

@app.route('/user')
@app.route('/user/<username>')
def user_home(username='Guest'):
    return f'<h1>사용자 페이지:{username}</h2>'

@app.route('/admin')
@app.route('/admin/<username>')
def admin_home(username='Admin'):
    return f'<h1>관리자 페이지{username}</h1>'

@app.route('/search')
def search():
    query = request.args('a')
    page = request.args.get('page', default =1)

    return f'검색중.. 키워드:{query}, 페이지{page}'

if __name__ == '__main__': #파이썬의 메인 함수 내 파일을 실행할때 호출.. 다른파일에서 나를 import
    app.run()
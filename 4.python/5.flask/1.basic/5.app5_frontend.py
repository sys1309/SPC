from flask import Flask, render_template

app = Flask(__name__)

users = ['Alce', 'Bob', 'Jason', 'David', 'Snoopy']

@app.route('/')
def home():
    return render_template('users.html', name = 'john')

@app.route('/users')
def get_users():
    return render_template('users.html', users = users)

if __name__ == '__main__':
    app.run(port = 3000, host = '0.0.0.0',debug= True) #프로덕션 코드에서는 절대로 debug=true로 해서는 안됨 서버가 돌아가는 내용을 다 알려주게 되기 때문 

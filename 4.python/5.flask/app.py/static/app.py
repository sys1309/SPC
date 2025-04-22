from flask import Flask, render_template, request


app = Flask(__name__, static_foler = None) #기본으로 허용된 static폴더 끄기 
app = Flask(__name__, static_foler = 'my_static') #기본으로 허용된 static 폴더명을 my_static

@app.route('/')
def home():
    return render_template('index.html', text = 'Hello')

@app.route('/login', methods = ['POST', 'GET'])
def login():
    if request.methods == 'POST':
        user = request.form['name']
        print('폼입력:', user)
        return redirect(url_for('user', user=user))
    else:
        return render_template('login.html')

@app.route('/user')
@app.route('/user/<user>')
def user(user=None):
    return render_template('user.html', user = user)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
from flask import Flask, request, make_response, jsonify #일관성 있게 그루핑 
from bs4 import BeautifulSoup
# from flask import jsonify

app = Flask(__name__)

users = [
    {'id':1, 'name':'Alice', 'age':25, 'phone':'123-456-7899'},
    {'id':2, 'name':'Bob', 'age':44, 'phone':'123-456-7549'},
    {'id':3, 'name':'Jason', 'age':88, 'phone':'123-456-7129'},
    {'id':4, 'name':'Alice', 'age':99, 'phone':'123-456-7829'}
]

@app.route('/')
def main():
    return '메인'

@app.route('/users')
def get_users():
    return jsonify(users)

@app.route('/users/<int:user_id>')
def get_user_id(user_id):
    # user = None
    # for u in users:
    #     if u['id'] == user_id:
    #         user = u
    #         break #찾았으면 중단하는게 효율적인 검색 

    user = next((user for user in users if user['id'] == user_id), None)

    if user is not None:
        # return jsonify(user['name']) #원하는 항목만 가져올 수도 있음 
        return jsonify(user)
    else: 
        return jsonify({'error':'User not found'}),404
    
@app.route('/search') #/search?name=alice
def search_user():
    query = request.args.get('name')
    if not query:
        data = {'error': 'Name is required. 한글테스트'}
        response = make_response(jsonify(data))
        response.headers['Content-Type'] = 'application/json:charset=utf-8'
        return response

    result = [user for user in users if query.lower() in user['name'].lower()]
    return jsonify(result)


if __name__ == '__main__':
    app.run()
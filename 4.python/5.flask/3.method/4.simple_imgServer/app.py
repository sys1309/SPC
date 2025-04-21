from flask import Flask, jsonify, url_for
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app) #누구든지 나의 서버로 정보를 보낼 수 있게 설정 

#올바르게 하는 것은 내가 아는 인지된 서버만 CORS를 제한 적으로 허용하는 것 
CORS(app, resources=(r"/random-cat": {"origins": "http://127.0.0.1:5000"}))

cat_images = {
    'puppy.jpg',
    '춘식3.gif',
    '춘식2.jpg',
}

@app.route('/random-cat')
def random_cat():
    random_image = random.choice(cat_images)
    image_url = url_for('static', filename= f'images/{random_image}',_external=True)
    print(image_url)

    return jsonify({'url': image_url})

if __name__ == '__main__':
    app.run(debug=True)
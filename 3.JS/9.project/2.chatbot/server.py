from flask import Flask, request, jsonify
from flask_cors import CORS
import time


app = Flask(__name__, static_folder='public')
CORS(app)  # CORS 허용 (필요 시)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json() #나한테 POST로 요청에서 json을 꺼내옴 
    message = data.get('question', '') #없으면 빈칸
    if "배고파" in message:
        reply_msg = "나도 배고파"
    elif "집에 갈래" in message:
        reply_msg = "가지마."
    else:
        reply_msg = message
    time.sleep(1) #1초 지연 (챗봇이 생각하는 시간)
    return jsonify('question': f'python: {message}')  # JSON 응답 반환

# 정적 파일 서빙 설정 (예: public/index.html)
@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=3000)
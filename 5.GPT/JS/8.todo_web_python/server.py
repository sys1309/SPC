from flask import Flask, request, jsonify
import openai
from dotenv import load_dotenv
import os

# Load environment variables from a .env file
load_dotenv()

# Set OpenAI API key from environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

# ... 다른 라우트 정의 ...
@app.route('/openai', methods=['POST'])
def openai_chat():
    data = request.get_json()
    user_message = data.get('message')

    try:
        response = openai.Completion.create(
            model="gpt-4o-mini",
            prompt=user_message,
            max_tokens=150
        )
        reply = response.choices[0].text.strip()
        return jsonify({'reply': reply})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# ... 다른 라우트 정의 ...

if __name__ == '__main__':
    app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=True)
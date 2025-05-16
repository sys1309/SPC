from flask import Flask, render_template, send_from_directory, request, jsonify
from openai import OpenAI
from dotenv import load_dotenv
import os
import sqlite3
from datetime import datetime

load_dotenv()

app = Flask(__name__)
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def init_db():
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS reviews
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
            rating INTEGER NOT NULL,
            review TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
    ''')
    conn.commit()
    conn.close()

@app.route('/')
def home():
    return send_from_directory('public', 'index.html')

@app.route('/api/review', methods=['GET'])
def get_reviews():
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('SELECT rating, review, created_at FROM reviews ORDER BY created_at DESC')
    reviews = c.fetchall()
    conn.close()

    formatted_reviews = []
    for review in reviews:
        formatted_reviews.append({
            'rating': review[0],
            'review': review[1],
            'created_at': review[2]
        })

    return jsonify(formatted_reviews)

@app.route('/api/aisummary', methods=['GET'])
def get_ai_summary():
    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('SELECT rating, review FROM reviews')
    reviews = c.fetchall()
    conn.close()

    if not reviews:
        return jsonify({'summary': '아직 리뷰가 없습니다.'})

    review_texts = []
    avg_rating = 0
    for rating, review in reviews:
        review_texts.append(review)
        avg_rating += rating
    avg_rating /= len(reviews)

    reviews_text = '\n'.join(review_texts)

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "리뷰들을 간단하게 요약해주세요."},
            {"role": "user", "content": f"다음 리뷰들을 분석하고 요약해주세요. 평균 평점은 {avg_rating:.1f}점입니다:\n{reviews_text}"}
        ]
    )

    summary = response.choices[0].message.content

    return jsonify({
        'summary': summary,
        'average_rating': avg_rating
    })
@app.route('/api/review', methods=['POST'])
def add_review():
    data = request.get_json()
    rating = data.get('rating')
    review = data.get('review')

    conn = sqlite3.connect('reviews.db')
    c = conn.cursor()
    c.execute('INSERT INTO reviews (rating, review) VALUES (?, ?)', (rating, review))
    conn.commit()
    conn.close()

    return jsonify({'success': True}), 200

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
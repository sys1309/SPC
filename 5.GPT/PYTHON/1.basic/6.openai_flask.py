import os 
from dotenv import load_dotenv
from openai import OpenAI
from langchain_openai import OpenAI
from flask import Flask, request, jsonify


load_dotenv(dotenv_path= '../.env')
llm = OpenAI(temperature=0.9) #창의력이 살짝 높은 모델 
app=Flask(__name__)

prompt_template = '회사 이름을 영어로 작명하고 싶어. 나의 회사는'

@app.route('/api/company_name', methods=['POST'])
@app.route('/generate', methods=['POST'])
def generate():
    data= request.get_json()
    prompt= data.get('prompt', '') #프롬프트가 없으면 빈값으로 가져와라 
    final_prompt = prompt_template + prompt

    result = llm.generate([final_prompt]*5)
    results = []
    for data in result.generations:
        print(data[0].text)
        results.append(data[0].text.strip())
    
    return jsonify({'response': results})

if __name__=="__main__":
    app.run(port=5000)
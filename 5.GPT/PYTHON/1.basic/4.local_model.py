#pip install transformers
#~/.cache/huggingface 디렉토리에 모델들이 다운로드가 됨 
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from dotenv import load_dotenv
import os
from huggingface_hub import login

load_dotenv(dotenv_path='../.env')

hf_token = os.getenv('HF_API_TOKEN')

model_name = "gpt2"

tokenizer= AutoTokenizer.from_pretrained(model_name, use_auth_token=hf_token)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype='auto', use_auth_token=hf_token)

generator = pipeline(
    'text-generation', 
    model=model, 
    tokenizer=tokenizer,
    temperature=0.7,
    max_new_tokens=128, #출력 토큰 길이
    pad_token_id=tokenizer.eos_token_id,
    do_sample=True, #더 넓은 영역 더 풍부한 어휘력
    top_k = 50, #확률 분포상 높은 k개만 
    top_p= 0.95, #선택확률이 높은 p%내에서만 골라라
    repetition_penalty=1.2, #반복억제
    no_repeat_ngram_size=3 #3단어 이상 반복 금지
    )

prompt = "What are good fitness tips?"
print('생성시작')
outputs = generator(prompt, max_new_tokens=100)
print('끝')
print(outputs[0]["generated_text"])
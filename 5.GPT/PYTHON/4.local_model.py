#pip install transformers
#~/.cache/huggingface 디렉토리에 모델들이 다운로드가 됨 
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from dotenv import load_dotenv
import os
from huggingface_hub import login

load_dotenv(dotenv_path='../.env')

hf_token = os.getenv('HF_API_TOKEN')

model_name = "mistralai/Mistral-7B-Instruct-v0.3"

tokenizer= AutoTokenizer.from_pretrained(model_name, use_auth_token=hf_token)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype='auto', use_auth_token=hf_token)

generator = pipeline('text-generation', model=model, tokenizer=tokenizer)

prompt = "What are good fitness tips?"
print('생성시작')
outputs = generator(prompt, max_new_tokens=100)
print('끝')
print(outputs[0]["generated_text"])
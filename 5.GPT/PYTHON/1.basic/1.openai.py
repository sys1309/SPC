import os 
from dotenv import load_dotenv
from openai import OpenAI

#load_dotenv() 현재 폴더의 .env읽어오기
load_dotenv(dotenv_path= '../.env')

#client = OpenAI(
#    api_key=os.getenv('OPENAI_API_KEY') #이거 기본환경변수라서 안써도됨 
#)

client = OpenAI()

model_list = client.models.list()
for m in model_list:
    print(m.id)
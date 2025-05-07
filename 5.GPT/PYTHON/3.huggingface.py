from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv(dotenv_path="../.env")

client = InferenceClient(model= "mistralai/Mistral-7B-Instruct-v0.3")

prompt = '너 한국말 할 줄 알아?'
response = client.text_generation(prompt)

print(response)
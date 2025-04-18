import requests

url = 'https://example.com'

response = requests.get(url)
data = response.text

#이 결과는 무슨 포맷인가?
print(data)
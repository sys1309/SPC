import requests
from bs4 import BeautifulSoup

url = 'https://www.moviechart.co.kr/rank/realtime/index/image'
headers = {
    'User-Agent' = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'   
}

response = requests.get(url, headers=headers)

response.raise_for_status()

soup = BeautifulSoup(response.text, 'html-parser')

#미션 영화 ㅇㅇ을 가져오시오
#제목, URL, 상세페이지링크

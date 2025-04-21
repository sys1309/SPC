import requests
from bs4 import BeautifulSoup
import csv
import json
from urllib.parse import urlparse, urljoin
import os

BASE_URL= 'https://www.moviechart.co.kr'
MOVIERANK_URL = urljoin(BASE_URL,'/rank/realtime/index/image')
HEADERS = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }

response = requests.get(MOVIERANK_URL, headers=HEADERS)

response.raise_for_status()

soup = BeautifulSoup(response.text, 'html.parser')

#결과를 저장할 변수 
movies = []
movies_json = []

#이미지를 저장할 디렉토리를 형성
os.makedirs('thumnails', exist_ok=True)

#미션 영화 ㅇㅇ을 가져오시오
#제목, URL, 상세페이지링크
movie_cards = soup.select('div.movieBox li.movieBox-item')
print('무비카드 개수:',len(movie_cards))

def sanitization_filename(name):
    import re #정규표현식 라이브러리 임포트 
    return re.sub(r'[\\/*?<>| ]','_',name) #앞에 오는 특수문자(+공백)들 밑줄로 전환

for card in movie_cards:
    print(card)
    title_tag = card.select_one('div.movie-title h3')
    img_tag = card.select_one('img')
    link_tag = card.select_one('a')

    title= title_tag.text.strip() if title_tag else '제목 없음'
    image_url = img_tag['src'] if img_tag and img_tag.has_attr('src') else '이미지 없음'
    
    thumnail_url = urljoin(BASE_URL, image_url)
    image_data = requests.get(thumnail_url, headers=HEADERS).content
    if len(image_data) > 0:
        safe_filename = sanitization_filename(title)
        filename = f'thumbnails/{title}.jpg'
        with open(filename, 'wb') as f: #스트링말고 바이너리 데이터를 가져와서 쓸거다
            f.write(image_data)

    detail_link = 'https://www.moviechart.co.kr' + link_tag['href'] if link_tag else '링크없음'

    print(f"제목: {title}, 이미지: {image_url}, 상세이미지:{detail_link}")

    movies.append([title, image_url, detail_link])

    #json은 일반 리스트로 저장할 수 없기 때문에 dict로 저장 
    movies_json.append({
        'title' : title,
        'image_url' : image_url,
        'detail_link' : detail_link
    })

#csv파일로 저장
csv_filename = 'movie_chart.csv'
with open (csv_filename, 'w', newline= '', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['제목', '이미지URL','상세링크'])
    writer.writerows(movies)
    print(f'csv저장완료:{csv_filename}')

#json파일로 저장
json_filename = 'movie_chart.json'
with open (json_filename, 'w', encoding='utf-8') as f:
    json.dump(movies_json,f, ensure_ascii=False, indent=4)
    print(f'json저장완료:{json_filename}')
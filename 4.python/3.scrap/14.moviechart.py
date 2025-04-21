import requests
from bs4 import BeautifulSoup
import csv
import json

url = 'https://www.moviechart.co.kr/rank/realtime/index/image'
headers = {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    }

response = requests.get(url, headers=headers)

response.raise_for_status()

soup = BeautifulSoup(response.text, 'html-parser')

#결과를 저장할 변수 
movies = []
movies_json = []

#미션 영화 ㅇㅇ을 가져오시오
#제목, URL, 상세페이지링크
movie_cards = soup.select('div.movieBox li.movieBox-item')
print('무비카드 개수:',len(movie_cards))

for card in movie_cards:
    print(card)
    title_tag = card.select_one('div.movie-title h3')
    img_tag = card.select_one('img')
    link_tag = card.select_one('a')

    title= title_tag.text.strip() if title_tag else '제목 없음'
    image_url = img_tag['src'] if img_tag and img_tag.has_attr('src') else '이미지 없음'
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

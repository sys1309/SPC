import requests
from bs4 import BeautifulSoup
import selenium
import os
from urllib.parse import urljoin

url = 'https://www.moviechart.co.kr/rank/realtime/index/image'

response = requests.get(url)
movies = response.text

soup = BeautifulSoup(movies, 'html.parser')

img_folder = "posters"
os.makedirs(img_folder, exist_ok=True)

# titles = soup.select('div.movie-title')
Base = 'https://www.moviechart.co.kr'

movie_links = []

#영화 제목, 링크 
for title in soup.select('div.movie-title') :
    a_tag = title.select_one('a')
    movie_links.append(Base + a_tag['href'])

    # print("영화제목:",a_tag.text)
    # print("영화 상제 정보 링크:",Base + a_tag['href'])

# print(movie_links)

#영화 줄러기 추출
for link in movie_links[:5]: #처음 다섯개만 예시로 추출 
    detail_res = requests.get(link)
    detail_soup = BeautifulSoup(detail_res.text, 'html.parser')

    print(detail_soup.find('div', class_='text').get_text())


#영화 포스터 저장 
# for idx, img in enumerate(soup.find_all('img')):
#     img_src= img.get('src')

#     if not img_src:
#         continue
    
#     img_url = urljoin(Base, img_src)

#     ext = os.path.splitext(img_url)[-1]
#     if ext.lower() not in ['.jpg', '.jpeg', '.png']:
#         ext = '.jpg'
#     filename = f"poster_{idx+1}{ext}"
#     filepath = os.path.join(img_folder, filename)

#     try:
#         # 이미지 다운로드
#         img_data = requests.get(img_url).content

#         # 저장
#         with open(filepath, "wb") as f:
#             f.write(img_data)

#         print(f"저장됨: {filename}")

#     except Exception as e:
#         print(f"저장 실패 ({img_url}): {e}")
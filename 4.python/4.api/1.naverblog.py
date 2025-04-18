# 네이버 검색 API 예제 - 블로그 검색
from bs4 import BeautifulSoup
import os
import sys
import urllib.request
import json
client_id = "_GWXlo4d0PUY1Yqkkmxn"
client_secret = open('secret.txt', 'r').read()
encText = urllib.parse.quote("선정릉역 맛집")
url = "https://openapi.naver.com/v1/search/blog?query=" + encText + "&start=11&end=5" # JSON 결과
# url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText # XML 결과
request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id",client_id)
request.add_header("X-Naver-Client-Secret",client_secret)
response = urllib.request.urlopen(request)
rescode = response.getcode()
if(rescode==200):
    response_body = response.read()
    result = response_body.decode('utf-8')
else:
    print("Error Code:" + rescode)

data = json.loads(result) #string 에서 json으로 변환 

for item in data["items"]:
    title = item['title']
    description = item['description']
    link = item['link']

    clean_title = BeautifulSoup(title, 'html.parser').get_text()
    clean_description = BeautifulSoup(description, 'html.parser').get_text()
    clean_link = BeautifulSoup(link, 'html.parser').get_text()
    # clean_title = title.replace("<b>", "").replace("</b>", "").replace("\\/", "/")
    # clean_description = description.replace("<b>", "").replace("</b>", "").replace("\\/", "/")

    print('제목:',clean_title)
    print('요약:',clean_description)
    print('링크:',clean_link)
    print('-'*50)
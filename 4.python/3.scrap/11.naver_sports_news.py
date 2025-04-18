from bs4 import BeautifulSoup
import requests

url = 'https://sports.news.naver.com/index'

response = requests.get(url)
html = response.text
#print(html)
soup = BeautifulSoup(html, 'html.parser')

#print(soup)

#미션1. 네이버 뉴스의 타이틀만 가져와서 출력
# titles = soup.select('div.text_area strong.title')

# for title in titles:
#     title.select('strong.title') 
#     print(title.text)


#미션2. 해당 뉴스의 원본 url 출력 
# links = soup.select('li.today_item')

# for link in links:
#     link.select('a.href')
#     print(link)
news = soup.select('.today_list > li')

for n in news:
    a_tag = n.select_one('a')
    #print(a_tag['title].strip()) a 태그의 프로퍼티로 가져온다

    #title = n.select_one('.title') 클래스명 tile로 가져온다
    #print(title.text)

    strong= n.select_one('strong') #태그로 가져온다
    print(strong.text)

    news_detail_url = a_tag['href']
    print(news_detail_url)

    news_detail = requests.get(news_detail_url)
    soup = BeautifulSoup(news_detail.text,'html-parser')
    print(soup)

    article = soup.select('#comp_news_article')
    print(article)
    print(a_tag['href'])

#미션 3-1 해당 뉴스 기사 페이지의 상세내용도 가져오기



#미션3-2 긴 기사 내용 앞에 100글자만 화면에 출력하기 

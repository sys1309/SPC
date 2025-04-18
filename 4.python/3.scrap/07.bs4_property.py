#pip install beautifulsoup4

from bs4 import BeautifulSoup

html_doc = '''
    <html>
    <head>
        <title>안녕하세요</title>
    </head>
    <body>
        <div class= "container">
        <h1>안녀하세요</h1>
        <p>이것은 간단한 html</p>
        <a href = "https://www.naver.com">네이버 바로가기 </p>
        <img src = "example.jpg" alt="예제이미지">
        <img src = "example.jpg" alt="예제이미지">
        <a href = "https://www.daum.com">다음 바로가기 </p>
        </div>
        <ul>
            <li>항목1</li>
            <li>항목2</li>
            <li>항목3</li>
        </ul>
        <div class="footer">
            <p>copyright 2025</p>
        </div>
    </body>
    </html>
    '''

soup = BeautifulSoup(html_doc, 'html.parser')

#클래스가 container인 div 가져오기 
container_div = soup.find('div', class_= 'container')

link_tag = soup.a
link_tags = soup.find_all('a')
print(link_tag)
print(link_tags)

print(link_tag('href')) #태그 안의 속성 접속은 이렇게 ?
#print(link_tags('href')) #이거는 안됨 

for lt in link_tags:
    print(lt('href'))

print('*'*10)
img_tag = soup.img #첫번째 이미지 
img_tags = soup.find_all('img') #모든 이미지
img_tag2 = soup.find_all[1]#두번째 이미지 
#적절한 예외 처리를 하지않으면 나의 스크래핑이 중단 될 수도 있음 
img_tag3 = img_tags[2] if len(img_tags) > 2 else None


print(f"src:{img_tag['src']}, Alt:{'alt'}, width:{img_tag.get('width', 'No width')}, height:{img_tag.get('width', 'No width')}")
print(f"src:{img_tag2['src']}, Alt:{'alt'}, width:{img_tag2.get('width', 'No width')}, height:{img_tag2.get('width', 'No width')}")



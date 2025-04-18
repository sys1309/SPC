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
link_tag = soup.select_one('a')
print(link_tag)
print(link_tag('href'))
print(link_tag.text)

link_tags = soup.select('a')
for lt in link_tags:
    print(lt.text, lt('href'))

container_div = soup.select_one('div.container')
print('div_container', container_div)

copyright = soup.select_one('#copyright') #아이디가 카피라이트인거 
print(copyright)

div_container_p = soup.select('div.container.p') #css 입력된 스타일 
print(div_container_p)
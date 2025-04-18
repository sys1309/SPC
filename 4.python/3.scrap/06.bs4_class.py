#pip install beautifulsoup4

from bs4 import BeautifulSoup

html_doc = '''
    <html>
    <head>
        <title>안녕하세요</title>
    </head>
    <body>
        <h1>안녀하세요</h1>
        <p>이것은 간단한 html</p>
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
print(container_div)
print(container_div.h1)
print(container_div.h1.text)

#footer
footer_div = soup.find('div', class_='footer')
print(footer_div.p.text)

copyright = soup.find('div',id = 'copyright')
print(copyright.text)

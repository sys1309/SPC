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
    </body>
    </html>
    '''

soup = BeautifulSoup(html_doc, 'html.parser')
lis = soup.ul.find_all('li')
#print(li)
for li in lis:
    print(li.text)

for li in soup.ul.find_all('li'):
    print(li.text)
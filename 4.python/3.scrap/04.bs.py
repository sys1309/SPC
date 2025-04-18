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
    </body>
    </html>
    '''
soup = BeautifulSoup(html_doc, 'html.parser')
print(html_doc)
print('*'*10)
print(soup)

print(soup.title)
print(soup.h1.text)
print(soup.name.text)

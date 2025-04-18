#https://pythonscraping.com/pages/page3.html
from bs4 import BeautifulSoup
import requests

url = 'https://pythonscraping.com/pages/page3.html'

response = requests.get(url)
html = response.text
#print(html)
soup = BeautifulSoup(html, 'html.parser')
#print(soup)

# gifts = soup.find_all('tr')
table = soup.select_one('#giftList')
gifts = soup.select('#giftList > tr')

#print(gift)

# for g in gifts:
#     #print(g)
#     tds = g.select('td')
#     if (len(tds) > 0):
#      print(tds[0].text.strip(),tds[2].text.strip())

for g in gifts[1:]: #첫번째 빈 td를 제외하고 나머지 
    tds = g.select('td')
    if (len(tds) > 0):
     title = tds[0].text.strip()
     price = tds[2].text.strip()

     print(f"상품명:{tds[0].text.strip()}, 가격:{tds[2].text.strip()}")

#미션1 : 해당페이지에 요청한다

#미션2 : 해당페이지의 상품명과 가격을 출력한다


# table = soup.find("table", id="giftList")

# items = []

# # === 테이블의 각 행을 순회 ===
# for row in table.find_all("tr")[1:]:  # 첫 번째 tr은 제목 행이니까 제외
#     cols = row.find_all("td")
#     if len(cols) >= 3:
#         title = cols[0].get_text(strip=True)
#         price = cols[2].get_text(strip=True)
#         items.append((title, price))

# # === 출력 ===
# for title, price in items:
#     print(f"상품명: {title} | 가격: {price}")


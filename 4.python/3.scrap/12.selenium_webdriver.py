#pip install webdriver_manager
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup

import time
import csv

driver = webdriver.Chrome(service = ChromeService(ChromeDriverManager().install()))

driver.get('https://www.naver.com')

search_box=driver.find_element(By.NAME, 'query')
search_box.send_keys("python programming") #글자 입력만해라
search_box.submit() #제출해라

time.sleep(5)

html = driver.page_source #
driver.quit()

soup = BeautifulSoup(html, 'html.parser')

books_div = soup.select_one('div.api_subject_bx_nshopping_boolk_pc > div.book_list_wrap._book_content_root > div')
# print(books)

a_tags = books_div.select('a.item_title')

my_book_list=[]
for book in a_tags:
    title = book.text.strip()
    link = book.get('href')
    my_book_list.append({title,link})

print(my_book_list)

with open('naver_books.csv', mode='w', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(['제목', '링크'])
    writer.writerow(my_book_list)

#driver.save_screenshot('search_results.png')
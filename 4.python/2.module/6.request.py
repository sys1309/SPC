import requests

#네이버 주세요
resp = requests.get("http://naver.com")
print("웹페이지 나옴:", resp) #객체인것을 확인 객체 타입은 response
print("헤더정보:", resp.headers)
print("바디데이터는:", resp.text)
score = 85

if score > 80:
    print('A')
elif score >70:
    print('B')
elif score > 60:
    print('C')
else:
    print('f')


password = input("비밀번호를 입력하시오:")
if (len(password) >= 8):
    print('정상')
else:
    print("비밀번호가 너무 짧습니다.")

fileName = 'example.txt'

if fileName.endswith('.txt'):
    print('텍스트 파일입니다')
elif fileName.endswith(".jpg") or fileName.endswith(".png"):
    print("이미지 파일 입니다.")
else:
    print("몰느는 파일이빈다.")
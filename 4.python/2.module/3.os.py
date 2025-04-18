import os

#현재 로그인한 사용자 계정 출력 (윈도우 리눅스도 가능)
print(os.getlogin())

current_dir = os.getcwd()
print('현재 작업 디렉토리:', current_dir)

new_dir = "new_directory"
# os.mkdir(new_dir) #새 디렉토리 만들기
# os.rmdir(new_dir) #디렉토리 지우기

print(os.getenv('path'))
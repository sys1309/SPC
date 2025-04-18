numbers = [1,2,3,4,5]

for num in numbers:
    print(num)

for num in numbers:
    if num % 2 ==0:
        print(f"숫자 {num}은/는 짝수 입니다.")
    else:
        print(f"숫자 {num}은/는 홀수 입니다")


even_numbers = []
for num in numbers:
    if num % 2 ==0:
        even_numbers.append(num)

print('원래 목록은:', numbers)
print('짝수 목록은:', even_numbers)

student= {"john":80, "james": 100, "julie": 95}
for name, score in student.items():
    if score > 90:
        print('이름', name, '은 합격입니다')
    else:
        print('이름', name, '은 불합격입니다. 점수는',score)

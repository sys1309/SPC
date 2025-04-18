print('hello world')

#리스트 컴프리핸션
number = [x for x in range(10)]
print(number)

number = [x for x in range(1,5)]
print(number)

number = [x**2 for x in range(1,5)]
print(number)

number = [x**2 for x in range(10) if x % 2 == 0]
print(number)




#튜플
#리스트는 [], 튜플은 () 모든 기능 리스트와 동일 변경불가 

my_tuple = (1,2,3,4,5)
print(len(my_tuple))
print(my_tuple[0])
print(my_tuple[-1])

#my_tuple[2] = 3 #변경 시도시 오류발생

#튜플 언패킹 : 요소를분할해서 가져오는것 
a, b, c, d, e = my_tuple
print(a, b, c, d, e)
print(a)
print(b)
print(c)
print(d)
print(e)

def add(a,b):
    return a+b

print('합산:',add(a,b))

def get_status(numbers):
    return min(numbers), max(numbers), sum(numbers)/len(numbers)

status = get_status([1,2,3,4,5])
print(status)
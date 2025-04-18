x = 5
y = 'hello'
z = [1,2,3]

print(type(x))
print(type(y))
print(type(z))

print("X는 숫자냐?",isinstance(x,int))
print("X는 글자냐?",isinstance(x,str))
print("Y는 글자냐?",isinstance(y,str))

class A:
    pass

class B(A): #B라는 객체는 A를 상속받는다. class B extends A
    pass

class C:
    pass

b = B() #객체를 실체화 instantiation
print(isinstance(b, A))
print(isinstance(b, B))
print(isinstance(b, C))

a = A()
print(isinstance(a, A))
print(isinstance(a, B))
print(isinstance(a, C))

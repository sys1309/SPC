def greet(name):
    print(f"hello, {name}")
    #리턴이 없다

greet('Alice')

#인자 두개 받기
def add(x,y):
    print(x)
    return x + y #리턴이 있는것 

result = add(2,3)
print(result)

#함수 인자의 기본값
def greet_default(name = 'Guest'):
    print(f"Hello, {name}!")

greet_default()
greet_default('john')

#함수 인자 위치 지정도 가능함
def example(a, b, c):
    print(f"a:{a}, b:{b}, c:{c}")

example(1,2,3)
example(a=1,b=2,c=3)
example(a=1,b=3,c=2)

def print_gugudan():
    for dan in range(2,10):
        print(f"{dan}단")
        for i in range(1,10):
            print(f"{dan} X {i} = {dan*i}")

print_gugudan()

print('-'*50)

# print([print_gugudan(i) for i in range(2,10)])




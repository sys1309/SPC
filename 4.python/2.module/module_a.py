def function_a1():
    print('module_a: function_a1 호출됨')
    function_a2()

def function_a2():
    print('module_a: function_a2 호출됨')
    function_a3()

def function_a3():
    print('module_a: functfunction_a3ion_a1 호출됨')
    function_hello()

def function_hello():
    print('module_a: function_hello 호출됨')
    function_goodbye()

def function_goodbye():
    print('module_a: function_goodbye 호출됨')
    raise RuntimeError('의도적으로 에러발생시키기')


def function_b1(value):
    print('module_a: function_a1 호출됨')
    function_b2(value)

def function_b2(value):
    print('module_a: function_a2 호출됨')
    function_b3(value)

def function_b3(value):
    print('module_a: functfunction_a3ion_a1 호출됨')
    function_hello(value)

def function_hello(value):
    print('module_a: function_hello 호출됨')
    function_goodbye(value)

def start_program(value):
    print('module_a: function_goodbye 호출됨')
    raise RuntimeError('의도적으로 에러발생시키기')

if __name__ == '__main__':
    print('module_a 메인함수')

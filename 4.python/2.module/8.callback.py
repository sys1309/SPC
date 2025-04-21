import module_a


def start_program():
    print('메인에서 이 함수 호출')
    module_a.function_a1()
    try:
        module_a.function_b1(5)
    except:


if __name__ == '__main__': #파이썬에서 메인함수
    print(__name__)
    start_program()
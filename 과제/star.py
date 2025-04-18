for i in range(6):
    print('*' * i)

for i in range(6):
    print(' '*(6 - (i+1)), end="")
    print('*'*(i))

for i in range(6):
    print(' '*((6-1)-i), end='')
    print('*'*(2 * i + 1))

for i in range(6):
    print(' ' * i + '*' * (2 * (6 - i) - 1))



    
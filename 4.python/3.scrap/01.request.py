import requests

url = 'https://jsonplaceholder.typicode.com/users'

response = requests.get(url)
users = response.json()

print(response)

for user in users:
    print(user)
    print('*'*10)
    print('name')
    id =user['id']
    name = user['name']
    username = user['username']
    email = user['email']

    print(f"{id:2} {name:30} {username:25} {email:20}") #글자수 제한 ?

import requests 

url = 'https://jsonplaceholder.typicode.com/users'

#js에서 돌리는 객체를 파이썬에서는 딕셔너리 라고함 
new_post = {
    'userId': 1,
    'title': 'hello',
    'body': 'world'
}

response = requests.post(url,json=new_post)
print(response.json)

post_id = 1

updated_post = {
    'userId' : 1, 
    'title': 'hello again',
    'body': 'world again'
}

response = requests.put(f"{url}/{post_id}",json=new_post)
print(response.json())

print('----patch----')
patch_data = {
    "title" : "partial name change"
}

response = requests.patch(f"{url}/{post_id}",json=new_post)
print(response.json())

print('----delete----')
response = requests.delete(f"{url}/{post_id}",json=new_post)
print(response.status_code)
print(response.json())
my_dict = {
    "name" : "Alice",
    "age" : 25,
    "location" : "Seoul"
}

print(my_dict)
print('이름은',my_dict["name"])
print('나이는',my_dict["age"])

my_dict["age"] = 25
print('나이는',my_dict["age"])

my_dict["car"] = "hyundai K5"
print('내 차는',my_dict["car"])
print(my_dict)

key_list = list(my_dict.keys())
print("값들은", key_list)

values_list = list(my_dict.values())
print("값들은", values_list)

for key, value in my_dict.items():
    print(f"키:{key}, 값:{value}")
    




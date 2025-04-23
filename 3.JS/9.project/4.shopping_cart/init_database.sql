create table if not exists users(
    id integer primary key autoincrement,
    username text unique not null,
    password text not null
);

create table if not exists products(
    id integer primary key autoincrement,
    name text not null,
    price integer not null
);

incert into users(username, password) values('user1', 'password')
incert into users(username, password) values('user1', 'password')

incert into products(name, price) values('apple', 2000)
incert into products(name, price) values('banana', 3000)
incert into products(name, price) values('orange', 1500)



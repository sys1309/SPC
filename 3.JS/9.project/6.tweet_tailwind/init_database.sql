create table if not exists user (
    id integer primary key autoincrement,
    username text unique not null,
    email text not null,
    password text not null
);

create table if not exists tweet (
    id integer primary key autoincrement,
    content text not null,
    user_id integer not null,
    likes_count integer default 0, -- 3정규화에 의해 like
    foreign key(user_id) references user(id)
);

create table if not exists like (
    id integer primary key autoincrement,
    user_id integer not null, -- user table
    tweet_id integer not null, -- tweet table
    foreign key(user_id) references user(id),
    foreign key(tweet_id) references tweet(id)
);


-- sample data 실무에서는 비밀번호는 암호화 
insert into user(username, email, password) values
('user1', 'user1@example.com', 'password1'),
('user2', 'user2@example.com', 'password2'),
('user3', 'user3@example.com', 'password3');


insert into tweet(content, user_id, likes_count) values
('안녕하세요, 첫번째 글입니다.', 1, 0),
('두번째 글입니다.', 2, 0);
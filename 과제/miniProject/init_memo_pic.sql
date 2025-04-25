create table if not exists memo_pic(
    id integer primary key autoincrement,
    title text,
    content text,
    img_path text
)
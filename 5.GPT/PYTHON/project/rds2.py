import psycopg2

#rds 접속정보
host = 't4p.ceh7gjpk6igj.us-east-1.rds.amazonaws.com'
port = 5432
user='postgres'
password = 'trip2025'
dbname= ''

conn = psycopg2.connect(
    host=host,
    user=user,
    password=password,
    port=port,
    dbname=''
)

cur = conn.cursor()

# 테이블 목록 보기
cur.execute("""
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
""")
print("테이블 목록:")
print(cur.fetchall())

# 예시 테이블 내용 보기
# cur.execute("SELECT * FROM your_table_name LIMIT 5;")
# print("테이블 내용:")
# print(cur.fetchall())

cur.close()
conn.close()
import psycopg2

#rds 접속정보
host = 't4p.ceh7gjpk6igj.us-east-1.rds.amazonaws.com'
port = 5432
user='postgres'
password = 'trip2025'
# db_name= ''

try:
    #연결하기
    conn = psycopg2.connect(
        host=host,
        user=user,
        password=password,
        port=port
    )

    #커서 만들고 쿼리 실행
    cursor = conn.cursor()
    cursor.execute('select * from trip limit 5;')

    #결과 출력
    results = cursor.fetchall()
    for row in results:
        print(row)

    cursor.close()
    conn.close()

except Exception as e:
    print('접속실패:',e)
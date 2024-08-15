import sqlite3 
from .config import IS_PROD

db_path = "/home/site/wwwroot/database.db" if IS_PROD else "data.db"

def connect():
    con = sqlite3.connect(db_path)
    cur = con.cursor()
    return con,cur 

def createTables():
    con,cur = connect()
    cur.execute("CREATE TABLE IF NOT EXISTS count (value integer)") 
    cur.execute("CREATE TABLE IF NOT EXISTS User (email varchar, generations int, premium int)")
    con.commit()
    con.close()

def increment(email):
    con,cur = connect()
    cur.execute("select * from count")
    data = cur.fetchall()
    if len(data) == 0:
        cur.execute("insert into count values(1)")
    else:
        cur.execute("update count set value = value + 1") 
    if email:
        cur.execute("update User set generations = generations + 1 where email = ?",(email,))
    con.commit()
    con.close()

def get_count():
    con,cur = connect()
    cur.execute("select * from count")
    data = cur.fetchall()
    return data 

def login_register(email):
    con,cur = connect()
    cur.execute("select * from User where email = ?",(email,))
    if len(cur.fetchall()) > 0:
        return True
    cur.execute("Insert into User values(?,0,0)",(email,))
    con.commit()
    con.close()
    return True
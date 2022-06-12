package models

import (
	_ "github.com/mattn/go-sqlite3"
	"database/sql"
)

var DB *sql.DB

func ConnectDatabase() {
	var err error
	DB, err = sql.Open("sqlite3", ".database.db")
	if err != nil {
		panic(err)
	}
	if err = DB.Ping(); err != nil {
		panic(err)
	}
	DB.Exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, password TEXT, role TEXT, username TEXT, phone TEXT)")
	DB.Exec("CREATE TABLE IF NOT EXISTS learning (id INTEGER PRIMARY KEY, header TEXT, sub_header TEXT, content TEXT, image TEXT)")
}
package models

import (
	_ "github.com/mattn/go-sqlite3"
	"database/sql"
)

var DB *sql.DB

func ConnectDatabase() {
	var err error
	// Connect to the database and handle any errors
	DB, err = sql.Open("sqlite3", ".database.db")
	if err != nil {
		panic(err)
	}
	if err = DB.Ping(); err != nil {
		panic(err)
	}
	// Create the table if it doesn't exist
	DB.Exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, password TEXT, role TEXT, username TEXT, phone TEXT)")
	DB.Exec("CREATE TABLE IF NOT EXISTS learning (id INTEGER PRIMARY KEY, header TEXT, sub_header TEXT, content TEXT, image TEXT)")
	DB.Exec("CREATE TABLE IF NOT EXISTS histories (id INTEGER PRIMARY KEY, user_id INTEGER, learning_id INTEGER, header TEXT, sub_header TEXT)")
	DB.Exec("CREATE TABLE IF NOT EXISTS discussions (id INTEGER PRIMARY KEY, user_id INTEGER, learning_id INTEGER, username TEXT, message TEXT, created_at TEXT)")
	//create table home with collume id , title , author , position , link
	DB.Exec("CREATE TABLE IF NOT EXISTS homes (id INTEGER PRIMARY KEY, title TEXT, author TEXT, position TEXT, link TEXT)")
}
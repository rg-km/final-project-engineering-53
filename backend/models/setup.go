package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/mattn/go-sqlite3"
)

var DB *gorm.DB

func ConnectDataBase() {
	database, err := gorm.Open("sqlite3", "sqlite.db")

	if err != nil {
		panic("Failed to connect to database!")
	}
	
	database.AutoMigrate(&User{})

	DB = database
		
}
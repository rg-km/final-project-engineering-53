package models

import (
	"sort"
)

type Home struct {
	ID        uint   `json:"id"`
	Title string `json:"title"`
	Author string `json:"author"`
	Position string `json:"position"`
	Link string `json:"link"`
}

func SaveHome(home *Home) (*uint, error) {
	//save to Home
	var id uint
	// insert the data to the database from controller with function SaveHome
	err := DB.QueryRow("INSERT INTO homes (title, author, position, link) VALUES (?, ?, ?, ?) RETURNING id", home.Title, home.Author, home.Position, home.Link).Scan(&id)
	return &id, err
}
func GetHome() ([]Home, error) {
	var homes []Home
	// get the data from the database table homes with function GetHome
	rows, err := DB.Query("SELECT * FROM homes")
	if err != nil {
		return homes, err
	}
	// loop through the data and save to the variable homes
	for rows.Next() {
		var h Home
		// save the data to the variable h
		err = rows.Scan(&h.ID, &h.Title, &h.Author, &h.Position, &h.Link)
		if err != nil {
			return homes, err
		}
		// append the data to the variable homes
		homes = append(homes, h)
	}
	// sort the data by id
	sort.Slice(homes, func(i, j int) bool {
		return homes[i].ID > homes[j].ID
	})
	// return the data
	return homes, nil
}
func DeleteHome(id string) error {
	// delete the data from the database table homes with function DeleteHome
	_, err := DB.Exec("DELETE FROM homes WHERE id = ?", id)
	return err
}
func UpdateHome(home *Home) error {
	// update the data from the database table homes with function UpdateHome
	_, err := DB.Exec("UPDATE homes SET title = ?, author = ?, position = ?, link = ? WHERE id = ?", home.Title, home.Author, home.Position, home.Link, home.ID)
	return err
}
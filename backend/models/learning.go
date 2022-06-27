package models

import (
	"os"
	"sort"
)

type Learning struct {
	ID        uint   `json:"id"`
	Header    string `json:"header"`
	SubHeader string `json:"sub_header"`
	Content   string `json:"content"`
	Image     string `json:"image"`
}

func SaveLearning(learning *Learning) (uint, error) {
	// Insert the learning into the database and get the id
	err := DB.QueryRow("INSERT INTO learning (header, sub_header, content, image) VALUES (?, ?, ?, ?) RETURNING id", learning.Header, learning.SubHeader, learning.Content, learning.Image).Scan(&learning.ID)
	return learning.ID, err
}
func GetLearning() ([]Learning, error) {
	// Get all the learning from the database
	var learning []Learning
	//find all the learning from the database and rows is a pointer to a slice of structs
	rows, err := DB.Query("SELECT * FROM learning")
	if err != nil {
		return learning, err
	}
	// Loop through the rows and add them to the learning slice
	for rows.Next() {
		var l Learning
		// Scan the row into the learning struct
		err = rows.Scan(&l.ID, &l.Header, &l.SubHeader, &l.Content, &l.Image)
		if err != nil {
			// If there is an error, return the error
			return learning, err
		}
		// Add the learning to the learning slice
		learning = append(learning, l)
	}
	// Sort the learning by id and return the latest learning
	sort.Slice(learning, func(i, j int) bool {
		return learning[i].ID > learning[j].ID
	})
	// Return the learning
	return learning, nil
}
func GetLearningById(id uint) (Learning, error) {
	// Get the learning from the database
	var learning Learning
	// Get the learning from the database with the id learning.ID
	err := DB.QueryRow("SELECT * FROM learning WHERE id = ?", id).Scan(&learning.ID, &learning.Header, &learning.SubHeader, &learning.Content, &learning.Image)
	// Return the learning
	return learning, err
}

func UpdateLearning(id uint, learning *Learning) (*Learning, error) {
	var Learning Learning
	err := DB.QueryRow("SELECT * FROM learning WHERE id = ?", id).Scan(&Learning.ID, &Learning.Header, &Learning.SubHeader, &Learning.Content, &Learning.Image)
	if err != nil {
		return nil, err
	}

	_, err = DB.Exec("UPDATE learning SET header = ?, sub_header = ?, content = ?, image = ? WHERE id = ?", learning.Header, learning.SubHeader, learning.Content, learning.Image, id)
	return learning, err
}
func DeleteLearning(id uint) error {
	var learning Learning
	err := DB.QueryRow("SELECT * FROM learning WHERE id = ?", id).Scan(&learning.ID, &learning.Header, &learning.SubHeader, &learning.Content, &learning.Image)
	if err != nil {
		return err
	}
	err = os.Remove(learning.Image)
	if err != nil {
		return err
	}
	_, err = DB.Exec("DELETE FROM learning WHERE id = ?", id)
	return err
}
func SearchLearning(keyword string) ([]Learning, error) {
	// Get all the learning from the database
	var learning []Learning
	//find all the learning from the database and rows is a pointer to a slice of structs
	rows, err := DB.Query("SELECT * FROM learning WHERE header LIKE ? OR sub_header LIKE ?", "%"+keyword+"%", "%"+keyword+"%")
	if err != nil {
		return learning, err
	}
	// Loop through the rows and add them to the learning slice
	for rows.Next() {
		// Create a new learning struct
		var l Learning
		// Scan the row into the learning struct
		err = rows.Scan(&l.ID, &l.Header, &l.SubHeader, &l.Content, &l.Image)
		if err != nil {
			return learning, err
		}
		// Add the learning to the learning slice
		learning = append(learning, l)
	}
	// Return the learning slice sorted by id
	sort.Slice(learning, func(i, j int) bool {
		return learning[i].ID > learning[j].ID
	})
	// Return the learning
	return learning, nil
}
//get image name by id
func GetImageNameById(id uint) (string) {
	var image string
	DB.QueryRow("SELECT image FROM learning WHERE id = ?", id).Scan(&image)
	return image
}
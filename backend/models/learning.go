package models

import (
	"sort"
)

type Learning struct {
	ID        uint   `json:"id"`
	Header	string `json:"header"`
	SubHeader string `json:"sub_header"`
	Content	string `json:"content"`
	Image	string `json:"image"`
}
func SaveLearning(learning *Learning) (uint, error) {
	err := DB.QueryRow("INSERT INTO learning (header, sub_header, content, image) VALUES (?, ?, ?, ?) RETURNING id", learning.Header, learning.SubHeader, learning.Content, learning.Image).Scan(&learning.ID)
	return learning.ID, err
}
func GetLearning() ([]Learning, error) {
	var learning []Learning
	rows, err := DB.Query("SELECT * FROM learning")
	if err != nil {
		return learning, err
	}
	for rows.Next() {
		var l Learning
		err = rows.Scan(&l.ID, &l.Header, &l.SubHeader, &l.Content, &l.Image)
		if err != nil {
			return learning, err
		}
		learning = append(learning, l)
	}
	sort.Slice(learning, func(i, j int) bool {
		return learning[i].ID > learning[j].ID
	})
	return learning, nil
}
func GetLearningById(id uint) (Learning, error) {
	var learning Learning
	err := DB.QueryRow("SELECT * FROM learning WHERE id = ?", id).Scan(&learning.ID, &learning.Header, &learning.SubHeader, &learning.Content, &learning.Image)
	return learning, err
}
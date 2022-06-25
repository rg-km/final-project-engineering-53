package models

import (
	"sort"
)

type History struct {
	ID        uint   `json:"id"`
	UserID    uint   `json:"user_id"`
	LearningID uint   `json:"learning_id"`
	Header	string `json:"header"`
	SubHeader string `json:"sub_header"`
}
func SaveHistory(history *History) (*History, error) {
	//save to History
	err := DB.QueryRow("INSERT INTO histories (user_id, learning_id, header, sub_header) VALUES (?, ?, ?, ?) RETURNING id", history.UserID, history.LearningID, history.Header, history.SubHeader).Scan(&history.ID)
	return history, err
}
func GetHistory(userID uint) ([]History, error) {
	var histories []History
	rows, err := DB.Query("SELECT * FROM histories WHERE user_id = ?", userID)
	if err != nil {
		return histories, err
	}
	for rows.Next() {
		var h History
		err = rows.Scan(&h.ID, &h.UserID, &h.LearningID, &h.Header, &h.SubHeader)
		if err != nil {
			return histories, err
		}
		histories = append(histories, h)
	}
	sort.Slice(histories, func(i, j int) bool {
		return histories[i].ID > histories[j].ID
	})

	return histories, nil
}
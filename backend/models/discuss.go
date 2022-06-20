package models

import (
	"time"
	"sort"
)
type Discussion struct {
	ID        uint   `json:"id"`
	UserID    uint   `json:"user_id"`
	LearningID uint   `json:"learning_id"`
	Username  string `json:"username"`
	Message   string `json:"message"`
	CreatedAt string `json:"created_at"`
}
//get discussion by learning id
func GetDiscussionByLearningId(learningId uint) ([]Discussion, error) {
	//init var discussion
	var discussions []Discussion
	//get discussion by learning id from database 
	rows, err := DB.Query("SELECT * FROM discussions WHERE learning_id = ?", learningId)
	if err != nil {
		//return error
		return discussions, err
	}
	//loop rows and append to discussions 
	for rows.Next() {
		//init var discussion
		var discussion Discussion
		//get discussion from database
		err = rows.Scan(&discussion.ID, &discussion.UserID, &discussion.LearningID, &discussion.Username, &discussion.Message, &discussion.CreatedAt)
		if err != nil {
			return discussions, err
		}
		//append discussion to discussions 
		discussions = append(discussions, discussion)
	}
	//sort discussions by id
	sort.Slice(discussions, func(i, j int) bool {
		return discussions[i].ID > discussions[j].ID
	})
	//return discussions
	return discussions, nil
}
func SaveDiscussion(discussion *Discussion) (*Discussion, error) {
	//save to Discussion table
	err := DB.QueryRow("INSERT INTO discussions (user_id, learning_id, username, message, created_at) VALUES (?, ?, ?, ?, ?) RETURNING id", discussion.UserID, discussion.LearningID, discussion.Username, discussion.Message, GetTimeNow()).Scan(&discussion.ID)
	return discussion, err
}
func GetTimeNow() string {
	//get time now
	return time.Now().Format("2006-01-02 15:04:05")
}
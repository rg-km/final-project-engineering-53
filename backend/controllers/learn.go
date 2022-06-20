package controllers

import (
	"futuremap/models"
	"math/rand"
	"strconv"
	"futuremap/utils/token"
	"github.com/gin-gonic/gin"
)

func Learning(c *gin.Context) {
	//input learning data with post form method
	learning := models.Learning{}
	learning.Header = c.PostForm("header")
	learning.SubHeader = c.PostForm("sub_header")
	learning.Content = c.PostForm("content")
	//input image data with post formfile method
	image, err := c.FormFile("image")
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, save image to local disk and save image path to database with random number + image name
	imageName := "./public/images/" + strconv.FormatUint(uint64(rand.Int63()), 10) + image.Filename
	err = c.SaveUploadedFile(image, imageName)
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, save image path to database
	learning.Image = imageName
	//save learning data to database with function SaveLearning from models learning.go
	_, err = models.SaveLearning(&learning)
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, return with success message
	c.JSON(200, gin.H{"message": "success"})
}
func LearningList(c *gin.Context) {
	//get learning list from database
	var learning []models.Learning
	//using the function GetLearningList from models learning.go to get learning list
	learning, err := models.GetLearning()
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, return with learning list
	c.JSON(200, gin.H{"learning": learning})
}
func GetLearningById(c *gin.Context) {
	//get learning id from url
	id := c.Param("id")
	//convert id string to uint64 with function ParseUint from strconv package
	id_uint, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//get learning from database with id and function GetLearningById from models learning.go
	learning, err := models.GetLearningById(uint(id_uint))
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//extract token from id user if click detail learning
	user_id,err := token.ExtractTokenID(c)
	//if errror, return with error message
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	history := models.History{}
	//set user id to history
	history.UserID = uint(user_id)
	//set learning id to history
	history.LearningID = uint(id_uint)
	//set learning header id to history
	history.Header = learning.Header
	//set learning sub header id to history
	history.SubHeader = learning.SubHeader
	//save history to database with function SaveHistory from models history.go
	_,err = models.SaveHistory(&history)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, return with learning
	c.JSON(200, gin.H{"learning": learning})
}
//get history list from database
func GetHistory(c *gin.Context){
	//extract token and show history list by id 
	user_id,err := token.ExtractTokenID(c)
	//if error, return with error message
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//get history list from database with user id and function GetHistory from models history.go
	history,err := models.GetHistory(uint(user_id))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, return with history list
	c.JSON(200, gin.H{"history": history})
}
func UpdateLearning(c *gin.Context) {
	id := c.Param("id")
	id_uint, err := strconv.ParseUint(id, 10, 64)
	learning := models.Learning{}
	learning.Header = c.PostForm("header")
	learning.SubHeader = c.PostForm("sub_header")
	learning.Content = c.PostForm("content")
	image, err := c.FormFile("image")
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	imageName := "./public/images/" + strconv.FormatUint(uint64(rand.Int63()), 10) + image.Filename
	err = c.SaveUploadedFile(image, imageName)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	learning.Image = imageName
	_, err = models.UpdateLearning(uint(id_uint), &learning)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}
func DeleteLearning(c *gin.Context) {
	id := c.Param("id")
	id_uint, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = models.DeleteLearning(uint(id_uint))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}
func MakeDiscussion(c *gin.Context){
	id := c.Param("id")
	//get discussion by id learning
	user_id,err := token.ExtractTokenID(c)
	//extract token id user
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//convert id string to uint64 with function ParseUint from strconv package
	learning_id, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	discussion := models.Discussion{}
	//set message to discussion
	discussion.Message = c.PostForm("message")
	//set user id to discussion
	discussion.UserID = uint(user_id)
	user,err := models.GetUserID(uint(user_id))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//set user name to discussion
	discussion.Username = user.Username
	//get time now
	discussion.CreatedAt = models.GetTimeNow()
	//set learning id to discussion
	discussion.LearningID = uint(learning_id)
	//save discussion to database with function SaveDiscussion from models discussion.go
	_,err = models.SaveDiscussion(&discussion)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, return with message success
	c.JSON(200, gin.H{"message": "success"})
}
//show discussion by learning id
func ShowDiscussion(c *gin.Context){
	//get learning id from url
	id := c.Param("id")
	//convert id string to uint64 with function ParseUint from strconv package
	id_uint, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//get discussion from database with learning id and function GetDiscussion from models discussion.go
	discussion,err := models.GetDiscussionByLearningId(uint(id_uint))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, return with discussion
	c.JSON(200, gin.H{"discussion": discussion})
}
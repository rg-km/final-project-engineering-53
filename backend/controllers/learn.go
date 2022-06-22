package controllers

import (
	"futuremap/models"
	"math/rand"
	"strconv"

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
	//if no error, return with learning
	c.JSON(200, gin.H{"learning": learning})
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

package controllers

import (
	"github.com/gin-gonic/gin"
	"futuremap/models"	
	"strconv"
	"math/rand"
)

func Learning(c *gin.Context) {

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
	_, err = models.SaveLearning(&learning)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"message": "success"})
}
func LearningList(c *gin.Context) {
	var learning []models.Learning
	learning, err := models.GetLearning()
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"learning": learning})
}
func GetLearningById(c *gin.Context) {
	id := c.Param("id")
	id_uint, err := strconv.ParseUint(id, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	learning, err := models.GetLearningById(uint(id_uint))
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, gin.H{"learning": learning})
}

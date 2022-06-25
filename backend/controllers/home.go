package controllers

import (
	"github.com/gin-gonic/gin"
	"futuremap/models"
	"net/http"
)
type HomeInput struct {
	Title string `json:"title"`
	Author string `json:"author"`
	Position string `json:"position"`
	Link string `json:"link"`
}
func Home (c *gin.Context) {
	var input HomeInput
	err := c.ShouldBindJSON(&input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//save the data to the database
	data := models.Home{
		//set Title with data from input Title
		Title: input.Title,
		//set Author with data from input Author
		Author: input.Author,
		//set Position with data from input Position
		Position: input.Position,
		//set Link with data from input Link
		Link: input.Link,
	}
	//save the data to the database with function SaveHome from models home.go
	models.SaveHome(&data)
	c.JSON(http.StatusOK, gin.H{"message": "success"})
}

func HomeList (c *gin.Context) {
	var home []models.Home
	home, err := models.GetHome()
	if err != nil {
		//if error, return with error message
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//if no error, return with learning list
	c.JSON(200, gin.H{"home": home})

}
func DeleteHome (c *gin.Context) {
	//get the id from the url
	id := c.Param("id")
	//delete the data from the database with function DeleteHome from models home.go
	models.DeleteHome(id)
	//return message success
	c.JSON(http.StatusOK, gin.H{"message": "success"})
}
func UpdateHome (c *gin.Context) {
	var input HomeInput
	err := c.ShouldBindJSON(&input)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//save the data to the database
	data := models.Home{
		//set Title with data from input Title
		Title: input.Title,
		//set Author with data from input Author
		Author: input.Author,
		//set Position with data from input Position
		Position: input.Position,
		//set Link with data from input Link
		Link: input.Link,
	}
	//save the data to the database with function UpdateHome from models home.go
	models.UpdateHome(&data)
	//return message success
	c.JSON(http.StatusOK, gin.H{"message": "success"})
}
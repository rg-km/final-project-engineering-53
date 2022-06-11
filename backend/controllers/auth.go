package controllers

import (
	"github.com/gin-gonic/gin"
	"futuremap/models"
	"futuremap/utils/token"
	"net/http"

)
type RegisterInput struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	Username  string `json:"username"`
	Phone    string `json:"phone"`
}
type RegisterAdminInput struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	Username  string `json:"username"`
	Phone    string `json:"phone"`
}
type LoginInput struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
}
func Register(c *gin.Context) {
	var input RegisterInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//exec data in input
	user := models.User{
		Email:     input.Email,
		Password:  input.Password,
		Username:  input.Username,
		Phone:    input.Phone,
		Role : "client",
	}
	models.SaveUser(&user)
	c.JSON(200, gin.H{"message": "success"})
}
func RegisterAdmin(c *gin.Context) {
	var input RegisterAdminInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	user := models.User{
		Email:     input.Email,
		Password:  input.Password,
		Username:  input.Username,
		Phone:    input.Phone,
		Role : "admin",
	}
	models.SaveUser(&user)
	c.JSON(200, gin.H{"message": "success"})
}

func Login(c *gin.Context) {
	var input LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	user := models.User{
		Email:     input.Email,
		Password:  input.Password,
	}
	token, err := models.Login(user.Email, user.Password)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid email or password"})
		return
	}
	c.JSON(200, gin.H{"token": token})
}
func CurrentUser(c *gin.Context){
	//extract token from header and check if valid
	user_id, err := token.ExtractTokenID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//get user by id
	u,err := models.GetUserID(user_id)
	//if error return error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//remove password from user
	u.Password = ""
	//return user data if no error
	c.JSON(http.StatusOK, gin.H{"message":"success","data":u})
}
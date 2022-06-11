package controllers

import (
	"net/http"
  	"github.com/gin-gonic/gin"
	"futuremap/models"
	"futuremap/utils/token"
)

func ShowUserClient(c *gin.Context){
	user_id, err := token.ExtractTokenID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	u,err := models.GetUserClientByID(user_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message":"success","data":u})
}

func ShowUser(c *gin.Context){
	user_id, err := token.ExtractTokenIDAdmin(c)
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	u,err := models.GetUserByID(user_id)
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message":"success","data":u})
}

type LoginClientInput struct {
	Email  string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}
func LoginClient(c *gin.Context) {
	var inputclient LoginClientInput
	if err := c.ShouldBindJSON(&inputclient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	u := models.User{}
	u.Email = inputclient.Email
	u.Password = inputclient.Password
	u.Role = "client"
	token, err := models.LoginCheckClient(u.Email, u.Password, u.Role)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email or password is incorrect."})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token":token})

}
type LoginInput struct {
	Email string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func Login(c *gin.Context) {
	var input LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	u := models.User{}
	u.Email = input.Email
	u.Password = input.Password
	u.Role = "admin"
	token, err := models.LoginCheck(u.Email, u.Password,u.Role)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "email or password is incorrect."})
		return
	}
	c.JSON(http.StatusOK, gin.H{"token":token})

}

type RegisterClientInput struct{
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Email string `json:"email" binding:"required"`
	Phone string `json:"phone" binding:"required"`
}
type RegisterInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
	Email string `json:"email" binding:"required"`
	Phone string `json:"phone" binding:"required"`
}
func RegisterClient(c *gin.Context){
	var input RegisterClientInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	u := models.User{}
	u.Username = input.Username
	u.Email = input.Email
	u.Phone = input.Phone
	u.Password = input.Password
	u.Role = "client"
	_,err := u.SaveUserClient()
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message":"registration success"})
}
func Register(c *gin.Context){
	var input RegisterInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	u := models.User{}
	u.Username = input.Username
	u.Email = input.Email
	u.Phone = input.Phone
	u.Password = input.Password
	u.Role = "admin"
	_,err := u.SaveUser()
	if err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message":"registration success"})

}

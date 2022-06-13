package controllers

import (
	"github.com/gin-gonic/gin"
	"futuremap/models"
	"futuremap/utils/token"
	"net/http"
	"math/rand"

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
type UpdateProfileInput struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	Username  string `json:"username"`
	Phone    string `json:"phone"`
}
type ResetPasswordInput struct {
	Email     string `json:"email"`
	Phone	string `json:"phone"`
}
type LoginInput struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
}
func Register(c *gin.Context) {
	//get data input from struct RegisterInput
	var input RegisterInput
	//check if data input is valid
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//create new user from struct RegisterInput
	user := models.User{
		//set Email with data from input Email
		Email:     input.Email,
		//set Password with data from input Password
		Password:  input.Password,
		//set Username with data from input Username
		Username:  input.Username,
		//set Phone with data from input Phone
		Phone:    input.Phone,
		//set Role with string client
		Role : "client",
	}
	//save user to database with function SaveUser from models user.go
	models.SaveUser(&user)
	//return message success
	c.JSON(200, gin.H{"message": "success"})
}

func RegisterAdmin(c *gin.Context) {
	//get data input from struct RegisterAdminInput
	var input RegisterAdminInput
	//check if data input is valid
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//create new user from struct RegisterAdminInput
	user := models.User{
		//set Email with data from input Email
		Email:     input.Email,
		//set Password with data from input Password
		Password:  input.Password,
		//set Username with data from input Username
		Username:  input.Username,
		//set Phone with data from input Phone
		Phone:    input.Phone,
		//set Role with string admin
		Role : "admin",
	}
	//save user to database with function SaveUser from models user.go
	models.SaveUser(&user)
	//return message success
	c.JSON(200, gin.H{"message": "success"})
}

func Login(c *gin.Context) {
	//get data input from struct LoginInput
	var input LoginInput
	//check if data input is valid
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//create new user from struct LoginInput to check login with function Login
	user := models.User{
		//set Email with data from input Email
		Email:     input.Email,
		//set Password with data from input Password
		Password:  input.Password,
	}
	//check if user is valid with function Login from models user.go
	token, err := models.Login(user.Email, user.Password)
	if err != nil {
		//if user is not valid, return message error
		c.JSON(400, gin.H{"error": "Invalid email or password"})
		return
	}
	//if user is valid, return token
	c.JSON(200, gin.H{"token": token})
}
func CurrentUser(c *gin.Context){
	//get token from header Authorization
	user_id, err := token.ExtractTokenID(c)
	if err != nil {
		//if token is not valid, return message error
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//get user from database with function GetUserID from models user.go
	u,err := models.GetUserID(user_id)
	//if user is not valid, return message error
	if err != nil {
		//if user is not valid, return message error
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//set data password to empty string to avoid showing password
	u.Password = ""
	//return user data
	c.JSON(http.StatusOK, gin.H{"message":"success","data":u})
}
func ResetPassword(c *gin.Context) {
	//get data input from struct ResetPasswordInput
	var input ResetPasswordInput
	//check if data input is valid
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//create new user from struct ResetPasswordInput
	user := models.User{
		//set Email with data from input Email
		Email:     input.Email,
		//set Phone with data from input Phone
		Phone:	input.Phone,
	}
	//send email and userphone to function GetUserEmailPhone from models user.go
	u,err := models.GetUserEmail(user.Email,user.Phone)
	//if user is not valid, return message error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//if valid, generate random password 
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
	//set b to empty string
	b := make([]rune, 8)
	for i := range b {
		//set b with random letter from letters
		b[i] = letters[rand.Intn(len(letters))]
	}
	//set password to string b
	u.Password = string(b)
	//save user to database with function Update from models user.go
	models.UpdateUser(&u)
	//return message success and random password 
	c.JSON(200, gin.H{"message": "success","password":string(b)})
}
func UpdateProfile(c *gin.Context) {
	//get token from header Authorization
	var input UpdateProfileInput
	//check if data input is valid
	if err := c.ShouldBindJSON(&input); err != nil {
		//if data input is not valid, return message error
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	//get user_id from token with function ExtractTokenID from token.go
	user_id, err := token.ExtractTokenID(c)
	if err != nil {
		//if token is not valid, return message error
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//get user from database with function GetUserID from models user.go
	u,err := models.GetUserID(user_id)
	if err != nil {
		//if user is not valid, return message error
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	//set Email with data from input Email
	u.Email = input.Email
	//set Username with data from input Username
	u.Username = input.Username
	//set Phone with data from input Phone
	u.Phone = input.Phone
	//set Password with data from input Password
	u.Password = input.Password
	//save user to database with function UpdateUser from models user.go
	models.UpdateUser(&u)
	//return message success
	c.JSON(200, gin.H{"message": "success"})
}

package token

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	jwt "github.com/dgrijalva/jwt-go"
)
// GenerateToken generates a new JWT token from data user
func GenerateToken(user_id uint,email string,role string) (string, error) {
	// Create the token using your claims
	claims := jwt.MapClaims{}
	//Set Authroization header to true
	claims["authorized"] = true
	//Set user_id 
	claims["user_id"] = user_id
	//Set email
	claims["email"] = email
	//Set role
	claims["role"] = role
	//Set expiry time
	claims["exp"] = time.Now().Add(time.Hour * time.Duration(1)).Unix()
	// Create the token using your claims (authroized, user_id, email, role, expiry time)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	// Sign and get the complete encoded token as a string using the secret
	return token.SignedString([]byte(os.Getenv("API_SECRET")))

}
// ExtractToken extracts token from the Authorization header
func ExtractToken(c *gin.Context) string {
	// Get token from header 
	token := c.Query("token")
	if token != "" {
		// if token is not empty, return it
		return token
	}
	// Get token from header 
	bearerToken := c.Request.Header.Get("Authorization")
	// Remove Bearer from string to get token only
	if len(strings.Split(bearerToken, " ")) == 2 {
		return strings.Split(bearerToken, " ")[1]
	}
	return ""
}
// ValidateToken validates the token and returns the user_id 
func ExtractTokenID(c *gin.Context) (uint, error) {
	tokenString := ExtractToken(c)
	// if token is empty, return error 
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("API_SECRET")), nil
	})
	// if token is invalid, return error
	if err != nil {
		return 0, err
	}
	// if token is valid, return user_id 
	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		// return user_id
		uid, err := strconv.ParseUint(fmt.Sprintf("%.0f", claims["user_id"]), 10, 32)
		if err != nil {
			return 0, err
		}
		return uint(uid), nil
	}
	return 0, nil
}

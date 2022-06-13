package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"futuremap/utils/token"
	"futuremap/models"
)

func JwtAuthMiddlewareAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the token from the request header
		tokenString := c.Request.Header.Get("Authorization")
		// Check if the token is empty
		if tokenString == "" {
			// If the token is empty, return an error
			c.JSON(http.StatusUnauthorized, gin.H{"error": "token is missing"})
			c.Abort()
			return
		}
		// Extract the token ID from the request header
		user_id, err := token.ExtractTokenID(c)
		if err != nil {
			// If the token is invalid, return an error
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		// Get the user.id from the database with extracted token ID
		u,err := models.GetUserID(user_id)
		if err != nil {
			// If the user is not found, return an error
			c.JSON(http.StatusUnauthorized, gin.H{"error": "user not found"})
			c.Abort()
			return
		}
		// If the user is found, check if the user is an admin 
		if u.Role != "admin" {
			// If the user is not an admin, return an error
			c.JSON(http.StatusUnauthorized, gin.H{"error": "you are not admin"})
			c.Abort()
			return
		}
		// If the user is an admin, continue
		c.Next()
	}
}
func JwtAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get the token from the request header
		tokenString := c.Request.Header.Get("Authorization")
		if tokenString == "" {
			// If the token is empty, return an error
			c.JSON(http.StatusUnauthorized, gin.H{"error": "token is missing"})
			c.Abort()
			return
		}
		// Extract the token ID from the request header
		user_id, err := token.ExtractTokenID(c)
		if err != nil {
			// If the token is invalid, return an error
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		// Get the user.id from the database with extracted token ID
		u,err := models.GetUserID(user_id)
		if err != nil {
			// If the user is not found, return an error
			c.JSON(http.StatusUnauthorized, gin.H{"error": "user not found"})
			c.Abort()
			return
		}
		// If the user is found , check if the user is client
		if u.Role != "client" {
			// If the user is not an client, return an error
			c.JSON(http.StatusUnauthorized, gin.H{"error": "you are not user"})
			c.Abort()
			return
		}
		// If the user is an client, continue
		c.Next()
	}
}
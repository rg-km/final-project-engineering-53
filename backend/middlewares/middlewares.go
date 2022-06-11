package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"futuremap/utils/token"
	"futuremap/models"
)

func JwtAuthMiddlewareAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.Request.Header.Get("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "token is missing"})
			c.Abort()
			return
		}
		user_id, err := token.ExtractTokenIDAdmin(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		u,err := models.GetUserByID(user_id)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "user not found"})
			c.Abort()
			return
		}
		if u.Role != "admin" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "you are not admin"})
			c.Abort()
			return
		}
		c.Next()
	}
}
func JwtAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.Request.Header.Get("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "token is missing"})
			c.Abort()
			return
		}
		user_id, err := token.ExtractTokenID(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		u,err := models.GetUserClientByID(user_id)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "user not found"})
			c.Abort()
			return
		}
		if u.Role != "client" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "you are not user"})
			c.Abort()
			return
		}
		c.Next()
	}
}
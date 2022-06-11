package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"futuremap/utils/token"
	"futuremap/models"
)

func JwtAuthMiddlewareAdmin() gin.HandlerFunc {
	//extract token if role not equal admin then return unauthorized
	return func(c *gin.Context) {
		//get token from header
		tokenString := c.Request.Header.Get("Authorization")
		if tokenString == "" {
			//if token is missing return token is missing
			c.JSON(http.StatusUnauthorized, gin.H{"error": "token is missing"})
			c.Abort()
			return
		}
		//extract token id from token string if error return err
		user_id, err := token.ExtractTokenID(c)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		//get user by id if error return err
		u,err := models.GetUserID(user_id)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "user not found"})
			c.Abort()
			return
		}
		//if role not equal admin return unauthorized role
		if u.Role != "admin" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "you are not admin"})
			c.Abort()
			return
		}
		//set user to context
		c.Next()
	}
}
//make middleware for user client with token jwt
func JwtAuthMiddleware() gin.HandlerFunc {
	//extract token if role not equal admin then return unauthorized
	return func(c *gin.Context) {
		tokenString := c.Request.Header.Get("Authorization")
		if tokenString == "" {
			//if token is missing return token is missing
			c.JSON(http.StatusUnauthorized, gin.H{"error": "token is missing"})
			c.Abort()
			return
		}
		//extract token id from token string if error return err
		user_id, err := token.ExtractTokenID(c)
		if err != nil {
			//if error return err
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			c.Abort()
			return
		}
		//get user by id if error return err
		u,err := models.GetUserID(user_id)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "user not found"})
			c.Abort()
			return
		}
		//if role not equal client return unauthorized role
		if u.Role != "client" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "you are not user"})
			c.Abort()
			return
		}
		//set user to context
		c.Next()
	}
}
package routes

import (
  	"github.com/gin-gonic/gin"
	"futuremap/models"
	"futuremap/controllers"
	"futuremap/middlewares"
)

func SetupRoutes() *gin.Engine {
	//connectDatabase
	models.ConnectDataBase()
	
	r := gin.Default()

	public := r.Group("/")
 
	public.POST("admin/register", controllers.Register)
	public.POST("admin/login",controllers.Login)
	public.POST("/client/register",controllers.RegisterClient)
	public.POST("/client/login",controllers.LoginClient)
	//=============================Middlewares for client======================================================
	client := r.Group("/client")
	client.Use(middlewares.JwtAuthMiddleware())
	client.GET("/user",controllers.ShowUserClient)
	//=============================Middlewares for Admin======================================================
	admin := r.Group("/admin")
	admin.Use(middlewares.JwtAuthMiddlewareAdmin())
	admin.GET("/user",controllers.ShowUser)
	//run server
	return r
}
package routes
import (
	"github.com/gin-gonic/gin"
	"futuremap/models"
	"futuremap/controllers"
	"futuremap/middlewares"
)
func SetupRoutes() *gin.Engine {
	models.ConnectDatabase()
	r := gin.Default()
	public := r.Group("/")
	public.POST("/register", controllers.Register)
	public.POST("/login", controllers.Login)
	public.POST("/register/admin", controllers.RegisterAdmin)
	public.POST("/reset/password", controllers.ResetPassword)
	public.GET("/learning", controllers.LearningList)
	//=============================Middlewares for Client======================================================
	client := r.Group("/client")
	client.Use(middlewares.JwtAuthMiddleware())
	client.GET("/user", controllers.CurrentUser)
	client.PUT("/update/profile", controllers.UpdateProfile)
	client.GET("/learning", controllers.LearningList)
	client.GET("/learning/:id", controllers.GetLearningById)
	//=============================Middlewares for Admin======================================================
	admin := r.Group("/admin")
	admin.Use(middlewares.JwtAuthMiddlewareAdmin())
	admin.GET("/user",controllers.CurrentUser)
	admin.PUT("/update/profile", controllers.UpdateProfile)
	admin.POST("/learning", controllers.Learning)
	admin.GET("/learning", controllers.LearningList)
	admin.GET("/learning/:id", controllers.GetLearningById)
	return r
}
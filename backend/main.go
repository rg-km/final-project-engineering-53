package main

import (
	"futuremap/routes"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	r := routes.SetupRoutes()
	r.Run(":8080")
}
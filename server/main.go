package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/odavidu/lets-prep/auth"
	"github.com/odavidu/lets-prep/db"
	"github.com/odavidu/lets-prep/routes"
	"log"
)

func main() {
	db.Connect()

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowCredentials: true,
	}))

	auth.InitJWT()

	routes.InitAuthRoutes(app)
	routes.InitChatRoutes(app)
	routes.InitRetrievalRoutes(app)

	log.Println("Starting HTTP server on http://localhost:8080")
	if err := app.Listen(":8080"); err != nil {
		log.Fatalf("Failed to start HTTP server: %v", err)
	}
}

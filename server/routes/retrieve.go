package routes

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/odavidu/lets-prep/handlers/retrieve"
)

func InitRetrievalRoutes(app *fiber.App) {
	app.Get("/load", retrieve.Load)

	fmt.Println("Initialized retrieval routes!")
}

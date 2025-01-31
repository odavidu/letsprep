package routes

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/odavidu/lets-prep/handlers/chat"
)

func InitChatRoutes(app *fiber.App) {
	app.Post("/chat", chat.ProcessPrompt)
	app.Post("/chat/evaluate", chat.EvaluateSolution)
	app.Post("/chat/validate", chat.ValidatePrompt)

	fmt.Println("Initialized chat routes!")
}

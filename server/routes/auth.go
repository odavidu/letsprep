package routes

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/odavidu/lets-prep/handlers/auth"
)

func InitAuthRoutes(app *fiber.App) {
	app.Post("/login", auth.Authentication, auth.Login)
	app.Post("/signup", auth.Authentication, auth.SignUp)

	fmt.Println("Initialized authentication routes!")
}

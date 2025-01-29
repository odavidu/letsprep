package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/odavidu/lets-prep/auth"
	"github.com/odavidu/lets-prep/db"
	"github.com/odavidu/lets-prep/handlers"
	"github.com/odavidu/lets-prep/opt/cookie"
	"log"
	"time"
)

func Login(c *fiber.Ctx) error {
	var req handlers.LoginRequest
	log.Println("Incoming POST request to /login")

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}
	log.Printf("Parsed request: %+v", req)

	user, err := db.GetUserByEmail(req.Email)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Database error"})
	}

	verify, err := auth.VerifyPassword(req.Password, user.PwdSalt, user.PwdHash)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	if !verify {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "Invalid email or password"})
	}
	token, err := auth.GenerateToken(user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to generate token"})
	}
	log.Printf("Creating cookie with authentication token: %+v", token)

	c.Cookie(&fiber.Cookie{
		Name:     cookie.Login,
		Value:    token,
		HTTPOnly: true,
		Secure:   false, // true in production
		SameSite: "Lax", // allow cross-origin requests
		Expires:  time.Now().Add(24 * time.Hour),
	})

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Login successful",
	})
}

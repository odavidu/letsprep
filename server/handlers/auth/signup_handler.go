package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/odavidu/lets-prep/db"
	"github.com/odavidu/lets-prep/handlers"
	"log"
)

func SignUp(c *fiber.Ctx) error {
	var req handlers.SignUpRequest
	log.Println("Incoming POST request to /signup")
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}
	log.Printf("Parsed request: %+v", req)

	emailExists, err := db.EmailExist(req.Email)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Database error"})
	}
	if emailExists {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "Email already exists"})
	}

	err = db.CreateUser(req)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create user"})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "User created successfully",
	})
}

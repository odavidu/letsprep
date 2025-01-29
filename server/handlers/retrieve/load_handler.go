package retrieve

import (
	"github.com/gofiber/fiber/v2"
	"github.com/odavidu/lets-prep/auth"
	"github.com/odavidu/lets-prep/opt/cookie"
	"log"
)

func Load(c *fiber.Ctx) error {
	log.Println("Incoming GET request to /load")

	tokenString := c.Cookies(cookie.Login)
	if tokenString == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"authenticated": false,
		})
	}

	claims, err := auth.ValidateToken(tokenString)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"authenticated": false,
		})
	}

	return c.JSON(fiber.Map{
		"authenticated": true,
		"name":          claims[cookie.FirstName].(string) + " " + claims[cookie.LastName].(string),
	})
}

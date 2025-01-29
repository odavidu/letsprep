package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/odavidu/lets-prep/auth"
	"github.com/odavidu/lets-prep/opt/cookie"
)

func Authentication(c *fiber.Ctx) error {
	token := c.Cookies(cookie.Login)
	if token == "" {
		return c.Next()
	}

	_, err := auth.ValidateToken(token)

	if err != nil {
		return c.Next()
	}

	return c.Redirect("/dashboard")
}

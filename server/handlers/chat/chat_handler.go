package chat

import (
	"github.com/gofiber/fiber/v2"
	"github.com/odavidu/lets-prep/chat"
)

func ProcessPrompt(c *fiber.Ctx) error {
	var req chat.GenerateRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	problems, err := chat.GenerateProblems(req.Prompt)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to generate problems. " + err.Error()})
	}

	return c.JSON(problems)
}

func EvaluateSolution(c *fiber.Ctx) error {
	var req chat.SolutionRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	result, err := chat.ParseSolution(req.Question, req.UserAnswer, req.SuggestedAnswer)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(result)
}

func ValidatePrompt(c *fiber.Ctx) error {
	var req chat.ComplianceRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	result, err := chat.ParsePrompt(req.Prompt)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(result)
}

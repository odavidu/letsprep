package chat

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/odavidu/lets-prep/opt/env"
	"os"
)

func GenerateProblems(prompt string) (string, error) {
	client, err := NewOpenAIClient(os.Getenv(env.OpenAiApiKey), os.Getenv(env.GeneratorAssistant))
	if err != nil {
		return "", err
	}
	return client.sendMessageAndRetrieveResponse(prompt)
}

func ParseSolution(question, userAnswer, suggestedAnswer string) (*SolutionEvaluation, error) {
	client, err := NewOpenAIClient(os.Getenv(env.OpenAiApiKey), os.Getenv(env.GraderAssistant))
	if err != nil {
		return nil, err
	}

	prompt := fmt.Sprintf(`Question: %s, User's Answer: %s, Suggested Answer: %s`,
		question, userAnswer, suggestedAnswer)

	responseText, err := client.sendMessageAndRetrieveResponse(prompt)
	if err != nil {
		return nil, err
	}

	return decodeSolutionEvaluation(responseText)
}

func ParsePrompt(prompt string) (*ComplianceCheck, error) {
	client, err := NewOpenAIClient(os.Getenv(env.OpenAiApiKey), os.Getenv(env.PromptAssistant))
	if err != nil {
		return nil, err
	}
	responseText, err := client.sendMessageAndRetrieveResponse(prompt)
	if err != nil {
		return nil, err
	}
	return decodeComplianceCheck(responseText)
}

func decodeSolutionEvaluation(data string) (*SolutionEvaluation, error) {
	var result SolutionEvaluation
	if err := json.Unmarshal([]byte(data), &result); err != nil {
		return nil, fmt.Errorf("invalid JSON format: %v", err)
	}
	if len(result.Solution) == 0 {
		return nil, errors.New("solution array cannot be empty")
	}
	if result.Grade < 0 || result.Grade > 100 {
		return nil, errors.New("grade must be between 0 and 100")
	}
	return &result, nil
}

func decodeComplianceCheck(data string) (*ComplianceCheck, error) {
	var result ComplianceCheck
	if err := json.Unmarshal([]byte(data), &result); err != nil {
		return nil, fmt.Errorf("invalid JSON format: %v", err)
	}
	if !result.IsFollowed && result.Explanation == "" {
		return nil, errors.New("explanation is required if rules are not followed")
	}
	return &result, nil
}

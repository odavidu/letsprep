package chat

import (
	"context"
	"fmt"
	"github.com/sashabaranov/go-openai"
	"log"
	"os"
	"time"
)

func GenerateProblems(prompt string) {
	// Load API key from environment variable
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		log.Fatal("OPENAI_API_KEY is not set")
	}
	assistantID := os.Getenv("ASSISTANT_ID")
	if assistantID == "" {
		log.Fatal("OPENAI_API_KEY is not set")
	}

	client := openai.NewClient(apiKey)

	thread, err := client.CreateThread(context.Background(), openai.ThreadRequest{})
	if err != nil {
		log.Fatalf("Failed to create thread: %v", err)
	}
	threadID := thread.ID

	_, err = client.CreateMessage(context.Background(), threadID, openai.MessageRequest{
		Role:    "user",
		Content: "Generate 10 algebra practice problem.",
	})
	if err != nil {
		log.Fatalf("Failed to send message: %v", err)
	}

	run, err := client.CreateRun(context.Background(), threadID, openai.RunRequest{
		AssistantID:         assistantID,
		MaxCompletionTokens: 1000,
	})
	if err != nil {
		log.Fatalf("Failed to create run: %v", err)
	}

	for {
		runStatus, err := client.RetrieveRun(context.Background(), threadID, run.ID)
		if err != nil {
			log.Fatalf("Failed to retrieve run status: %v", err)
		}

		if runStatus.Status == "completed" {
			break
		}

		time.Sleep(2 * time.Second)
	}

	limit := 10
	order := "desc"
	messages, err := client.ListMessage(context.Background(), threadID, &limit, &order, nil, nil, nil)
	if err != nil {
		log.Fatalf("Failed to retrieve messages: %v", err)
	}

	for _, message := range messages.Messages {
		if message.Role == "assistant" {
			for _, contentPart := range message.Content {
				fmt.Println(contentPart.Text.Value)
			}
		}
	}
}

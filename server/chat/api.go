package chat

import (
	"context"
	"errors"
	"fmt"
	"github.com/sashabaranov/go-openai"
	"time"
)

type OpenAIClient struct {
	client      *openai.Client
	assistantID string
}

func NewOpenAIClient(apiKey, assistantID string) (*OpenAIClient, error) {
	if apiKey == "" {
		return nil, fmt.Errorf("OpenAI API key is not set")
	}
	if assistantID == "" {
		return nil, fmt.Errorf("OpenAI Assistant ID is not set")
	}

	client := openai.NewClient(apiKey)
	return &OpenAIClient{client: client, assistantID: assistantID}, nil
}

func (o *OpenAIClient) sendMessageAndRetrieveResponse(prompt string) (string, error) {
	thread, err := o.client.CreateThread(context.Background(), openai.ThreadRequest{})
	if err != nil {
		return "", fmt.Errorf("failed to create thread: %v", err)
	}
	threadID := thread.ID

	_, err = o.client.CreateMessage(context.Background(), threadID, openai.MessageRequest{
		Role:    "user",
		Content: prompt,
	})
	if err != nil {
		return "", fmt.Errorf("failed to send message: %v", err)
	}

	run, err := o.client.CreateRun(context.Background(), threadID, openai.RunRequest{
		AssistantID:         o.assistantID,
		MaxCompletionTokens: 1000,
	})
	if err != nil {
		return "", fmt.Errorf("failed to create run: %v", err)
	}

	for {
		runStatus, err := o.client.RetrieveRun(context.Background(), threadID, run.ID)
		if err != nil {
			return "", fmt.Errorf("failed to retrieve run status: %v", err)
		}
		if runStatus.Status == "completed" {
			break
		}
		time.Sleep(250 * time.Millisecond)
	}

	limit := 1
	order := "desc"
	messages, err := o.client.ListMessage(context.Background(), threadID, &limit, &order, nil, nil, nil)
	if err != nil {
		return "", fmt.Errorf("failed to retrieve messages: %v", err)
	}
	if len(messages.Messages) == 0 {
		return "", errors.New("no messages received from assistant")
	}
	message := messages.Messages[0]
	if message.Role != "assistant" {
		return "", fmt.Errorf("unexpected message role: %s", message.Role)
	}
	if len(message.Content) == 0 || message.Content[0].Text.Value == "" {
		return "", errors.New("assistant message is empty or missing text content")
	}

	return message.Content[0].Text.Value, nil
}

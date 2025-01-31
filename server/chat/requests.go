package chat

type GenerateRequest struct {
	Prompt string `json:"prompt"`
}

type SolutionRequest struct {
	Question        string `json:"question"`
	UserAnswer      string `json:"user_answer"`
	SuggestedAnswer string `json:"suggested_answer"`
}

type ComplianceRequest struct {
	Prompt string `json:"prompt"`
}

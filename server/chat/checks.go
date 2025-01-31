package chat

type ComplianceCheck struct {
	IsFollowed  bool   `json:"is_followed"`
	Explanation string `json:"explanation"`
}

type SolutionEvaluation struct {
	Solution []string `json:"solution"`
	Grade    uint8    `json:"grade"`
}

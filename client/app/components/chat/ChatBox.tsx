import { useRef, useState } from "react";
import { post } from "~/utils/middleware";
import ProblemsList from "~/components/chat/ProblemsList";
import ChatInput from "~/components/chat/ChatInput";

const ChatBox = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [problems, setProblems] = useState<Problem[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [complianceMessage, setComplianceMessage] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (isSubmitting || !textareaRef.current?.value.trim()) return;

        const userInput = textareaRef.current?.value;
        setIsSubmitting(true);
        setComplianceMessage(null);
        console.log("Submitting form...");

        try {
            const parsedPromptResponse = await post("chat/validate", {
                prompt: userInput,
            });

            console.log("Parsed Prompt Response:", parsedPromptResponse);

            if (!parsedPromptResponse.is_followed) {
                console.warn("Prompt did not pass compliance check:", parsedPromptResponse.explanation);
                setComplianceMessage(parsedPromptResponse.explanation);
                setIsSubmitting(false);
                return;
            }

            console.log("Executing prompt:", userInput);
            const problemsData = await post("chat", {
                prompt: userInput,
            });

            console.log("Generated Problems Response:", problemsData);

            const newProblems = ParseProblems(problemsData);
            setProblems((prevProblems) => [...prevProblems, ...newProblems]);

            if (textareaRef.current) {
                textareaRef.current.value = "";
            }
        } catch (error) {
            console.error("Error processing request:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-[93vh]">
            {complianceMessage && (
                <div className="p-4 bg-red-100 w-[560px] text-red-700 border border-red-400 rounded-md mb-3 mx-4">
                    <p><strong>Warning:</strong> {complianceMessage}</p>
                </div>
            )}

            <ProblemsList problems={problems} isSubmitting={isSubmitting} />
            <ChatInput textareaRef={textareaRef} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
    );
};

interface Problem {
    question: string;
    type: string;
    choices?: string[];
    answer?: string;
}

const ParseProblems = (problemsJson: string): Problem[] => {
    try {
        const parsedData = JSON.parse(problemsJson);
        return parsedData.problems || [];
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
    }
};

export default ChatBox;
export type { Problem };

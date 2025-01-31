import { useState } from "react";
import LatexRenderer from "~/components/LatexRenderer";
import { RiLoader2Fill } from "@remixicon/react";
import { post } from "~/utils/middleware";

interface ShortAnswerProps {
    question: string;
    answer: string;
}

const ShortAnswer = ({ question, answer }: ShortAnswerProps) => {
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState<string | null>(null);
    const [solutionSteps, setSolutionSteps] = useState<string[]>([]);
    const [checking, setChecking] = useState(false);
    const [revealed, setRevealed] = useState(false);

    const handleSubmit = async () => {
        if (!userAnswer.trim() || checking) return;

        setChecking(true);
        setFeedback(null);
        setSolutionSteps([]);

        try {
            const data = await post("chat/evaluate", {
                question: question,
                user_answer: userAnswer,
                suggested_answer: answer,
            });

            setFeedback(`Grade: ${data.grade}/100`);
            setSolutionSteps(data.solution || [])
        } catch (error) {
            console.error("Error grading answer:", error);
            setFeedback("Failed to grade the answer. Please try again.");
        } finally {
            setChecking(false);
        }
    };

    return (
        <div className="p-4 text-sm w-[500px]">
            <LatexRenderer text={question} />
            <input
                type="text"
                value={userAnswer}
                onChange={(e) => {
                    setUserAnswer(e.target.value);
                    setFeedback(null);
                    setSolutionSteps([]);
                    setRevealed(false);
                }}
                className="w-full mt-3 p-2 border border-gray-300 rounded-md outline-none"
                placeholder="Enter your answer..."
            />
            <button
                onClick={handleSubmit}
                disabled={checking}
                className={`mt-3 mr-2 bg-blue-500 text-white px-3 py-2 rounded-md transition ${
                    checking ? "opacity-50" : "hover:bg-blue-600"
                }`}
            >
                {checking ? <RiLoader2Fill className="animate-spin" /> : "Check"}
            </button>

            {!checking && (
                <button
                    onClick={() => setRevealed(true)}
                    className="mt-3 bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition"
                >
                    Reveal Answer
                </button>
            )}

            {revealed && (
                <LatexRenderer className="mt-2 text-sm font-medium text-blue-500" text={`The correct answer is: ${answer}`} />
            )}

            {feedback && (
                <p className="mt-2 text-sm font-medium text-green-600">{feedback}</p>
            )}

            {solutionSteps.length > 0 && (
                <div className="mt-3 bg-gray-100 p-3 rounded-md border border-gray-300">
                    <p className="font-medium">Solution Steps:</p>
                    <ol className="list-decimal list-inside text-gray-700">
                        {solutionSteps.map((step, index) => (
                            <li key={index} className="flex">
                                <span className="font-bold mr-2">{index + 1}.</span>
                                <LatexRenderer text={step} />
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};

export default ShortAnswer;

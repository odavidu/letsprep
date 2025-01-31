import { useState } from "react";
import LatexRenderer from "~/components/LatexRenderer";
import { RiLoader2Fill } from "@remixicon/react";
import { post } from "~/utils/middleware";

interface LongAnswerProps {
    question: string;
    answer: string;
}

const LongAnswer = ({ question, answer }: LongAnswerProps) => {
    const [userAnswer, setUserAnswer] = useState("");
    const [feedback, setFeedback] = useState<string | null>(null);
    const [solutionSteps, setSolutionSteps] = useState<string[]>([]);
    const [grade, setGrade] = useState<number | null>(null);
    const [isGrading, setIsGrading] = useState(false);
    const [revealed, setRevealed] = useState(false);

    const handleGrade = async () => {
        if (!userAnswer.trim() || isGrading) return;

        setIsGrading(true);
        setFeedback(null);
        setSolutionSteps([]);
        setGrade(null);

        try {
            const data = await post("chat/evaluate", {
                question,
                user_answer: userAnswer,
                suggested_answer: answer,
            });

            setGrade(data.grade ?? null);
            setFeedback(grade !== undefined ? `Grade: ${grade}/100` : "No grading available.");
            setSolutionSteps(data.solution || []);
        } catch (error) {
            console.error("Error grading answer:", error);
            setFeedback("Failed to grade the answer. Please try again.");
        } finally {
            setIsGrading(false);
        }
    };

    return (
        <div className="p-4 text-sm w-[500px]">
            <LatexRenderer text={question} />

            <textarea
                value={userAnswer}
                onChange={(e) => {
                    setUserAnswer(e.target.value);
                    setFeedback(null);
                    setSolutionSteps([]);
                    setRevealed(false);
                }}
                className="w-full mt-3 p-2 border border-gray-300 rounded-md outline-none resize-none"
                placeholder="Write your response here..."
                rows={4}
            />

            <div className="mt-3 flex space-x-2">
                <button
                    onClick={handleGrade}
                    disabled={isGrading || !userAnswer.trim()}
                    className={`bg-blue-500 text-white px-3 py-2 rounded-md transition ${
                        isGrading || !userAnswer.trim() ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                    }`}
                >
                    {isGrading ? <RiLoader2Fill className="animate-spin" /> : "Grade Answer"}
                </button>

                <button
                    onClick={() => setRevealed(true)}
                    className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition"
                >
                    Reveal Answer
                </button>
            </div>

            {revealed && (
                <LatexRenderer className="mt-2 text-sm font-medium text-blue-500" text={`Suggested answer: ${answer}`} />
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

export default LongAnswer;

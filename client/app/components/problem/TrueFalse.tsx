import { useState } from "react";
import LatexRenderer from "~/components/LatexRenderer";
import {RiLoader2Fill} from "@remixicon/react";

interface TrueFalseProps {
    question: string;
    answer: boolean;
}

const TrueFalse = ({ question, answer }: TrueFalseProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [checking, setChecking] = useState(false);
    const [revealed, setRevealed] = useState(false);

    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        setChecking(true);
        setTimeout(() => {
            setIsCorrect(selectedAnswer === answer);
            setChecking(false);
        }, 1000);
    };

    return (
        <div className="p-4 text-sm w-[500px]">
            <LatexRenderer text={question} />
            <div className="mt-3 flex space-x-4">
                <button
                    onClick={() => setSelectedAnswer(true)}
                    className={`px-4 py-2 border rounded-md ${
                        selectedAnswer === true ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                    True
                </button>
                <button
                    onClick={() => setSelectedAnswer(false)}
                    className={`px-4 py-2 border rounded-md ${
                        selectedAnswer === false ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                >
                    False
                </button>
            </div>

            <button
                onClick={handleSubmit}
                disabled={checking || selectedAnswer === null}
                className={`mt-3 bg-blue-500 text-white px-3 py-2 rounded-md transition ${
                    checking || selectedAnswer === null ? "opacity-50" : "hover:bg-blue-600"
                }`}
            >
                {checking ? <RiLoader2Fill className={"animate-spin"}/> : "Check"}
            </button>

            {isCorrect === false && !revealed && (
                <button
                    onClick={() => setRevealed(true)}
                    className="mt-3 ml-2 bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition"
                >
                    Reveal Answer
                </button>
            )}

            {isCorrect !== null && (
                <LatexRenderer className={`mt-2 text-sm font-medium ${isCorrect ? "text-green-500" : "text-red-500"}`}
                               text={isCorrect ? "Correct!" : revealed ? `The correct answer is: ${answer ? "True" : "False"}` : "Incorrect"} />
            )}
        </div>
    );
};

export default TrueFalse;

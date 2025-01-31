import { useState } from "react";
import LatexRenderer from "~/components/LatexRenderer";
import {RiLoader2Fill} from "@remixicon/react";

interface MultipleChoiceProps {
    question: string;
    choices: string[];
    answer: string;
}

const MultipleChoice = ({ question, choices, answer }: MultipleChoiceProps) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [checking, setChecking] = useState(false);
    const [revealed, setRevealed] = useState(false);

    const handleSubmit = () => {
        if (!selectedOption) return;

        setChecking(true);
        setTimeout(() => {
            setIsCorrect(selectedOption === answer);
            setChecking(false);
        }, 1000);
    };

    return (
        <div className="p-4 text-sm w-[500px]">
            <LatexRenderer text={question} />

            <div className="mt-3 space-y-2">
                {choices.map((choice, index) => (
                    <label key={index} className="flex p-2 border border-gray-300 rounded-md cursor-pointer">
                        <input
                            type="radio"
                            name="multiple-choice"
                            value={choice}
                            checked={selectedOption === choice}
                            onChange={() => {
                                setSelectedOption(choice);
                                setIsCorrect(null);
                                setRevealed(false);
                            }}
                            className="mr-2"
                        />
                        <LatexRenderer text={choice}/>
                    </label>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                disabled={checking || selectedOption === null}
                className={`mt-3 bg-blue-500 text-white px-3 py-2 rounded-md transition ${
                    checking || selectedOption === null ? "opacity-50" : "hover:bg-blue-600"
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
                <LatexRenderer
                    className={`mt-2 text-sm font-medium ${isCorrect ? "text-green-500" : "text-red-500"}`}
                    text={isCorrect ? "Correct!" : revealed ? `The correct answer is: ${answer}` : "Incorrect"}
                />
            )}
        </div>
    );
};

export default MultipleChoice;

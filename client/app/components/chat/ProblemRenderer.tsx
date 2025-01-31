import ShortAnswer from "~/components/problem/ShortAnswer";
import MultipleChoice from "~/components/problem/MultipleChoice";
import TrueFalse from "~/components/problem/TrueFalse";
import LongAnswer from "~/components/problem/LongAnswer";
import {Problem} from "~/components/chat/ChatBox";

const ProblemRenderer = ({ problem }: { problem: Problem }) => {
    return (
        <div className="p-4 bg-white shadow rounded-lg mb-3">
            {problem.type === "short-answer" ? (
                <ShortAnswer question={problem.question} answer={problem.answer || ""} />
            ) : problem.type === "multiple-choice" ? (
                <MultipleChoice question={problem.question} choices={problem.choices || []} answer={problem.answer || ""} />
            ) : problem.type === "true-false" ? (
                <TrueFalse question={problem.question} answer={problem.answer?.toLowerCase() === "true"} />
            ) : problem.type === "long-answer" ? (
                <LongAnswer question={problem.question} answer={problem.answer || ""} />
            ) : (
                <h3 className="text-lg font-semibold text-gray-800">{problem.question}</h3>
            )}
        </div>
    );
};

export default ProblemRenderer;

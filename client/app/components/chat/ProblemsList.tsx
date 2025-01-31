import {Problem} from "~/components/chat/ChatBox";
import ProblemRenderer from "~/components/chat/ProblemRenderer";

const ProblemsList = ({ problems, isSubmitting }: { problems: Problem[]; isSubmitting: boolean }) => {
    return (
        <div className="flex-grow overflow-y-auto p-4">
            {problems.map((problem, index) => (
                <ProblemRenderer key={index} problem={problem} />
            ))}
            {isSubmitting && <p className="text-gray-500 text-sm italic">Loading new problem...</p>}
        </div>
    );
};


export default ProblemsList;
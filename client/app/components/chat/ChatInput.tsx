import { RiAttachmentLine, RiChatForwardLine } from "@remixicon/react";
import { RefObject } from "react";

const ChatInput = ({
    textareaRef,
    handleSubmit,
    isSubmitting,
}: {
    textareaRef: RefObject<HTMLTextAreaElement>;
    handleSubmit: () => void;
    isSubmitting: boolean;
}) => {
    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className="inline-grid justify-center p-4 bg-[#F7F7FF] shadow rounded-lg">
            <textarea
                className="w-[560px] resize-none bg-transparent outline-none text-sm placeholder:text-sm placeholder:text-[#626262] placeholder:font-instrument-sans"
                ref={textareaRef}
                onInput={handleInput}
                placeholder={"Enter a topic or an example of a practice problem\n(e.g. calculus, SAT problems, basic algorithm practice, etc...)"}
            />
            <div className="flex justify-between pt-2">
                <button className="inline-block">
                    <RiAttachmentLine className="text-[#626262] hover:text-[#356BFF] transition duration-150" />
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`inline-block transition duration-150 ${
                        isSubmitting ? "opacity-50" : "hover:text-[#356BFF]"
                    }`}
                >
                    <RiChatForwardLine className="text-[#626262]" />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;

import {RiAttachmentLine, RiChatForwardLine} from "@remixicon/react";
import {useRef} from "react";

const TextBox = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div
            className="inline-grid justify-center p-4 bg-[#F7F7FF] shadow rounded-lg"
        >
            <textarea
                className="w-[560px] resize-none bg-transparent outline-none text-sm
                placeholder:text-sm placeholder:text-[#626262] placeholder:font-instrument-sans"
                ref={textareaRef}
                onInput={handleInput}
                placeholder={
                    "Enter a topic or an example of a practice problem \n" +
                    "(e.g. calculus, sat problems, basic algorithm practice, etc...)"
                }
            />
            <div className="flex justify-between pt-2">
                <button className="inline-block">
                    <RiAttachmentLine className="text-[#626262] hover:text-[#356BFF] transition duration-150"/>
                </button>
                <button className="inline-block">
                    <RiChatForwardLine className="text-[#626262] hover:text-[#356BFF] transition duration-150"/>
                </button>
            </div>
        </div>
    );
};

export default TextBox;
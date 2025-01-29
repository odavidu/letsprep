import Center from "../../Center.js";

interface SubmitButtonProps {
    text: string;
}

export default function SubmitButton({text}: SubmitButtonProps) {
    return (
        <button
            className="
                font-bold
                my-2
                text-white
                px-5
                py-2.5
                bg-[#2953DD]
                border
                border-[#2953DD]
                rounded
                h-10
                w-[350px]
                hover:bg-[#1839A4]
                transition-colors
                duration-300
            "
            type="submit">
            <Center>
                <span>{text}</span>
            </Center>
        </button>

    );
}
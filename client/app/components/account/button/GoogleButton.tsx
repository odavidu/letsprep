import Center from "../../Center.js";
import googleImage from "~/assets/google-icon.png";

export default function GoogleButton() {
    return (
        <button
            className="
                my-2
                px-5
                py-2.5
                border-[#D4D4D4]
                rounded
                border
                h-10
                w-[350px]
                hover:bg-[#F2F2F2]
                transition-colors
                duration-300
            "
            type="button">
            <Center>
                <img className="w-6 h-auto pr-2" alt="Google" src={googleImage}/>
                <span>Continue with Google</span>
            </Center>
        </button>
    );
}
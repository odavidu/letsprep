import Logo from "../Logo.jsx";
import NavOption from "./NavOption.jsx";
import Button from "../Button.js";

interface NavBarProps {
    background?: string;
    absolute?: boolean;
}

export default function NavBar({ background, absolute }: NavBarProps) {
    return (
        <nav
            className={`flex items-center py-4 px-[15%] w-full ${
                absolute ? "absolute" : ""
            } ${background === "white" ? "bg-white" : "bg-transparent"}`}
        >
            <Logo />
            <div className="flex items-center ml-auto">
                <div className="inline-block items-center space-x-4">
                    <NavOption link="#" text="Topics" />
                    <NavOption link="#" text="Plans & Pricing" />
                    <NavOption link="#" text="FAQ" />
                    <NavOption link="#" text="About Us" />
                    <div className="inline-block space-x-2">
                        <Button link="/login" text="Login" fill={false}/>
                        <Button link="/signup" text="Get Started" fill={true}/>
                    </div>
                </div>
            </div>
        </nav>
    );
}
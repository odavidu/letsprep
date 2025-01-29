import {Link} from "@remix-run/react";

interface NavOptionProps {
    link: string;
    text: string;
}

const NavOption = (props: NavOptionProps) => {

    return (
        <Link
            to={props.link}
            className="hover:text-[#356BFF] font-instrument-sans
                text-[12px] transition duration-150">
            {props.text}
        </Link>
    )
}

export default NavOption;
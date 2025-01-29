import logo from "../assets/letsprep.png";
import {Link} from "@remix-run/react";

interface LogoProps {
    white?: boolean;
    widthPx?: number;
}

const Logo = ({ white = false, widthPx = 100 }: LogoProps) => {
    const imgProps: string = white ? "filter brightness-0 invert h-auto" : "h-auto";

    return (
        <Link to="/">
            <img className={imgProps} style={{ width: `${widthPx}px` }} alt="Logo" src={logo}/>
        </Link>
    );
}

export default Logo;
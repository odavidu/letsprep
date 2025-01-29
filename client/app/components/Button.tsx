import {Link} from "@remix-run/react";
import {darkenHexColor} from "~/utils/color";

interface ButtonProps {
    link: string;
    text: string;
    color?: string;
    fill: boolean
}

const Button = ({ link, text, color = "#356BFF", fill }: ButtonProps) => {
  const darkenedHex: string = darkenHexColor((fill ? color : '#F2F2F2'), 0.08);
  const fillProps = fill
    ? { border: `2px solid ${color}`, backgroundColor: color, color: 'white' }
    : { border: `2px solid ${color}`, color };

  return (
    <Link to={link}>
      <button
        style={fillProps}
        className={`font-instrument-sans py-1.5 px-4 text-[12px] rounded-md transition duration-150 font-semibold`}
        onFocus={() => {}}
        onBlur={() => {}}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = darkenedHex;
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = fill ? color : "transparent";
        }}
      >
        {text}
      </button>
    </Link>
  );

};

export default Button;
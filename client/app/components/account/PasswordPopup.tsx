import {PASSWORD_REGEX} from "~/utils/form";
import {RiCheckFill, RiCloseFill} from "@remixicon/react";

interface PasswordPopupProps {
    valid?: boolean;
    bound?: boolean;
    upper?: boolean;
    lower?: boolean;
    num?: boolean;
}

function getPasswordPopup(password: string) {
    return (
        <PasswordPopup
            valid={PASSWORD_REGEX.test(password)}
            bound={password.length >= 8 && password.length <= 35}
            upper={/[A-Z]/.test(password)}
            lower={/[a-z]/.test(password)}
            num={/\d/.test(password)}
        />
    );
}

function PasswordPopup({ valid = false, bound = false, upper = false, lower = false, num = false}: PasswordPopupProps) {
    const getIcon = (enable: boolean) => {
        const icon = enable ? <RiCheckFill className="w-4 h-auto text-green-600"/> :
            <RiCloseFill className="w-4 h-auto text-red-600"/>;
        return (
            <div className="h-4 w-4">
                {icon}
            </div>
        );
    }
    return (
        <div className="relative cursor-pointer text-xs">
            <div className="absolute grid w-full bg-white border border-gray-300 p-2.5 rounded-md">
                <p>Password must contain:</p>
                <div className="inline-flex items-start gap-1">
                    {getIcon(valid)}
                    <span>only alphanumeric characters and one special character</span>
                </div>
                <div className="inline-flex items-start gap-1">
                    {getIcon(bound)}
                    <span>between 8-35 characters</span>
                </div>
                <div className="inline-flex items-start gap-1">
                    {getIcon(upper)}
                    <span>at least 1 uppercase letter</span>
                </div>
                <div className="inline-flex items-start gap-1">
                    {getIcon(lower)}
                    <span>at least 1 lowercase letter</span>
                </div>
                <div className="inline-flex items-start gap-1">
                    {getIcon(num)}
                    <span>at least 1 number</span>
                </div>
            </div>
        </div>
    );
}

export default getPasswordPopup;
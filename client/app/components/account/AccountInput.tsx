import {ChangeEventHandler, FocusEventHandler} from "react";

interface AccountInputProps {
    id: string;
    type: string;
    name: string;
    value: string;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    onFocus?: FocusEventHandler<HTMLInputElement> | undefined;
    onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
    required?: boolean;
}

export default function AccountInput(props: AccountInputProps) {
    return (
        <div className="grid items-center">
            <label htmlFor={props.id} className="text-[11px] px-0.5">{props.name}</label>
            <input
                className="p-4 mb-1 bg-[#FFFFFF] border-[#D4D4D4] border placeholder-[#2A2A2A] rounded h-10 w-[350px]"
                type={props.type}
                id={props.id}
                name={props.id}
                value={props.value}
                onChange={props.onChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                required={props.required}
            />
        </div>
    )
}
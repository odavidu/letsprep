import {Errors, FIELDS, FieldsType} from "~/utils/form";
import {ChangeEvent, Fragment} from "react";
import AccountInput from "~/components/account/AccountInput";
import getPasswordPopup from "~/components/account/PasswordPopup";
import ErrorMessage from "~/components/ErrorMessage";

interface SignupInputsProps {
    fields: InputField[]
    visible: boolean
    vals: FieldsType
    errs: Errors
}

export default function SignupInputs({fields, visible, vals, errs}: SignupInputsProps) {
    return fields.map(({id, type, name, value, onChange, onFocus, onBlur}) => (
        <Fragment key={id}>
            <AccountInput
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                required
            />
            {onBlur && visible && getPasswordPopup(vals[FIELDS.PWD])}
            <ErrorMessage message={errs[id]}/>
        </Fragment>
    ));
}

export interface InputField {
    id: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export function getInputFields(
    formValues: FieldsType,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    handleFocus: () => void,
    handleBlur: () => void,
    resetError: () => void
): InputField[] {
    return [
        { id: FIELDS.F_NAME, type: "text", name: "First Name", value: formValues[FIELDS.F_NAME],
            onChange: handleChange, onFocus: resetError, onBlur: undefined },
        { id: FIELDS.L_NAME, type: "text", name: "Last Name", value: formValues[FIELDS.L_NAME],
            onChange: handleChange, onFocus: resetError, onBlur: undefined },
        { id: FIELDS.EMAIL, type: "email", name: "Email", value: formValues[FIELDS.EMAIL],
            onChange: handleChange, onFocus: resetError, onBlur: undefined },
        { id: FIELDS.PWD, type: "password", name: "Password", value: formValues[FIELDS.PWD],
            onChange: handleChange, onFocus: handleFocus, onBlur: handleBlur },
        { id: FIELDS.CONFIRM_PWD, type: "password", name: "Confirm Password", value: formValues[FIELDS.CONFIRM_PWD],
            onChange: handleChange, onFocus: resetError, onBlur: undefined},
    ];
}
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export const FIELDS = {
    F_NAME: "fname",
    L_NAME: "lname",
    EMAIL: "email",
    PWD: "password",
    CONFIRM_PWD: "confirmPassword",
};

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!?_])[A-Za-z\d@#$%&*!?_]{8,35}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export type FieldsType = Record<string, string>;

export interface Errors {
    [key: string]: string | undefined;
}

export function initFields(fields: string[]): FieldsType {
    return Object.values(fields).reduce((acc, key) => {
        acc[key] = "";
        return acc;
    }, {} as FieldsType);
}

export function useFormFields(initialFields: FieldsType): [
    FieldsType,
    (e: ChangeEvent<HTMLInputElement>) => void
] {
    const [formValues, setFormValues] = useState<FieldsType>(initialFields);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    return [formValues, handleChange];
}

export function validateFields(
    formValues: FieldsType,
    setErrors: Dispatch<SetStateAction<Errors>>,
    signup: boolean = true
): boolean {
    const newErrors: Errors = {};

    const validateNameField = (key: string, pos: string, maxLength = 35) => {
        if (formValues[key].length === 0) {
            newErrors[key] = `Please enter your ${pos} name`;
        } else if (formValues[key].length > maxLength) {
            newErrors[key] = `Your ${pos} name must not exceed ${maxLength} characters`;
        }
    };

    if (FIELDS.F_NAME in formValues) {
        validateNameField(FIELDS.F_NAME, "first");
    }
    if (FIELDS.L_NAME in formValues) {
        validateNameField(FIELDS.L_NAME, "last");
    }

    const isValidPassword = (password: string): boolean => PASSWORD_REGEX.test(password);
    const password = formValues[FIELDS.PWD];

    if (FIELDS.PWD in formValues && signup) {
        if (!isValidPassword(password)) {
            newErrors[FIELDS.PWD] = "Your passwords do not meet the requirement";
        }
        if (FIELDS.CONFIRM_PWD in formValues &&
            password !== formValues[FIELDS.CONFIRM_PWD]) {
            newErrors[FIELDS.CONFIRM_PWD] = "Your password doesn't match";
        }
    } else {
        if (password.length == 0) {
            newErrors[FIELDS.PWD] = "Your password cannot be empty";
        }
    }

    const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email);

    if (FIELDS.EMAIL in formValues) {
        const email = formValues[FIELDS.EMAIL];
        if (!isValidEmail(email)) {
            newErrors[FIELDS.EMAIL] = "You must enter a valid email";
        }
    }

    if (Object.keys(newErrors).length !== 0) {
        setErrors(newErrors);
    }

    return Object.keys(newErrors).length === 0;
}
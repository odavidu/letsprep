import {useNavigate} from "@remix-run/react";
import {Errors, FIELDS, initFields, useFormFields, validateFields} from "~/utils/form";
import {FormEvent, useState} from "react";
import {fetcher} from "~/utils/middleware";
import jwt from "jsonwebtoken";

export function LoginHandler() {
    const navigate = useNavigate();
    const fields = initFields([FIELDS.EMAIL, FIELDS.PWD]);
    const [errors, setErrors] = useState<Errors>({});
    const [formValues, handleChange] = useFormFields(fields);
    const [submitting, setSubmitting] = useState(false);

    const resetError = () => setErrors({});

    const handleFocus = () => {
        resetError();
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitting) {
            return;
        }
        if (!validateFields(formValues, setErrors, false)) {
            console.log("Validation failed:", formValues);
            return;
        }

        console.log("Submitting form data:", formValues);

        try {
            setSubmitting(true);
            const data = await fetcher("login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formValues[FIELDS.EMAIL],
                    password: formValues[FIELDS.PWD],
                }),
            });
            setSubmitting(false);
            console.log("Login successful:", data);
            navigate("/");
        } catch (error: any) {
            setSubmitting(false);
            console.error("Login failed:", error.message || error);
            setErrors({ general: error.message || "Something went wrong. Please try again." });
        }
    };

    return {
        formValues,
        errors,
        handleChange,
        handleFocus,
        handleSubmit,
        resetError,
        setErrors,
    };
}
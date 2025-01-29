import {FormEvent, useState} from "react";
import { useNavigate } from "@remix-run/react";
import { Errors, FIELDS, initFields, useFormFields, validateFields } from "~/utils/form";
import { fetcher } from "~/utils/middleware";

export function SignupHandler() {
    const navigate = useNavigate();
    const fields = initFields([
        FIELDS.F_NAME,
        FIELDS.L_NAME,
        FIELDS.EMAIL,
        FIELDS.PWD,
        FIELDS.CONFIRM_PWD,
    ]);
    const [errors, setErrors] = useState<Errors>({});
    const [formValues, handleChange] = useFormFields(fields);
    const [visible, setVisibility] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const resetError = () => setErrors({});

    const handleFocus = () => {
        resetError();
        setVisibility(true);
    };

    const handleBlur = () => setVisibility(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitting) {
            return;
        }
        if (!validateFields(formValues, setErrors)) {
            console.log("Validation failed:", formValues);
            return;
        }

        console.log("Submitting form data:", formValues);

        try {
            setSubmitting(true);
            const data = await fetcher("signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: formValues[FIELDS.F_NAME],
                    last_name: formValues[FIELDS.L_NAME],
                    email: formValues[FIELDS.EMAIL],
                    password: formValues[FIELDS.PWD],
                }),
            });
            setSubmitting(false);
            console.log("Signup successful:", data);
            navigate("/");
        } catch (error: any) {
            setSubmitting(false);
            console.error("Signup failed:", error.message || error);
            setErrors({ general: error.message || "Something went wrong. Please try again." });
        }
    };

    return {
        formValues,
        errors,
        visible,
        handleChange,
        handleFocus,
        handleBlur,
        handleSubmit,
        resetError,
        setErrors,
    };
}

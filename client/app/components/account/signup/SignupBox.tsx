import { CenterAll } from "../../Center";
import GoogleButton from "../button/GoogleButton";
import SubmitButton from "../button/SubmitButton";
import { Form, Link } from "@remix-run/react";
import ErrorMessage from "../../ErrorMessage";
import {SignupHandler} from "~/components/account/signup/signup_handler";
import SignupInputs, {getInputFields} from "~/components/account/signup/SignupInputs";

export default function SignupBox() {
    const {
        formValues,
        errors,
        visible,
        handleChange,
        handleFocus,
        handleBlur,
        handleSubmit,
        resetError,
    } = SignupHandler();

    const inputFields = getInputFields(formValues, handleChange, handleFocus, handleBlur, resetError);

    return (
        <div className="flex justify-items-start">
            <CenterAll>
                <div className="font-instrument-sans text-white">
                    <Form
                        className="bg-white p-10 rounded-sm text-xs text-[#1A1A1A]"
                        onSubmit={handleSubmit} method="post" noValidate
                    >
                        <div className="justify-items-center py-3 text-[11px]">
                            <h1 className="text-xl font-ibm font-medium pb-2">Sign Up</h1>
                            {errors.general && <ErrorMessage message={errors.general} />}
                        </div>

                        <SignupInputs
                            fields={inputFields}
                            visible={visible}
                            vals={formValues}
                            errs={errors}
                        />

                        <CenterAll>
                            <p>
                                Already have an account?&nbsp;
                                <Link className="underline text-[#2953DD]" to="/login">
                                    Log In
                                </Link>
                            </p>
                            <SubmitButton text="Create Account" />
                            <p>or</p>
                            <GoogleButton />
                        </CenterAll>
                    </Form>
                </div>
            </CenterAll>
        </div>
    );
}
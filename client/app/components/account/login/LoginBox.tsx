import AccountInput from "../AccountInput.js";
import GoogleButton from "../button/GoogleButton.js";
import SubmitButton from "../button/SubmitButton.js";
import {Form, Link} from "@remix-run/react";
import {CenterAll} from "~/components/Center";
import {LoginHandler} from "~/components/account/login/login_handler";
import ErrorMessage from "~/components/ErrorMessage";
import {FIELDS} from "~/utils/form";

export default function LoginBox() {
    const {
        formValues,
        errors,
        handleChange,
        handleFocus,
        handleSubmit,
        resetError,
    } = LoginHandler();

    return (
        <div className="flex justify-items-start">
            <CenterAll>
                <div className="font-instrument-sans text-white">
                    <Form
                        className="bg-white p-10 rounded-sm text-xs text-[#1A1A1A]"
                        onSubmit={handleSubmit} method="get" noValidate
                    >
                        <div className="justify-items-center py-3 text-[11px]">
                            <h1 className="text-xl font-ibm font-medium pb-2">Log In</h1>
                            {errors.general && <ErrorMessage message={errors.general} />}
                        </div>

                        <AccountInput
                            id="email"
                            type="email"
                            name="Email"
                            value={formValues[FIELDS.EMAIL]}
                            onChange={handleChange}
                            onFocus={resetError}
                            required={true}
                        />
                        <ErrorMessage message={errors["email"]}/>

                        <AccountInput
                            id="password"
                            type="password"
                            name="Password"
                            value={formValues[FIELDS.PWD]}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            required={true}
                        />
                        <ErrorMessage message={errors["password"]}/>

                        <div className="justify-items-center">
                            <p>
                                Don&#39;t have an account?&nbsp;
                                <Link className="underline text-[#2953DD]" to="/signup">Sign Up</Link>
                            </p>
                            <SubmitButton text="Sign In"/>
                            <p>or</p>
                            <GoogleButton/>
                        </div>
                    </Form>
                </div>
            </CenterAll>
        </div>
    );
}


import NavBar from "~/components/navbar/NavBar";
import {TotalCenter} from "~/components/Center";
import {Link} from "@remix-run/react";
import SignupBox from "~/components/account/signup/SignupBox";

export const meta = () => {
    return [
        {
            title: "Sign Up"
        },
        {
            name: "description",
            content: ""
        },
    ];
};

export default function SignupPage() {
    return (
        <div>
            <style>{ `body { background-color: #F1F1FC; }` }</style>

            <NavBar background={"white"} absolute={true}/>
            <div className="min-w-full min-h-screen inline-flex">
                <div className="w-1/2 h-screen">
                    <div className="bg-five h-full bg-cover bg-center">
                        <TotalCenter>
                            <div className="justify-items-center">
                                <div className="justify-items-center font-ibm font-bold text-6xl pb-6 text-white">
                                    <h1>
                                        Welcome to
                                    </h1>
                                    <Link className="underline" to="/">
                                        LetsPrep
                                    </Link>
                                </div>
                                <p className="font-ibm text-lg text-white">
                                    Register an account to start practicing problems now
                                </p>
                            </div>
                        </TotalCenter>
                    </div>
                </div>
                <div className="w-1/2 h-screen">
                    <TotalCenter>
                        <SignupBox/>
                    </TotalCenter>
                </div>
            </div>
        </div>
    );
}
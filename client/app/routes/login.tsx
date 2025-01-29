import NavBar from "~/components/navbar/NavBar";
import {TotalCenter} from "~/components/Center";
import {Link} from "@remix-run/react";
import LoginBox from "~/components/account/login/LoginBox";

export const meta = () => {
    return [
        {
            title: "Log In"
        },
        {
            name: "description",
            content: ""
        },
    ];
};

export default function LoginPage() {
    return (
        <div>
            <style>{ `body { background-color: #F1F1FC; }` }</style>

            <NavBar background={"white"} absolute={true}/>
            <div className="min-w-full min-h-screen inline-flex">
                <div className="w-1/2 h-screen">
                    <div className="bg-six h-full bg-cover bg-center">
                        <TotalCenter>
                            <div className="justify-items-center">
                                <div className="justify-items-center font-ibm font-bold text-6xl pb-6 text-white">
                                    <h1>
                                        Welcome back to
                                    </h1>
                                    <Link className="underline" to="/">
                                        LetsPrep
                                    </Link>
                                </div>
                                <p className="font-ibm text-lg text-white">
                                    Sign in to continue working on practice problems
                                </p>
                            </div>
                        </TotalCenter>
                    </div>
                </div>
                <div className="w-1/2 h-screen">
                    <TotalCenter>
                        <LoginBox/>
                    </TotalCenter>
                </div>
            </div>
        </div>
    );
}
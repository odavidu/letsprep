import type {MetaFunction} from "@remix-run/node";
import NavBar from "~/components/navbar/NavBar";
import {CenterAll} from "~/components/Center";
import ChatBox from "~/components/chat/ChatBox";
import Button from "~/components/Button";

export const meta: MetaFunction = () => {
    return [
        {title: "Lets Prep"},
        {name: "description", content: "Welcome to Lets Prep!"},
    ];
};

export default function Index() {
    return (
        <div>
            <style>{`body { background-color: #F1F1FC; }`}</style>
            <NavBar/>

            <div className="my-24">
                <CenterAll>
                    <span className="font-cormorant-infant uppercase tracking-widest font-semibold text-sm">
                        Explore. Practice. Master.
                    </span>
                    <h1 className="font-gloock font-medium text-5xl text-center my-2">
                        Transforming how you <br/>
                        prepare for success
                    </h1>
                    <span className="font-instrument-sans text-sm text-center mb-6">
                        Personalized practice problems and resources designed to <br/>
                        help you build confidence and achieve your goals with ease.
                    </span>
                    <Button link="/questions" text="Try Now" fill={false} color="#393939"/>
                </CenterAll>
            </div>
        </div>
    );
}

import ChatBox from "~/components/chat/ChatBox";
import {CenterAll} from "~/components/Center";


export const meta = () => {
    return [
        {
            title: "Questions"
        },
        {
            name: "description",
            content: ""
        },
    ];
};

export default function QuestionsPage() {
    return (
        <div>
            <style>{`body { overflow: hidden; background-color: #F1F1FC; }`}</style>
            <CenterAll>
                <div className="my-6">
                    <ChatBox/>
                </div>
            </CenterAll>
        </div>
    );
}
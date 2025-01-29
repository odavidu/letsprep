import TextBox from "~/components/chat/TextBox";
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
            <style>{`body { background-color: #F1F1FC; }`}</style>
            <CenterAll>
                <div className="my-6">
                    <TextBox/>
                </div>
            </CenterAll>
        </div>
    );
}
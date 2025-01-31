import React from "react";
import "katex/dist/katex.min.css";
import katex from "katex";

interface LatexRendererProps {
    text: string;
    className?: string;
}

const LatexRenderer: React.FC<LatexRendererProps> = ({ text, className }) => {
    const renderLatex = (input: string) => {
        return input.split("\n").map((line, index) => {
            line = line.replace(/\\\[(.*?)\\\]/gs, (_, math) =>
                `<div>${katex.renderToString(math, { displayMode: true })}</div>`
            );

            line = line.replace(/\\\((.*?)\\\)/gs, (_, math) =>
                `<span>${katex.renderToString(math, { displayMode: false })}</span>`
            );

            return (
                <span key={index}>
                    <span dangerouslySetInnerHTML={{ __html: line }} />
                    <br />
                </span>
            );
        });
    };

    return <div className={className}>{renderLatex(text)}</div>;
};

export default LatexRenderer;

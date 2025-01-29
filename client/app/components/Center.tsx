import {Children, ReactNode} from "react";

const Center = ({children}: { children: ReactNode }) => {
    return (
        <div className="flex justify-center items-center">
            {children}
        </div>
    );
}

const TotalCenter = ({children}: { children: ReactNode }) => {
    return (
        <div className="grid h-full w-full items-center justify-center">
            {children}
        </div>
    );
}

const CenterAll = ({children}: { children: ReactNode }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            {Children.map(children, (child) => (
                <Center>
                    {child}
                </Center>
            ))}
        </div>
    );
}

export default Center;
export {TotalCenter, CenterAll};
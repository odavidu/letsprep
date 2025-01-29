interface ErrorMessageProps {
    message?: string
}

export default function ErrorMessage({message}: ErrorMessageProps) {
    return !message ? null : (<span className="text-red-600 mx-1 -mt-1 text-[9px]">* {message}</span>)
}
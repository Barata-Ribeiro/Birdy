import tw from "@/utils/tw"
import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

export default function FormButton({
    children,
    className,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    const sortedClasses = tw`block w-full select-none bg-mantis-600 uppercase tracking-wide text-green-spring-50 transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-300/80 ${props.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-mantis-400"}`
    const mergedClassName = twMerge(sortedClasses, className)

    return (
        <button className={mergedClassName} {...props}>
            {children}
        </button>
    )
}

import tw from "@/utils/tw"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

export default function Input({ label, className, ...props }: ComponentProps<"input"> & { label: string }) {
    const sortedClasses = tw`peer block w-full rounded-lg border-green-spring-50 text-mantis-950 focus:border-bright-turquoise-500 dark:text-mantis-50`
    const mergedClassName = twMerge(sortedClasses, className)

    const lowerCaseLabel = label.toLowerCase()

    return (
        <>
            <label className="sr-only capitalize" htmlFor={lowerCaseLabel}>
                {label}
            </label>
            <input
                className={mergedClassName}
                type={props.type ?? "text"}
                name={props.name ?? lowerCaseLabel}
                id={lowerCaseLabel}
                placeholder={props.placeholder ?? label}
                {...props}
            />
        </>
    )
}

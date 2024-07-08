import tw from "@/utils/tw"
import type { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"
import type { AnchorHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

export default function Button({ children, className, ...props }: Readonly<AnchorHTMLAttributes<HTMLAnchorElement>>) {
    const sortedClasses = tw`select-none rounded-md bg-mantis-600 text-sm capitalize tracking-wide text-green-spring-50 transition-colors duration-300 hover:bg-mantis-400 focus:outline-none focus:ring focus:ring-blue-300/80 sm:order-2 sm:w-auto`
    const mergedClassName = twMerge(sortedClasses, className)

    return (
        <Link href={props.href as Url} className={mergedClassName} {...props}>
            {children}
        </Link>
    )
}

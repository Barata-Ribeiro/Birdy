"use client"

import Button from "@/components/utils/button"
import useMedia from "@/hooks/use-media"
import { UserContextResponse } from "@/interfaces/api/users"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { FaSignOutAlt } from "react-icons/fa"

const links = {
    home: "/",
    about: "/about",
    contact: "/contact",
    repository: "https://github.com/Barata-Ribeiro/Birdy"
}

export default function Header({ user }: { user: UserContextResponse | null }) {
    const pathname = usePathname()
    const isMobile = useMedia("(max-width: 64rem)")
    const [open, setOpen] = useState(false)

    useEffect(() => setOpen(!isMobile), [isMobile])

    return (
        <header
            className="sticky top-0 z-50 border-b bg-green-spring-50 shadow-sm dark:border-green-spring-400 dark:bg-green-spring-950"
            role="banner"
        >
            <div className="px-6 py-2 lg:container md:px-12 lg:mx-auto lg:px-0 lg:py-4">
                <div className="flex items-center justify-between">
                    <div
                        className="relative z-50 w-32 max-w-full xs:w-40 sm:w-52"
                        role="img"
                        aria-label="Birdy Logo"
                    >
                        <Link href="/" className="block w-full">
                            <Image
                                src="/images/logo.svg"
                                alt="Site logo"
                                className="dark:hidden"
                                priority
                                width={220}
                                height={64}
                                sizes="100vw"
                            />
                            <Image
                                src="/images/logo-dark.svg"
                                alt="Site logo"
                                className="hidden dark:block"
                                priority
                                width={220}
                                height={64}
                                sizes="100vw"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center justify-end border-l dark:border-green-spring-400 lg:border-l-0">
                        <input
                            type="checkbox"
                            name="hamburger"
                            checked={open}
                            aria-checked={open}
                            id="hamburger"
                            className="peer hidden"
                            onChange={() => setOpen(!open)}
                            aria-controls="primary-navigation"
                            aria-expanded={open ? "true" : "false"}
                            aria-label="Toggle navigation menu"
                            hidden
                        />
                        <label
                            htmlFor="hamburger"
                            className="peer-checked:hamburger relative z-20 -mr-6 block cursor-pointer p-6 lg:hidden"
                            role="button"
                            aria-label="Toggle navigation"
                        >
                            <div
                                aria-hidden="true"
                                className="m-auto h-0.5 w-6 rounded bg-mantis-900 transition duration-300 dark:bg-mantis-100"
                            ></div>
                            <div
                                aria-hidden="true"
                                className="m-auto mt-2 h-0.5 w-6 rounded bg-mantis-900 transition duration-300 dark:bg-mantis-100"
                            ></div>
                        </label>

                        <div className="fixed inset-0 w-[calc(100%-6rem)] translate-x-[-100%] border-r bg-white text-mantis-50 shadow-xl transition duration-300 peer-checked:translate-x-0 dark:border-green-spring-400 dark:bg-green-spring-700 lg:static lg:w-auto lg:translate-x-0 lg:border-r-0 lg:bg-transparent lg:shadow-none lg:dark:bg-transparent">
                            <nav
                                className="flex h-full flex-col justify-between lg:flex-row lg:items-center"
                                id="primary-navigation"
                                role="navigation"
                            >
                                <ul className="space-y-8 px-6 pt-32 text-green-spring-700 md:px-12 lg:flex lg:space-x-12 lg:space-y-0 lg:pt-0">
                                    {Object.entries(links).map(
                                        ([key, value]) => {
                                            const isActive = pathname === value
                                            return (
                                                <li key={key} className="w-fit">
                                                    <Link
                                                        className={
                                                            isActive
                                                                ? `rounded-md bg-mantis-200 px-4 py-1 text-base font-medium text-green-spring-900 dark:text-green-spring-950`
                                                                : `text-base font-normal text-green-spring-900 hover:text-bright-turquoise-500`
                                                        }
                                                        href={value}
                                                        target={
                                                            key === "repository"
                                                                ? "_blank"
                                                                : "_self"
                                                        }
                                                        rel={
                                                            key === "repository"
                                                                ? "noopener noreferrer"
                                                                : ""
                                                        }
                                                        role="link"
                                                        onClick={() =>
                                                            setOpen(!open)
                                                        }
                                                    >
                                                        <span className="relative">
                                                            {key}
                                                        </span>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    )}
                                </ul>

                                <div className="border-t px-6 py-8 dark:border-green-spring-400 md:px-12 md:py-16 lg:border-l lg:border-t-0 lg:py-0 lg:pl-6 lg:pr-0">
                                    {!user ? (
                                        <>
                                            <Link
                                                href="/sign/in"
                                                className="px-7 py-3 text-base hover:text-bright-turquoise-500"
                                                role="link"
                                                onClick={() => setOpen(!open)}
                                            >
                                                Sign in
                                            </Link>
                                            <Button
                                                href="/sign/up"
                                                className="px-7 py-3 font-medium"
                                                role="button"
                                                onClick={() => setOpen(!open)}
                                            >
                                                Sign Up
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="flex flex-row items-center justify-between gap-4 max-xs:flex-col xs:gap-2">
                                            <Link
                                                href={`/dashboard/${user.id}/${user.username}`}
                                                className="inline-flex items-center gap-2 text-base font-normal text-green-spring-900 hover:text-bright-turquoise-500"
                                                onClick={() => setOpen(!open)}
                                                role="dashboard"
                                                aria-label="User Dashboard"
                                            >
                                                <Image
                                                    src={user.avatar_url || ""}
                                                    className="dark:ring-green-sping-500 size-10 rounded-full p-1 ring-2 ring-green-spring-300 dark:ring-green-spring-500"
                                                    height={40}
                                                    width={40}
                                                    sizes="100vw"
                                                    alt="Your avatar"
                                                />
                                                {user.username}
                                            </Link>
                                            <Link
                                                href="/sign/in"
                                                className="border-green-spring-100 text-2xl text-green-spring-200 hover:text-green-spring-300 dark:border-green-spring-400 max-xs:border-t-2 max-xs:pt-4 lg:border-l-2 lg:pl-2 lg:text-xl"
                                                onClick={() => setOpen(!open)}
                                                role="log out"
                                                aria-label="Log out button"
                                            >
                                                <FaSignOutAlt />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

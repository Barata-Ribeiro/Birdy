import Button from "@/components/utils/Button"
import { UserContextResponse } from "@/interfaces/api/users"
import Image from "next/image"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"

const links = {
    privacy: "/privacy-policy",
    terms: "/terms-of-use",
    portfolio: "https://barataribeiro.com/"
}

export default async function Footer({
    user
}: {
    user: UserContextResponse | null
}) {
    return (
        <footer className="mt-auto bg-green-spring-50 dark:bg-green-spring-950">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col items-center text-center">
                    <Link href="/">
                        <Image
                            src="/images/logo.svg"
                            alt="Site logo"
                            className="h-10 w-auto dark:hidden"
                            priority
                            width={220}
                            height={64}
                            sizes="100vw"
                        />
                        <Image
                            src="/images/logo-dark.svg"
                            alt="Site logo"
                            className="hidden h-10 w-auto dark:block"
                            priority
                            width={220}
                            height={64}
                            sizes="100vw"
                        />
                    </Link>

                    <p className="mx-auto mt-4 max-w-md text-green-spring-500 dark:text-green-spring-400">
                        Birdy is an open-source project made by{" "}
                        <Link
                            href="https://barataribeiro.com/"
                            className="text-green-spring-600 transition-colors duration-300 hover:text-bright-turquoise-500 dark:text-green-spring-400 dark:hover:text-bright-turquoise-200"
                            rel="noopener noreferrer"
                        >
                            Barata Ribeiro
                        </Link>
                        . Feel free to use, study, or contribute as you wish.
                    </p>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
                        <Link
                            href="https://github.com/Barata-Ribeiro/Birdy"
                            rel="noopener noreferrer"
                            className="order-1 mt-3 flex w-full items-center justify-center rounded-md border p-2 text-sm capitalize tracking-wide text-green-spring-600 transition-colors duration-300 hover:bg-green-spring-100 focus:outline-none focus:ring focus:ring-green-spring-300/40 dark:border-green-spring-400 dark:text-green-spring-300 dark:hover:bg-green-spring-800 sm:mt-0 sm:w-auto"
                        >
                            <FaGithub size="18" />

                            <span className="mx-1">Repository</span>
                        </Link>
                        {!user && (
                            <Button href="/sign/up" className="px-5 py-2">
                                Sign Up
                            </Button>
                        )}
                    </div>
                </div>

                <hr className="my-10 border-green-spring-200 dark:border-green-spring-700" />

                <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                    <p className="text-sm text-green-spring-500">
                        © Copyright <span>{new Date().getFullYear()}</span>.
                        All Rights Reserved.
                    </p>

                    <nav className="-mx-2 mt-3 flex sm:mt-0">
                        {Object.entries(links).map(([key, value]) => (
                            <Link
                                href={value}
                                key={key}
                                className="mx-2 text-sm text-green-spring-600 transition-colors duration-300 hover:text-bright-turquoise-500 dark:text-green-spring-400 dark:hover:text-bright-turquoise-200"
                            >
                                {key}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    )
}

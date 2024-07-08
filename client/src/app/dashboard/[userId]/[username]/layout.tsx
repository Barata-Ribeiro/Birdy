import getPrivateProfile from "@/actions/user/get-private-profile"
import DashboardNavigation from "@/components/dashboard/dashboard-navigation"
import { PrivateProfileResponse } from "@/interfaces/api/users"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ReactNode } from "react"
import { FaUser, FaUserTie } from "react-icons/fa"
import DefaultAvatar from "../../../../../public/images/default-avatar.svg"
import DefaultCover from "../../../../../public/images/default-cover.jpg"

interface DashboardLayoutProps {
    children: ReactNode
    params: { userId: string; username: string }
}

export default async function DashBoardLayout({ children, params }: Readonly<DashboardLayoutProps>) {
    if (!params.userId || !params.username) return notFound()

    const state = await getPrivateProfile(params.userId)

    const user = state.response?.data as PrivateProfileResponse | null
    if (!user) return notFound()

    const DEFAULT_BIO = "You haven't set a bio yet."

    return (
        <>
            <header className="bg-mantis-100 pb-8 dark:bg-mantis-800">
                <div
                    style={{
                        backgroundImage: `url('${user.cover_image_url ?? DefaultCover.src}')`
                    }}
                    className="h-[250px] w-full bg-cover bg-bottom"
                    aria-label="User cover image"
                ></div>

                <div className="-mt-20 flex flex-col items-center">
                    <div className="relative h-40 w-40 antialiased">
                        <Image
                            src={user.avatar_url ?? DefaultAvatar}
                            alt={`${user.username}, this is your avatar.`}
                            title={`${user.username}, this is your avatar.`}
                            className="aspect-square rounded-full border-4 border-green-spring-50 object-cover object-center align-middle italic dark:border-mantis-800"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            fill
                        />
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                        <Link
                            href={`/user/${user.id}/${user.username}`}
                            className="font-body text-2xl dark:text-mantis-50"
                        >
                            {user.username}
                        </Link>
                        {user.role === "ADMIN" ? <FaUserTie size={18} /> : <FaUser size={18} />}
                    </div>
                    <p className="text-green-spring-700 dark:text-mantis-300">{user.email}</p>
                    <p className="mb-3 mt-1 max-w-md text-center text-green-spring-700 dark:text-mantis-300">
                        {user.bio ?? DEFAULT_BIO}
                    </p>
                    <ul className="flex flex-col items-center gap-3 sm:flex-row sm:gap-2">
                        <li>
                            <p className="text-sm text-green-spring-500 dark:text-mantis-200">
                                {user.photo_count} Photo(s)
                            </p>
                        </li>
                        <li className="hidden sm:block">|</li>
                        <li>
                            <Link
                                href={`/dashboard/${user.id}/${user.username}/manage`}
                                className="text-sm text-green-spring-500 dark:text-mantis-200"
                            >
                                Edit Profile
                            </Link>
                        </li>
                        <li className="hidden sm:block">|</li>
                        <li>
                            <Link
                                href={`/dashboard/${user.id}/${user.username}/delete`}
                                className="text-sm text-red-400 dark:text-red-600"
                            >
                                Delete Account
                            </Link>
                        </li>
                    </ul>
                </div>

                <DashboardNavigation user={user} />
            </header>

            <section id="routes" aria-label="Dashboard routes">
                {children}
            </section>
        </>
    )
}

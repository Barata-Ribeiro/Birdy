import getPhotosFeed from "@/actions/photos/get-photos-feed"
import getPublicProfile from "@/actions/user/get-public-profile"
import { useUser } from "@/context/user-context"
import { FeedResponse } from "@/interfaces/api/photos"
import { PublicProfileResponse } from "@/interfaces/api/users"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FaUser, FaUserTie } from "react-icons/fa"

interface UserPageParams {
    params: {
        slug: [userId: string, username: string]
    }
}

export async function generateMetadata({
    params
}: UserPageParams): Promise<Metadata> {
    const username = params.slug[1]

    return {
        title: `${username} | Birdy`,
        description: `This is the profile page of ${username} on Birdy.`
    }
}

export default async function UserPage({ params }: UserPageParams) {
    if (!params.slug) return notFound()

    const userState = await getPublicProfile(params.slug[0])
    const profile = userState.response?.data as PublicProfileResponse | null
    if (!profile) return notFound()

    const photosState = await getPhotosFeed({ userId: profile.id })
    const photos = photosState.response?.data as FeedResponse[]

    const { user } = useUser()

    return (
        <section className="my-4" aria-labelledby="user-profile-title">
            <div className="relative block h-[500px]">
                <div
                    style={{
                        backgroundImage: `url('${profile.cover_image_url}')`
                    }}
                    className="absolute top-0 h-full w-full bg-cover bg-center"
                    aria-hidden="true"
                >
                    <span
                        id="blackOverlay"
                        className="absolute h-full w-full bg-green-spring-950/50"
                        aria-hidden="true"
                    ></span>
                </div>
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 top-auto h-[4.375rem] w-full overflow-hidden"
                    style={{ transform: "translateZ(0)" }}
                >
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon
                            className="fill-current text-green-spring-50"
                            points="2560 0 2560 100 0 100"
                        ></polygon>
                    </svg>
                </div>
            </div>

            <div className="relative py-16">
                <div className="container mx-auto md:px-4">
                    <div className="relative -mt-64 mb-6 flex w-full min-w-0 flex-col gap-4 break-words rounded-lg bg-green-spring-50 shadow-xl">
                        {/* PROFILE INFO */}
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                {/* AVATAR */}
                                <div className="flex w-full justify-center px-4  lg:order-2 lg:w-3/12">
                                    <div className="relative">
                                        <Image
                                            alt={`Avatar of ${profile.username}`}
                                            title={`Avatar of ${profile.username}`}
                                            src={`${profile.avatar_url}`}
                                            style={{
                                                width: "auto",
                                                height: "auto"
                                            }}
                                            className="absolute left-1/2 top-1/2 aspect-square h-36 w-36 max-w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green-spring-50 object-cover object-center align-middle italic shadow-xl lg:-mt-12"
                                            width={150}
                                            height={150}
                                            sizes="100vw"
                                        />
                                    </div>
                                </div>

                                {/* FOLLOWINGS */}
                                {/* TO BE IMPLEMENTED */}

                                {/* INFO */}
                                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                                    <div className="flex justify-center py-4 lg:pt-4">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="block text-xl font-bold uppercase tracking-wide text-green-spring-600">
                                                {profile.photo_count}
                                            </span>
                                            <span className="text-sm text-green-spring-400">
                                                Photos
                                            </span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="block text-xl font-bold uppercase tracking-wide text-green-spring-600">
                                                {profile.liked_photo_count}
                                            </span>
                                            <span className="text-sm text-green-spring-400">
                                                Likes
                                            </span>
                                        </div>
                                        <div className="p-3 text-center lg:mr-4">
                                            <span className="block text-xl font-bold uppercase tracking-wide text-green-spring-600">
                                                {/* {profile.comment_count} */}
                                                {/* TO BE ADDED */}
                                            </span>
                                            <span className="text-sm text-green-spring-400">
                                                Comments
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* INFO PART 2 */}
                            <div className="mt-6 flex flex-col items-center justify-center gap-2 lg:mt-12">
                                <h3
                                    id="user-profile-title"
                                    className="flex items-center gap-1 text-4xl font-semibold leading-normal text-green-spring-700 dark:text-green-spring-700"
                                >
                                    @{profile.username}
                                    {profile.role === "ADMIN" ? (
                                        <FaUserTie size={20} />
                                    ) : (
                                        <FaUser size={20} />
                                    )}
                                </h3>
                                <p className="text-sm text-green-spring-400">
                                    {profile.display_name}
                                </p>
                                <p className="mt-2 text-center leading-7 text-green-spring-600">
                                    {profile.bio}
                                </p>
                            </div>
                        </div>

                        <hr className="w-2/3 self-center" />

                        {/* PHOTOS */}
                        {photos && photos.length > 0 ? (
                            <ul className="flex flex-wrap items-center justify-center pb-4">
                                {photos.map((photo, i) => (
                                    <li
                                        key={photo.id + "_" + i}
                                        id={photo.id + "_" + i}
                                        className="break-inside"
                                    >
                                        <Link href={`/photo/${photo.id}/${photo.slug}`}>
                                            <Image
                                                src={photo.image_url}
                                                alt={`Photo: ${photo.title}, by @${photo.author.username}`}
                                                title={`Photo: ${photo.title}, by @${photo.author.username}`}
                                                className="h-60 w-60 object-cover object-center align-middle grayscale hover:grayscale-0"
                                                width={240}
                                                height={240}
                                                sizes="100vw"
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="pb-4 pl-8 pr-16 text-center font-semibold text-green-spring-300">
                                This user has no photos.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

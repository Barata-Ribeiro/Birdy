import getPhotosFeed from "@/actions/photos/get-photos-feed"
import getPrivateProfile from "@/actions/user/get-private-profile"
import Feed from "@/components/feed/feed"
import { FeedResponse } from "@/interfaces/api/photos"
import { PrivateProfileResponse } from "@/interfaces/api/users"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Private Feed | Birdy",
    description: "In this page you'll find all the photos you have uploaded."
}

export default async function PrivateFeedPage({
    params
}: Readonly<{
    params: { userId: string; username: string }
}>) {
    const userState = await getPrivateProfile(params.userId)
    const user = userState.response?.data as PrivateProfileResponse

    const photosState = await getPhotosFeed({ userId: user?.id })
    const photos = (photosState.response?.data as FeedResponse[]) ?? []

    return (
        <section className="my-4">
            <h1 className="text-center text-2xl">Your Photos</h1>
            {photos.length > 0 ? (
                <Feed photos={photos} userId={user.id} />
            ) : (
                <p className="mt-4 text-center text-lg text-gray-600">
                    You have no photos! Go to{" "}
                    <Link
                        className="text-green-spring-50 transition-colors duration-300 hover:text-bright-turquoise-500 dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 lg:text-green-spring-600"
                        href={`/dashboard/${user.id}/${user.username}/upload`}
                    >
                        &apos;New Post&apos;
                    </Link>{" "}
                    to start sharing your photos!
                </p>
            )}
        </section>
    )
}

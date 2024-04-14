import getPhoto from "@/actions/photos/get-photo"
import DeleteButton from "@/components/utils/delete-button"
import { useUser } from "@/context/user-context"
import { PhotoResponse } from "@/interfaces/api/photos"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PhotoPageProps {
    params: {
        slug: [photoId: string, slug: string]
    }
}

export async function generateMetadata({ params }: PhotoPageProps) {
    const state = await getPhoto(params.slug[0])
    const photo = state.response?.data as PhotoResponse | null

    if (!photo) return { title: "Photo", description: "Photo Not Found..." }

    return {
        title: photo.title + " | Birdy",
        description: `photo${photo.title} taken by ${photo.author.display_name}.`
    }
}

export default async function PhotoPage({ params }: PhotoPageProps) {
    const state = await getPhoto(params.slug[0])
    const photo = state.response?.data as PhotoResponse | null
    if (!photo) return notFound()
    const { user } = useUser()

    return (
        <section className="my-4">
            <div className="grid grid-cols-1 justify-center gap-4 max-md:items-center max-md:px-1 md:grid-cols-2 lg:justify-between">
                <Image
                    src={photo.image_url}
                    alt={`${photo.title}, by ${photo.author.display_name}`}
                    title={`${photo.title}, by ${photo.author.display_name}`}
                    className="object-cover italic md:rounded-xl"
                    width={1000}
                    height={1000}
                    sizes="100vw"
                    priority
                />
                <div className="flex flex-col gap-3 md:gap-5">
                    {/* Title */}
                    <div className="flex items-end justify-between">
                        <div className="mb-2 flex flex-col items-start justify-start gap-1 leading-none">
                            <h1 className="text-4xl font-semibold">
                                {photo.title}
                            </h1>
                            <Link
                                className="text-xs text-green-spring-400 dark:text-green-spring-300"
                                href={`/user/${photo.author.id}/${photo.author.username}`}
                                aria-label={`Profile Author: ${photo.author.username}`}
                            >
                                @{photo.author.username}
                            </Link>
                        </div>
                        {user &&
                            (photo.author.id === user.id ||
                                user.role === "ADMIN") && (
                                <DeleteButton
                                    user={user}
                                    photo={photo}
                                    direction="right"
                                />
                            )}
                    </div>

                    {/* META NUMBERS */}
                </div>
            </div>
        </section>
    )
}

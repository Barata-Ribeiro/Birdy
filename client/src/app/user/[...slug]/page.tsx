import type { Metadata } from "next"
import { notFound } from "next/navigation"

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
        description: `This is the user page of ${username} on Birdy.`
    }
}

export default async function UserPage({ params }: UserPageParams) {
    if (!params.slug) return notFound()

    return (
        <section>
            <h1>User Page</h1>
            <p>userId: {params.slug[0]}</p>
            <p>username: {params.slug[1]}</p>
        </section>
    )
}

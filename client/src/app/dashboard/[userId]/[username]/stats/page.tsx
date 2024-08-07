import getUserPhotosStats from "@/actions/user/get-user-photos-stats"
import Loading from "@/components/utils/loading"
import { UserPhotosStatsResponse } from "@/interfaces/api/users"
import { Metadata } from "next"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
    title: "Stats",
    description: "In this page, you have access to your profile stats such as your total hits, likes, and comments."
}

const DashboardStats = dynamic(() => import("@/components/dashboard/dashboard-stats"), {
    loading: () => <Loading />,
    ssr: false
})

export default async function StatsPage({
    params
}: Readonly<{
    params: { userId: string; username: string }
}>) {
    const state = await getUserPhotosStats(params.userId)
    const photos = state.response?.data as UserPhotosStatsResponse

    return (
        <section className="p-4 sm:px-0">
            <h1 className="text-center text-2xl dark:text-mantis-50">Your Stats</h1>
            {photos.total_photos > 0 ? (
                <DashboardStats data={photos} />
            ) : (
                <p className="mt-4 text-center text-lg text-gray-600 dark:text-mantis-300">
                    No photos to generate stats. Start sharing your moments to see statistics!
                </p>
            )}
        </section>
    )
}

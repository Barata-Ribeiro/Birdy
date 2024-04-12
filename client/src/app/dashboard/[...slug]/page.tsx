import { DashboardParams } from "@/app/dashboard/[...slug]/layout"

export default async function PrivateFeedPage({ params }: DashboardParams) {
    return (
        <section>
            <h1>Private Feed</h1>
        </section>
    )
}

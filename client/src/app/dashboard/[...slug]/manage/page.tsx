import { DashboardParams } from "@/app/dashboard/[...slug]/layout"

export default async function ManagePage({ params }: DashboardParams) {
    return (
        <main>
            <h1>Manage</h1>
        </main>
    )
}

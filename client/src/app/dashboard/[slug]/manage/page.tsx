import { DashboardParams } from "@/app/dashboard/[slug]/layout"
import DashboardManage from "@/components/dashboard/dashboard-manage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Manage | Birdy",
    description: "Here you can mange your profile and settings."
}

export default async function ManagePage({ params }: DashboardParams) {
    return (
        <section className="p-4 sm:px-0">
            <h1 className="text-center text-2xl">Manage your account!</h1>
            <DashboardManage
                userId={params.slug[0]}
                username={params.slug[1]}
            />
        </section>
    )
}

import DashboardManage from "@/components/dashboard/dashboard-manage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Manage | Birdy",
    description: "Here you can mange your profile and settings."
}

export default async function ManagePage({
    params
}: Readonly<{
    params: { userId: string; username: string }
}>) {
    return (
        <section className="p-4 sm:px-0">
            <h1 className="text-center text-2xl">Manage your account!</h1>
            <DashboardManage userId={params.userId} username={params.username} />
        </section>
    )
}

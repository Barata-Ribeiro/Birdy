import DashboardDelete from "@/components/dashboard/dashboard-delete"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Delete your account",
    description: "Delete your account if you no longer want to use the service."
}

export default async function DeletePage({
    params
}: Readonly<{
    params: { userId: string; username: string }
}>) {
    return (
        <section className="p-4 sm:px-0">
            <h1 className="text-center text-2xl">Delete your account</h1>
            <DashboardDelete params={params} />
        </section>
    )
}

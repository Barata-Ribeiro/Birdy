import { DashboardParams } from "@/app/dashboard/[...slug]/layout"
import DashboardDelete from "@/components/dashboard/dashboard-delete"
import { useUser } from "@/context/user-context"
import { notFound } from "next/navigation"

export default async function DeletePage({ params }: DashboardParams) {
    const { user } = useUser()
    if (!user) return notFound()
    if (params.slug[0] !== user.id) return notFound()

    return (
        <section className="p-4 sm:px-0">
            <h1 className="text-center text-2xl">Delete your account</h1>
            <DashboardDelete data={user} />
        </section>
    )
}

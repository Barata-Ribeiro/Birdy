import DashboardDelete from "@/components/dashboard/dashboard-delete"

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

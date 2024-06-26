import getUserContext from "@/actions/user/get-user-context"
import Footer from "@/components/global/footer"
import Header from "@/components/global/header"
import { UserContextProvider } from "@/context/user-context"
import { UserContextResponse } from "@/interfaces/api/users"
import type { Metadata } from "next"
import { Lora, Montserrat } from "next/font/google"
import "./globals.css"
import { ReactNode } from "react"

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-montserrat"
})

const lora = Lora({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-lora"
})

export const metadata: Metadata = {
    title: "Birdy",
    description:
        "Welcome to Birdy! A social network platform for bird enthusiasts."
}

export default async function RootLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    const context = await getUserContext()
    let user: UserContextResponse | null = null
    if (context.ok) user = context.response?.data as UserContextResponse

    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${lora.variable}`}>
                <UserContextProvider user={user}>
                    <Header user={user} />
                    <main className="flex-1 md:container">{children}</main>
                    <Footer user={user} />
                </UserContextProvider>
            </body>
        </html>
    )
}

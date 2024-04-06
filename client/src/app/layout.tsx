import type { Metadata } from "next"
import { Lora, Montserrat } from "next/font/google"
import "./globals.css"

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

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${lora.variable}`}>
                {children}
            </body>
        </html>
    )
}

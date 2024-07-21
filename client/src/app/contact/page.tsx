import { Metadata } from "next"
import Link from "next/link"
import ContactForm from "@/components/forms/contact-form"

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact page for Birdy. Contact us for feedback and support."
}

export default async function ContactPage() {
    return (
        <section className="container mx-auto px-5 py-10">
            <p className="mx-auto mb-4 max-w-3xl leading-relaxed">
                The Birdy team is always looking for feedback and ways of improving its users experiences. If you have
                any questions, requests, or suggestions, please contact us using our{" "}
                <Link
                    href="https://github.com/Barata-Ribeiro/Birdy/issues"
                    target="_blank"
                    rel="external noopener noreferrer"
                    className="text-green-spring-50 transition-colors duration-300 hover:text-bright-turquoise-500 hover:underline dark:text-green-spring-400 dark:hover:text-bright-turquoise-200 lg:text-green-spring-600"
                >
                    issues page
                </Link>{" "}
                in the project&apos;s repository.
            </p>
            <ContactForm />
        </section>
    )
}

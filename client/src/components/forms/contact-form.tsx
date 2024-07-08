"use client"

import FormButton from "@/components/utils/form-button"
import Input from "@/components/utils/input"
import { FormEvent, useState } from "react"

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [messageSubject, setMessageSubject] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            alert(
                `The contact form is currently disabled. Use the repository's issues page! \n\n Submitted information: \n 
                Name: ${name} \n 
                Email: ${email} \n
                Subject: ${messageSubject} \n
                Message: ${message}`
            )

            setIsLoading(false)
        }, 2500)
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4">
            <Input
                label="Name"
                name="name"
                className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-required
            />
            <Input
                type="email"
                label="Email"
                name="email"
                className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required
            />
            <Input
                label="Subject"
                name="messageSubject"
                className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
                required
                aria-required
            />
            <textarea
                id="message"
                name="message"
                className="peer block w-full rounded-lg border-green-spring-50 bg-mantis-200 p-2.5 text-lg text-mantis-950 placeholder:text-green-spring-400 focus:border-bright-turquoise-500 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                rows={5}
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                aria-required
            ></textarea>
            <div className="px-4 pb-2 pt-4">
                <FormButton
                    type="submit"
                    className="rounded-2xl p-4 text-lg group-invalid:pointer-events-none group-invalid:opacity-30"
                    aria-label="Send Message"
                    disabled={isLoading}
                    aria-disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Send Message"}
                </FormButton>
            </div>
        </form>
    )
}

"use client"

import FormButton from "@/components/utils/form-button"
import Input from "@/components/utils/input"

export default function ContactForm() {
    return (
        <form className="mx-auto flex max-w-md flex-col gap-4">
            <Input
                label="Name"
                name="messageName"
                className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                disabled
            />
            <Input
                type="email"
                label="Email"
                name="messageEmail"
                className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                disabled
            />
            <Input
                label="Subject"
                name="messageSubject"
                className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                disabled
            />
            <label htmlFor="messageBody" className="sr-only capitalize">
                Message
            </label>
            <textarea
                id="messageBody"
                name="messageBody"
                className="peer block w-full resize-none rounded-lg border-green-spring-50 bg-mantis-200 p-2.5 text-lg text-mantis-950 placeholder:text-green-spring-400 focus:border-bright-turquoise-500 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                rows={6}
                placeholder="Write your message here..."
                disabled
            ></textarea>
            <div className="mt-4">
                <FormButton
                    type="submit"
                    className="rounded-2xl p-4 text-lg disabled:cursor-default group-invalid:pointer-events-none group-invalid:opacity-30"
                    disabled
                >
                    Send Message
                </FormButton>
            </div>
        </form>
    )
}

"use client"

import putPrivateProfile from "@/actions/user/put-private-profile"
import ErrorElement from "@/components/utils/error-element"
import FormButton from "@/components/utils/form-button"
import Input from "@/components/utils/input"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"

export default function DashboardManage({
    userId,
    username
}: Readonly<{
    userId: string
    username: string
}>) {
    const { pending } = useFormStatus()
    const [state, action] = useFormState(putPrivateProfile, {
        ok: false,
        client_error: null,
        response: null
    })

    useEffect(() => {
        if (state.ok) window.location.href = `/dashboard/${userId}/${username}`
    }, [state.ok])

    return (
        <form
            action={action}
            className="group mx-auto w-full px-4 sm:w-2/3 lg:px-0"
        >
            <div className="pb-2 pt-4">
                <Input
                    label="Username"
                    autoComplete="off"
                    aria-autocomplete="none"
                    className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                />
            </div>
            <div className="pb-2 pt-4">
                <Input
                    label="Display Name"
                    name="displayName"
                    className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                />
            </div>
            <div className="pb-2 pt-4">
                <Input
                    type="url"
                    label="Avatar"
                    name="avatarUrl"
                    className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                />
            </div>
            <div className="pb-2 pt-4">
                <Input
                    type="url"
                    label="Cover Image"
                    name="coverImageUrl"
                    className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                />
            </div>
            <div className="pb-2 pt-4">
                <label className="sr-only capitalize" htmlFor="bio">
                    Biography
                </label>
                <textarea
                    name="bio"
                    id="bio"
                    className="peer block w-full rounded-lg border-green-spring-50 bg-mantis-200 p-4 text-lg text-mantis-950 placeholder:text-green-spring-400 focus:border-bright-turquoise-500 dark:bg-mantis-800 dark:text-mantis-50 dark:placeholder:text-green-spring-300"
                    placeholder="Type in your biography..."
                ></textarea>
            </div>
            <fieldset className="pb-2 pt-4">
                <p className="mb-1 block text-green-spring-700 dark:text-green-spring-500">
                    Change Password?
                </p>
                <Input
                    type="password"
                    label="New Password"
                    name="newPassword"
                    autoComplete="new-password"
                    className="mb-2 bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                />
                <Input
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    autoComplete="off"
                    className=" bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                />
            </fieldset>
            <div className="pb-2 pt-4">
                <Input
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                    className="bg-mantis-200 p-4 text-lg placeholder:text-green-spring-400 dark:bg-mantis-800 dark:placeholder:text-green-spring-300"
                    required
                    aria-required
                />
            </div>
            <ErrorElement error={state.client_error} />
            <div className="px-4 pb-2 pt-4">
                <FormButton
                    type="submit"
                    className="rounded-2xl p-4 text-lg group-invalid:pointer-events-none group-invalid:opacity-30"
                    aria-label="Update Profile"
                    disabled={pending}
                    aria-disabled={pending}
                >
                    {pending ? "Loading..." : "Update Profile"}
                </FormButton>
            </div>
        </form>
    )
}

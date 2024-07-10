export default async function PasswordResetPage() {
    return (
        <>
            <div className="my-6 flex flex-col gap-2">
                <h1 className="font-sans text-3xl font-semibold leading-normal text-green-spring-50 lg:text-green-spring-950">
                    Reset your password
                </h1>
                <h2 className="font-serif text-lg leading-normal text-green-spring-50 lg:text-green-spring-950">
                    Enter your new password below
                </h2>
            </div>

            <form>{/*TODO: Add Reset password component*/}</form>
        </>
    )
}

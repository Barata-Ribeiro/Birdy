export default function ErrorElement({ error }: Readonly<{ error: string | null }>) {
    if (!error) return null
    return (
        <p
            className="text-lg font-semibold text-red-500"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `error-${error}` : undefined}
        >
            {error}
        </p>
    )
}

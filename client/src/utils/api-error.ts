import { State } from "@/interfaces/actions"

export default function ApiError(error: unknown): State {
    console.error(error)

    const state: State = {
        ok: false,
        client_error: null,
        response: null
    }

    return {
        ...state,
        client_error:
            error instanceof Error
                ? error.message
                : "An unknown error occurred."
    }
}

export interface ApiResponse {
    status: string
    code: number
    message: string
    data?: unknown
}

export interface State {
    ok: boolean
    client_error: string
    response: ApiResponse | null
}

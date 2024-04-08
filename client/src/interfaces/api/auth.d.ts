export interface AuthRegisterResponse {
    id: string
    username: string
    display_name: string
    email: string
    role: string
    createdAt: string
    updatedAt: string
}

export interface AuthLoginResponse {
    access_token: string
    refresh_token: string
}

export interface AuthRefresTokenhResponse {
    access_token: string
}

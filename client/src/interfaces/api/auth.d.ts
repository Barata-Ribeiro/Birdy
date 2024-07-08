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
    auth_token: string
    user: {
        id: string
        username: string
        role: "0" | "1" | "2" | "3"
    }
}

export interface AuthRefresTokenhResponse {
    access_token: string
}

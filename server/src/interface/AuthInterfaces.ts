import { User } from "../entity/User"

export interface AuthUserRegisterBody {
    username: string
    display_name: string
    password: string
    email: string
}

export interface AuthUserLoginBody {
    username: string
    password: string
    remember_me: boolean
}

export interface AuthLoginServiceResponse {
    auth_token: string
    user: Partial<User>
}

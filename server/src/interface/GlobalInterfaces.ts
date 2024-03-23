import { User } from "../entity/User"

declare global {
    namespace Express {
        export interface Request {
            user: {
                data: Partial<User> | null
                is_admin: boolean
            }
        }
    }
    namespace JwtPayload {
        export interface JwtPayload {
            id: string
        }
    }
}

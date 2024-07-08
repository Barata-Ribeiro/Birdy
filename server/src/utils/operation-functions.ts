import { JsonWebTokenError, JwtPayload, TokenExpiredError, verify } from "jsonwebtoken"
import { ObjectLiteral, QueryFailedError, Repository } from "typeorm"
import { ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from "../middleware/helpers/ApiErrors"
import { isUUIDValid } from "./validity-functions"

export function attemptToGetUserIdFromToken(token: string, key: string): string {
    try {
        const payload = verify(token, key) as JwtPayload
        const { id } = payload

        if (!id) throw new NotFoundError("ID not found in token.")
        if (!isUUIDValid(id)) throw new UnauthorizedError("Invalid ID in token.")

        return id
    } catch (error) {
        if (error instanceof TokenExpiredError) throw new UnauthorizedError("Your token has expired.")
        else if (error instanceof JsonWebTokenError) throw new UnauthorizedError("Invalid token.")
        else throw error
    }
}

export async function saveEntityToDatabase<T extends ObjectLiteral>(repository: Repository<T>, entity: T): Promise<T> {
    try {
        return await repository.save(entity)
    } catch (error) {
        console.error(`Error saving the ${entity} in repository: `, error)
        if (error instanceof QueryFailedError) throw new ConflictError("Duplicate field value entered.")
        throw new InternalServerError(`An error occurred while saving the entity ${entity}.`)
    }
}

import { findById } from '../interfaces/user.repository'
import { UserDTO } from '../dto/user.dto'
import { BaseError } from '@/shared/errors/BaseError'
import { validateUUID } from '@/shared/utils/validateUUID'


export const getUserById = async (userId: string): Promise<UserDTO> => {

    if (!userId) {
        throw new BaseError('User ID is required', 400)
    }

    // Validate the userId
    validateUUID(userId)

    // Fetch the user from the database
    const user = await findById.findById(userId)
    if (!user) {
        throw new BaseError('User not found', 404)
    }

    return user
}

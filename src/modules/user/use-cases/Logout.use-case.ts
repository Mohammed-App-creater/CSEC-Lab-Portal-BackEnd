import { validateUUID } from '@/shared/utils/validateUUID';
import { BaseError } from '@/shared/errors/BaseError';
import { revokeRefreshToken } from '../services/tokenService'



export const logout = async (userId: string) => {
    // Validate the userId
    if (!validateUUID(userId)) {
        throw new BaseError('Invalid user ID', 400);
    }

    // Revoke the refresh token
    try {
        await revokeRefreshToken(userId);
    } catch (error) {
        throw new BaseError('Failed to revoke refresh token.', 500);
    }
}
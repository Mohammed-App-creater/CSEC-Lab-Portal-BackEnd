import { validateUUID } from '@/shared/utils/validateUUID';
import { BaseError } from '@/shared/errors/BaseError';
import { revokeRefreshToken } from '../services/tokenService'



export const logoutUseCase = async (userId: string) => {
    if (!userId) {
        throw new BaseError('User ID is required', 400);
    }
    // Validate the userId
    validateUUID(userId)
      
    // Revoke the refresh token
    try {
        await revokeRefreshToken(userId);
    } catch (error) {
        throw new BaseError('Failed to revoke refresh token.', 500);
    }
}
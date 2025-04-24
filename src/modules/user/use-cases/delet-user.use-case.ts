import { validateUUID } from '@/shared/utils/validateUUID';
import { findById, DeleteUser } from '../interfaces/user.repository';
import { BaseError } from '@/shared/errors/BaseError';

export const deleteUserUseCase = async (userId: string) => {
    validateUUID(userId);
    const user = await findById.findById(userId);
    if (!user || !user.id) {
        throw new BaseError('User not found or invalid user data');
    }
    if (user.isDeleted) {
        throw new BaseError('User already deleted');
    }
    const deletedUser = await DeleteUser.deleteUser(userId);
    if (!deletedUser) {
        throw new BaseError('Failed to delete user');
    }
    return { message: `Member ${deletedUser.firstName}   ${deletedUser.middleName} is deleted successfully` };
}  
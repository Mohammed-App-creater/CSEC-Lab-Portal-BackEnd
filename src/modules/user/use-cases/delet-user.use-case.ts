import { validateUUID } from '@/shared/utils/validateUUID';
import { findById, DeleteUser } from '../interfaces/user.repository';
import { BaseError } from '@/shared/errors/BaseError';

export const deleteUserUseCase = async (userId: string) => {
    validateUUID(userId);
    const user = await findById.findById(userId);
    if (!user || !user.id) {
        throw new BaseError('User not found or invalid user data');
    }
    const deletedUser = await DeleteUser.deleteUser(userId);
    return { message: `Member ${deletedUser.firstName}   ${deletedUser.middleName} is deleted successfully` };
}  
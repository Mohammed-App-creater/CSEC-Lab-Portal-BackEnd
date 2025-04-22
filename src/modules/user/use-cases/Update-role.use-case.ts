import { getRoleByIdUseCase } from '@modules/role/use-cases/get-role-by-id.use-case';
import { UpdateUserRole, findById } from '../interfaces/user.repository'
import { BaseError } from '@/shared/errors/BaseError'


export const updateUserRole = async (userId: string, roleId: string) => {
    if (!userId || !roleId) {
        throw new BaseError('User ID and Role ID are required', 400)
    }
    const user = await findById.findById(userId)
    if (!user) {
        throw new BaseError('User not found', 404)
    }
    if (user.isDeleted) {
        throw new BaseError('User is deleted', 400)
    }
    if (user.roleId === roleId) {
        throw new BaseError('User already has this role', 409)
    }
    const role = await getRoleByIdUseCase(roleId);
    if (!role) {
        throw new BaseError('Role not found');
    }
    const updatedUser = await UpdateUserRole.updateRole(userId, roleId);
    return updatedUser;
};
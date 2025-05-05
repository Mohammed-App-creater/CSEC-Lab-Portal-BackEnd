import { getUsersByRole } from '../interfaces/user.repository';
import { BaseError } from '@/shared/errors/BaseError';

export const getUsersByRoleUseCase = async (role: string) => {
  if (!role) {
    return { error: 'Role is required' };
  }

  if (!role) {
    throw new BaseError('Role is required', 400);
  }

  if (!["Member", "SuperAdmin", "President", "VicePresident", "DivisionHead", "Coordinator"].includes(role)) {
    throw new BaseError('Invalid role', 400);
  }
  const users = await getUsersByRole.getUsersByRole(role);
  return users;
}
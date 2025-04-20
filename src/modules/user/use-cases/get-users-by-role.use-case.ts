import { getUsersByRole } from '../interfaces/user.repository';

export const getUsersByRoleUseCase = async (role: string) => {
  if (!role) {
    return { error: 'Role is required' };
  }
  const users = await getUsersByRole.getUsersByRole(role);
  return users;
}
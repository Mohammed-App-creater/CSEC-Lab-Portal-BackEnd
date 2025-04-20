import { getUserRole } from '../interfaces/user.repository';
import { UserRoleDTO } from '../dto/user.dto';

export const getUserRoleUseCase = async (userId: string): Promise<UserRoleDTO> => {
  try {
    const roleString = await getUserRole.getUserRole(userId);
    const role: UserRoleDTO = { role: roleString }; 
    return role;
  } catch (error) {
    throw new Error('Error fetching user role: ' + error);
  }
}
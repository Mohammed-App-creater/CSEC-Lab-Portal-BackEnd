import { RoleRepository } from "../interfaces/role.repository"; 


export  const getRoleByIdUseCase = async (id: string) => {
  const role = await RoleRepository.findById(id);
  if (!role) throw new Error('Role not found');
  return role;
}
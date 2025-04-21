import { BaseError } from "@/shared/errors/BaseError";
import { RoleRepository } from "../interfaces/role.repository";
import { validateUUID } from "@/shared/utils/validateUUID";

export const getRoleByIdUseCase = async (roleId: string) => {
  if (!roleId) throw new BaseError('ID is required', 400);
  validateUUID(roleId);
  const role = await RoleRepository.findById(roleId);
  if (!role) throw new Error('Role not found');
  return role;
}



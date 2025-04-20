import { RoleRepository } from "../interfaces/role.repository";
import { RoleDTO } from "../dto/role.dto";
import { BaseError } from "@/shared/errors/BaseError";


export const getRoleByNameUseCase = async (name: string): Promise<RoleDTO> => {
  const role = await RoleRepository.findByName(name);
  if (!role) {
    throw new BaseError("Role not found", 404);
  }
  return role;
};

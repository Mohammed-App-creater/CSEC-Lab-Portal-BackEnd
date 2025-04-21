import { RoleRepository } from "../interfaces/role.repository";
import { RoleAndPermissionDTO } from "../dto/role.dto";
import { BaseError } from "@/shared/errors/BaseError";

export const getAllRoleUseCase = async (): Promise<RoleAndPermissionDTO[]> => {
    const roles = await RoleRepository.findAll();
    if (!roles) {
        throw new BaseError('No roles found', 404);
    }
    return roles;
}

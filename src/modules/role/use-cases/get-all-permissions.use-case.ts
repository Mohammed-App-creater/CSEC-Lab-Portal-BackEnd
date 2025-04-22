import { RoleRepository } from "../interfaces/role.repository";
import { PermissionsDTO } from "../dto/role.dto";
import { BaseError } from "@/shared/errors/BaseError";


export const getAllPermissionsUseCase = async (): Promise<PermissionsDTO[]> => {
    const permissions = await RoleRepository.getAllPermissions();
    if (!permissions) {
        throw new BaseError('No permissions found', 404);
    }
    return permissions;
}
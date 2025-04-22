import { RoleRepository } from "../interfaces/role.repository";
import { CreateRoleDTO } from "../dto/role.dto";
import { BaseError } from "@/shared/errors/BaseError";


export const createRoleUseCase = async (name: string, permissionsIds: number[] ) => {
    if (!name || !permissionsIds) {
        throw new BaseError('Name and permissionsIds are required', 400);
    }
    const existingRole = await RoleRepository.findByName(name);
    if (existingRole) {
        throw new BaseError('Role already exists', 409);
    }
    if (permissionsIds.length === 0) {
        throw new BaseError('At least one permission is required', 400);
    }
    if (permissionsIds.length > 5) {
        throw new BaseError('A maximum of 5 permissionsIds is allowed', 400);
    }
    const permissionsExists = await RoleRepository.getAllPermissions();
    const permissionsIDs = permissionsExists.map((permission) => permission.id);
    const permissionsNotExists = permissionsIds.filter((permission) => !permissionsIDs.includes(permission));
    if (permissionsNotExists.length > 0) {
        throw new BaseError('Some permissionsIds do not exist', 400);
    }
    const roleExists = await RoleRepository.findByName(name);
    if (roleExists) {
        throw new BaseError('Role already exists', 409);
    }
    const role = await RoleRepository.create( name, permissionsIds );
    return role;
};
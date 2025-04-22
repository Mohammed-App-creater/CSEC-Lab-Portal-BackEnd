import { Permission, Role } from "@prisma/client";


export type RoleDTO = Pick<Role, 'id' | 'name'>;

export type PermissionsDTO = Permission;

export type RoleAndPermissionDTO = Omit<Role, 'updatedAt' | 'createdAt'> & {
    permissions: {permission: PermissionsDTO}[];
}

export type CreateRoleDTO = Pick<Role, 'name'> & {
    permissions: number[];
}
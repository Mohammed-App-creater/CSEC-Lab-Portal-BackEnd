import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const RoleRepository = {
    findAll: async () => {
        const roles = await prisma.role.findMany({
            select: {
                id: true,
                name: true,
                status: true,
                permissions: {
                    select: {
                        permission: {
                            select: {
                                id: true,
                                key: true,
                                label: true,
                            },
                        },
                    },
                },
            },
        });

        // Flatten the permissions from RolePermission
        return roles
    },

    findById: async (id: string) => {
        const role = await prisma.role.findUnique({
            where: {
                id,
            }, select: {
                id: true,
                name: true,
            },
        });
        return role;
    },
    findByName: async (name: string) => {
        const role = await prisma.role.findUnique({
            where: {
                name,
            }, select: {
                id: true,
                name: true,
            },
        });
        return role;
    },
    getAllPermissions: async () => {
        const permissions = await prisma.permission.findMany({
            select: {
                id: true,
                key: true,
                label: true,
            },
        });
        return permissions;
    },
    create: async (name: string, permissionIds: number[]) => {
        const role = await prisma.role.create({
            data: {
                name,
                permissions: {
                    create: permissionIds.map((permissionId) => ({
                        permissionId,
                    })),
                },
            },
            select: {
                id: true,
                name: true,
            },
        });
        return role;
    },
}; 
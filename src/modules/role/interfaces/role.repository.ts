import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const RoleRepository = {
    findAll: async () => {
        const roles = await prisma.role.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        return roles;
    },
    findById: async (id: string) => {
        const role = await prisma.role.findUnique({
            where: {
                id,
            },select: {
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
            },select: {
                id: true,
                name: true,
            },
        });
        return role;
    },
}; 
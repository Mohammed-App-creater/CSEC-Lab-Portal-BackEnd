import { GroupCreateDto, GroupUpdateDto } from "../dto/group.dto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const GroupRepository = {
    findById: (id: string) => {

        return prisma.groups.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                description: true,
                updatedAt: true,
            },
        });
    },
    create: (groupUpdateDto: GroupCreateDto) => {
        return {
            ...groupUpdateDto,
            updatedAt: new Date()
        };
    },
    update: ( groupUpdateDto: GroupUpdateDto) => {
        return {
            ...groupUpdateDto,
            updatedAt: new Date(),
        };
    },
    delete: (id: string) => {
        return prisma.groups.delete({
            where: {
                id: id,
            },
        });
    },
    findAll: () => {
        return prisma.groups.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                updatedAt: true,
            },
        });
    },
    findAllByDivisionId: (divisionId: string) => {
        return prisma.groups.findMany({
            where: {
                divisionId: divisionId,
            },
            select: {
                id: true,
                name: true,
                description: true,
                updatedAt: true,
            },
        });
    }
};
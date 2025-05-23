import { GroupCreateDto, GroupUpdateDto } from "../dto/group.dto";
import { prisma } from "@shared/utils/prisma";




export const GroupRepository = {

    findByName: (name: string) => {
        return prisma.groups.findFirst({
            where: {
                name: {
                    equals: name, // Exact match
                    mode: 'default', // Case-sensitive matching
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                updatedAt: true,
            },
        });
    },

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

    findBySessionId: (id: string) => {

        return prisma.groups.findFirst({
            where: {
                sessions: {
                    some: {
                        id: id,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                updatedAt: true,
            },
        });
    },

    create: (name: string) => {
        return prisma.groups.create({
            data: {
                name: name,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            select: {
                id: true,
                name: true,
                description: true,
                updatedAt: true,
            },
        });
    },
    update: (groupUpdateDto: GroupUpdateDto) => {
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
    },

    findAllBySessionId: (sessionId: string) => {
        return prisma.groups.findMany({
            where: {
                sessions: {
                    some: {
                        id: sessionId,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                updatedAt: true,
            },
        });
    },

    findAllByEventId: (eventId: string) => {
        return prisma.groups.findMany({
            where: {
                events: {
                    some: {
                        id: eventId,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                updatedAt: true,
            },
        });
    },





};
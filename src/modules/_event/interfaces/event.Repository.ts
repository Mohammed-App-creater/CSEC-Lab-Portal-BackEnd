import { PrismaClient, Status } from "@prisma/client";
const prisma = new PrismaClient();


export const EventRepository = {
    findByName: (title: string) => {
        return prisma.events.findFirst({
            where: {
                title: {
                    equals: title, // Exact match
                    mode: 'default', // Case-sensitive matching
                },
            },
            select: {
                id: true,
                title: true,
                description: true,
                updatedAt: true,
            },
        });
    },
    findById: (id: string) => {
        return prisma.events.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                description: true,
                updatedAt: true,
            },
        });
    },
    create: (title: string, startDate: Date, startTime: Date, endTime: Date, creatorId: string ) => {
        return prisma.events.create({
            data: {
                title: title,
                startDate: startDate,
                startTime: startTime,
                endTime: endTime,
                visibility: "PUBLIC",
                status: Status.Planned,
                creatorId: creatorId, 
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            select: {
                id: true,
                title: true,
                description: true,
                updatedAt: true,
            },
        });
    },
    update: (eventUpdateDto: any) => {
        return {
            ...eventUpdateDto,
            updatedAt: new Date(),
        };
    },
    delete: (id: string) => {
        return prisma.events.delete({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                description: true,
                updatedAt: true,
            },
        });
    },
    findAll: (limit: number, page: number) => {
        return prisma.events.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                startDate: true,
                startTime: true,
                endTime: true,
                visibility: true,
                tags: true,
                location: true,
                divisionId: true,
                status: true,
                creatorId: true,
                updatedAt: true,
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                updatedAt: "desc",
            },
        });
    },
    findByGroupId: (groupId: string) => {
        return prisma.events.findMany({
            where: {
                groups: { some: { id: groupId } },
            },
            select: {
                id: true,
                title: true,
                description: true,
                updatedAt: true,
            },
        });
    },
};
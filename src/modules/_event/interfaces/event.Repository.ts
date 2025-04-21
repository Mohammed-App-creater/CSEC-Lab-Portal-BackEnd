import { PrismaClient, Status, EventVisibility, Tag } from "@prisma/client";
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
    create: (
        title: string,
        startDate: Date,
        startTime: Date,
        endTime: Date,
        creatorId: string,
        visibility: EventVisibility,
        tag: Tag[],
        divisionId: string | null,
        groups: string[]
    ) => {
        const isPublic = visibility === EventVisibility.PUBLIC;

        return prisma.events.create({
            data: {
                title,
                startDate,
                startTime,
                endTime,
                visibility,
                tags: tag,
                location: "Lab 1",
                status: Status.Planned,
                divisionId: isPublic ? null : divisionId,
                // Skip connecting groups if it's public
                ...(isPublic
                    ? {}
                    : {
                        groups: {
                            connect: groups.map((groupId) => ({ id: groupId })),
                        },
                    }),
                creatorId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
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
                mandatoryAttendance: true,
                status: true,
                creatorId: true,
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
                mandatoryAttendance: true,
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
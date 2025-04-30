import { Status, Tag } from "@prisma/client";
import { prisma } from "@shared/utils/prisma";
import { SessionWithTimeSlotsAndGroupsDto } from "../dto/session.dto";





export const sessionRepository = {
    getAllSessions: async (limit: number, page: number) => {
        const sessions = await prisma.sessions.findMany({
            include: {
                timeSlot: true,
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                updatedAt: "desc",
            },
        });
        return sessions;
    },
    getSessionById: async (id: string) => {
        const session = await prisma.sessions.findUnique({
            where: { id },
            include: {
                timeSlot: true,
            },
        });
        return session;
    },
    getSessionByTitle: async (title: string) => {
        const session = await prisma.sessions.findFirst({
            where: { title },
            include: {
                timeSlot: true,
            },
        });
        return session;
    },
    createSession: async (title: string, description: string, startMonth: Date, endTMonth: Date, location: string, createId: string, divisionId: string, Tag: Tag[], timeSlotAndGroup: SessionWithTimeSlotsAndGroupsDto) => {
        const session = await prisma.sessions.create({
            data: {
                title: title,
                description: description,
                startMonth: startMonth,
                endTMonth: endTMonth,
                location: location,
                creatorId: createId,

                // Relations
                tags: Tag,
                division: {
                    connect: [{ id: divisionId }],
                },
                targetGroups: {
                    connect: timeSlotAndGroup.groupIds.map((group) => ({ id: group })),
                },
                timeSlot: {
                    create: timeSlotAndGroup.timeSlots.map((timeSlot) => ({
                        startTime: timeSlot.startTime,
                        endTime: timeSlot.endTime,
                        date: timeSlot.date,
                        status: Status.Planned,
                    })),
                },
            },
        });
        return session;
    },
    updateSession: async (id: string, sessionData: any) => {
        const session = await prisma.sessions.update({
            where: { id },
            data: sessionData,
        });
        return session;
    },
    deleteSession: async (id: string) => {
        const session = await prisma.sessions.delete({
            where: { id },
        });
        return session;
    },
    getSessionsByGroupId: async (groupId: string) => {
        const sessions = await prisma.sessions.findMany({
            where: { targetGroups: { some: { id: groupId } } },
            include: {
                timeSlot: true,
            },
        });
        return sessions;
    },
    getSessionsByUserId: async (userId: string) => {
        const sessions = await prisma.sessions.findMany({
            where: { participants: { some: { id: userId } } },
            include: {
                timeSlot: true,
            },
        });
        return sessions;
    },
    getSessionsByTag: async (tag: Tag) => {
        const sessions = await prisma.sessions.findMany({
            where: { tags: { has: tag } },
            include: {
                timeSlot: true,
            },
        });
        return sessions;
    },
    getSessionsByLocation: async (location: string) => {
        const sessions = await prisma.sessions.findMany({
            where: { location: { contains: location } },
            include: {
                timeSlot: true,
            },
        });
        return sessions;
    },
    getSessionsByDate: async (date: Date) => {
        const sessions = await prisma.sessions.findMany({
            where: { timeSlot: { some: { date } } },
            include: {
                timeSlot: true,
            },
        });
        return sessions;
    },
    getSessionsByTimeSlot: async (timeSlotId: string) => {
        const sessions = await prisma.sessions.findMany({
            where: { timeSlot: { some: { id: timeSlotId } } },
            include: {
                timeSlot: true,
            },
        });
        return sessions;
    },
    getSessionsByStatus: async (status: Status) => {
        const sessions = await prisma.sessions.findMany({
            where: { timeSlot: { some: { status } } },
            include: {
                timeSlot: true,
            },
        });
        return sessions;
    },

    getUpcomingSessionsWithTimeSlots: async (page: number, limit: number) => {
        const today = new Date();

        const timeSlots = await prisma.sessionTimeSlot.findMany({
            where: {
                date: {
                    gte: today, // only future and today
                },
                status: "Planned", // optional: only planned sessions
            },
            include: {
                session: {
                    select: {
                        id: true,
                        title: true,
                        tags: true,
                    },
                },
            },
            orderBy: [
                { date: 'asc' },
                { startTime: 'asc' },
            ],
            skip: (page - 1) * limit,
            take: limit,
        });

        return timeSlots;
    },



};

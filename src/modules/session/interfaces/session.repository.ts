import { PrismaClient, Status, Tag } from "@prisma/client";

const prisma = new PrismaClient();




export const sessionRepository = {
    getAllSessions: async () => {
        const sessions = await prisma.sessions.findMany({
            include: {
                timeSlot: true,
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
    createSession: async (sessionData: any) => {
        const session = await prisma.sessions.create({
            data: sessionData,
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
    }

}

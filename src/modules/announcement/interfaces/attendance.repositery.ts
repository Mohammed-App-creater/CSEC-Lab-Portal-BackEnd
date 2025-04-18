import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const AnnouncementRepository = {
    getRecentAnnouncements: (limit: number) => {
        return prisma.announcement.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
        });
    }

};
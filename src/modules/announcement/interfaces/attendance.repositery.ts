import { prisma } from "@shared/utils/prisma";



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
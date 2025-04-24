import { CountUpcomingSessionDTO } from '../dto/count-upcoming-session.dto';
import { prisma } from '@/shared/utils/prisma';



export const SessionRepository = {
    countUpcomingSession: async (): Promise<CountUpcomingSessionDTO> => {
        const today = new Date();
        const todayOnly = new Date(today.toDateString());
        const count = await prisma.sessions.count({
            where: {
                timeSlot: {
                    some: {
                        date: {
                            gte: todayOnly,
                        },
                    },
                },
            },
        });
        return { count };
    }
};
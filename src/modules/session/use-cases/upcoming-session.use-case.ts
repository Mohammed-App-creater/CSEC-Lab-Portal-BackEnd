import { sessionRepository } from "../interfaces/session.repository";

export const sessionUseCase = {
    getUpcomingSessions: async (page: number, limit: number) => {
        const timeSlots = await sessionRepository.getUpcomingSessionsWithTimeSlots(page, limit);

        const groupedSessions: Record<string, { id: string; title: string; startTime: string; divisionName: string; tags: string[] }[]> = {};

        for (const timeSlot of timeSlots) {
            const dateKey = timeSlot.date.toISOString().split('T')[0]; // e.g., "2025-07-06"

            if (!groupedSessions[dateKey]) {
                groupedSessions[dateKey] = [];
            }

            if (timeSlot.session) {
                groupedSessions[dateKey].push({
                    id: timeSlot.session.id,
                    title: timeSlot.session.title,
                    startTime: timeSlot.startTime.toISOString(),
                    divisionName: "",
                    tags: timeSlot.session.tags,
                });
            }
        }

        const sessionsByDate = Object.entries(groupedSessions).map(([date, sessions]) => ({
            date,
            sessions,
        }));

        return sessionsByDate;
    }
}

import { BaseError } from '@/shared/errors/BaseError';
import { SessionGroupsAndTimeSlotDto } from '../dto/session.dto';
import { sessionRepository } from '../interfaces/session.repository';
import { getAllGroupsBySessionIdUseCase } from '@modules/group/use-cases/get-all-groups-by-sessionId.use-case'


export const getAllSessionsUseCase = async ( limit: number, page: number): Promise<SessionGroupsAndTimeSlotDto[]> => {
    // Validate limit and page
    if (limit <= 0 || page <= 0) {
        throw new BaseError('Limit and page must be greater than 0', 400);
    }
    // Validate that limit and page are integers
    if (!Number.isInteger(limit) || !Number.isInteger(page)) {
        throw new BaseError('Limit and page must be integers', 400);
    }

    // Fetch sessions from the repository

    const sessions = await sessionRepository.getAllSessions(limit, page);
    const sessionPromises = sessions.map(async (session) => {
        const groups = await getAllGroupsBySessionIdUseCase(session.id);
        return {
            ...session,
            groups,
            timeSlots: session.timeSlot,
        };
    });

    const sessionsWithGroups = await Promise.all(sessionPromises);

    return sessionsWithGroups;
}

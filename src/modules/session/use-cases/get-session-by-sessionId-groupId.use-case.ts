import { sessionRepository } from '../interfaces/session.repository'
import { SessionDto } from '../dto/session.dto'
import { BaseError } from '@/shared/errors/BaseError'
import { validateUUID } from '@/shared/utils/validateUUID'




export const getSessionByAndGroupIdUseCase = async (sessionId: string, groupId: string): Promise<SessionDto> => {
    // Validate the sessionId
    if (!sessionId) {
        throw new BaseError('Session ID is required.')
    }

    validateUUID(sessionId)

    // Fetch the session by ID
    const session = await sessionRepository.getSessionBySessionIdAndGroupId(sessionId, groupId)

    // Check if the session exists
    if (!session) {
        throw new BaseError('Session not found.')
    }

    return session
}
import { validateUUID } from '@/shared/utils/validateUUID'
import {AttendanceRepository } from '../interfaces/attendance.repositry'
import { AttendanceDto } from '../dto/attendance.dto'




export const getAttendanceBySessionIdUseCase = async (sessionId: string): Promise<AttendanceDto[]> => {
    // Validate the sessionId
    if (!sessionId) {
        throw new Error('Session ID is required.')
    }
    validateUUID(sessionId)
    const attendance = await AttendanceRepository.getAttendanceBySessionId(sessionId)
    return attendance
    }

export const getAttendanceBySessionIdAndGroupIdUseCase = async (sessionId: string, groupId: string) => {
    // Validate the sessionId and groupId
    if (!sessionId) {
        throw new Error('Session ID is required.')
    }
    if (!groupId) {
        throw new Error('Group ID is required.')
    }
    validateUUID(groupId)
    validateUUID(sessionId)

    
    const attendance = await AttendanceRepository.getAttendanceBySessionIdAndGroupId(sessionId, groupId)
    return attendance
    }
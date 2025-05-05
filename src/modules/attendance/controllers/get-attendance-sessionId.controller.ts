import {getAttendanceBySessionIdUseCase, getAttendanceBySessionIdAndGroupIdUseCase} from '../use-cases/get-attendace-by-sessionId.use-case'
import { Request, Response, NextFunction } from 'express'


export const getAttendanceBySessionIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sessionId } = req.params
        const attendance = await getAttendanceBySessionIdUseCase(sessionId)
        res.status(200).json(attendance)
    } catch (error) {
        next(error)
    }
}

export const getAttendanceBySessionIdAndGroupIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { sessionId, groupId } = req.params
        const attendance = await getAttendanceBySessionIdAndGroupIdUseCase(sessionId, groupId)
        res.status(200).json(attendance)
    } catch (error) {
        next(error)
    }
}


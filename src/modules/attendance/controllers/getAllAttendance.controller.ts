import { getAllAttendances } from '../use-cases/get-all-attendance.use-case'
import { Request, Response, NextFunction } from 'express'

export const getAllAttendanceController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allAttendances = await getAllAttendances()
        res.status(200).json(allAttendances)
    } catch (error) {
        next(error)
    }
}
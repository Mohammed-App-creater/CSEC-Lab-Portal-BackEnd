import { getUserAttendanceSummary } from '../use-cases/user-attendance-summry.use-case';
import { NextFunction, Request, Response } from 'express';


export const userAttendanceSummaryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.id;
        const attendanceSummary = await getUserAttendanceSummary(userId);
        res.status(200).json({
            status: 'success',
            data: attendanceSummary
        });
    } catch (error) {
       next(error);
    }
};
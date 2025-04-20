import { getUserAttendanceSummary } from '../use-cases/user-attendance-summry.use-case';
import { Request, Response } from 'express';


export const userAttendanceSummaryController = async (req: Request, res: Response) => {
    try {
        const userId = req.body.id;
        const attendanceSummary = await getUserAttendanceSummary(userId);
        res.status(200).json({
            status: 'success',
            data: attendanceSummary
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'An unknown error occurred'
        });
    }
};
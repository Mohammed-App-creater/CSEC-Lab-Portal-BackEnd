import { getDashboardSummary } from '../use-cases/get-dashboard-summary.usecase';
import { Request, Response } from 'express';

export const getDashboardSummaryController = async (req: Request, res: Response) => {
    try {
        const summary = await getDashboardSummary();
        res.status(200).json({
            data: summary,
            updateAt: new Date(),
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}

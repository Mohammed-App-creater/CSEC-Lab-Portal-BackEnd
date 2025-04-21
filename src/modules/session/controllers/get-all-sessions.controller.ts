import { getAllSessionsUseCase } from '../use-cases/get-all-session.use-case';
import { Request, Response, NextFunction } from 'express';


export const getAllSessionsController = async (req: Request, res: Response, next: NextFunction) => {
    const { limit = 10  , page = 1} = req.query;
    try {
        const sessions = await getAllSessionsUseCase( Number(limit), Number(page));
         res.status(200).json(sessions);
         return;
    } catch (error) {
        next(error);
    }
};

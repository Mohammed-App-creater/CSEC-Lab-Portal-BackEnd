import { GetAllEventUseCase } from "../use-cases/get-all-event.use-case";
import { Request, Response, NextFunction } from "express";

export const GetAllEventController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit, page } = req.query;

        const events = await GetAllEventUseCase(limit? Number(limit): 10, page?  Number(page): 1);
        res.status(200).json(events);
    } catch (error) {
        next(error);
    }
}
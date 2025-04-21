import { CreateEventUseCase } from "../use-cases/create-event.use-case";
import { Request, Response, NextFunction } from "express";


export const CreateEventController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, startDate, startTime, endTime, creatorId, visibility, tag, divisionId, groups } = req.body;
        const event = await CreateEventUseCase(
            title,
            startDate,
            startTime,
            endTime,
            creatorId,
            visibility,
            tag,
            divisionId,
            groups
        );
        res.status(201).json(event);
    } catch (error) {
        next(error);
    }
};
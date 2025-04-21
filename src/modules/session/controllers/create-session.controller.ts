import { createSessionUseCase } from '../use-cases/create-session.use-case'
import { Request, Response, NextFunction } from 'express'



export const createSessionController = async (req: Request, res: Response, next: NextFunction,) => {
    try {
        const { title, description, startMonth, endTMonth, location, creatorId, divisionId, tags, timeSlotAndGroup } = req.body
        
        const session = await createSessionUseCase(
            title,
            description,
            startMonth,
            endTMonth,
            location,
            creatorId,
            divisionId,
            tags,
            timeSlotAndGroup
        )


        res.status(201).json(session)
        return;
    } catch (error) {
        next(error)
    }
}
import { createGroupUseCase } from '../use-cases/create-group.use-case'
import { NextFunction, Request, Response } from 'express'


export const createGroupController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {name, divisionId} = req.body
        const group = await createGroupUseCase(name, divisionId)
        res.status(201).json(group)
        return;
    } catch (error) {
        next(error)
    }
}
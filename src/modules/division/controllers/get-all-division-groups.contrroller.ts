import { getAllDivisionGroupsUseCase } from '../use-cases/get-all-division-groups.use-case'
import { Request, Response, NextFunction } from 'express'



export const getAllDivisionGroupsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const divisions = await getAllDivisionGroupsUseCase()
        res.status(200).json(divisions)
        return;
    } catch (error) {
        next(error)
    }
}
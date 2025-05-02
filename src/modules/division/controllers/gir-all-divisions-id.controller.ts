import { getAllDivisionId } from '../use-cases/get-all-divisions-id.use-case'
import { Request, Response, NextFunction } from 'express'



export const getAllDivisionsIdController = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const divisions = await getAllDivisionId();
        res.status(200).json(divisions)
        return;
    } catch (error) {
        next(error)
    }
}
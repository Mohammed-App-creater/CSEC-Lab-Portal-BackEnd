import { getAllDivisionsResource } from '../use-cases/CRUD-Division-Resource.use-case';
import { Request, Response, NextFunction } from 'express';


export const getAllDivisionsResourceController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allDivisionsResource = await getAllDivisionsResource();
         res.status(200).json(allDivisionsResource);
         return;
    } catch (error) {
        next(error);
    }
}
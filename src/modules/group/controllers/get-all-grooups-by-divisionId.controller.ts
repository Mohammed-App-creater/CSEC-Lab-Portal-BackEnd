import { getAllGroupsByDivisionIdUseCase } from '../use-cases/get-all-groups-by-divisionId';
import { Request, Response, NextFunction } from 'express';



export const getAllGroupsByDivisionIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { divisionId } = req.params;
        const groups = await getAllGroupsByDivisionIdUseCase(divisionId);
        res.status(200).json(groups);
        return;
    } catch (error) {
        next(error);
    }
}
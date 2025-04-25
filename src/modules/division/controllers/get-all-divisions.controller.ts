import { getAllDivisionUseCase } from "../use-cases/get-all-division.use-case"
import { Request, Response, NextFunction } from "express"



export const getAllDivisionsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const divisions = await getAllDivisionUseCase()
         res.status(200).json(divisions)
         return;
    } catch (error) {
        next(error)
    }
}
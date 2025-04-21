import { getAllRoleUseCase } from "../use-cases/get-all-role.use-case";
import { Request, Response, NextFunction } from "express";


export const getAllRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = await getAllRoleUseCase();
        res.status(200).json(role);
        return;
    } catch (error) {
        next(error);
    }
}
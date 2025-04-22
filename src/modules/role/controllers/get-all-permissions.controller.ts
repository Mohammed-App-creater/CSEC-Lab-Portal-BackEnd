import { getAllPermissionsUseCase } from "../use-cases/get-all-permissions.use-case";
import { Request, Response, NextFunction } from "express";


export const getAllPermissionsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permissions = await getAllPermissionsUseCase();
        res.status(200).json(permissions);
        return;
    } catch (error) {
        next(error);
    }
};
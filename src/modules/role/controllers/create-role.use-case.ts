import { createRoleUseCase } from "../use-cases/create-role.use-case";
import { Request, Response, NextFunction } from "express";

export const createRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, permissionsIds } = req.body;
        const role = await createRoleUseCase(name, permissionsIds);
        res.status(201).json(role);
        return;
    } catch (error) {
        next(error);
    }
};

import { log } from "console";
import { getRoleByIdUseCase } from "../use-cases/get-role-by-id.use-case";
import { Request, Response, NextFunction } from "express";

export const getRoleByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roleId } = req.params;
        const role = await getRoleByIdUseCase(roleId);
        res.status(200).json(role);
    } catch (error) {
        next(error);
    }
}
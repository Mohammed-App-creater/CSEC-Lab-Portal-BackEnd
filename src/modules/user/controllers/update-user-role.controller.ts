import { updateUserRole } from "../use-cases/Update-role.use-case";
import { Request, Response, NextFunction } from "express";


export const updateUserRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, roleId } = req.body;
        const updatedUser = await updateUserRole(userId, roleId);
        res.status(200).json(updatedUser);
        return;
    } catch (error) {
        next(error);
    }
}
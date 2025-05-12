import { Request, Response, NextFunction } from "express";
import { UpdateUserRole, findById } from "../interfaces/user.repository";
import { BaseError } from "@/shared/errors/BaseError";
import { validateUUID } from "@/shared/utils/validateUUID";



export const updateUserRoleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, roleId } = req.body;
        if (!userId || !roleId) {
            throw new BaseError('User ID and Role ID are required', 400);
        }
        validateUUID(userId);
        validateUUID(roleId);
        const userexists = await findById.findById(userId);
        if (!userexists) {
            throw new BaseError('User not found', 404);
        }
        const user = await UpdateUserRole.updateRole(userId, roleId);
        if (!user) {
            throw new BaseError('User not found', 404);
        }
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        next(error);
    }
}
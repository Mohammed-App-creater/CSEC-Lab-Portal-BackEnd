import { deleteUserUseCase } from "../use-cases/delet-user.use-case";
import { Request, Response, NextFunction } from "express";

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const result = await deleteUserUseCase(userId);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
}
export default deleteUserController;
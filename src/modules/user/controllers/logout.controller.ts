import { AuthenticatedRequest } from "../dto/auth-user.dto";
import { logoutUseCase } from "../use-cases/Logout.use-case"
import { Response, NextFunction } from "express";


export const logoutController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user.id;
        await logoutUseCase(userId);
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        next(error);
    }
};

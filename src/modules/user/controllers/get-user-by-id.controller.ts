import { getUserById } from "../use-cases/get-user-by-id";
import { Request, Response, NextFunction } from "express";


export const getUserByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.params.id; // Assuming the user ID is passed as a URL parameter
        console.log("User ID from request:", userId); // Debugging line to check user ID
        const user = await getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
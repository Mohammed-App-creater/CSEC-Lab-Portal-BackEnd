import  {getUsersByRoleUseCase} from '../use-cases/get-users-by-role.use-case';
import { Request, Response } from "express";


export const getUsersByRoleController = async (req: Request, res: Response): Promise<void> => {
    const { role } = req.body;
    try {
        const users = await getUsersByRoleUseCase(role);
        res.status(200).json(users);
        return
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching users' });
        console.error(error);
        return
    }
}
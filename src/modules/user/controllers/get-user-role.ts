import { getUserRoleUseCase } from '../use-cases/get-user-role.use-case'
import { Request, Response } from 'express';


export const getUserRoleController = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
        return;
    }
    const role = await getUserRoleUseCase(userId);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
};
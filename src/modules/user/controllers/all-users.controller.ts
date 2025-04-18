import { findAllUsersUseCase } from '../use-cases/all-users.use-case';
import { Request, Response } from 'express';

export const findAllUsersController = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const users = await findAllUsersUseCase(Number(page), Number(limit));
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

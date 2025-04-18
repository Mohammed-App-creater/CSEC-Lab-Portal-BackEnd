import { countUserUseCase } from '../use-cases/conut-user.usecase';
import { Request, Response } from 'express';


export const countUserController = async (req: Request, res: Response) => {
    try {
        const count = await countUserUseCase();
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}


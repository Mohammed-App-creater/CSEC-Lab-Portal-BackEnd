import { registerUserUseCase } from '../use-cases/register-user.usecase';
import { Request, Response } from 'express';


export const registerController = async (req: Request, res: Response) => {
    try {
        const {  email, password } = req.body;

        const result = await registerUserUseCase({  email, password });

        res.status(200).json(result);
    } catch (err) {
        res.status(401).json({ message: err instanceof Error ? err.message : 'An unknown error occurred' });
    }
};







